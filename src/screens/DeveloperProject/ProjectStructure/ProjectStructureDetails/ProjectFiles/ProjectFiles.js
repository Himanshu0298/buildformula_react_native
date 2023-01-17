import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import {Button, FAB, IconButton, Menu, Text, Title} from 'react-native-paper';
import {theme} from 'styles/theme';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import _ from 'lodash';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import PdfIcon from 'assets/images/pdf_icon.png';
import {getDownloadUrl, getFileName} from 'utils/download';
import FileViewer from 'react-native-file-viewer';

import {useDownload} from 'components/Atoms/Download';
import {getShadow} from 'utils';
import {useImagePicker} from 'hooks';
import {Formik} from 'formik';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import dayjs from 'dayjs';

const SNAP_POINTS = [0, '40%'];

function RenderForm(props) {
  const {formikProps, fileCategoryOptions} = props;

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = formikProps;

  return (
    <View style={styles.formContainer}>
      <RenderInput
        name="name"
        label="File Name"
        containerStyles={styles.inputStyles}
        value={values?.name}
        maxLength={10}
        onChangeText={handleChange('name')}
        onBlur={handleBlur('name')}
        returnKeyType="next"
        error={errors.name}
      />
      <RenderSelect
        name="file_category"
        label="File Category"
        value={values?.file_category}
        options={fileCategoryOptions}
        containerStyles={styles.inputStyles}
        onBlur={handleBlur('file_category')}
        onSelect={value => {
          setFieldValue('file_category', value);
        }}
      />

      <Button
        style={styles.button}
        theme={{roundness: 10}}
        mode="contained"
        onPress={handleSubmit}>
        Add
      </Button>
    </View>
  );
}

function RenderFile(props) {
  const {file, onPressFile, handleDelete, visible, toggleMenu} = props;

  const {file_name, created_at, title, id} = file;

  return (
    <View style={styles.recentFiles}>
      <TouchableOpacity
        style={styles.sectionContainer}
        onPress={() => onPressFile(file)}>
        <Image source={PdfIcon} style={styles.fileIcon} />
        <View>
          <Text style={(styles.verticalFlex, styles.text)} numberOfLines={2}>
            {file_name}
          </Text>
          <View style={styles.type}>
            <Text style={styles.date}>{title}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>
              {dayjs(created_at).format('DD MMM YYYY')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <Menu
        visible={visible}
        onDismiss={() => toggleMenu()}
        anchor={
          <OpacityButton
            opacity={0.1}
            color="#4872f4"
            style={styles.editIcon}
            onPress={toggleMenu}>
            <MaterialIcon name="dots-vertical" color="#4872f4" size={15} />
          </OpacityButton>
        }>
        <Menu.Item
          onPress={() => {
            toggleMenu();
          }}
          title="Rename"
        />
        <Menu.Item onPress={() => handleDelete(id)} title="Delete" />
        <Menu.Item onPress={{}} title="Share" />
      </Menu>
    </View>
  );
}

function AddAttachments(props) {
  const {dialog, onClose, formikProps, fileCategoryOptions} = props;

  const {values, setFieldValue} = formikProps;

  const bottomSheetRef = useRef();
  const fall = new Animated.Value(1);

  useEffect(() => {
    if (dialog) {
      bottomSheetRef?.current?.snapTo(1);
    } else {
      bottomSheetRef?.current?.snapTo(0);
    }
  }, [dialog]);

  const {openImagePicker} = useImagePicker();

  const handleUpload = () => {
    openImagePicker({
      type: 'file',
      onChoose: file => {
        if (file.uri) {
          const attachments = values.attachments || [];
          attachments.push(file);
          setFieldValue('attachments', attachments);
        }
      },
    });
  };

  return (
    <>
      {dialog ? (
        <Animated.View
          style={[
            styles.backdrop,
            {opacity: Animated.sub(1, Animated.multiply(fall, 0.9))},
          ]}
        />
      ) : null}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={SNAP_POINTS}
        initialSnap={0}
        borderRadius={30}
        callbackNode={fall}
        renderHeader={() => <View />}
        renderContent={() => (
          <View style={styles.sheetContentContainer}>
            <View style={styles.closeContainer}>
              <IconButton
                icon="close-circle"
                size={25}
                onPress={onClose}
                color="grey"
              />
            </View>
            <Title>Upload</Title>
            <TouchableOpacity opacity={0.5} onPress={handleUpload}>
              <View style={styles.uploadFileContainer}>
                <Text style={{color: theme.colors.primary}}> Choose file</Text>
              </View>
            </TouchableOpacity>
            <RenderForm
              formikProps={formikProps}
              fileCategoryOptions={fileCategoryOptions}
            />
          </View>
        )}
      />
    </>
  );
}

function ProjectFiles(props) {
  const {navigation, route} = props;

  const {projectId} = route?.params || {};

  const download = useDownload();

  const [dialog, setDialog] = useState();

  const [visible, setVisible] = React.useState(false);

  const {
    getProjectDetails,
    addProjectFile,
    deleteProjectFile,
    getProjectMasterList,
  } = useProjectStructureActions();
  const {projectDetails, loading, masterList} = useSelector(
    s => s.projectStructure,
  );

  const {attachment_file} = projectDetails || {};

  const {project_structure_file_category: fileCategory} = masterList;

  const {selectedProject} = useSelector(s => s.project);

  React.useEffect(() => {
    getData();
    getProjectMasterList({project_id: selectedProject.id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    await getProjectDetails({project_id: selectedProject.id, id: projectId});
  };

  const fileCategoryOptions = useMemo(() => {
    return fileCategory?.map(i => ({
      label: i.title,
      value: i.id,
    }));
  }, [fileCategory]);

  const onPressFile = async file => {
    const fileUrl = getDownloadUrl(file);
    const name = getFileName(file);

    download.link({
      name,
      link: fileUrl,
      showAction: false,
      onFinish: ({dir}) => {
        FileViewer.open(`file://${dir}`);
      },
    });
  };

  const toggleAddFile = () => setDialog(v => !v);
  const toggleMenu = () => setVisible(v => !v);

  const onClose = () => toggleAddFile();
  const onCloseMenu = () => toggleMenu();

  const onSubmit = async values => {
    toggleAddFile();
    const data = {
      project_id: selectedProject.id,
      file_name: values.name,
      id: projectId,
      file_category: values.file_category,
    };

    await addProjectFile(data);
    getData();
  };

  const handleDelete = async attachment_id => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: () => {
        deleteProjectFile({
          project_id: selectedProject.id,
          id: projectId,
          attachment_id,
        });
        getData();
        onCloseMenu();
      },
    });
  };
  return (
    <>
      {dialog ? (
        <Formik
          enableReinitialize
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{}}
          onSubmit={onSubmit}>
          {formikProps => (
            <AddAttachments
              {...props}
              dialog={dialog}
              toggleDialog={toggleAddFile}
              onClose={onClose}
              formikProps={formikProps}
              fileCategoryOptions={fileCategoryOptions}
            />
          )}
        </Formik>
      ) : null}

      <View style={styles.mainContainer}>
        <Spinner visible={loading} textContent="" />

        <View style={styles.headerWrapper}>
          <IconButton
            icon="keyboard-backspace"
            size={18}
            color="#4872f4"
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          />
          <Title>Files/ Attachments</Title>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.fileContainer}>
            {attachment_file.map((file, index) => {
              return (
                <RenderFile
                  file={file}
                  key={index?.toString()}
                  onPressFile={onPressFile}
                  handleDelete={handleDelete}
                  visible={visible}
                  toggleMenu={toggleMenu}
                />
              );
            })}
          </View>
        </ScrollView>
        <FAB
          style={[styles.fab, {backgroundColor: theme.colors.primary}]}
          icon="plus"
          onPress={toggleAddFile}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileIcon: {
    width: 32,
    height: 38,
    paddingLeft: 10,
    marginLeft: 10,
    marginBottom: 10,
  },

  mainContainer: {
    margin: 10,
    flex: 1,
  },
  backIcon: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    marginRight: 11,
  },

  scrollView: {
    marginBottom: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 10,
  },

  text: {
    color: '#080707',
    paddingHorizontal: 10,
    fontSize: 14,
    alignItems: 'center',
  },
  date: {
    color: '#080707',
  },
  recentFiles: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFFFF',
    ...getShadow(3),
    padding: 10,
    borderRadius: 10,
  },
  sectionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  fileContainer: {
    marginVertical: 30,
  },
  type: {
    marginLeft: 10,
  },
  dateContainer: {
    marginLeft: 8,
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sheetContentContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 15,
    paddingBottom: 20,
    flexGrow: 1,
    height: '100%',
    ...getShadow(2),
  },
  closeContainer: {
    alignItems: 'flex-end',
  },

  uploadFileContainer: {
    margin: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    padding: 10,
  },

  inputStyles: {
    marginVertical: 8,
  },
  formContainer: {
    flexGrow: 1,
  },
});

export default ProjectFiles;

import React, {useMemo, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  Button,
  Dialog,
  FAB,
  IconButton,
  Menu,
  Portal,
  Text,
  Title,
} from 'react-native-paper';
import {theme} from 'styles/theme';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import PdfIcon from 'assets/images/pdf_icon.png';
import {getDownloadUrl, getFileName} from 'utils/download';
import FileViewer from 'react-native-file-viewer';
import Share from 'react-native-share';

import {useDownload} from 'components/Atoms/Download';
import {getShadow} from 'utils';
import {useImagePicker} from 'hooks';
import {Formik} from 'formik';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import dayjs from 'dayjs';
import {useAlert} from 'components/Atoms/Alert';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';

function AddAttachmentModel(props) {
  const {visible, fileCategoryOptions, formikProps, onClose} = props;

  const {values, setFieldValue} = formikProps;

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
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onClose}
        style={styles.dialogContainer}>
        <ActionSheetProvider>
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
                <Text style={{color: theme.colors.primary}}>Choose file</Text>
              </View>
            </TouchableOpacity>
            <RenderForm
              formikProps={formikProps}
              fileCategoryOptions={fileCategoryOptions}
            />
          </View>
        </ActionSheetProvider>
      </Dialog>
    </Portal>
  );
}

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
  const {file, onPressFile, handleDelete, handleShare} = props;

  const {file_name, created_at, title, id} = file;

  const [visible, setVisible] = React.useState(false);

  const toggleMenu = () => setVisible(v => !v);

  const onDelete = () => {
    handleDelete(id);
    toggleMenu();
  };

  const onShare = () => {
    handleShare(file);
    toggleMenu();
  };

  return (
    <View style={styles.recentFiles}>
      <TouchableOpacity
        style={styles.sectionContainer}
        onPress={() => onPressFile(file)}>
        <Image source={PdfIcon} style={styles.fileIcon} />
        <View>
          <Text style={(styles.verticalFlex, styles.text)} numberOfLines={3}>
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
          <TouchableOpacity style={styles.editIcon} onPress={toggleMenu}>
            <MaterialIcon name="dots-vertical" size={18} />
          </TouchableOpacity>
        }>
        <Menu.Item onPress={onDelete} title="Delete" />
        <Menu.Item onPress={onShare} title="Share" />
      </Menu>
    </View>
  );
}

function ProjectFiles(props) {
  const {navigation, route} = props;
  const {projectId} = route?.params || {};

  const download = useDownload();
  const alert = useAlert();

  const [dialog, setDialog] = useState();
  const [sharing, setSharing] = useState(false);

  const {
    getProjectDetails,
    addProjectFile,
    deleteProjectFile,
    getProjectMasterList,
  } = useProjectStructureActions();

  const {selectedProject} = useSelector(s => s.project);
  const {projectDetails, loading, masterList} = useSelector(
    s => s.projectStructure,
  );

  const {attachment_file} = projectDetails || {};
  const {project_structure_file_category: fileCategory} = masterList;

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
  const toggleSharing = () => setSharing(v => !v);

  const handleShare = async file => {
    try {
      toggleSharing();
      const fileUrl = getDownloadUrl(file);
      const name = getFileName(file);

      return download.link({
        name,
        link: fileUrl,
        showAction: false,
        base64: true,
        onFinish: ({base64}) => {
          const options = {
            title: 'Share',
            message: `Share ${file.file_name} :`,
            url: base64,
          };
          toggleSharing();

          return Share.open(options);
        },
      });
    } catch (error) {
      console.log('-----> error', error);
      return error;
    }
  };

  const onSubmit = async values => {
    toggleAddFile();
    const formData = new FormData();
    values.attachments.map(item => {
      formData.append('myfile[]', item);
      return item;
    });

    formData.append('project_id', selectedProject.id);
    formData.append('file_name', [values.name]);
    formData.append('id', projectId);
    formData.append('file_category', [values.file_category]);

    await addProjectFile(formData);
    getData();
  };

  const handleDelete = async attachment_id => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: async () => {
        await deleteProjectFile({
          project_id: selectedProject.id,
          id: projectId,
          attachment_id,
        });
        getData();
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
            <AddAttachmentModel
              {...props}
              visible={dialog}
              onClose={toggleAddFile}
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
            {attachment_file?.map((file, index) => {
              return (
                <RenderFile
                  file={file}
                  key={index?.toString()}
                  onPressFile={onPressFile}
                  handleDelete={handleDelete}
                  toggleAddFile={toggleAddFile}
                  handleShare={handleShare}
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
    backgroundColor: '#fff',
    ...getShadow(3),
    padding: 10,
    // borderRadius: 10,
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
  dialogContainer: {
    flex: 0.6,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    top: 200,
    width: '100%',
    left: -25,
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
  // editIcon: {
  //   borderRadius: 10,
  // },
});

export default ProjectFiles;

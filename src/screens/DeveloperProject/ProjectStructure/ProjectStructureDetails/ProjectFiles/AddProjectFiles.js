import React, {useMemo} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';

import {Text, Title} from 'react-native-paper';
import {theme} from 'styles/theme';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useImagePicker} from 'hooks';
import {Formik} from 'formik';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {useSelector} from 'react-redux';
import FileIcon from 'assets/images/file_icon.png';

import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import ActionButtons from 'components/Atoms/ActionButtons';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const RenderAttachments = props => {
  const {attachments, handleDelete} = props;

  return (
    <View style={{margin: 10}}>
      <View style={styles.cardContainer}>
        <View style={styles.renderFileContainer}>
          <Text style={styles.attachmentFileHeader}>Attachments</Text>
        </View>
        {attachments?.map((attachment, index) => {
          return (
            <View key={attachment.name}>
              <View style={styles.sectionContainer}>
                <Image source={FileIcon} style={styles.fileIconContainer} />
                <View style={styles.textContainer}>
                  <Text
                    style={(styles.verticalFlex, styles.text)}
                    numberOfLines={3}>
                    {attachment.name}
                  </Text>
                </View>
              </View>
              <OpacityButton
                opacity={0.1}
                color={theme.colors.error}
                style={styles.closeButton}
                onPress={() => handleDelete(index)}>
                <MaterialIcon
                  name="close"
                  color={theme.colors.error}
                  size={17}
                />
              </OpacityButton>
            </View>
          );
        })}
      </View>
    </View>
  );
};

function AddAttachments(props) {
  const {fileCategoryOptions, formikProps, navigation} = props;

  const {
    values,
    setFieldValue,
    handleChange,
    handleBlur,
    errors,
    handleSubmit,
  } = formikProps;

  const {openImagePicker} = useImagePicker();

  const handleUpload = () => {
    openImagePicker({
      type: 'file',
      onChoose: file => {
        const attachments = values?.attachments || [];
        attachments.push(file);
        setFieldValue('attachments', attachments);
      },
    });
  };

  const handleDelete = i => {
    values?.attachments.splice(i, 1);
    setFieldValue('attachments', values?.attachments);
  };

  return (
    <SafeAreaProvider style={{margin: 10, flexGrow: 1}}>
      <SafeAreaView>
        <View style={styles.sheetContentContainer}>
          <Title style={{marginVertical: 5}}>Upload File</Title>
          <TouchableOpacity opacity={0.5} onPress={handleUpload}>
            <View style={styles.uploadFileContainer}>
              <Text style={{color: theme.colors.primary}}>Choose file</Text>
            </View>
          </TouchableOpacity>
          {values?.attachments?.length ? (
            <RenderAttachments
              attachments={values.attachments}
              handleDelete={i => handleDelete(i)}
            />
          ) : null}
          <View style={styles.formContainer}>
            <RenderInput
              name="name"
              label="File Name"
              containerStyles={styles.inputStyles}
              value={values.name}
              maxLength={10}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              returnKeyType="next"
              error={errors.name}
            />
            <RenderSelect
              name="file_category"
              label="File Category"
              value={values.file_category}
              options={fileCategoryOptions}
              containerStyles={styles.inputStyles}
              onBlur={handleBlur('file_category')}
              onSelect={value => {
                setFieldValue('file_category', value);
              }}
            />

            <ActionButtons
              style={styles.actionButton}
              cancelLabel="CANCEL"
              submitLabel="SAVE"
              onCancel={navigation.goBack}
              onSubmit={handleSubmit}
            />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function AddProjectFiles(props) {
  const {navigation, route} = props;
  const {projectId} = route?.params || {};

  const {getProjectDetails, addProjectFile, getProjectMasterList} =
    useProjectStructureActions();

  const {selectedProject} = useSelector(s => s.project);
  const {masterList} = useSelector(s => s.projectStructure);

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

  const onSubmit = async values => {
    const formData = new FormData();
    values?.attachments.map(item => {
      formData.append('myfile[]', item);
      return item;
    });

    formData.append('project_id', selectedProject.id);
    formData.append('file_name', [values.name]);
    formData.append('id', projectId);
    formData.append('file_category', [values.file_category]);

    await addProjectFile(formData);
    navigation.goBack();
    getData();
  };

  return (
    <Formik
      enableReinitialize
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{}}
      onSubmit={onSubmit}>
      {formikProps => (
        <AddAttachments
          {...props}
          formikProps={formikProps}
          navigation={navigation}
          fileCategoryOptions={fileCategoryOptions}
        />
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#080707',
    paddingHorizontal: 10,
    fontSize: 14,
    alignItems: 'center',
  },

  sectionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 15,
  },

  uploadFileContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    padding: 10,
    marginTop: 20,
    flexGrow: 1,
  },

  inputStyles: {
    marginVertical: 8,
  },
  formContainer: {
    flexGrow: 1,
  },

  cardContainer: {
    padding: 10,
    backgroundColor: '#F2F4F5',
    borderRadius: 5,
    marginVertical: 7,
  },
  fileIconContainer: {
    width: 32,
    height: 38,
    paddingLeft: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  closeButton: {
    marginTop: 20,
    borderRadius: 50,
    alignSelf: 'flex-end',
    position: 'absolute',
  },
  attachmentFileHeader: {
    color: '#000',
    fontSize: 15,
  },

  renderFileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verticalFlex: {
    flexDirection: 'column',
  },
  textContainer: {
    flexGrow: 1,
    flex: 1,
    marginRight: 30,
  },
});

export default AddProjectFiles;

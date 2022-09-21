import * as React from 'react';
import {Formik} from 'formik';
import {Subheading, withTheme} from 'react-native-paper';
import {StyleSheet, View, Text, Image} from 'react-native';
import * as Yup from 'yup';
import RenderInput, {RenderError} from 'components/Atoms/RenderInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ActionButtons from 'components/Atoms/ActionButtons';
import {theme} from 'styles/theme';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import {useEffect, useMemo} from 'react';
import dayjs from 'dayjs';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {useImagePicker} from 'hooks';
import FileIcon from 'assets/images/file_icon.png';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from 'react-native-loading-spinner-overlay';

const schema = Yup.object().shape({
  title: Yup.string('Required').required('Required'),
  description: Yup.string('Required').required('Required'),
  approval: Yup.string('Required').required('Required'),
  date: Yup.string('Required').required('Required'),
  attachments: Yup.mixed().required('File is required'),
});

const RenderAttachments = props => {
  const {attachments, handleDelete} = props;

  return (
    <View>
      <View style={styles.cardContainer}>
        <View style={styles.renderFileContainer}>
          <Text style={styles.attachmentFileHeader}>Attachments</Text>
        </View>
        {attachments?.map((attachment, index) => {
          return (
            <View key={attachment.name}>
              <View style={styles.sectionContainer}>
                <Image source={FileIcon} style={styles.fileIcon} />
                <View>
                  <Text
                    style={(styles.verticalFlex, styles.text)}
                    numberOfLines={1}>
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

function ApprovalRequestForm(props) {
  const {formikProps, navigation, ApprovalOptions} = props;
  const {
    values,
    errors,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formikProps;

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

  const handleDelete = i => {
    values.attachments.splice(i, 1);
    setFieldValue('attachments', values.attachments);
  };

  return (
    <>
      <View style={styles.formContainer}>
        <Subheading style={styles.subheading}>
          Create Approval Request
        </Subheading>
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.dialogContent}>
          <View>
            <RenderInput
              name="title"
              label="Title"
              numberOfLines={3}
              containerStyles={styles.input}
              value={values.title}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              error={errors.title}
            />

            <RenderTextBox
              name="description"
              numberOfLines={5}
              minHeight={120}
              label="Description"
              containerStyles={styles.input}
              value={values.description}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              onSubmitEditing={handleSubmit}
              returnKeyType="done"
              error={errors.description}
            />

            <RenderDatePicker
              name="date"
              label="Due Date"
              //   ref={dateRef}
              containerStyles={styles.input}
              value={values.date}
              onChange={v => setFieldValue('date', v)}
              error={errors.date}
            />

            <RenderSelect
              name="approval"
              label="Approval"
              options={ApprovalOptions}
              containerStyles={styles.input}
              value={values.approval}
              error={errors.approval}
              onSelect={value => {
                setFieldValue('approval', value);
              }}
            />

            <View style={{marginTop: 10}}>
              <Text style={{color: theme.colors.primary}}>Attachment</Text>
              <OpacityButton
                onPress={handleUpload}
                opacity={0.1}
                style={styles.uploadButton}
                color="#fff">
                <Text style={{color: theme.colors.primary}}>Upload Image</Text>
              </OpacityButton>
              <RenderError error={errors.attachments} />
            </View>
            {values.attachments?.length ? (
              <RenderAttachments
                attachments={values.attachments}
                handleDelete={i => handleDelete(i)}
              />
            ) : null}
          </View>
        </View>
        <ActionButtons
          onSubmit={handleSubmit}
          submitLabel="Save"
          onCancel={() => navigation.goBack()}
        />
      </KeyboardAwareScrollView>
    </>
  );
}

const CreateApproval = props => {
  const {navigation} = props;
  const {createApproval, getApprovers, getApprovals} = useSalesActions();

  const {selectedProject} = useSelector(s => s.project);

  const {approversList, loading} = useSelector(s => s.sales);
  const projectId = selectedProject.id;

  const filteredOptions = useMemo(() => {
    return approversList?.map(i => ({
      label: `${i.first_name} ${i.last_name}`,
      value: i.id,
    }));
  }, [approversList]);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const loadData = () => {
    return getApprovers({project_id: projectId});
  };

  const handleSubmit = async values => {
    const formData = new FormData();
    const date = dayjs(values.date).format('DD-MM-YYYY');

    values.attachments.map(item => {
      formData.append('myfile[]', item);
      return item;
    });

    formData.append('project_id', projectId);
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('due_date', date);
    formData.append('approver_id', values.approval);

    await createApproval(formData);
    getApprovals({project_id: projectId});
    navigation.goBack();
  };

  return (
    <>
      <Spinner visible={loading} textContent="" />

      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{}}
        validationSchema={schema}
        onSubmit={handleSubmit}>
        {formikProps => (
          <ApprovalRequestForm
            {...{formikProps}}
            {...props}
            ApprovalOptions={filteredOptions}
          />
        )}
      </Formik>
    </>
  );
};

const styles = StyleSheet.create({
  dialogContent: {
    paddingHorizontal: 25,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  formContainer: {
    marginTop: 5,
    paddingHorizontal: 10,
  },
  subheading: {
    padding: 10,
    color: theme.colors.primary,
  },
  input: {
    marginVertical: 10,
  },

  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 5,
  },
  uploadButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.primary,
    padding: 10,
    marginVertical: 10,
  },
  cardContainer: {
    padding: 10,
    backgroundColor: '#F2F4F5',
    borderRadius: 5,
    marginVertical: 7,
  },
  fileIcon: {
    width: 32,
    height: 38,
    paddingLeft: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  closeButton: {
    borderRadius: 50,
    alignSelf: 'flex-end',
    position: 'absolute',
  },
  attachmentFileHeader: {
    color: '#000',
    fontSize: 15,
  },

  sectionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    display: 'flex',
    borderRadius: 5,
    marginVertical: 7,
    marginHorizontal: 7,
    flexGrow: 1,
    position: 'relative',
  },

  renderFileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verticalFlex: {
    flexDirection: 'column',
  },
  text: {
    color: '#080707',
    paddingHorizontal: 10,
    fontSize: 14,
    alignItems: 'center',
    maxWidth: 170,
    flex: 1,
  },
});

export default withTheme(CreateApproval);

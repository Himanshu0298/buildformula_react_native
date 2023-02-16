import {StyleSheet, View, Image, ScrollView} from 'react-native';
import {theme} from 'styles/theme';
import * as Yup from 'yup';

import React from 'react';
import FileIcon from 'assets/images/file_icon.png';

import {IconButton, Subheading, Text} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import RenderTextBox from 'components/Atoms/RenderTextbox';
import {Formik} from 'formik';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import ActionButtons from 'components/Atoms/ActionButtons';
import RenderInput, {RenderError} from 'components/Atoms/RenderInput';
import {useImagePicker} from 'hooks';
import {useSelector} from 'react-redux';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import moment from 'moment/moment';

const schema = Yup.object().shape({
  verification_code: Yup.string()
    .label('Verification Code')
    .required('Verification Code is Required'),
  storekeeper_remark: Yup.string()
    .label('Remark')
    .required('Remark is Required'),
});

const RenderAttachments = props => {
  const {attachments, handleDelete} = props;

  return (
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
              <MaterialIcon name="close" color={theme.colors.error} size={17} />
            </OpacityButton>
          </View>
        );
      })}
    </View>
  );
};

function AttachmentsForm(props) {
  const {formikProps, date} = props;
  const {
    values,
    setFieldValue,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
  } = formikProps;

  const {openImagePicker} = useImagePicker();

  const handleUpload = () => {
    openImagePicker({
      type: 'file',
      onChoose: file => {
        const attachments = values.attachments || [];
        attachments.push(file);
        setFieldValue('attachments', attachments);
      },
    });
  };

  const handleDelete = i => {
    values.attachments.splice(i, 1);
    setFieldValue('attachments', values.attachments);
  };

  const {navigation} = props;
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{flexGrow: 1}}>
        <View style={styles.subContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.dataRow}>
              <IconButton
                icon="keyboard-backspace"
                size={22}
                color={theme.colors.primary}
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              />
              <Subheading style={styles.headerText}>
                Issue Order Conformation
              </Subheading>
            </View>
          </View>
          <View style={styles.issueTime}>
            <Text>Issue Time: </Text>
            <Text> {date}</Text>
          </View>
          <RenderTextBox
            name="storekeeper_remark"
            blurOnSubmit={false}
            numberOfLines={7}
            label="Remark"
            containerStyles={styles.inputStyles}
            value={values.storekeeper_remark}
            onChangeText={handleChange('storekeeper_remark')}
            onBlur={handleBlur('storekeeper_remark')}
            error={errors.storekeeper_remark}
            onSubmitEditing={handleSubmit}
          />
          <View>
            <View style={styles.imageInput}>
              <Text style={{color: theme.colors.primary}}>
                Upload Material Image
              </Text>
              <OpacityButton
                onPress={handleUpload}
                opacity={0.1}
                style={styles.uploadButton}
                color="#fff">
                <Text style={{color: theme.colors.primary}}>Upload File</Text>
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

          <RenderInput
            name="verification_code"
            label="Enter Verification Code"
            containerStyles={styles.inputStyles}
            value={values.verification_code}
            onChangeText={handleChange('verification_code')}
            onBlur={handleBlur('verification_code')}
            autoCapitalize="none"
            returnKeyType="next"
            error={errors.verification_code}
          />
        </View>
      </ScrollView>

      <ActionButtons
        onSubmit={handleSubmit}
        submitLabel="Save"
        onCancel={() => navigation.goBack()}
      />
    </View>
  );
}

const IssueIndent = props => {
  const {navigation, route} = props;

  const {ID} = route.params;

  const {CreateStoreKeeperOrder, getStoreKeeperList} =
    useMaterialManagementActions();

  const {selectedProject} = useSelector(s => s.project);

  const date = moment().utcOffset('+05:30').format(' hh:mm a , YYYY-MM-DD ');

  React.useEffect(() => {
    getStoreKeeperList({project_id: selectedProject.id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleIssueOrder = async values => {
    const formData = new FormData();

    formData.append('project_id', selectedProject.id);
    formData.append('material_indent_id', ID);
    formData.append('verification_code', Number(values.verification_code));
    formData.append('storekeeper_remark', values.storekeeper_remark);
    formData.append('date', values.date);
    formData.append('attachmentFile', values.file);

    await CreateStoreKeeperOrder(formData);
    navToPreview();
  };

  const navToPreview = () => navigation.navigate('StoreKeeperList');

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{attachments: []}}
      validationSchema={schema}
      onSubmit={handleIssueOrder}>
      {formikProps => (
        <AttachmentsForm {...{formikProps}} {...props} date={date} />
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
  },
  headerText: {
    fontSize: 18,
  },

  container: {
    flexGrow: 1,
    margin: 20,
  },
  subContainer: {
    flexGrow: 1,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,
  },

  issueTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    flexGrow: 1,
  },

  uploadButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.primary,
    padding: 20,
    marginVertical: 20,
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
    marginTop: 20,
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

  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageInput: {
    marginTop: 20,
    flexGrow: 1,
  },
});

export default IssueIndent;

import * as React from 'react';
import {Formik} from 'formik';
import {Divider, withTheme} from 'react-native-paper';
import {Image, StyleSheet, Text, View} from 'react-native';
import * as Yup from 'yup';
import RenderInput from 'components/Atoms/RenderInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomDialog from 'components/Atoms/CustomDialog';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {theme} from 'styles/theme';
import FileIcon from 'assets/images/file_icon.png';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useImagePicker} from 'hooks';

const schema = Yup.object().shape({
  percentage: Yup.number('Required').required('Required'),
  quantity: Yup.number('Required').required('Required'),
});

const RenderAttachments = props => {
  const {attachments, handleDelete} = props;

  console.log('-------->attachment', attachments);

  return (
    <View>
      <View style={styles.cardContainer}>
        <View style={styles.renderFileContainer}>
          <Text style={styles.attachmentFileHeader}>Attachments</Text>
          <OpacityButton
            opacity={0.1}
            color={theme.colors.error}
            style={styles.closeButton}
            onPress={handleDelete}>
            <MaterialIcon name="close" color={theme.colors.error} size={17} />
          </OpacityButton>
        </View>
        {attachments.map(attachment => {
          return (
            <View style={styles.sectionContainer}>
              <Image source={FileIcon} style={styles.fileIcon} />
              <View>
                <Text
                  style={(styles.verticalFlex, styles.text)}
                  numberOfLines={2}>
                  {attachment.name}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

function ModalContent(props) {
  const {formikProps} = props;
  const {values, errors, handleChange, handleBlur, setFieldValue} = formikProps;

  const {openFilePicker} = useImagePicker();

  const handleUpload = () => {
    openFilePicker({
      type: 'file',
      onChoose: file => {
        const {attachments = []} = values;
        attachments.push(file);

        setFieldValue('attachments', attachments);
      },
    });
  };

  const handleDelete = () => {
    console.log('-------->inside delete');
    setFieldValue('attachments', []);
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>WBS Execution</Text>
        <View style={styles.navigationTextContainer}>
          <Text style={styles.headerNavigationText}>w-1.1</Text>
          <Text style={styles.subHeadingText}>PCC-1</Text>
        </View>
        <Divider />
      </View>
      <KeyboardAwareScrollView>
        <View style={styles.dialogContent}>
          <RenderInput
            name="percentage"
            label="Percentage Completed"
            numberOfLines={3}
            containerStyles={styles.input}
            value={values.percentage}
            onChangeText={handleChange('percentage')}
            onBlur={handleBlur('percentage')}
            error={errors.percentage}
          />
          <RenderInput
            name="quantity"
            label="Quantity Completed"
            numberOfLines={3}
            containerStyles={styles.input}
            value={values.quantity}
            onChangeText={handleChange('quantity')}
            onBlur={handleBlur('quantity')}
            error={errors.quantity}
          />
          <RenderTextBox
            name="remark"
            label="Remark"
            containerStyles={styles.input}
            value={values.remark}
            onChangeText={handleChange('remark')}
            numberOfLines={4}
            onBlur={handleBlur('remark')}
            error={errors.remark}
          />
          {!values.attachments?.length ? (
            <View>
              <Text style={{color: theme.colors.primary}}>Attachment</Text>
              <OpacityButton
                onPress={handleUpload}
                opacity={0.1}
                style={styles.uploadButton}
                color="#fff">
                <Text style={{color: theme.colors.primary}}>Upload File</Text>
              </OpacityButton>
            </View>
          ) : null}

          {values.attachments?.length ? (
            <RenderAttachments
              attachments={values.attachments}
              handleDelete={i => handleDelete(i)}
            />
          ) : null}
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}

const AddProgressModal = props => {
  const {handleSubmit} = props;

  const onSubmit = values => handleSubmit(values);

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{}}
      validationSchema={schema}
      onSubmit={onSubmit}>
      {formikProps => (
        <CustomDialog {...props} submitForm={handleSubmit}>
          <ModalContent {...{formikProps}} />
        </CustomDialog>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  dialogContent: {
    paddingHorizontal: 15,
  },
  input: {
    marginVertical: 10,
  },
  headerContainer: {
    paddingVertical: 10,
  },
  headerText: {
    margin: 10,
    fontSize: 18,
    color: '#000',
  },
  navigationTextContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    margin: 10,
  },
  headerNavigationText: {
    marginRight: 10,
    fontSize: 13,
    marginBottom: 5,
    backgroundColor: '#rgba(72, 114, 244, 0.1);',
    borderRadius: 5,
    paddingHorizontal: 5,
    width: 45,
    color: '#000',
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
  },
  subHeadingText: {
    color: '#000',
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

export default withTheme(AddProgressModal);

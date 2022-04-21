import * as React from 'react';
import {Formik} from 'formik';
import {withTheme} from 'react-native-paper';
import {Image, StyleSheet, Text, View} from 'react-native';
import * as Yup from 'yup';
import RenderInput from 'components/Atoms/RenderInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {theme} from 'styles/theme';
import FileIcon from 'assets/images/file_icon.png';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useImagePicker} from 'hooks';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import Header from '../../CommonComponents/Header';
import ActionButtons from '../AddChallan/Components/ActionButtons';
import Pagination from '../../CommonComponents/Pagination';

const schema = Yup.object().shape({
  driverName: Yup.number('Required').required('Required'),
  vehicleNo: Yup.number('Required').required('Required'),
});

const RenderAttachments = props => {
  const {attachments, handleDelete} = props;

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
        {attachments?.map(attachment => {
          return (
            <View style={styles.sectionContainer}>
              <Image source={FileIcon} style={styles.fileIcon} />
              <View>
                <Text
                  style={(styles.verticalFlex, styles.text)}
                  numberOfLines={2}>
                  image.jpeg
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

function ChallanForm(props) {
  const {formikProps, navigation} = props;
  const {values, errors, handleChange, handleBlur, setFieldValue} = formikProps;

  const {openFilePicker} = useImagePicker();

  const handleUpload = () => {
    openFilePicker({
      type: 'file',
      onChoose: file => {
        setFieldValue('attachments', file);
      },
    });
  };

  const handleDelete = () => {
    console.log('-------->inside delete');
    setFieldValue('attachments', []);
  };

  const navToSubmit = () => {
    navigation.navigate('');
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Header title="Vehicle Info" {...props} />
        <Pagination />
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.dialogContent}>
          <RenderInput
            name="driverName"
            label="Driver Name"
            numberOfLines={3}
            containerStyles={styles.input}
            value={values.driverName}
            onChangeText={handleChange('driverName')}
            onBlur={handleBlur('driverName')}
            error={errors.driverName}
          />
          <RenderInput
            name="vehicleNo"
            label="Vehicle No"
            numberOfLines={3}
            containerStyles={styles.input}
            value={values.vehicleNo}
            onChangeText={handleChange('vehicleNo')}
            onBlur={handleBlur('vehicleNo')}
            error={errors.vehicleNo}
          />
          <RenderTextBox
            name="remark"
            label="Challan Remark"
            containerStyles={styles.input}
            value={values.remark}
            onChangeText={handleChange('remark')}
            numberOfLines={4}
            onBlur={handleBlur('remark')}
            error={errors.remark}
          />

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

          <RenderAttachments
            attachments={[values.attachments]}
            handleDelete={i => handleDelete(i)}
          />
          <ActionButtons onPress={navToSubmit} submitLabel="Save" />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}

const AddVehicleInfo = props => {
  const {handleSubmit} = props;

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{}}
      validationSchema={schema}
      onSubmit={handleSubmit}>
      {formikProps => <ChallanForm {...{formikProps}} {...props} />}
    </Formik>
  );
};

const styles = StyleSheet.create({
  dialogContent: {
    paddingHorizontal: 15,
    flexGrow: 1,
  },
  input: {
    marginVertical: 10,
  },
  headerContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  contentContainerStyle: {
    flexGrow: 1,
  },
});

export default withTheme(AddVehicleInfo);

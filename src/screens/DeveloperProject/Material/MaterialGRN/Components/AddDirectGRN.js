import * as React from 'react';
import {Formik} from 'formik';
import {withTheme} from 'react-native-paper';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import * as Yup from 'yup';
import RenderInput, {RenderError} from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {theme} from 'styles/theme';
import FileIcon from 'assets/images/file_icon.png';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useImagePicker} from 'hooks';
import ActionButtons from 'components/Atoms/ActionButtons';
import {useAlert} from 'components/Atoms/Alert';
import Header from '../../CommonComponents/Header';
import Pagination from '../../CommonComponents/Pagination';

const schema = Yup.object().shape({
  challan: Yup.string('Required').required('Required'),
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

function ChallanForm(props) {
  const alert = useAlert();
  const options = ['Add Company', 'One', 'Two', 'Three'];
  const [company, setCompany] = React.useState('');

  const addCompany = () => {
    alert.show({
      title: 'Alert',
      message: 'Add Company',
      dismissable: false,
    });
  };

  if (company === 'Add Company') {
    addCompany();
  }

  const suppName = {
    One: {name: 'Himanshu'},
    Two: {name: 'James'},
    Three: {name: 'Parker'},
  };

  const {formikProps, navigation} = props;
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
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

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Header title="Challan Info" {...props} />
        <Pagination title="Page 1 of 3" />
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.dialogContent}>
          <View>
            <RenderSelect
              name="company"
              options={options}
              containerStyles={styles.input}
              value={company}
              placeholder="Select Company"
              error={errors.company}
              onSelect={value => {
                setCompany(value);
              }}
            />
            <RenderInput
              name="supplier"
              label="Supplier Name"
              containerStyles={styles.input}
              value={suppName[company]?.name}
              onChangeText={handleChange('challan')}
              onBlur={handleBlur('challan')}
              error={errors.supplier}
              editable={false}
            />
            <RenderInput
              name="challan"
              label="Challan No"
              numberOfLines={3}
              containerStyles={styles.input}
              value={values.challan}
              onChangeText={handleChange('challan')}
              onBlur={handleBlur('challan')}
              error={errors.challan}
            />

            <RenderDatePicker
              name="delivery_date"
              label="Delivery Date"
              containerStyles={styles.input}
              onChange={() => console.log('Dated')}
              error={errors.delivery_date}
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
      </KeyboardAwareScrollView>
      <ActionButtons
        onSubmit={handleSubmit}
        submitLabel="Next"
        cancelLabel="Previous"
        onCancel={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
}

const AddDirectGRN = props => {
  const {route, navigation} = props;

  const navToStepTwo = values => {
    navigation.navigate('GRNMaterial', {...values, ...route.params});
  };

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{attachments: []}}
      validationSchema={schema}
      onSubmit={navToStepTwo}>
      {formikProps => <ChallanForm {...{formikProps}} {...props} />}
    </Formik>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  dialogContent: {
    paddingHorizontal: 15,
    flexGrow: 1,
    justifyContent: 'space-between',
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
  contentContainerStyle: {
    flexGrow: 1,
  },
});

export default withTheme(AddDirectGRN);

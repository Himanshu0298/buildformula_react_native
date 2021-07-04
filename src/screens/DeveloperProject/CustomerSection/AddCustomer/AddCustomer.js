import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {
  Subheading,
  withTheme,
  Caption,
  Button,
  TextInput,
} from 'react-native-paper';
import {theme} from 'styles/theme';
import backArrow from 'assets/images/back_arrow.png';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RenderInput from 'components/Atoms/RenderInput';
import FileInput from 'components/Atoms/FileInput';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import useCustomerActions from 'redux/actions/customerActions';
import useImagePicker from 'utils/useImagePicker';
import CustomCheckbox from 'components/Atoms/CustomCheckbox';
import Spinner from 'react-native-loading-spinner-overlay';

//TODO: Add schema for customer
const schema = Yup.object().shape({});

function ProfileUpload({profilePic, onSelect}) {
  const {t} = useTranslation();

  const {openImagePicker} = useImagePicker();

  return (
    <View style={styles.profilePicContainer}>
      <TouchableOpacity
        style={styles.profilePicButton}
        onPress={() => openImagePicker({type: 'image', onChoose: onSelect})}>
        {profilePic ? (
          <Image style={styles.profilePic} source={{uri: profilePic.uri}} />
        ) : (
          <>
            <MaterialCommunityIcons
              name="camera"
              color={theme.colors.primary}
              size={25}
            />
            <Caption style={{color: theme.colors.primary}}>
              {t('text_upload_photo')}
            </Caption>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

function RenderForm({formikProps, navigation, ...restProps}) {
  const {
    handleChange,
    handleSubmit,
    values,
    handleBlur,
    errors,
    setFieldValue,
  } = formikProps;

  const {t} = useTranslation();

  const nameRef = React.useRef();
  const phoneRef = React.useRef();
  const emailRef = React.useRef();
  const addressRef = React.useRef();
  const alternatePhoneRef = React.useRef();
  const ageRef = React.useRef();
  const occupationRef = React.useRef();
  const panRef = React.useRef();
  const aadharRef = React.useRef();

  return (
    <>
      <View style={styles.inputsContainer}>
        <ProfileUpload
          profilePic={values.profile_pic}
          onSelect={v => setFieldValue('profile_pic', v)}
        />
        <RenderInput
          name="customer_full_name"
          label={t('label_full_name')}
          ref={nameRef}
          containerStyles={styles.input}
          value={values.customer_full_name}
          onChangeText={handleChange('customer_full_name')}
          onBlur={handleBlur('customer_full_name')}
          onSubmitEditing={() => phoneRef?.current?.focus()}
          error={errors.customer_full_name}
        />
        <RenderInput
          name="customer_phone"
          label={t('label_phone')}
          ref={phoneRef}
          keyboardType="number-pad"
          maxLength={10}
          containerStyles={styles.input}
          value={values.customer_phone}
          onChangeText={handleChange('customer_phone')}
          onSubmitEditing={() => emailRef?.current?.focus()}
          onBlur={handleBlur('customer_phone')}
          error={errors.customer_phone}
          left={<TextInput.Affix text="+91" />}
        />
        <RenderInput
          name="customer_email"
          label={t('label_email')}
          ref={emailRef}
          containerStyles={styles.input}
          value={values.customer_email}
          onChangeText={handleChange('customer_email')}
          onBlur={handleBlur('customer_email')}
          onSubmitEditing={() => addressRef?.current?.focus()}
          error={errors.customer_email}
        />
        <RenderInput
          name="customer_address"
          label={t('label_address')}
          ref={addressRef}
          containerStyles={styles.input}
          value={values.customer_address}
          onChangeText={handleChange('customer_address')}
          onBlur={handleBlur('customer_address')}
          onSubmitEditing={() => alternatePhoneRef?.current?.focus()}
          error={errors.customer_address}
        />
        <RenderInput
          name="customer_alternate_contact"
          label={t('label_alternate_contact')}
          ref={alternatePhoneRef}
          keyboardType="number-pad"
          maxLength={10}
          containerStyles={styles.input}
          value={values.customer_alternate_contact}
          onChangeText={handleChange('customer_alternate_contact')}
          onSubmitEditing={() => ageRef?.current?.focus()}
          onBlur={handleBlur('customer_alternate_contact')}
          error={errors.customer_alternate_contact}
          left={<TextInput.Affix text="+91" />}
        />
        <RenderInput
          name="customer_age"
          label={t('label_age')}
          ref={ageRef}
          keyboardType="number-pad"
          containerStyles={styles.input}
          value={values.customer_age}
          onChangeText={handleChange('customer_age')}
          onBlur={handleBlur('customer_age')}
          onSubmitEditing={() => occupationRef?.current?.focus()}
          error={errors.customer_age}
        />
        <RenderInput
          name="customer_occupation"
          label={t('label_occupation')}
          ref={occupationRef}
          containerStyles={styles.input}
          value={values.customer_occupation}
          onChangeText={handleChange('customer_occupation')}
          onBlur={handleBlur('customer_occupation')}
          onSubmitEditing={() => panRef?.current?.focus()}
          error={errors.customer_occupation}
        />
        <FileInput
          name="customer_pan"
          label={t('label_pan')}
          ref={panRef}
          containerStyles={styles.input}
          value={values.company_pan}
          file={values.pan_image}
          onChangeText={handleChange('customer_pan')}
          onChoose={v => setFieldValue('pan_image', v)}
          onBlur={handleBlur('customer_pan')}
          onSubmitEditing={() => aadharRef?.current?.focus()}
          error={errors.customer_pan || errors.pan_image}
        />
        <FileInput
          name="customer_aadhar"
          label={t('label_aadhaar')}
          ref={panRef}
          containerStyles={styles.input}
          value={values.customer_aadhar}
          file={values.aadhar_image}
          onChangeText={handleChange('customer_aadhar')}
          onBlur={handleBlur('customer_aadhar')}
          onChoose={v => setFieldValue('aadhar_image', v)}
          onSubmitEditing={handleSubmit}
          error={errors.customer_aadhar || errors.aadhar_image}
        />

        <View style={styles.checkboxContainer}>
          <CustomCheckbox
            label="All provided information and uploaded documents are original."
            checked={values.accepted}
            onChange={() => {
              setFieldValue('accepted', !values.accepted);
            }}
          />
        </View>
      </View>
      <View style={styles.actionContainer}>
        <Button
          style={{width: '40%'}}
          contentStyle={{padding: 1}}
          theme={{roundness: 12}}
          onPress={navigation.goBack}>
          Cancel
        </Button>
        <Button
          style={{width: '40%'}}
          mode="contained"
          disabled={!values.accepted}
          contentStyle={{padding: 1}}
          theme={{roundness: 12}}
          onPress={handleSubmit}>
          Save
        </Button>
      </View>
    </>
  );
}

function AddCustomer(props) {
  const {navigation, route} = props;
  const {params} = route;
  const {unit} = params;
  const {t} = useTranslation();
  const {user} = useSelector(state => state.user);
  const {selectedProject} = useSelector(state => state.project);
  const {loading} = useSelector(state => state.customer);

  const {getCustomerDetails, addCustomer} = useCustomerActions();

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent={''} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        stickyHeaderIndices={[0]}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.titleContainer}>
            <Image source={backArrow} style={styles.backArrow} />
            <Subheading>{t('title_customer_details')}</Subheading>
          </TouchableOpacity>
        </View>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{accepted: false}}
          validationSchema={schema}
          onSubmit={async values => {
            const formData = new FormData();
            formData.append('project_id', selectedProject.id);
            formData.append('unit_id', unit.unit_id || unit.unitId);
            formData.append('customer_first_name', values.customer_full_name);
            formData.append('customer_phone', values.customer_phone);
            formData.append('customer_email', values.customer_email);
            formData.append('customer_address', values.customer_address);
            formData.append('customer_age', values.customer_age);
            formData.append('customer_occupation', values.customer_occupation);
            formData.append('customer_pan', values.customer_pan);
            formData.append('customer_aadhar', values.customer_aadhar);
            formData.append('aadhar_image', values.aadhar_image);
            formData.append('pan_image', values.pan_image);
            formData.append('profile_pic', values.profile_pic);

            await addCustomer(formData);
            getCustomerDetails({
              user_id: user.id,
              project_id: selectedProject.id,
              unit_id: unit.unitId,
            });
            navigation.goBack();
          }}>
          {formikProps => <RenderForm formikProps={formikProps} {...props} />}
        </Formik>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  backArrow: {
    height: 23,
    width: 23,
    marginRight: 5,
  },
  profilePicContainer: {
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicButton: {
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: '#E5EAFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  inputsContainer: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  input: {
    paddingVertical: 7,
  },
  checkboxContainer: {},
  actionContainer: {
    marginTop: 25,
    paddingHorizontal: 10,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default withTheme(AddCustomer);

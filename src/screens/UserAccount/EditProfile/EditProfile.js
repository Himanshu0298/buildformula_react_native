import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, TextInput, withTheme} from 'react-native-paper';
import useImagePicker from 'hooks/useImagePicker';
import {Formik} from 'formik';
import RenderInput from 'components/Atoms/RenderInput';
import {useTranslation} from 'react-i18next';
import * as Yup from 'yup';
import {useSelector} from 'react-redux';
import useUserActions from 'redux/actions/userActions';
import {pick} from 'lodash';
import Spinner from 'react-native-loading-spinner-overlay';
import UserAvatar from 'components/Atoms/UserAvatar';
import {PHONE_REGEX} from 'utils/constant';
import ActionButtons from 'components/Atoms/ActionButtons';
import ScreenTitle from 'components/Atoms/ScreenTitle';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const schema = Yup.object().shape({
  first_name: Yup.string('Invalid').required('First name is required'),
  last_name: Yup.string('Invalid').required('Last name is required'),
  email: Yup.string('Invalid').email('Invalid').required('Email is required'),
  phone: Yup.string()
    .label('phone')
    .required('required')
    .matches(PHONE_REGEX, 'Phone number is not valid')
    .min(10, 'too short')
    .max(10, 'too long'),
});

function RenderForm(props) {
  const {formikProps, navigation} = props;
  const {values, errors, handleBlur, handleChange, handleSubmit} = formikProps;

  const {t} = useTranslation();

  const firstNameRef = React.useRef();
  const lastNameRef = React.useRef();
  const emailRef = React.useRef();
  const phoneRef = React.useRef();

  return (
    <View style={styles.formContainer}>
      <RenderInput
        name="first_name"
        label={t('label_first_name')}
        ref={firstNameRef}
        containerStyles={styles.input}
        value={values.first_name}
        onChangeText={handleChange('first_name')}
        onBlur={handleBlur('first_name')}
        onSubmitEditing={() => lastNameRef?.current?.focus()}
        error={errors.first_name}
      />
      <RenderInput
        name="last_name"
        label={t('label_last_name')}
        ref={lastNameRef}
        containerStyles={styles.input}
        value={values.last_name}
        onChangeText={handleChange('last_name')}
        onBlur={handleBlur('last_name')}
        onSubmitEditing={() => emailRef?.current?.focus()}
        error={errors.last_name}
      />
      <RenderInput
        name="email"
        label={t('label_email')}
        ref={emailRef}
        containerStyles={styles.input}
        value={values.email}
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        onSubmitEditing={() => phoneRef?.current?.focus()}
        error={errors.email}
      />
      <RenderInput
        name="phone"
        label={t('label_phone')}
        ref={phoneRef}
        containerStyles={styles.input}
        value={values.phone}
        onChangeText={handleChange('phone')}
        onBlur={handleBlur('phone')}
        onSubmitEditing={handleSubmit}
        error={errors.phone}
        keyboardType="number-pad"
        returnKeyType="done"
        maxLength={10}
        left={<TextInput.Affix text="+91" />}
      />
      <ActionButtons onCancel={navigation.goBack} onSubmit={handleSubmit} />
    </View>
  );
}

function EditProfile(props) {
  const {theme, navigation} = props;

  const {openImagePicker} = useImagePicker();
  const {updateUser} = useUserActions();

  const {user, loading} = useSelector(s => s.user);

  const initialValues = pick(user, [
    'first_name',
    'last_name',
    'email',
    'phone',
    'profile_url',
  ]);

  const onSubmit = async values => {
    const {first_name, last_name, email, phone, profile_url} = values;

    const formData = new FormData();
    formData.append('user_id', user.id);
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('email', email);
    formData.append('phone', phone);
    if (profile_url?.uri) {
      formData.append('fileupload', profile_url);
    }

    await updateUser(formData);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}>
        {formikProps => {
          const {profile_url} = formikProps.values;

          return (
            <KeyboardAwareScrollView style={styles.contentContainer}>
              <ScreenTitle title="Edit Profile Details" backIcon />
              <View style={styles.headerContainer}>
                <View>
                  <UserAvatar
                    size={150}
                    uri={profile_url?.uri || profile_url}
                  />

                  <IconButton
                    style={[
                      styles.cameraIcon,
                      {backgroundColor: theme.colors.primary},
                    ]}
                    color="#fff"
                    icon="camera"
                    onPress={() =>
                      openImagePicker({
                        type: 'image',
                        onChoose: v => {
                          formikProps.setFieldValue('profile_url', v);
                        },
                      })
                    }
                  />
                </View>
              </View>

              <RenderForm {...props} {...{formikProps}} />
            </KeyboardAwareScrollView>
          );
        }}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 10,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    position: 'relative',
  },
  cameraIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  formContainer: {
    padding: 10,
    marginTop: 20,
  },
  input: {
    marginVertical: 5,
  },
});

export default withTheme(EditProfile);

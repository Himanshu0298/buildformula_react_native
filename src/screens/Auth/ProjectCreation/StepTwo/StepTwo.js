import React from 'react';
import {View, StatusBar, StyleSheet, Keyboard} from 'react-native';
import {withTheme, Button, TextInput} from 'react-native-paper';
import FormTitle from '../../../../components/FormTitle';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import {theme} from '../../../../styles/theme';
import RenderInput from '../../../../components/RenderInput';
import FileInput from '../../../../components/FileInput';
import BaseText from '../../../../components/BaseText';
import useProjectActions from '../../../../redux/actions/projectActions';
import * as Yup from 'yup';
import {PHONE_REGEX} from '../../../../utils/constant';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

const schema = Yup.object().shape({
  project_name: Yup.string().required('name is required'),
  project_address: Yup.string()
    // .matches(PAN_REGEX, 'PAN number is invalid')
    .required('address is required'),
  project_rera: Yup.string().required('RERANo. is required'),
  project_email: Yup.string()
    .email('email is invalid')
    .label('email')
    .required('email is required'),
  project_phone: Yup.string()
    .required('phone is required')
    .matches(PHONE_REGEX, 'phone is not valid')
    .min(10, 'to short')
    .max(10, 'to long'),
});

function StepTwo(props) {
  const {navigation, route} = props;

  const {stepOneData} = route.params;

  const {t} = useTranslation();

  const {createProject} = useProjectActions();

  const {user} = useSelector((state) => state.user);

  const nameRef = React.useRef();
  const addressRef = React.useRef();
  const reraRef = React.useRef();
  const websiteRef = React.useRef();
  const emailRef = React.useRef();
  const phoneRef = React.useRef();

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      <FormTitle title={t('StepOneTitle')} subTitle={t('StepOneSubTitle')} />
      <ScrollView>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={
            {
              // project_rera: '12345674567',
              // project_website: 'www.hello1.com',
              // project_name: 'test1',
              // project_email: 'abcdefghi@gmail.com',
              // project_phone: '1234567890',
              // project_address: 'test,testing,testVilla 202020',
              // rera_image: {
              //   name: 'image-79dd4bc1-4f8f-43e1-a906-544570d12a27.jpg',
              //   type: 'image/jpeg',
              //   uri: 'content://media/external/images/media/694909',
              // },
            }
          }
          validationSchema={schema}
          onSubmit={async (values) => {
            Keyboard.dismiss();

            let formData = new FormData();
            formData.append('project_rera', values.project_rera);
            formData.append('project_website', values.project_website);
            formData.append('project_name', values.project_name);
            formData.append('project_email', values.project_email);
            formData.append('project_phone', values.project_phone);
            formData.append('project_address', values.project_address);
            formData.append('rera_image', values.rera_image);
            formData.append('company_gst', stepOneData.company_gst);
            formData.append('company_name', stepOneData.company_name);
            formData.append('company_pan', stepOneData.company_pan);
            formData.append('company_tan', stepOneData.company_tan);
            formData.append('pan_image', stepOneData.pan_image);
            formData.append('tan_image', stepOneData.tan_image);
            formData.append('gst_image', stepOneData.gst_image);
            formData.append('user_id', user.id);
            formData.append('terms', 1);

            createProject(formData);
          }}>
          {({
            handleChange,
            setFieldValue,
            values,
            handleSubmit,
            handleBlur,
            isValid,
            errors,
          }) => (
            <View style={styles.container}>
              <View style={styles.inputsContainer}>
                <RenderInput
                  name="project_name"
                  label={t('projectName')}
                  ref={nameRef}
                  containerStyles={styles.input}
                  value={values.project_name}
                  onChangeText={handleChange('project_name')}
                  onBlur={handleBlur('project_name')}
                  placeholder={t('projectName')}
                  onSubmitEditing={() =>
                    addressRef && addressRef.current.focus()
                  }
                  error={errors.project_name}
                />
                <RenderInput
                  name="project_address"
                  label={t('projectAddress')}
                  numberOfLines={4}
                  multiline
                  ref={addressRef}
                  containerStyles={styles.input}
                  value={values.project_address}
                  onChangeText={handleChange('project_address')}
                  onBlur={handleBlur('project_address')}
                  placeholder={t('projectAddress')}
                  returnKeyType="none"
                  error={errors.project_address}
                />
                <FileInput
                  name="project_rera"
                  label={t('projectRera')}
                  ref={reraRef}
                  containerStyles={styles.input}
                  value={values.project_rera}
                  file={values.rera_image}
                  onChangeText={handleChange('project_rera')}
                  onChoose={(v) => setFieldValue('rera_image', v)}
                  onBlur={handleBlur('project_rera')}
                  placeholder={t('projectRera')}
                  onSubmitEditing={() =>
                    websiteRef && websiteRef.current.focus()
                  }
                  error={errors.project_rera || errors.rera_image}
                />
                <RenderInput
                  name="project_website"
                  label={t('projectWebsite')}
                  ref={websiteRef}
                  containerStyles={styles.input}
                  value={values.project_website}
                  onChangeText={handleChange('project_website')}
                  onBlur={handleBlur('project_website')}
                  placeholder={t('projectWebsite')}
                  onSubmitEditing={() => emailRef && emailRef.current.focus()}
                  error={errors.project_website}
                />
                <RenderInput
                  name="project_email"
                  label={t('projectEmail')}
                  ref={emailRef}
                  containerStyles={styles.input}
                  value={values.project_email}
                  onChangeText={handleChange('project_email')}
                  onBlur={handleBlur('project_email')}
                  placeholder={t('projectEmail')}
                  onSubmitEditing={() => phoneRef && phoneRef.current.focus()}
                  error={errors.project_email}
                />
                <RenderInput
                  name="project_phone"
                  label={t('projectPhone')}
                  ref={phoneRef}
                  keyboardType="number-pad"
                  containerStyles={styles.input}
                  value={values.project_phone}
                  onChangeText={handleChange('project_phone')}
                  onBlur={handleBlur('project_phone')}
                  returnKeyType="done"
                  placeholder={t('projectPhone')}
                  left={
                    <TextInput.Affix
                      text="+91"
                      theme={{
                        colors: {
                          text: '#000',
                        },
                      }}
                    />
                  }
                  onSubmitEditing={handleSubmit}
                  error={errors.project_phone}
                />
              </View>
              <View style={styles.button}>
                <Button
                  style={{width: '50%'}}
                  mode="contained"
                  contentStyle={{padding: 8}}
                  theme={{roundness: 15}}
                  onPress={handleSubmit}>
                  <BaseText style={styles.buttonText}>{'Save'}</BaseText>
                </Button>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  inputsContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  input: {
    paddingVertical: 7,
  },
  button: {
    marginTop: 25,
    width: '95%',
    display: 'flex',
    alignItems: 'flex-end',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default withTheme(StepTwo);

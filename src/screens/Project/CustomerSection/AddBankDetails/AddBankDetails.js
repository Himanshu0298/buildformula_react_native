import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {Subheading, withTheme, TextInput, IconButton} from 'react-native-paper';
import {theme} from 'styles/theme';
import backArrow from 'assets/images/back_arrow.png';
import RenderInput from 'components/Atoms/RenderInput';
import BaseText from 'components/Atoms/BaseText';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import useCustomerActions from 'redux/actions/customerActions';
import _ from 'lodash';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import RenderTextBox from 'components/Atoms/RenderTextbox';

const schema = Yup.object().shape({
  bank_person: Yup.string().trim().required('Required'),
  phone: Yup.string().trim().required('Required'),
  email: Yup.string().email('Invalid').trim().required('Required'),
  bank_name: Yup.string().trim().required('Required'),
  bank_branch: Yup.string().trim().required('Required'),
  bank_address: Yup.string().trim().required('Required'),
});

function RenderForm({formikProps}) {
  const {handleChange, handleSubmit, values, handleBlur, errors} = formikProps;

  const {t} = useTranslation();

  const bankPersonRef = React.useRef();
  const phoneRef = React.useRef();
  const emailRef = React.useRef();
  const bankNameRef = React.useRef();
  const bankBranchRef = React.useRef();
  const addressRef = React.useRef();

  return (
    <>
      <View style={styles.inputsContainer}>
        <RenderInput
          name="bank_person"
          label={t('label_bank_person')}
          ref={bankPersonRef}
          containerStyles={styles.input}
          value={values.bank_person}
          onChangeText={handleChange('bank_person')}
          onBlur={handleBlur('bank_person')}
          onSubmitEditing={() => phoneRef?.current?.focus()}
          error={errors.bank_person}
        />
        <RenderInput
          name="phone"
          label={t('label_phone')}
          ref={phoneRef}
          keyboardType="number-pad"
          maxLength={10}
          containerStyles={styles.input}
          value={values.phone}
          onChangeText={handleChange('phone')}
          onSubmitEditing={() => emailRef?.current?.focus()}
          onBlur={handleBlur('phone')}
          error={errors.phone}
          left={<TextInput.Affix text="+91" />}
        />
        <RenderInput
          name="email"
          label={t('label_email')}
          ref={emailRef}
          containerStyles={styles.input}
          value={values.email}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          onSubmitEditing={() => bankNameRef?.current?.focus()}
          error={errors.email}
        />
        <RenderInput
          name="bank_name"
          label={t('label_bank_name')}
          ref={bankNameRef}
          containerStyles={styles.input}
          value={values.bank_name}
          onChangeText={handleChange('bank_name')}
          onBlur={handleBlur('bank_name')}
          onSubmitEditing={() => bankBranchRef?.current?.focus()}
          error={errors.bank_name}
        />
        <RenderInput
          name="bank_branch"
          label={t('label_branch')}
          ref={bankBranchRef}
          containerStyles={styles.input}
          value={values.bank_branch}
          onChangeText={handleChange('bank_branch')}
          onBlur={handleBlur('bank_branch')}
          onSubmitEditing={() => addressRef?.current?.focus()}
          error={errors.bank_branch}
        />
        <RenderTextBox
          name="bank_address"
          label={t('label_address')}
          numberOfLines={5}
          minHeight={120}
          ref={addressRef}
          containerStyles={styles.input}
          value={values.bank_address}
          onChangeText={handleChange('bank_address')}
          onBlur={handleBlur('bank_address')}
          onSubmitEditing={handleSubmit}
          error={errors.bank_address}
        />
      </View>
      <View style={styles.actionContainer}>
        <OpacityButton
          opacity={0.1}
          color={theme.colors.primary}
          style={styles.submitButton}
          onPress={handleSubmit}>
          <IconButton
            icon="share-variant"
            size={20}
            color={theme.colors.primary}
          />
          <BaseText style={styles.buttonText}>
            {'Share with bank person'}
          </BaseText>
        </OpacityButton>
      </View>
    </>
  );
}

function AddBankDetails(props) {
  const {route, navigation} = props;
  const {project_id, unit} = route?.params || {};
  const {t} = useTranslation();

  const {bankDetails} = useSelector(({customer}) => customer);

  const {updateBankDetails} = useCustomerActions();

  const initialValues = React.useMemo(() => {
    if (bankDetails.details) {
      return _.pick(bankDetails.details, [
        'bank_branch',
        'bank_name',
        'email',
        'bank_person',
        'phone',
        'bank_address',
      ]);
    }
    return {};
  }, [bankDetails.details]);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        stickyHeaderIndices={[0]}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.titleContainer}>
            <Image source={backArrow} style={styles.backArrow} />
            <Subheading>{t('title_finalized_bank_details')}</Subheading>
          </TouchableOpacity>
        </View>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={initialValues}
          enableReinitialize
          validationSchema={schema}
          onSubmit={async (values) => {
            const data = {...values};

            data.project_id = project_id;
            data.unit_id = unit.unitId;

            updateBankDetails(data);
          }}>
          {(formikProps) => <RenderForm formikProps={formikProps} {...props} />}
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
    height: 25,
    width: 25,
    marginRight: 5,
  },
  inputsContainer: {
    width: '100%',
    flex: 1,
    paddingTop: 5,
  },
  input: {
    paddingVertical: 7,
  },
  actionContainer: {
    marginTop: 15,
  },
  submitButton: {
    width: '100%',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: theme.colors.primary,
  },
});

export default withTheme(AddBankDetails);

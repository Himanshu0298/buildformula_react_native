import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {
  Subheading,
  withTheme,
  Text,
  Caption,
  Button,
  TextInput,
  Headline,
  Divider,
} from 'react-native-paper';
import {theme} from 'styles/theme';
import backArrow from 'assets/images/back_arrow.png';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RenderInput from 'components/Atoms/RenderInput';
import FileInput from 'components/Atoms/FileInput';
import BaseText from 'components/Atoms/BaseText';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import useCustomerActions from 'redux/actions/customerActions';
import useImagePicker from 'utils/useImagePicker';
import CustomCheckbox from 'components/Atoms/CustomCheckbox';
import dayjs from 'dayjs';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import Radio from 'components/Atoms/Radio';

const schema = Yup.object().shape({});

function renderData(label, value) {
  return (
    <View style={styles.row}>
      <Text>{label}: </Text>
      <Text style={{color: theme.colors.primary}}>{value}</Text>
    </View>
  );
}

function RenderCustomerBox() {
  return (
    <View style={styles.customerContainer}>
      {renderData('Customer name', 'Apartment')}
      <View style={[styles.row, {paddingTop: 10}]}>
        {renderData('Mobile', 876455008)}
        {renderData('Unit', '1204')}
      </View>
      <Divider style={{marginVertical: 10}} />
      <View style={[styles.row, {justifyContent: 'space-between'}]}>
        <Text style={{color: '#5E6D7C'}}>
          Date: {dayjs().format('DD-MM-YYYY')}
        </Text>
        <Text style={{color: '#5E6D7C'}}>
          Time: {dayjs().format('HH:mm A')}
        </Text>
      </View>
    </View>
  );
}

function RenderCustomerForm({params, navigation}) {
  const {t} = useTranslation();

  const {openFilePicker} = useImagePicker();

  const titleRef = React.useRef();
  const descriptionRef = React.useRef();

  return (
    <View style={styles.sectionContainer}>
      <Headline style={styles.headline}>
        Modify Request (customer form)
      </Headline>
      <RenderCustomerBox />
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{}}
        validationSchema={schema}
        onSubmit={async (values) => {}}>
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <View style={styles.formContainer}>
            <RenderInput
              name="title"
              label={t('label_title')}
              ref={titleRef}
              containerStyles={styles.input}
              value={values.title}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              onSubmitEditing={() => descriptionRef?.current?.focus()}
              error={errors.title}
            />
            <RenderTextBox
              name="description"
              label={t('label_modification_description')}
              ref={descriptionRef}
              numberOfLines={5}
              minHeight={120}
              containerStyles={styles.input}
              value={values.description}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              error={errors.description}
            />
            <TouchableOpacity
              style={styles.attachFilesBox}
              onPress={() =>
                openFilePicker({
                  type: 'file',
                  onChoose: (v) => {
                    console.log('-----> v', v);
                  },
                })
              }>
              <Text>Click here to attach files</Text>
            </TouchableOpacity>

            <View style={styles.actionContainer}>
              <Button
                style={{width: '40%'}}
                contentStyle={{padding: 1}}
                theme={{roundness: 15}}
                onPress={navigation.goBack}>
                <BaseText style={styles.cancelText}>{'Cancel'}</BaseText>
              </Button>
              <Button
                style={{width: '40%'}}
                mode="contained"
                contentStyle={{padding: 1}}
                theme={{roundness: 15}}
                onPress={handleSubmit}>
                <BaseText style={styles.buttonText}>{'Save'}</BaseText>
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

function RenderEngineerReviewForm({params, navigation}) {
  const {t} = useTranslation();

  return (
    <View style={styles.sectionContainer}>
      <Headline style={styles.headline}>Review (Civil Engineer Form)</Headline>
      <View style={[styles.row, {justifyContent: 'space-between'}]}>
        <Text style={{color: '#5E6D7C'}}>
          Date: {dayjs().format('DD-MM-YYYY')}
        </Text>
        <Text style={{color: '#5E6D7C'}}>
          Time: {dayjs().format('HH:mm A')}
        </Text>
      </View>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{type: 'free'}}
        validationSchema={schema}
        onSubmit={async (values) => {}}>
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <View style={styles.formContainer}>
            <View style={styles.radioRow}>
              <Text>Modification Type</Text>
              <View style={styles.radioContainer}>
                <Radio
                  label={'Free'}
                  value={'free'}
                  checked={values.type === 'free'}
                  onChange={(value) => setFieldValue('type', value)}
                />
                <Radio
                  label={'Paid'}
                  value={'paid'}
                  checked={values.type === 'paid'}
                  onChange={(value) => setFieldValue('type', value)}
                />
              </View>
            </View>

            <RenderTextBox
              name="description"
              label={t('label_review_description')}
              numberOfLines={5}
              minHeight={120}
              containerStyles={styles.input}
              value={values.review_description}
              onChangeText={handleChange('review_description')}
              onBlur={handleBlur('review_description')}
              error={errors.review_description}
            />
            <RenderTextBox
              name="modification_changes"
              label={t('label_modification_changes')}
              numberOfLines={5}
              minHeight={120}
              containerStyles={styles.input}
              value={values.modification_changes}
              onChangeText={handleChange('modification_changes')}
              onBlur={handleBlur('modification_changes')}
              error={errors.modification_changes}
            />

            <View style={styles.actionContainer}>
              <Button
                style={{width: '40%'}}
                contentStyle={{padding: 1}}
                theme={{roundness: 15}}
                onPress={navigation.goBack}>
                <BaseText style={styles.cancelText}>{'Cancel'}</BaseText>
              </Button>
              <Button
                style={{width: '40%'}}
                mode="contained"
                contentStyle={{padding: 1}}
                theme={{roundness: 15}}
                onPress={handleSubmit}>
                <BaseText style={styles.buttonText}>{'Save'}</BaseText>
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

function RenderApprovalForm({params, navigation}) {
  const {t} = useTranslation();

  return (
    <View style={styles.sectionContainer}>
      <Headline style={styles.headline}>
        Approval (for GM or partner use only)
      </Headline>
      <View style={[styles.row, {justifyContent: 'space-between'}]}>
        <Text style={{color: '#5E6D7C'}}>
          Date: {dayjs().format('DD-MM-YYYY')}
        </Text>
        <Text style={{color: '#5E6D7C'}}>
          Time: {dayjs().format('HH:mm A')}
        </Text>
      </View>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{accepted: false}}
        validationSchema={schema}
        onSubmit={async (values) => {}}>
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <View style={styles.formContainer}>
            <RenderTextBox
              name="comments"
              label={t('label_comments_for_staff')}
              numberOfLines={5}
              minHeight={120}
              containerStyles={styles.input}
              value={values.comments}
              onChangeText={handleChange('comments')}
              onBlur={handleBlur('comments')}
              error={errors.comments}
            />
            <RenderTextBox
              name="signature"
              label={t('label_signature')}
              numberOfLines={2}
              minHeight={40}
              containerStyles={styles.input}
              value={values.signature}
              onChangeText={handleChange('signature')}
              onBlur={handleBlur('signature')}
              error={errors.signature}
            />
            <View style={styles.input}>
              <CustomCheckbox
                label="I confirm this change order by my signature and
              approve to GEH to make  modifications at that
              particular stage"
                checked={values.accepted}
                onChange={() => {
                  setFieldValue('accepted', !values.accepted);
                }}
              />
            </View>

            <View style={styles.actionContainer}>
              <Button
                style={{width: '40%'}}
                contentStyle={{padding: 1}}
                theme={{roundness: 15}}
                onPress={navigation.goBack}>
                <BaseText style={styles.cancelText}>{'Cancel'}</BaseText>
              </Button>
              <Button
                style={{width: '40%'}}
                mode="contained"
                contentStyle={{padding: 1}}
                theme={{roundness: 15}}
                onPress={handleSubmit}>
                <BaseText style={styles.buttonText}>{'Save'}</BaseText>
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

function AddModifyRequest(props) {
  const {navigation, route} = props;
  const {params} = route;
  const {unit, project_id} = params;
  const {t} = useTranslation();

  const {user} = useSelector((state) => state.user);

  const {getCustomerDetails, addCustomer} = useCustomerActions();

  console.log('----->unit.unitId ', unit.unitId);

  const getUpdatedCustomers = (unit_id) => {
    const formData = new FormData();
    formData.append('user_id', user.id);
    formData.append('project_id', project_id);
    formData.append('unit_id', unit.unitId);
    getCustomerDetails(formData);
  };

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
            <Subheading>{t('title_customer_section')}</Subheading>
          </TouchableOpacity>
        </View>
        <RenderCustomerForm {...props} {...{params}} />
        <RenderEngineerReviewForm {...props} {...{params}} />
        <RenderApprovalForm {...props} {...{params}} />
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
  sectionContainer: {},
  headline: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  customerContainer: {
    borderRadius: 15,
    backgroundColor: '#F2F4F5',
    padding: 10,
    marginTop: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  formContainer: {},
  input: {
    paddingVertical: 7,
  },
  attachFilesBox: {
    borderWidth: 2,
    borderColor: 'rgba(4, 29, 54, 0.1)',
    borderStyle: 'dashed',
    marginVertical: 7,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1,
  },
  actionContainer: {
    marginTop: 25,
    paddingHorizontal: 10,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  cancelText: {
    fontSize: 18,
    color: theme.colors.primary,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  radioRow: {
    marginTop: 20,
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    display: 'flex',
  },
});

export default withTheme(AddModifyRequest);

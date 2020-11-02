import React, {useMemo, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  RefreshControl,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  withTheme,
  Caption,
  FAB,
  Title,
  Subheading,
  Divider,
  Portal,
  Button,
  TextInput,
  RadioButton,
} from 'react-native-paper';
import MaterialTabs from 'react-native-material-tabs';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import ProjectHeader from '../../components/Layout/ProjectHeader';
import BaseText from '../../components/BaseText';
import {getShadow} from '../../utils';
import {secondaryTheme, theme} from '../../styles/theme';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RenderInput from '../../components/RenderInput';
import {useTranslation} from 'react-i18next';
import RenderSelect from '../../components/RenderSelect';
import RenderDatePicker from '../../components/RenderDatePicker';
import {PRIORITY_COLORS, TYPE_LABELS} from '../../utils/constant';
import Radio from '../../components/Radio';

const TABS = ['Personal details', 'Inquiry details'];

const OCCUPATION_OPTIONS = ['Cancel', 'Job', 'Business', 'Other'];

const personalSchema = Yup.object().shape({});

function PersonalTab({navigation, setSelectedTab, formikProps, selectedTab}) {
  const {
    handleChange,
    setFieldValue,
    values,
    handleSubmit,
    handleBlur,
    errors,
  } = formikProps;
  const {t} = useTranslation();

  const firstNameRef = React.useRef();
  const lastNameRef = React.useRef();
  const emailRef = React.useRef();
  const phoneRef = React.useRef();

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <RenderInput
          name="first_name"
          label={t('label_first_name')}
          ref={firstNameRef}
          containerStyles={styles.input}
          value={values.first_name}
          onChangeText={handleChange('first_name')}
          onBlur={handleBlur('first_name')}
          placeholder={t('label_first_name')}
          onSubmitEditing={() => lastNameRef && lastNameRef.current.focus()}
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
          placeholder={t('label_last_name')}
          onSubmitEditing={() => emailRef && emailRef.current.focus()}
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
          placeholder={t('label_email')}
          onSubmitEditing={() => phoneRef && phoneRef.current.focus()}
          error={errors.email}
        />
        <RenderInput
          name="phone"
          label={t('label_phone')}
          ref={phoneRef}
          keyboardType="number-pad"
          containerStyles={styles.input}
          value={values.phone}
          onChangeText={handleChange('phone')}
          onBlur={handleBlur('phone')}
          returnKeyType="done"
          placeholder={t('label_phone')}
          onSubmitEditing={handleSubmit}
          error={errors.phone}
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
        />
        <RenderSelect
          name="occupation"
          label={
            values.occupation
              ? t('label_occupation')
              : t('placeholder_occupation')
          }
          options={OCCUPATION_OPTIONS}
          containerStyles={styles.input}
          value={values.occupation}
          placeholder={t('placeholder_occupation')}
          error={errors.occupation}
          onSelect={(value) => {
            setFieldValue('occupation', value);
          }}
        />
        <RenderInput
          returnKeyType="done"
          name="current_locality"
          label={t('label_current_locality')}
          ref={emailRef}
          containerStyles={styles.input}
          value={values.current_locality}
          onChangeText={handleChange('current_locality')}
          onBlur={handleBlur('current_locality')}
          placeholder={t('label_current_locality')}
          onSubmitEditing={handleSubmit}
          error={errors.email}
        />
      </View>
      <View style={styles.actionContainer}>
        <Button
          style={{flex: 1}}
          contentStyle={{padding: 5}}
          theme={{roundness: 15}}
          onPress={navigation.goBack}>
          <BaseText style={styles.cancelText}>{'Cancel'}</BaseText>
        </Button>
        <Button
          style={{flex: 1}}
          mode="contained"
          contentStyle={{padding: 5}}
          theme={{roundness: 15}}
          onPress={handleSubmit}>
          <BaseText style={styles.buttonText}>{'Next'}</BaseText>
        </Button>
      </View>
    </View>
  );
}

function InquiryTab({navigation, formikProps, setSelectedTab}) {
  const {
    handleChange,
    setFieldValue,
    values,
    handleSubmit,
    handleBlur,
    errors,
  } = formikProps;

  const {t} = useTranslation();

  const {
    selectedProject: {projectData},
  } = useSelector((state) => state.project);

  const budgetFromRef = React.useRef();
  const budgetToRef = React.useRef();
  const inquiryForRef = React.useRef();
  const forBhkRef = React.useRef();
  const remarkRef = React.useRef();

  const inquiryOptions = useMemo(() => {
    const options = [{label: 'Cancel', value: 0}];
    const structureTypes = Object.keys(projectData);
    if (structureTypes.length > 0) {
      structureTypes.map((type) => {
        type = Number(type);
        options.push({
          label: TYPE_LABELS[type],
          value: type,
        });
      });
    }
    return options;
  }, [projectData]);

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <RenderInput
          name="budget_from"
          label={t('label_budget_from')}
          ref={budgetFromRef}
          keyboardType="number-pad"
          containerStyles={styles.input}
          value={values.budget_from}
          onChangeText={handleChange('budget_from')}
          onBlur={handleBlur('budget_from')}
          placeholder={t('label_budget_from')}
          onSubmitEditing={() => budgetToRef && budgetToRef.current.focus()}
          error={errors.budget_from}
        />
        <RenderInput
          name="budget_to"
          label={t('label_budget_to')}
          keyboardType="number-pad"
          ref={budgetToRef}
          containerStyles={styles.input}
          value={values.budget_to}
          onChangeText={handleChange('budget_to')}
          onBlur={handleBlur('budget_to')}
          placeholder={t('label_budget_to')}
          error={errors.budget_to}
        />
        <RenderDatePicker
          name="follow_up_date"
          label={t('label_follow_up_date')}
          containerStyles={styles.input}
          value={values.follow_up_date}
          placeholder={t('label_follow_up_date')}
          error={errors.follow_up_date}
          onChange={(date) => {
            setFieldValue('follow_up_date', date);
          }}
        />
        <RenderDatePicker
          mode="time"
          name="follow_up_time"
          label={t('label_follow_up_time')}
          containerStyles={styles.input}
          value={values.follow_up_time}
          placeholder={t('label_follow_up_time')}
          error={errors.follow_up_time}
          onChange={(date) => {
            setFieldValue('follow_up_time', date);
          }}
        />
        <RenderSelect
          name="assign_to"
          label={t('label_assign_to')}
          options={[
            {label: 'Cancel', value: 0},
            {label: 'Test', value: 2},
          ]}
          containerStyles={styles.input}
          value={values.assign_to}
          placeholder={t('label_assign_to')}
          error={errors.assign_to}
          onSelect={(value) => {
            setFieldValue('assign_to', value);
          }}
        />
        <View style={styles.priorityContainer}>
          <Subheading theme={secondaryTheme}>Lead Priority</Subheading>
          <View style={styles.radioContainer}>
            <Radio
              label={'Low'}
              value="low"
              color={PRIORITY_COLORS.low}
              checked={values.priority === 'low'}
              onChange={(value) => setFieldValue('priority', value)}
            />
            <Radio
              label={'Medium'}
              value="medium"
              color={PRIORITY_COLORS.medium}
              checked={values.priority === 'medium'}
              onChange={(value) => setFieldValue('priority', value)}
            />
            <Radio
              label={'High'}
              value="high"
              color={PRIORITY_COLORS.high}
              checked={values.priority === 'high'}
              onChange={(value) => setFieldValue('priority', value)}
            />
          </View>
        </View>
        <RenderSelect
          name="inquiry_for"
          label={t('label_inquiry_for')}
          options={inquiryOptions}
          containerStyles={styles.input}
          value={values.inquiry_for}
          placeholder={t('label_inquiry_for')}
          error={errors.inquiry_for}
          onSelect={(value) => {
            setFieldValue('inquiry_for', value);
          }}
        />
        {values.inquiry_for === 1 || values.inquiry_for === 4 ? (
          <RenderSelect
            name="for_bhk"
            label={t('label_for_bhk')}
            options={[
              {label: 'Cancel', value: 0},
              {label: 'Test', value: 2},
            ]}
            containerStyles={styles.input}
            value={values.for_bhk}
            placeholder={t('label_for_bhk')}
            error={errors.for_bhk}
            onSelect={(value) => {
              setFieldValue('for_bhk', value);
            }}
          />
        ) : null}
        <RenderInput
          name="remark"
          multiline
          numberOfLines={5}
          label={t('label_remark')}
          ref={remarkRef}
          containerStyles={styles.input}
          value={values.remark}
          onChangeText={handleChange('remark')}
          onBlur={handleBlur('remark')}
          placeholder={t('label_remark')}
          error={errors.remark}
        />
      </View>
      <View style={styles.actionContainer}>
        <Button
          style={{flex: 1}}
          contentStyle={{padding: 5}}
          theme={{roundness: 15}}
          onPress={() => setSelectedTab(0)}>
          <BaseText style={styles.cancelText}>{'Back'}</BaseText>
        </Button>
        <Button
          style={{flex: 1}}
          mode="contained"
          contentStyle={{padding: 5}}
          theme={{roundness: 15}}
          onPress={handleSubmit}>
          <BaseText style={styles.buttonText}>{'Save'}</BaseText>
        </Button>
      </View>
    </View>
  );
}

function AddVisitor(props) {
  const {theme, navigation} = props;

  const [selectedTab, setSelectedTab] = useState(1);
  const [selectDialog, setSelectDialog] = useState(false);

  const {selectedProject} = useSelector((state) => state.project);
  const {loading, visitors} = useSelector((state) => state.sales);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Spinner visible={loading} textContent={''} />
        <StatusBar barStyle="light-content" />
        <View style={styles.headerContainer}>
          <ProjectHeader />
          <MaterialTabs
            items={TABS}
            selectedIndex={selectedTab}
            onChange={setSelectedTab}
            barColor="#fff"
            indicatorColor={theme.colors.primary}
            inactiveTextColor={'#919191'}
            activeTextColor={theme.colors.primary}
            uppercase={false}
            textStyle={{
              fontFamily: 'Nunito-Regular',
            }}
          />
        </View>
        <View style={styles.body}>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            keyboardShouldPersistTaps="handled">
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              initialValues={{}}
              validationSchema={personalSchema}
              onSubmit={async (values) => {
                if (selectedTab === 0) {
                  setSelectedTab(1);
                }
              }}>
              {(formikProps) =>
                selectedTab === 0 ? (
                  <PersonalTab
                    {...props}
                    setSelectedTab={setSelectedTab}
                    formikProps={formikProps}
                  />
                ) : (
                  <InquiryTab
                    {...props}
                    setSelectedTab={setSelectedTab}
                    formikProps={formikProps}
                  />
                )
              }
            </Formik>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

export default withTheme(AddVisitor);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    ...getShadow(5),
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
    paddingBottom: 20,
  },
  scrollView: {
    flexGrow: 1,
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
  actionContainer: {
    marginTop: 25,
    paddingHorizontal: 10,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cancelText: {
    fontSize: 18,
    color: theme.colors.primary,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  priorityContainer: {
    marginVertical: 5,
    marginLeft: 5,
  },
  radioContainer: {
    flexDirection: 'row',
    display: 'flex',
  },
});

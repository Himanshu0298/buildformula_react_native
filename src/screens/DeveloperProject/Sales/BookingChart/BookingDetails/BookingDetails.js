import Radio from 'components/Atoms/Radio';
import RenderInput from 'components/Atoms/RenderInput';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import {Formik} from 'formik';
import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Subheading,
  TextInput,
  withTheme,
  Text,
  Button,
  Caption,
  Searchbar,
  Menu,
  Card,
  Divider,
  Title,
  Paragraph,
  IconButton,
  Headline,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {theme} from 'styles/theme';
import {getShadow} from 'utils';
import WithRates from 'assets/images/WithRates.png';
import WithOutRates from 'assets/images/WithoutRates.png';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  customer_first_name: Yup.string('Invalid').when('userType', {
    is: 'new',
    then: Yup.string('Invalid').required('Required'),
  }),
  customer_last_name: Yup.string('Invalid').when('userType', {
    is: 'new',
    then: Yup.string('Invalid').required('Required'),
  }),
  customer_email: Yup.string('Invalid').when('userType', {
    is: 'new',
    then: Yup.string('Invalid').email('Invalid').required('Required'),
  }),
  customer_phone: Yup.number('Invalid').when('userType', {
    is: 'new',
    then: Yup.number('Invalid').required('Required'),
  }),
  broker_first_name: Yup.string('Invalid').when('broker', {
    is: 'yes',
    then: Yup.string('Invalid').required('Required'),
  }),
  broker_last_name: Yup.string('Invalid').when('broker', {
    is: 'yes',
    then: Yup.string('Invalid').required('Required'),
  }),
  broker_email: Yup.string('Invalid').when('broker', {
    is: 'yes',
    then: Yup.string('Invalid').email('Invalid').required('Required'),
  }),
  broker_phone: Yup.number('Invalid').when('broker', {
    is: 'yes',
    then: Yup.number('Invalid').required('Required'),
  }),
});

function VisitorSelector(props) {
  const {
    visitors,
    searchQuery,
    selectedVisitor,
    onSelectVisitor,
    onChangeText,
  } = props;

  const {t} = useTranslation();

  const [isFocused, setFocused] = useState(false);

  return (
    <>
      <Searchbar
        theme={{roundness: 12}}
        placeholder={t('label_search_visitors')}
        onFocus={() => setFocused(true)}
        style={{backgroundColor: 'rgba(4,29,54,0.1)', ...getShadow(0)}}
        value={searchQuery}
        onChangeText={v => {
          onChangeText(v);
          if (!v || (v && selectedVisitor)) {
            onSelectVisitor();
          }
        }}
      />

      {isNaN(selectedVisitor) && isFocused && visitors?.length > 0 ? (
        <View style={styles.listContainer}>
          <ScrollView
            nestedScrollEnabled
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled">
            {visitors.map((visitor, index) => {
              const label = `${visitor.first_name} ${visitor.last_name}`;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    Keyboard.dismiss();
                    onChangeText(label);
                    onSelectVisitor(visitor.id);
                  }}>
                  <Menu.Item icon="account-question-outline" title={label} />
                  <Divider />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      ) : null}
    </>
  );
}

function RenderItem({label, value}) {
  return (
    <View style={styles.itemContainer}>
      <Text>{label}</Text>
      <Caption style={{lineHeight: 14}}>{value || 'NA'}</Caption>
    </View>
  );
}

function FormContent(props) {
  const {formikProps, navigation} = props;
  const {t} = useTranslation();

  const {
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    errors,
    handleSubmit,
  } = formikProps;

  const firstNameRef = React.useRef();
  const lastNameRef = React.useRef();
  const emailRef = React.useRef();
  const phoneRef = React.useRef();
  const brokerFirstNameRef = React.useRef();
  const brokerLastNameRef = React.useRef();
  const brokerEmailRef = React.useRef();
  const brokerPhoneRef = React.useRef();

  const [searchQuery, setSearchQuery] = useState();

  const {visitors} = useSelector(state => state.project);

  const filteredVisitors = useMemo(() => {
    if (searchQuery) {
      return visitors.filter(visitor => {
        const {first_name, last_name, phone, email} = visitor;
        return (
          first_name?.includes(searchQuery) ||
          last_name?.includes(searchQuery) ||
          phone?.includes(searchQuery) ||
          email?.includes(searchQuery)
        );
      });
    }
    return visitors;
  }, [searchQuery, visitors]);

  const visitorDetails = useMemo(() => {
    return visitors.find(visitor => visitor.id === values.selectedVisitor);
  }, [values.selectedVisitor, visitors]);

  const handleCancel = () => navigation.goBack();

  const setSelectedVisitor = v => setFieldValue('selectedVisitor', v);

  return (
    <View>
      {/* <View> */}
      {/* <IconButton icon="camera" onPress={() => console.log('Pressed')} />{' '}
      <Title>Booking form</Title>
      {/* </View> */}
      {/* <Card>
        <Text>hello</Text>
      </Card>{' '} */}
      {/* <TouchableWithoutFeedback
        style={{flexGrow: 1}}
        onPress={() => Keyboard.dismiss()}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
          extraScrollHeight={30}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1, paddingVertical: 10}}>
          <View style={styles.container}>
            <View style={styles.radioRow}>
              <Text>Select user type</Text>
              <View style={styles.radioContainer}>
                <Radio
                  label={'New user'}
                  value="new"
                  checked={values.userType === 'new'}
                  onChange={value => setFieldValue('userType', value)}
                />
                <Radio
                  label={'Existing visitor'}
                  value="visitor"
                  checked={values.userType === 'visitor'}
                  onChange={value => setFieldValue('userType', value)}
                />
              </View>
            </View>
            {values.userType === 'visitor' ? (
              <View style={{marginBottom: 10}}>
                <VisitorSelector
                  visitors={filteredVisitors}
                  searchQuery={searchQuery}
                  selectedVisitor={values.selectedVisitor}
                  onSelectVisitor={setSelectedVisitor}
                  onChangeText={setSearchQuery}
                />
              </View>
            ) : null}
            <Subheading style={{color: theme.colors.primary}}>
              1. {values.userType === 'new' ? 'User' : 'Visitor'} Details
            </Subheading>
            {values.userType === 'new' ? (
              <>
                <RenderInput
                  name="customer_first_name"
                  label={t('label_first_name')}
                  ref={firstNameRef}
                  containerStyles={styles.input}
                  value={values.customer_first_name}
                  onChangeText={handleChange('customer_first_name')}
                  onBlur={handleBlur('customer_first_name')}
                  onSubmitEditing={() => lastNameRef?.current?.focus()}
                  error={errors.customer_first_name}
                />
                <RenderInput
                  name="customer_last_name"
                  label={t('label_last_name')}
                  ref={lastNameRef}
                  containerStyles={styles.input}
                  value={values.customer_last_name}
                  onChangeText={handleChange('customer_last_name')}
                  onBlur={handleBlur('customer_last_name')}
                  onSubmitEditing={() => emailRef?.current?.focus()}
                  error={errors.customer_last_name}
                />
                <RenderInput
                  name="customer_email"
                  label={t('label_email')}
                  ref={emailRef}
                  containerStyles={styles.input}
                  value={values.customer_email}
                  onChangeText={handleChange('customer_email')}
                  onBlur={handleBlur('customer_email')}
                  onSubmitEditing={() => phoneRef?.current?.focus()}
                  error={errors.customer_email}
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
                  onBlur={handleBlur('customer_phone')}
                  error={errors.customer_phone}
                  left={<TextInput.Affix text="+91" />}
                />
              </>
            ) : (
              <View style={styles.visitorContainer}>
                <RenderItem
                  label={'First name'}
                  value={visitorDetails?.first_name}
                />
                <RenderItem
                  label={'Last name'}
                  value={visitorDetails?.last_name}
                />
                <RenderItem label={' Email'} value={visitorDetails?.email} />
                <RenderItem label={'Phone no.'} value={visitorDetails?.phone} />
              </View>
            )}
            <View style={styles.radioRow}>
              <Text>Through broker?</Text>
              <View style={styles.radioContainer}>
                <Radio
                  label={'Yes'}
                  value="yes"
                  checked={values.broker === 'yes'}
                  onChange={value => setFieldValue('broker', value)}
                />
                <Radio
                  label={'No'}
                  value="no"
                  color={theme.colors.error}
                  checked={values.broker === 'no'}
                  onChange={value => setFieldValue('broker', value)}
                />
              </View>
            </View>
            {values.broker === 'yes' ? (
              <>
                <Subheading style={{color: theme.colors.primary}}>
                  Broker Details
                </Subheading>
                <RenderInput
                  name="broker_first_name"
                  label={t('label_first_name')}
                  ref={brokerFirstNameRef}
                  containerStyles={styles.input}
                  value={values.broker_first_name}
                  onChangeText={handleChange('broker_first_name')}
                  onBlur={handleBlur('broker_first_name')}
                  error={errors.broker_first_name}
                  onSubmitEditing={() => brokerLastNameRef?.current?.focus?.()}
                />
                <RenderInput
                  name="broker_last_name"
                  label={t('label_last_name')}
                  ref={brokerLastNameRef}
                  containerStyles={styles.input}
                  value={values.broker_last_name}
                  onChangeText={handleChange('broker_last_name')}
                  onBlur={handleBlur('broker_last_name')}
                  onSubmitEditing={() => brokerEmailRef?.current?.focus?.()}
                  error={errors.broker_last_name}
                />
                <RenderInput
                  name="broker_email"
                  label={t('label_email')}
                  ref={brokerEmailRef}
                  containerStyles={styles.input}
                  value={values.broker_email}
                  onChangeText={handleChange('broker_email')}
                  onBlur={handleBlur('broker_email')}
                  onSubmitEditing={() => brokerPhoneRef?.current?.focus?.()}
                  error={errors.broker_email}
                />
                <RenderInput
                  name="broker_phone"
                  label={t('label_phone')}
                  ref={brokerPhoneRef}
                  keyboardType="number-pad"
                  maxLength={10}
                  containerStyles={styles.input}
                  value={values.broker_phone}
                  onChangeText={handleChange('broker_phone')}
                  onBlur={handleBlur('broker_phone')}
                  error={errors.broker_phone}
                  left={<TextInput.Affix text="+91" />}
                />
                <RenderTextBox
                  name="remark"
                  blurOnSubmit={false}
                  numberOfLines={5}
                  minHeight={120}
                  label={t('label_remark')}
                  containerStyles={styles.input}
                  value={values.remark}
                  onChangeText={handleChange('remark')}
                  onBlur={handleBlur('remark')}
                  onSubmitEditing={handleSubmit}
                  error={errors.remark}
                />
              </>
            ) : null}
          </View>
          <View style={styles.actionContainer}>
            <Button
              style={{flex: 1, marginHorizontal: 5}}
              contentStyle={{padding: 3}}
              theme={{roundness: 15}}
              onPress={handleCancel}>
              {'Back'}
            </Button>
            <Button
              style={{flex: 1, marginHorizontal: 5}}
              mode="contained"
              contentStyle={{padding: 3}}
              theme={{roundness: 15}}
              onPress={handleSubmit}>
              {'Next'}
            </Button>
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback> */}
    </View>
  );
}

const _data = [
  {
    title: 'Form With Rates',
    subTitle:
      'This booking form has the dedicated section where you can enter rates for different areas, along with basic amounts and other charges fees.',
    image: WithRates,
    ButtonText: 'Continue with rates',
    // onPress:{()=>console.log('----->1st button pressed')}
  },
  {
    title: 'Form Without Rates',
    subTitle:
      'This booking form does not have a dedicated section where you can enter your booking rate details.',
    image: WithOutRates,
    ButtonText: 'Continue without rates',
  },
];

function ProjectInfo(props) {
  const {data} = props;

  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      {data.map(({title, value}) => (
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text>{title}: </Text>
          <Text>{value}</Text>
        </View>
      ))}
    </View>
  );
}

function FormSection(props) {
  const {data, id, handleClick} = props;

  return (
    <Card elevation={5} style={{marginTop: 20, padding: 15}}>
      <Subheading>{data.title}</Subheading>
      <Divider style={{height: 1, marginVertical: 5}} />
      <Text>{data.subTitle}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginTop: 15,
        }}>
        <Button mode="contained" onPress={() => handleClick(id)}>
          {data.ButtonText}
        </Button>
        {data.title === 'Form With Rates' ? (
          <Image
            source={data.image}
            style={{
              width: 70,
              height: 70,
            }}
          />
        ) : (
          <Image
            source={data.image}
            style={{
              width: 60,
              height: 60,
            }}
          />
        )}
      </View>
    </Card>
  );
}

function BookingDetails(props) {
  const {navigation, route} = props;
  const {params = {}} = route;

  const [flag, setFlag] = useState();

  function handleClick(id) {
    if (id === 'withRate') {
      console.log('----->handleclick called', id);
      navigation.navigate('BC_Step_Six');
    } else {
      console.log('----->else called', id);
    }
  }

  return (
    <View style={{padding: 10}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <IconButton
          icon="keyboard-backspace"
          onPress={() => navigation.goBack()}
        />
        <Title>Booking form</Title>
      </View>
      <Card elevation={5} style={{padding: 15}}>
        <Subheading>Property info</Subheading>
        <Divider style={{height: 1, marginVertical: 5}} />
        <ProjectInfo
          data={[
            {title: 'Project type', value: 'apartment'},
            {title: 'Tower', value: 'A'},
          ]}
        />
        <ProjectInfo
          data={[
            {title: 'Floor', value: '12th Floor'},
            {title: 'Unit Number', value: '1204'},
          ]}
        />
      </Card>
      <FormSection handleClick={handleClick} id="withRate" data={_data[0]} />
      <FormSection
        handleClick={handleClick}
        id="without rates"
        data={_data[1]}
      />
    </View>
    // // <Formik
    // //   validateOnBlur={false}
    // //   validateOnChange={false}
    // //   initialValues={{broker: 'no', userType: 'new'}}
    // //   validationSchema={schema}
    // //   onSubmit={async values => {
    // //     if (values.userType === 'visitor') {
    // //       values.user_id_info = values.selectedVisitor;

    // //       delete values.customer_first_name;
    // //       delete values.customer_last_name;
    // //       delete values.customer_email;
    // //       delete values.customer_phone;
    // //     }
    // //     delete values.selectedVisitor;
    // //     delete values.userType;

    // //     navigation.navigate('BC_Step_Five', {...values, ...params});
    // //   }}>
    //   {/* {formikProps => <FormContent {...props} formikProps={formikProps} />} */}
    //  <FormContent />
    // {/* </Formik> */}
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  input: {
    marginTop: 5,
  },
  radioRow: {
    marginTop: 20,
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: 'row',
  },
  actionContainer: {
    marginTop: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-between',
  },
  visitorContainer: {
    marginTop: 10,
  },
  itemContainer: {
    marginVertical: 5,
  },
  listContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 5,
    maxHeight: 200,
    ...getShadow(2),
  },
});

export default withTheme(BookingDetails);

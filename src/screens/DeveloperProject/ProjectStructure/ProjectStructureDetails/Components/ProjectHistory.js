import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IconButton, Subheading, Switch, Title} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import ActionButtons from 'components/Atoms/ActionButtons';

const schema = Yup.object().shape({
  projectName: Yup.string()
    .label('projectName')
    .required('Project Name is Required'),
  builderName: Yup.string()
    .label('builderName')
    .required('Builder Name is Required'),
  area: Yup.string().label('area').required('Area is Required'),
});

const RenderForm = props => {
  const {options, navigation, formikProps} = props;
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = formikProps;

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View style={styles.formContainer}>
      <RenderInput
        name="projectName"
        label="Project Name"
        containerStyles={styles.inputStyles}
        value={values.projectName}
        onChangeText={handleChange('projectName')}
        onBlur={handleBlur('projectName')}
        autoCapitalize="none"
        returnKeyType="next"
        error={errors.projectName}
      />
      <RenderInput
        name="builderName"
        label="Builder Name"
        containerStyles={styles.inputStyles}
        value={values.builderName}
        onChangeText={handleChange('builderName')}
        onBlur={handleBlur('builderName')}
        autoCapitalize="none"
        returnKeyType="next"
        error={errors.builderName}
      />
      {/* Search with select will be applied here */}
      <RenderSelect
        name="area"
        label="Select Area"
        value={values.area}
        options={options}
        containerStyles={styles.inputStyles}
        onBlur={handleBlur('area')}
        onSelect={value => {
          setFieldValue('area', value);
        }}
      />
      <View style={styles.extraDetailsRow}>
        <Subheading>Status</Subheading>
        <View style={styles.extraDetailsSwitchWrap}>
          <Switch
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            color="#77E675"
          />
          {isSwitchOn ? <Text style={styles.switchtxt}>Active</Text> : null}
        </View>
      </View>
      <View style={styles.extraDetailsRow}>
        <Subheading>Premium Project</Subheading>
        <View style={styles.extraDetailsSwitchWrap}>
          <Switch
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            color="#77E675"
          />
          {isSwitchOn ? <Text style={styles.switchtxt}>Yes</Text> : null}
        </View>
      </View>
      <View style={styles.filterBTN}>
        <ActionButtons
          cancelLabel="Add Details"
          submitLabel="Save"
          onCancel={() => navigation.navigate('ProjectStructureDetails')}
          onSubmit={navigation.goBack}
        />
      </View>
    </View>
  );
};

const ProjectHistory = props => {
  const {navigation} = props;
  const onSubmit = values => {
    console.log(values);
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerWrapper}>
        {/* <IconButton
          icon="keyboard-backspace"
          size={18}
          color="#4872f4"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        /> */}
        <Title>Project History</Title>
      </View>
      <View style={styles.formContainer}>
        <Formik
          enableReinitialize
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{
            projectName: '',
            builderName: '',
            area: '',
          }}
          validationSchema={schema}
          onSubmit={onSubmit}>
          {formikProps => (
            <RenderForm
              formikProps={formikProps}
              {...props}
              //   options={options}
            />
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default ProjectHistory;

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    marginRight: 11,
  },
  mainContainer: {
    marginHorizontal: 10,
    flex: 1,
  },
  inputStyles: {
    marginVertical: 8,
  },
});

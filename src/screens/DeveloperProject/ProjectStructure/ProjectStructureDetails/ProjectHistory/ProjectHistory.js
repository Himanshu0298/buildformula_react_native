import {StyleSheet, View} from 'react-native';
import React from 'react';
import {IconButton, Title} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import ActionButtons from 'components/Atoms/ActionButtons';
import RenderDatePicker from 'components/Atoms/RenderDatePicker';
import dayjs from 'dayjs';

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
  const {values, errors, handleChange, handleBlur, setFieldValue} = formikProps;

  return (
    <View style={styles.formContainer}>
      <View style={styles.formSubContainer}>
        <RenderDatePicker
          name="possesion_year"
          label="Project Possession Year"
          value={values.possesion_year}
          containerStyles={styles.input}
          onChange={value => {
            setFieldValue('possesion_year', dayjs(value).format('YYYY-MM-DD'));
          }}
          error={errors.possesion_year}
        />
        <RenderInput
          name="rera_no"
          label="RERA No"
          containerStyles={styles.inputStyles}
          value={values.rera_no}
          onChangeText={handleChange('rera_no')}
          onBlur={handleBlur('rera_no')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.rera_no}
        />
        <RenderSelect
          name="project_type"
          label="Project Type"
          value={values.project_type}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('project_type')}
          onSelect={value => {
            setFieldValue('project_type', value);
          }}
        />
        <RenderSelect
          name="restricted_user"
          label="Restricted User"
          value={values.restricted_user}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('restricted_user')}
          onSelect={value => {
            setFieldValue('restricted_user', value);
          }}
        />
        <RenderSelect
          name="project_status"
          label="Project Status"
          value={values.project_status}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('project_status')}
          onSelect={value => {
            setFieldValue('project_status', value);
          }}
        />
        <RenderSelect
          name="project_quality"
          label="Project Quality"
          value={values.project_quality}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('project_quality')}
          onSelect={value => {
            setFieldValue('project_quality', value);
          }}
        />
      </View>

      <ActionButtons
        cancelLabel="Cancel"
        submitLabel="Save"
        onCancel={() => navigation.navigate('ProjectStructureDetails')}
        onSubmit={navigation.goBack}
      />
    </View>
  );
};

const ProjectHistory = props => {
  const {navigation} = props;
  const onSubmit = values => {
    console.log(values);
  };
  const options = [];
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerWrapper}>
        <IconButton
          icon="keyboard-backspace"
          size={18}
          color="#4872f4"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Title>Project History</Title>
      </View>
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
          <RenderForm formikProps={formikProps} {...props} options={options} />
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  mainContainer: {
    marginHorizontal: 10,
    flex: 1,
  },
  inputStyles: {
    marginVertical: 8,
  },

  formContainer: {
    flexGrow: 1,
    margin: 5,
  },
  formSubContainer: {
    flexGrow: 1,
  },
  backIcon: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    marginRight: 11,
  },
});

export default ProjectHistory;

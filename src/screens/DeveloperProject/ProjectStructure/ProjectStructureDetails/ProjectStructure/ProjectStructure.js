import {StyleSheet, View} from 'react-native';
import React from 'react';

import {IconButton, Text, Title} from 'react-native-paper';
import {Formik} from 'formik';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import ActionButtons from 'components/Atoms/ActionButtons';
import RenderSelectMultiple from 'components/Atoms/RenderSelectMultiple';

const options = [
  {title: 'A', value: 1},
  {title: 'b', value: 2},
  {title: 'C', value: 3},
  {title: 'D', value: 4},
  {title: 'E', value: 5},
  {title: 'F', value: 6},
  {title: 'G', value: 7},
];

function RenderForm(props) {
  const {navigation, formikProps} = props;
  const {values, errors, handleChange, handleBlur, setFieldValue} = formikProps;

  return (
    <View style={styles.formContainer}>
      <View style={styles.formSubContainer}>
        <RenderSelect
          name="project_category"
          label="Project Category"
          value={values.project_category}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('project_category')}
          onSelect={value => {
            setFieldValue('project_category', value);
          }}
        />
        <RenderInput
          name="total_no_of_towers"
          label="Total Number of Tower"
          containerStyles={styles.inputStyles}
          value={values.total_no_of_towers}
          onChangeText={handleChange('total_no_of_towers')}
          onBlur={handleBlur('total_no_of_towers')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.total_no_of_towers}
        />
        <RenderInput
          name="total_no_of_units"
          label="Total Number of Unit"
          containerStyles={styles.inputStyles}
          value={values.total_no_of_units}
          onChangeText={handleChange('total_no_of_units')}
          onBlur={handleBlur('total_no_of_units')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.total_no_of_units}
        />
        <RenderInput
          name="total_no_of_bunglows"
          label="Total Number of  Banglow"
          containerStyles={styles.inputStyles}
          value={values.total_no_of_bunglows}
          onChangeText={handleChange('total_no_of_bunglows')}
          onBlur={handleBlur('total_no_of_bunglows')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.total_no_of_bunglows}
        />
        <RenderInput
          name="total_no_of_plots"
          label="Total Number of Plots"
          containerStyles={styles.inputStyles}
          value={values.total_no_of_plots}
          onChangeText={handleChange('total_no_of_plots')}
          onBlur={handleBlur('total_no_of_plots')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.total_no_of_plots}
        />

        <Text> BHK Configuration</Text>
        <RenderSelectMultiple
          name="configurtion"
          label="Configuration"
          options={options}
          value={values.configurtion}
          containerStyles={styles.inputStyles}
          error={errors.configurtion}
          onSelect={v => {
            setFieldValue('configurtion', v);
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
}

function ProjectStructure(props) {
  const {navigation} = props;

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
        <Title> Project Structure</Title>
      </View>

      <Formik
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{}}
        onSubmit={() => console.log('===========> ')}>
        {formikProps => (
          <RenderForm formikProps={formikProps} {...props} options={options} />
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  mainContainer: {
    margin: 10,
    flex: 1,
  },
  backIcon: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    marginRight: 11,
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
});

export default ProjectStructure;

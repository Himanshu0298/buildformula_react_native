import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {IconButton, Title} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import ActionButtons from 'components/Atoms/ActionButtons';
import RenderSelectMultiple from 'components/Atoms/RenderSelectMultiple';

// =======> User will be redirected to this page from ProjectStructureDetails screen also <==========

const schema = Yup.object().shape({
  projectName: Yup.string()
    .label('projectName')
    .required('Project Name is Required'),
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

  return (
    <ScrollView style={{marginBottom: 30}} showsVerticalScrollIndicator={false}>
      <View style={styles.formContainer}>
        <RenderInput
          name="plotName"
          label="Plot Name"
          containerStyles={styles.inputStyles}
          value={values.plotName}
          onChangeText={handleChange('plotName')}
          onBlur={handleBlur('plotName')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.plotName}
        />
        <RenderSelect
          name="plotType"
          label="Plot Type"
          value={values.plotType}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('plotType')}
          onSelect={value => {
            setFieldValue('plotType', value);
          }}
        />
        <RenderSelect
          name="district"
          label="District"
          value={values.district}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('district')}
          onSelect={value => {
            setFieldValue('district', value);
          }}
        />
        <RenderSelect
          name="taluka"
          label="Taluka"
          value={values.taluka}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('taluka')}
          onSelect={value => {
            setFieldValue('taluka', value);
          }}
        />
        <RenderSelect
          name="village"
          label="Village"
          value={values.village}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('village')}
          onSelect={value => {
            setFieldValue('village', value);
          }}
        />
        <RenderSelect
          name="plotZone"
          label="Plot Zone"
          value={values.plotZone}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('plotZone')}
          onSelect={value => {
            setFieldValue('plotZone', value);
          }}
        />
        <RenderSelect
          name="fsi"
          label="FSI (Floor Space Index)"
          value={values.fsi}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('fsi')}
          onSelect={value => {
            setFieldValue('fsi', value);
          }}
        />
        <RenderSelect
          name="plotFor"
          label="Plot For"
          value={values.plotFor}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('plotFor')}
          onSelect={value => {
            setFieldValue('plotFor', value);
          }}
        />
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

        <View style={styles.filterBTN}>
          <ActionButtons
            cancelLabel="Add Details"
            submitLabel="Save"
            onCancel={() => navigation.navigate('PlotDetails')}
            onSubmit={handleSubmit}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const AddUnit = props => {
  const {navigation} = props;
  const options = ['Science City Rd', 'Sola Rd', 'Bhadaj'];

  const onSubmit = values => {
    console.log(values);
  };
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
        <Title>Plot Details </Title>
      </View>
      <View style={styles.formContainer}>
        <Formik
          enableReinitialize
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{
            plotName: '',
          }}
          validationSchema={schema}
          onSubmit={onSubmit}>
          {formikProps => (
            <RenderForm
              formikProps={formikProps}
              {...props}
              options={options}
            />
          )}
        </Formik>
      </View>
    </View>
  );
};

export default AddUnit;

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
    paddingHorizontal: 10,
    flex: 1,
  },
  inputStyles: {
    marginVertical: 8,
  },
  filterBTN: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  formContainer: {
    flex: 1,
  },
});

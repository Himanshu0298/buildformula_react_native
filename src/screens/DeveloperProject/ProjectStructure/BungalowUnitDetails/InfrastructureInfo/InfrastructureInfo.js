import ActionButtons from 'components/Atoms/ActionButtons';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderSelectMultiple from 'components/Atoms/RenderSelectMultiple';
import {Formik} from 'formik';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Subheading, Switch, Text} from 'react-native-paper';

function RenderForm(props) {
  const {navigation, formikProps} = props;

  const options = ['Science City Rd', 'Sola Rd', 'Bhadaj'];

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
      <View style={styles.formSubContainer}>
        <RenderSelect
          name="selectFurnishedStatus"
          label="Select Furnished Status"
          value={values.selectFurnishedStatus}
          options={options}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('selectFurnishedStatus')}
          error={errors.selectFurnishedStatus}
          returnKeyType="next"
          onSelect={value => {
            setFieldValue('selectFurnishedStatus', value);
          }}
        />
        <RenderInput
          name="noOfCarParking"
          label="No of car parking"
          containerStyles={styles.inputStyles}
          value={values.noOfCarParking}
          onChangeText={handleChange('noOfCarParking')}
          onBlur={handleBlur('noOfCarParking')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.noOfCarParking}
        />
        <RenderInput
          name="noOfTwoWheelerParking"
          label="No of Two-wheeler Parking"
          containerStyles={styles.inputStyles}
          value={values.noOfTwoWheelerParking}
          onChangeText={handleChange('noOfTwoWheelerParking')}
          onBlur={handleBlur('noOfTwoWheelerParking')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.noOfTwoWheelerParking}
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
        <View style={styles.extraDetailsRow}>
          <Subheading>Side Facing</Subheading>
          <View style={styles.extraDetailsSwitchWrap}>
            <Switch
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
              color="#07CA03"
            />
            {isSwitchOn ? <Text style={styles.switchText}>Yes</Text> : null}
          </View>
        </View>
      </View>
      <ActionButtons
        cancelLabel="Cancel"
        submitLabel="Save"
        onCancel={navigation.goBack}
        onSubmit={handleSubmit}
      />
    </View>
  );
}

function InfrastructureInfo(props) {
  const {navigation} = props;

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
          onPress={navigation.goBack}
        />
        <Subheading>Infrastructure Info</Subheading>
      </View>
      <View style={styles.formContainer}>
        <Formik
          enableReinitialize
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{}}
          onSubmit={onSubmit}>
          {formikProps => <RenderForm formikProps={formikProps} {...props} />}
        </Formik>
      </View>
    </View>
  );
}

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
    margin: 10,
    flex: 1,
  },
  inputStyles: {
    marginVertical: 8,
  },
  formContainer: {
    flexGrow: 1,
  },

  formSubContainer: {
    flexGrow: 1,
  },
  extraDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
  },
  extraDetailsSwitchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    marginVertical: 5,
  },
  switchText: {
    color: '#07CA03',
    marginLeft: 10,
    width: 60,
  },
});

export default InfrastructureInfo;

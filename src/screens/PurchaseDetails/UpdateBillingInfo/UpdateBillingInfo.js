import * as React from 'react';
import {Title} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ActionButtons from 'components/Atoms/ActionButtons';
import useProjectActions from 'redux/actions/projectActions';
import {useSelector} from 'react-redux';

const schema = Yup.object().shape({
  billing_company_name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  billing_address: Yup.string().required('Required'),
  billing_pincode: Yup.number()
    .typeError('you must specify a number')
    .min(100000, 'Enter valid pin')
    .max(999999, 'Enter valid pin'),
  billing_state_id: Yup.string().required('Required'),
  billing_city: Yup.string().required('Required'),
});

function UpdateBillingInfo(props) {
  const {route, navigation} = props;

  const {project_id} = route?.params || {};

  const {purchaseProjectDetails} = useSelector(s => s.project);
  const {
    billing_company_name,
    billing_address,
    billing_state_id,
    billing_city_id,
    billing_city,
    billing_pincode,
    billing_gst,
  } = purchaseProjectDetails?.projectDetails || {};

  const {updateBilling, getPurchaseProjectDetails} = useProjectActions();

  const onSubmit = async values => {
    await updateBilling({project_id, ...values});
    navigation.goBack();
    getPurchaseProjectDetails(project_id);
  };

  return (
    <View>
      <Title style={styles.title}>Update Billing Info</Title>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{
          billing_company_name,
          billing_address,
          billing_state_id,
          billing_city_id,
          billing_city,
          billing_pincode,
          billing_gst,
        }}
        validationSchema={schema}
        onSubmit={onSubmit}>
        {({values, errors, handleChange, handleBlur, handleSubmit}) => {
          return (
            <View style={styles.dialogContentContainer}>
              <RenderInput
                name="billing_company_name"
                label="Name"
                containerStyles={styles.inputStyles}
                maxLength={10}
                value={values.billing_company_name}
                onChangeText={handleChange('billing_company_name')}
                onBlur={handleBlur('billing_company_name')}
                autoCapitalize="none"
                // returnKeyType={'next'}
                error={errors.billing_company_name}
              />

              <RenderInput
                name="billing_address"
                label="Address"
                containerStyles={styles.inputStyles}
                maxLength={10}
                value={values.billing_address}
                onChangeText={handleChange('billing_address')}
                onBlur={handleBlur('billing_address')}
                autoCapitalize="none"
                // returnKeyType={'next'}
                error={errors.billing_address}
              />

              <RenderInput
                name="billing_state_id"
                label="State"
                containerStyles={styles.inputStyles}
                maxLength={10}
                value={values.billing_state_id}
                onChangeText={handleChange('billing_state_id')}
                onBlur={handleBlur('billing_state_id')}
                autoCapitalize="none"
                // returnKeyType={'next'}
                error={errors.billing_state_id}
              />

              <RenderInput
                name="billing_city"
                label="City"
                containerStyles={styles.inputStyles}
                maxLength={10}
                value={values.billing_city}
                onChangeText={handleChange('billing_city')}
                onBlur={handleBlur('billing_city')}
                autoCapitalize="none"
                // returnKeyType={'next'}
                error={errors.billing_city}
              />

              <RenderInput
                name="billing_pincode"
                label="Pin Code"
                containerStyles={styles.inputStyles}
                maxLength={10}
                value={values.billing_pincode}
                keyboardType="number-pad"
                onChangeText={handleChange('billing_pincode')}
                onBlur={handleBlur('billing_pincode')}
                autoCapitalize="none"
                // returnKeyType={'next'}
                error={errors.billing_pincode}
              />

              <RenderInput
                name="billing_gst"
                label="GST"
                containerStyles={styles.inputStyles}
                maxLength={10}
                value={values.billing_gst}
                onChangeText={handleChange('billing_gst')}
                onBlur={handleBlur('billing_gst')}
                autoCapitalize="none"
                // returnKeyType={'next'}
                error={errors.billing_gst}
              />

              <ActionButtons
                cancelLabel="Back"
                submitLabel="Update"
                onCancel={navigation.goBack}
                onSubmit={handleSubmit}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  dialogContentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputStyles: {
    marginVertical: 4,
  },
});

export default UpdateBillingInfo;

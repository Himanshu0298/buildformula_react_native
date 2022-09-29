import {StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import ActionButtons from 'components/Atoms/ActionButtons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Subheading} from 'react-native-paper';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

const schema = Yup.object().shape({
  subject: Yup.string().label('subject').required('Subject is Required'),
});

const CreatePR = props => {
  const {navigation, route} = props;
  const {id} = route?.params || {};

  const {
    addMaterialPR,
    getPRMaterialOrderList,
    getVendorOrContractorsDetails,
    getWorkSubWorkList,
  } = useMaterialManagementActions();

  const {loading, workOptions, vendorOptions} = useSelector(
    s => s.materialManagement,
  );
  const {selectedProject} = useSelector(s => s.project);

  const project_id = selectedProject.id;

  React.useEffect(() => {
    getPRMaterialOrderList({
      project_id,
      id,
    });
    getVendorOrContractorsDetails({project_id});
    getWorkSubWorkList({project_id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const constructorOptions = useMemo(() => {
    return vendorOptions?.map(i => ({
      label: `${i.contractor_name} - {${i.contractor_email}}`,
      value: i.id,
    }));
  }, [vendorOptions]);

  const workSubWorkOptions = useMemo(() => {
    return workOptions?.map(i => ({
      label: `{${i.title}}`,
      value: i.id,
    }));
  }, [workOptions]);

  const onSubmit = async values => {
    const formData = new FormData();

    formData.append('project_id', project_id);
    formData.append('subject', values.subject);
    formData.append('vendorName', values.vendorName);
    formData.append('requiredFor', values.requiredFor);
    formData.append('remark', values.remark);

    await addMaterialPR(formData);
    getPRMaterialOrderList({project_id});
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Subheading style={styles.headerText}>Create PR </Subheading>
        </View>
        <Spinner visible={loading} textContent="" />
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{}}
          validationSchema={schema}
          onSubmit={onSubmit}>
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            setFieldValue,
            handleSubmit,
          }) => {
            return (
              <View>
                <RenderInput
                  name="subject"
                  label="Subject"
                  containerStyles={styles.inputStyles}
                  maxLength={10}
                  value={values.subject}
                  onChangeText={handleChange('subject')}
                  onBlur={handleBlur('subject')}
                  autoCapitalize="none"
                  returnKeyType="next"
                  error={errors.subject}
                />
                {console.log('----->values ', values)}
                <RenderSelect
                  name="vendorName"
                  label="Vendor Name"
                  value={values.vendorName}
                  options={constructorOptions}
                  containerStyles={styles.inputStyles}
                  onBlur={handleBlur('vendorName')}
                  onSelect={value => {
                    setFieldValue('vendorName', value);
                  }}
                />
                <RenderSelect
                  name="requiredFor"
                  label="Required For"
                  value={values.requiredFor}
                  options={workSubWorkOptions}
                  containerStyles={styles.inputStyles}
                  onBlur={handleBlur('requiredFor')}
                  onSelect={value => {
                    setFieldValue('requiredFor', value);
                  }}
                />
                <RenderTextBox
                  name="remark"
                  blurOnSubmit={false}
                  numberOfLines={7}
                  label="Remark"
                  containerStyles={styles.inputStyles}
                  value={values.remark}
                  onChangeText={handleChange('remark')}
                  onBlur={handleBlur('remark')}
                  onSubmitEditing={handleSubmit}
                />
              </View>
            );
          }}
        </Formik>
      </View>
      <View style={styles.btnContainer}>
        <ActionButtons
          style={styles.actionButton}
          cancelLabel="Cancel"
          submitLabel="Next"
          onCancel={navigation.goBack}
          onSubmit={() => navigation.navigate('AddMaterialList')}
        />
      </View>
    </View>
  );
};

export default CreatePR;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    margin: 10,
  },
  mainContainer: {
    padding: 5,
  },

  headerContainer: {
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
  },
  inputStyles: {
    marginVertical: 8,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
  },
  actionButton: {
    justifyContent: 'flex-end',
  },
});

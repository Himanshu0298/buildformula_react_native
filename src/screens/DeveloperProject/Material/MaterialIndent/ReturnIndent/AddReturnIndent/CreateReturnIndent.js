import {StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';
import * as Yup from 'yup';

import {Formik} from 'formik';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import ActionButtons from 'components/Atoms/ActionButtons';
import {Subheading} from 'react-native-paper';
import {useSelector} from 'react-redux';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';

const schema = Yup.object().shape({
  vendor_id: Yup.string().label('vendor_id').required('Vendor is Required'),
  remark: Yup.string().label('remark').required('Remark is Required'),
});

function CreateReturnIndent(props) {
  const {navigation, route} = props;
  const {id, indentDetails} = route?.params || {};

  const details = indentDetails?.material_indent;

  const edit = Boolean(id);

  const {getVendorList, addReturnMaterialIndent} =
    useMaterialManagementActions();

  const {vendorOptions} = useSelector(s => s.materialManagement);

  const {selectedProject} = useSelector(s => s.project);
  const projectId = selectedProject.id;

  React.useEffect(() => {
    getVendorList({project_id: projectId});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const constructorOptions = useMemo(() => {
    return vendorOptions?.map(i => ({
      label: `${i.contractor_name} - [${i.contractor_email}]`,
      value: i.id,
    }));
  }, [vendorOptions]);

  const initialValues = React.useMemo(() => {
    if (edit) {
      const {contractor_name: vendor_id, remark} = details;
      return {
        vendor_id,
        remark,
      };
    }
    return {};
  }, [details, edit]);

  const onSubmit = async values => {
    const data = {
      project_id: projectId,
      remark: values.remark,
      vendor_id: values.vendor_id,
    };

    const {value} = await addReturnMaterialIndent(data);

    navigation.navigate('AddReturnMaterialList', {
      edit,
      id: value.material_indent_id || id,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Subheading style={styles.headerText}>
          {edit ? 'Edit Return Request' : 'Create Return Request'}
        </Subheading>
      </View>
      <Formik
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}>
        {({values, handleChange, handleBlur, setFieldValue, handleSubmit}) => {
          return (
            <View style={styles.formContainer}>
              <View style={styles.formSubContainer}>
                <RenderSelect
                  name="vendor_id"
                  label="Requirement For Vendor"
                  value={values.vendor_id}
                  options={constructorOptions}
                  containerStyles={styles.inputStyles}
                  onBlur={handleBlur('vendor_id')}
                  onSelect={value => {
                    setFieldValue('vendor_id', value);
                  }}
                />

                <RenderTextBox
                  name="remark"
                  blurOnSubmit={false}
                  numberOfLines={10}
                  label="Remark"
                  containerStyles={styles.inputStyles}
                  value={values.remark}
                  onChangeText={handleChange('remark')}
                  onBlur={handleBlur('remark')}
                  onSubmitEditing={handleSubmit}
                />
              </View>
              <ActionButtons
                cancelLabel="Cancel"
                submitLabel="Next"
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

export default CreateReturnIndent;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexGrow: 1,
  },
  // headerContainer: {
  //   margin: 10,
  // },
  headerText: {
    fontSize: 18,
  },
  inputStyles: {
    marginVertical: 8,
  },

  formContainer: {
    flexGrow: 1,
    marginBottom: 10,
  },
  formSubContainer: {
    flexGrow: 1,
  },
});

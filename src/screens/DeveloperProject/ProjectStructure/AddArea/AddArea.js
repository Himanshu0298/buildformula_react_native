import {StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';
import {IconButton, Title} from 'react-native-paper';
import {Formik} from 'formik';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import ActionButtons from 'components/Atoms/ActionButtons';
import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';
import Spinner from 'react-native-loading-spinner-overlay';

const schema = Yup.object().shape({
  area: Yup.string('Invalid').required('Required'),
  pincode: Yup.string('Invalid').required('Required'),
  city: Yup.string('Invalid').required('Required'),
  state: Yup.string('Invalid').required('Required'),
  country: Yup.string('Invalid').required('Required'),
  status: Yup.string('Invalid').required('Required'),
});

const RenderForm = props => {
  const {navigation, formikProps, masterList} = props;
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = formikProps;

  const {
    project_structure_tbl_cities,
    project_structure_tbl_country,
    project_structure_tbl_state,
    project_structure_project_status,
  } = masterList;

  const cityOptions = useMemo(() => {
    return project_structure_tbl_cities?.map(i => ({
      label: i.title,
      value: i.title,
    }));
  }, [project_structure_tbl_cities]);

  const countryOptions = useMemo(() => {
    return project_structure_tbl_country?.map(i => ({
      label: i.title,
      value: i.title,
    }));
  }, [project_structure_tbl_country]);

  const stateOptions = useMemo(() => {
    return project_structure_tbl_state?.map(i => ({
      label: i.title,
      value: i.title,
    }));
  }, [project_structure_tbl_state]);

  const statusOptions = useMemo(() => {
    return project_structure_project_status?.map(i => ({
      label: i.title,
      value: i.id,
    }));
  }, [project_structure_project_status]);

  return (
    <View style={styles.formContainer}>
      <View style={styles.formSubContainer}>
        <RenderInput
          name="area"
          label="Area Name"
          containerStyles={styles.inputStyles}
          value={values.area}
          onChangeText={handleChange('area')}
          onBlur={handleBlur('area')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.area}
        />
        <RenderInput
          name="pincode"
          label="Pin Code"
          containerStyles={styles.inputStyles}
          value={values.pincode}
          onChangeText={handleChange('pincode')}
          onBlur={handleBlur('pincode')}
          autoCapitalize="none"
          returnKeyType="next"
          error={errors.pincode}
        />
        <RenderSelect
          name="city"
          label="City"
          creatable
          value={values.city}
          options={cityOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('city')}
          onSelect={value => {
            setFieldValue('city', value);
          }}
        />
        <RenderSelect
          name="state"
          label="State"
          creatable
          value={values.state}
          options={stateOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('state')}
          onSelect={value => {
            setFieldValue('state', value);
          }}
        />
        <RenderSelect
          name="country"
          label="Country"
          creatable
          value={values.country}
          options={countryOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('country')}
          onSelect={value => {
            setFieldValue('country', value);
          }}
        />
        <RenderSelect
          name="status"
          label="Status"
          creatable
          value={values.status}
          options={statusOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('status')}
          onSelect={value => {
            setFieldValue('status', value);
          }}
        />
      </View>
      <ActionButtons
        cancelLabel="Cancel"
        submitLabel="Save"
        onCancel={navigation.goBack}
        onSubmit={handleSubmit}
      />
    </View>
  );
};

const AddArea = props => {
  const {navigation, route} = props;

  const {id, item: areaData} = route?.params || {};

  const edit = Boolean(id);

  const {addArea, getAreaList, updateArea, getProjectMasterList} =
    useProjectStructureActions();

  const {selectedProject} = useSelector(s => s.project);

  const {masterList, loading} = useSelector(s => s.projectStructure);

  React.useEffect(() => {
    getProjectMasterList({project_id: selectedProject.id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getList = () => getAreaList({project_id: selectedProject.id});

  const initialValues = useMemo(() => {
    const {area, pincode, city, state, country, status} = areaData || {};
    return {area, pincode, city, state, country, status};
  }, [areaData]);

  const onSubmit = async values => {
    const restData = {
      project_id: selectedProject.id,
      area: values.area,
      pincode: values.pincode,
      city: values.city,
      state: values.state,
      country: values.country,
      status: values.status,
    };

    if (edit) {
      await updateArea({id, ...restData});
    } else {
      await addArea(restData);
    }
    getList();
    navigation.goBack();
  };

  return (
    <View style={styles.mainContainer}>
      <Spinner visible={loading} textContent="please wait" />
      <View style={styles.headerWrapper}>
        <IconButton
          icon="keyboard-backspace"
          size={18}
          color="#4872f4"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Title>Add Area</Title>
      </View>
      <Formik
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {formikProps => (
          <RenderForm
            formikProps={formikProps}
            {...props}
            masterList={masterList}
          />
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

export default AddArea;

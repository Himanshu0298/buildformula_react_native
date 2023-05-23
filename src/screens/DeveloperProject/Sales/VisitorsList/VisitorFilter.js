import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';
import {IconButton, Title} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFormik} from 'formik';
import ActionButtons from 'components/Atoms/ActionButtons';
import RenderSelect from 'components/Atoms/RenderSelect';
import {useSelector} from 'react-redux';
import useSalesActions from 'redux/actions/salesActions';
import Spinner from 'react-native-loading-spinner-overlay';
import {DEFAULT_VISITORS_FILTERS} from 'utils/constant';
import {debounce} from 'lodash';

const RenderForm = props => {
  const {formikProps, clearForm, sourceTypeOptions, salesPipelineOptions} =
    props;

  const {values, handleBlur, setFieldValue, handleSubmit} = formikProps;

  const handleChange = (key, value) => {
    setFieldValue(
      key,
      Array.isArray(value) && value?.length ? value : undefined,
    );
  };

  const SORT_OPTIONS = [
    {label: 'Ascending', value: 'asc'},
    {label: 'Descending', value: 'desc'},
  ];

  const PRIORITY_OPTIONS = [
    {label: 'Low', value: 'low'},
    {label: 'Medium', value: 'medium'},
    {label: 'High', value: 'high'},
  ];

  const handleCancel = debounce(() => {
    clearForm();
  }, 500);

  return (
    <View style={styles.formContainer}>
      <ScrollView style={styles.formContainer}>
        <RenderSelect
          name="sortby"
          label="Sort By"
          value={values.sortby}
          options={SORT_OPTIONS}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('sortby')}
          onSelect={value => {
            setFieldValue('sortby', value);
          }}
        />
        <RenderSelect
          name="priority"
          label="Priority"
          value={values.priority}
          options={PRIORITY_OPTIONS}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('priority')}
          onSelect={value => {
            setFieldValue('priority', value);
          }}
        />
        <RenderSelect
          multiselect
          name="status"
          label="Status"
          value={values.status}
          options={salesPipelineOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('status')}
          onSelect={value => {
            handleChange('status', value);
          }}
        />
        <RenderSelect
          name="sourceType"
          label="Source Type"
          value={values.sourceType}
          options={sourceTypeOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('sourceType')}
          onSelect={value => {
            setFieldValue('sourceType', value);
          }}
        />
      </ScrollView>

      <ActionButtons
        cancelLabel="Clear All"
        submitLabel="Apply"
        onCancel={handleCancel}
        onSubmit={debounce(handleSubmit, 500)}
      />
    </View>
  );
};

const VisitorFilter = props => {
  const {navigation} = props;

  const {updateVisitorsFilters} = useSalesActions();

  const {sourceTypeOptions, pipelines, loading, visitorsFilters} = useSelector(
    s => s.sales,
  );

  const salesPipelineOptions = useMemo(() => {
    const options = pipelines
      ?.map(e => {
        return {label: e?.title, value: e?.id};
      })
      ?.filter(e => e.label !== 'Book(won)');
    return options;
  }, [pipelines]);

  const onSubmit = async values => {
    await updateVisitorsFilters(values);
    await navigation.goBack();
  };

  const clearForm = async () => {
    updateVisitorsFilters(DEFAULT_VISITORS_FILTERS);
    await navigation.goBack();
  };

  const formikProps = useFormik({
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: visitorsFilters,
    onSubmit,
  });

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Spinner visible={loading} textContent="" />
      <View style={styles.headerWrapper}>
        <IconButton
          icon="keyboard-backspace"
          size={18}
          color="#4872f4"
          style={styles.backIcon}
          onPress={navigation.goBack}
        />
        <Title>Visitor Filters</Title>
      </View>
      <RenderForm
        {...props}
        formikProps={formikProps}
        clearForm={clearForm}
        sourceTypeOptions={sourceTypeOptions}
        salesPipelineOptions={salesPipelineOptions}
      />
    </SafeAreaView>
  );
};

export default VisitorFilter;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 10,
    flex: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    marginRight: 11,
  },
  inputStyles: {
    marginVertical: 8,
  },
  formContainer: {
    flex: 1,
    marginVertical: 10,
  },
});

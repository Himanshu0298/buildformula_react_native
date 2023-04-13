import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {Divider, IconButton, Text, Title} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFormik} from 'formik';
import ActionButtons from 'components/Atoms/ActionButtons';
import RenderSelect from 'components/Atoms/RenderSelect';
import dayjs from 'dayjs';
import RangeSlider from 'components/Atoms/RangeSlider';

import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {useSelector} from 'react-redux';

const RenderForm = props => {
  const {
    navigation,
    formikProps,
    projectOptions,
    developerOptions,
    areaOptions,
    statusOptions,
    premiumProjectOptions,
    possessionYearOptions,
    reraOptions,
    restrictedUserOptions,
    projectTypeOptions,
    projectStatusOptions,
    projectQualityOptions,
    bhkOptions,
    categoryOptions,
    towerData,
    unitData,
    bungalowData,
    plotData,
    ownerData,
    securityData,
  } = props;

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = formikProps;

  const clearForm = () => {
    formikProps.setFieldValue('projectNames', '');
    formikProps.setFieldValue('developerNames', '');
    formikProps.setFieldValue('area', '');
    formikProps.setFieldValue('status', '');
    formikProps.setFieldValue('premium', '');
    formikProps.setFieldValue('possession', '');
    formikProps.setFieldValue('rera', '');
    formikProps.setFieldValue('projectType', '');
    formikProps.setFieldValue('restrictedUser', '');
    formikProps.setFieldValue('projectStatus', '');
    formikProps.setFieldValue('projectQuality', '');
    formikProps.setFieldValue('bhk', '');
    formikProps.setFieldValue('category', '');
    formikProps.setFieldValue('towers', '');
    formikProps.setFieldValue('units', '');
    formikProps.setFieldValue('bungalows', '');
    formikProps.setFieldValue('plots', '');
    formikProps.setFieldValue('owners', '');
    formikProps.setFieldValue('security', '');
  };

  return (
    <View style={styles.formContainer}>
      <ScrollView style={styles.formContainer}>
        <RenderSelect
          multiselect
          name="projectNames"
          label="Project Name"
          value={values.projectNames}
          options={projectOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('projectNames')}
          onSelect={value => {
            setFieldValue('projectNames', value);
          }}
        />
        <RenderSelect
          multiselect
          name="developerNames"
          label="Developer Name"
          value={values.developerNames}
          options={developerOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('developerNames')}
          onSelect={value => {
            setFieldValue('developerNames', value);
          }}
        />
        <RenderSelect
          multiselect
          name="area"
          label="Area"
          value={values.area}
          options={areaOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('area')}
          onSelect={value => {
            setFieldValue('area', value);
          }}
        />
        <RenderSelect
          name="status"
          label="Status"
          value={values.status}
          options={statusOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('status')}
          onSelect={value => {
            setFieldValue('status', value);
          }}
        />
        <RenderSelect
          name="premium"
          label="Premium"
          value={values.premium}
          options={premiumProjectOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('premium')}
          onSelect={value => {
            setFieldValue('premium', value);
          }}
        />
        <RenderSelect
          multiselect
          name="possession"
          label="Possession Year"
          value={values.possession}
          options={possessionYearOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('possession')}
          onSelect={value => {
            setFieldValue('possession', value);
          }}
        />
        <RenderSelect
          multiselect
          name="rera"
          label="RERA No"
          value={values.rera}
          options={reraOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('rera')}
          onSelect={value => {
            setFieldValue('rera', value);
          }}
        />
        <RenderSelect
          multiselect
          name="projectType"
          label="Project Type"
          value={values.projectType}
          options={projectTypeOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('projectType')}
          onSelect={value => {
            setFieldValue('projectType', value);
          }}
        />
        <RenderSelect
          multiselect
          name="restrictedUser"
          label="Restricted User"
          value={values.restrictedUser}
          options={restrictedUserOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('restrictedUser')}
          onSelect={value => {
            setFieldValue('restrictedUser', value);
          }}
        />
        <RenderSelect
          multiselect
          name="projectStatus"
          label="Project Status"
          value={values.projectStatus}
          options={projectStatusOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('projectStatus')}
          onSelect={value => {
            setFieldValue('projectStatus', value);
          }}
        />
        <RenderSelect
          multiselect
          name="projectQuality"
          label="Project Quality"
          value={values.projectQuality}
          options={projectQualityOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('projectQuality')}
          onSelect={value => {
            setFieldValue('projectQuality', value);
          }}
        />
        <RenderSelect
          multiselect
          name="bhk"
          label="BHK"
          value={values.bhk}
          options={bhkOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('bhk')}
          onSelect={value => {
            setFieldValue('bhk', value);
          }}
        />
        <RenderSelect
          multiselect
          name="category"
          label="Category"
          value={values.category}
          options={categoryOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('category')}
          onSelect={value => {
            setFieldValue('category', value);
          }}
        />

        <View style={styles.rangeContainer}>
          <Text>Select no of towers</Text>
          <RangeSlider
            min={towerData?.towerMin}
            max={towerData?.towerMax}
            rangeData={values?.towers}
            handleChange={v => setFieldValue('towers', v)}
          />
          <Divider style={{marginVertical: 10}} />
        </View>

        <View style={styles.rangeContainer}>
          <Text>Select no of units</Text>
          <RangeSlider
            min={unitData?.unitMin}
            max={unitData?.unitMax}
            rangeData={values?.units}
            handleChange={v => setFieldValue('units', v)}
          />
          <Divider style={{marginVertical: 10}} />
        </View>

        <View style={styles.rangeContainer}>
          <Text>Select no of bungalows</Text>
          <RangeSlider
            min={bungalowData?.bungalowMin}
            max={bungalowData?.bungalowMax}
            rangeData={values?.bungalows}
            handleChange={v => setFieldValue('bungalows', v)}
          />
          <Divider style={{marginVertical: 10}} />
        </View>

        <View style={styles.rangeContainer}>
          <Text>Select no of plots</Text>
          <RangeSlider
            min={plotData?.plotMin}
            max={plotData?.plotMax}
            rangeData={values?.plots}
            handleChange={v => setFieldValue('plots', v)}
          />
          <Divider style={{marginVertical: 10}} />
        </View>

        <RenderSelect
          multiselect
          name="owners"
          label="Project Owners"
          value={values.owners}
          options={ownerData}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('owners')}
          onSelect={value => {
            setFieldValue('owners', value);
          }}
        />

        <RenderSelect
          multiselect
          name="security"
          label="Project Security"
          value={values.security}
          options={securityData}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('security')}
          onSelect={value => {
            setFieldValue('security', value);
          }}
        />
      </ScrollView>

      <ActionButtons
        cancelLabel="Clear"
        submitLabel="Apply"
        onCancel={() => clearForm()}
        onSubmit={handleSubmit}
      />
    </View>
  );
};

const ProjectFilter = props => {
  const {navigation} = props;

  const {getProjectMasterList, updateProjectFilters} =
    useProjectStructureActions();

  const {selectedProject} = useSelector(s => s.project);
  const {
    projectList = [],
    masterList,
    projectFilters,
  } = useSelector(s => s.projectStructure);

  const {
    projectNames,
    developerNames,
    area,
    status,
    premium,
    possession,
    rera,
    projectType,
    restrictedUser,
    projectStatus,
    projectQuality,
    bhk,
    category,
    towers,
    units,
    bungalows,
    plots,
    owners,
    security,
  } = projectFilters;

  const initialValues = {
    projectNames: projectNames || '',
    developerNames: developerNames || '',
    area: area || '',
    status: status || '',
    premium: premium || '',
    possession: possession || '',
    rera: rera || '',
    projectType: projectType || '',
    restrictedUser: restrictedUser || '',
    projectStatus: projectStatus || '',
    projectQuality: projectQuality || '',
    bhk: bhk || '',
    category: category || '',
    towers: towers || '',
    units: units || '',
    bungalows: bungalows || '',
    plots: plots || '',
    owners: owners || '',
    security: security || '',
  };

  const {master_bhks, project_structure_project_category} = masterList || [];

  const getMasters = async () => {
    await getProjectMasterList({project_id: selectedProject.id});
  };

  useEffect(() => {
    getMasters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const projectOptions = useMemo(() => {
    return projectList?.filter(i => i.status === 1)?.map(i => i.project_name);
  }, [projectList]);

  const developerOptions = useMemo(() => {
    const devData = projectList?.map(i => i.developer_name);
    return [...new Set(devData)];
  }, [projectList]);

  const areaOptions = useMemo(() => {
    const areaData = projectList?.map(i => i.area);
    return [...new Set(areaData)];
  }, [projectList]);

  const statusOptions = [
    {label: 'Active', value: 1},
    {label: 'Inactive', value: 0},
  ];

  const premiumProjectOptions = [
    {label: 'Yes', value: 1},
    {label: 'No', value: 0},
  ];

  const possessionYearOptions = useMemo(() => {
    const possessionData = projectList
      ?.map(i => i.possesion_year)
      ?.filter(i => i !== '');
    const tempPossessionData = [...new Set(possessionData)];
    return tempPossessionData.map(i => ({
      label: dayjs(i).get('year'),
      value: i,
    }));
  }, [projectList]);

  const reraOptions = useMemo(() => {
    const reraData = projectList?.map(i => i.rera_no);
    return [...new Set(reraData?.filter(i => i !== ''))];
  }, [projectList]);

  const restrictedUserOptions = useMemo(() => {
    return projectList
      ?.map(i => ({
        label: i.restricted_user_label,
        value: i.restricted_user,
      }))
      ?.filter(i => i.value > 0);
  }, [projectList]);

  const projectTypeOptions = useMemo(() => {
    return projectList
      ?.map(i => ({
        label: i.project_type_label,
        value: i.project_type,
      }))
      ?.filter(i => i.value > 0);
  }, [projectList]);

  const projectStatusOptions = useMemo(() => {
    return projectList
      ?.map(i => ({label: i.project_status_label, value: i.project_status}))
      ?.filter(i => i.value > 0);
  }, [projectList]);

  const projectQualityOptions = useMemo(() => {
    return projectList
      ?.map(i => ({
        label: i.project_quality_label,
        value: i.project_quality,
      }))
      ?.filter(i => i.value > 0);
  }, [projectList]);

  const bhkOptions = useMemo(() => {
    return master_bhks?.map(i => ({
      label: i?.bhk_title,
      value: i?.bhk_title,
    }));
  }, [master_bhks]);

  const categoryOptions = useMemo(() => {
    return project_structure_project_category?.map(i => ({
      label: i?.title,
      value: i?.id,
    }));
  }, [project_structure_project_category]);

  const towerData = useMemo(() => {
    const towerCount = projectList
      ?.map(i => parseInt(i.total_no_of_towers, 10))
      .filter(i => !isNaN(i));

    const towerMin = Math.min(...towerCount);
    const towerMax = Math.max(...towerCount);

    return {towerMin, towerMax};
  }, [projectList]);

  const unitData = useMemo(() => {
    const unitCount = projectList
      ?.map(i => parseInt(i.total_no_of_units, 10))
      .filter(i => !isNaN(i));

    const unitMin = Math.min(...unitCount);
    const unitMax = Math.max(...unitCount);

    return {unitMin, unitMax};
  }, [projectList]);

  const bungalowData = useMemo(() => {
    const bungalowCount = projectList
      ?.map(i => parseInt(i.total_no_of_bunglows, 10))
      .filter(i => !isNaN(i));

    const bungalowMin = Math.min(...bungalowCount);
    const bungalowMax = Math.max(...bungalowCount);

    return {bungalowMin, bungalowMax};
  }, [projectList]);

  const plotData = useMemo(() => {
    const plotCount = projectList
      ?.map(i => parseInt(i.total_no_of_plots, 10))
      .filter(i => !isNaN(i));

    const plotMin = Math.min(...plotCount);
    const plotMax = Math.max(...plotCount);

    return {plotMin, plotMax};
  }, [projectList]);

  const ownerData = useMemo(() => {
    return projectList
      ?.map(i => i.owner_info?.map(e => ({label: e.name, value: e.id})))
      ?.filter(i => i.length > 0)
      ?.flat(2);
  }, [projectList]);

  const securityData = useMemo(() => {
    return projectList
      ?.map(i =>
        i.security_info?.map(e => ({
          label: e.contact_person_name,
          value: e.id,
        })),
      )
      ?.filter(i => i.length > 0)
      ?.flat(2);
  }, [projectList]);

  const onSubmit = async values => {
    await updateProjectFilters(values);
    navigation.goBack();
  };

  const formikProps = useFormik({
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues,
    onSubmit,
  });

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerWrapper}>
        <IconButton
          icon="keyboard-backspace"
          size={18}
          color="#4872f4"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Title>Project Filters</Title>
      </View>
      <RenderForm
        {...props}
        formikProps={formikProps}
        projectOptions={projectOptions}
        developerOptions={developerOptions}
        areaOptions={areaOptions}
        statusOptions={statusOptions}
        premiumProjectOptions={premiumProjectOptions}
        possessionYearOptions={possessionYearOptions}
        reraOptions={reraOptions}
        restrictedUserOptions={restrictedUserOptions}
        projectTypeOptions={projectTypeOptions}
        projectStatusOptions={projectStatusOptions}
        projectQualityOptions={projectQualityOptions}
        bhkOptions={bhkOptions}
        categoryOptions={categoryOptions}
        towerData={towerData}
        unitData={unitData}
        bungalowData={bungalowData}
        plotData={plotData}
        ownerData={ownerData}
        securityData={securityData}
      />
    </SafeAreaView>
  );
};

export default ProjectFilter;

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
  },
  rangeContainer: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
});

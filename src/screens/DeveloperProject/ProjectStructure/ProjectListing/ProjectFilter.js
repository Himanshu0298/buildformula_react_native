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
import {DEFAULT_PROJECT_FILTERS} from 'utils/constant';

const STATUS_OPTIONS = ['Active', 'Inactive'];

const PREMIUM_PROJECT_OPTIONS = ['Yes', 'No'];

const RenderForm = props => {
  const {
    formikProps,
    projectOptions,
    developerOptions,
    areaOptions,
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
    ownerOptions,
    securityData,
    clearForm,
  } = props;

  const {values, handleBlur, setFieldValue, handleSubmit} = formikProps;

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
          options={STATUS_OPTIONS}
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
          options={PREMIUM_PROJECT_OPTIONS}
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
            min={towerData?.min}
            max={towerData?.max}
            rangeData={values?.towers}
            handleChange={v => setFieldValue('towers', v)}
          />
          <Divider style={{marginVertical: 10}} />
        </View>

        <View style={styles.rangeContainer}>
          <Text>Select no of units</Text>
          <RangeSlider
            min={unitData?.min}
            max={unitData?.max}
            rangeData={values?.units}
            handleChange={v => setFieldValue('units', v)}
          />
          <Divider style={{marginVertical: 10}} />
        </View>

        <View style={styles.rangeContainer}>
          <Text>Select no of bungalows</Text>
          <RangeSlider
            min={bungalowData?.min}
            max={bungalowData?.bungalowMax}
            rangeData={values?.bungalows}
            handleChange={v => setFieldValue('bungalows', v)}
          />
          <Divider style={{marginVertical: 10}} />
        </View>

        <View style={styles.rangeContainer}>
          <Text>Select no of plots</Text>
          <RangeSlider
            min={plotData?.min}
            max={plotData?.max}
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
          options={ownerOptions}
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
        cancelLabel="Clear All"
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

  const {master_bhks, project_structure_project_category} = masterList || [];

  const getMasters = async () => {
    await getProjectMasterList({project_id: selectedProject.id});
  };

  useEffect(() => {
    getMasters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCount = count => ({
    min: 0,
    max: count?.length ? Math.max(count) : 100,
  });

  const getUnique = options => {
    const uniqueData = options?.filter((obj, index) => {
      return (
        index ===
        options?.findIndex(o => obj.label === o.label || obj.value === o.value)
      );
    });

    return uniqueData;
  };

  const projectOptions = useMemo(() => {
    const projectData = projectList
      ?.filter(i => i.status === 1)
      ?.map(i => i.project_name);

    return [...new Set(projectData)];
  }, [projectList]);

  const developerOptions = useMemo(() => {
    const devData = projectList?.map(i => i.developer_name);
    return [...new Set(devData)];
  }, [projectList]);

  const areaOptions = useMemo(() => {
    const areaData = projectList?.map(i => i.area);
    return [...new Set(areaData)];
  }, [projectList]);

  const possessionYearOptions = useMemo(() => {
    const possessionData = projectList
      ?.map(i => i.possesion_year)
      ?.filter(i => i !== '');
    return [...new Set(possessionData)].map(i => ({
      label: dayjs(i).get('year'),
      value: i,
    }));
  }, [projectList]);

  const reraOptions = useMemo(() => {
    const reraData = projectList?.map(i => i.rera_no);
    return [...new Set(reraData?.filter(i => i !== ''))];
  }, [projectList]);

  const restrictedUserOptions = useMemo(() => {
    return getUnique(
      projectList
        ?.map(i => ({
          label: i.restricted_user_label,
          value: i.restricted_user,
        }))
        ?.filter(i => i.value > 0),
    );
  }, [projectList]);

  const projectTypeOptions = useMemo(() => {
    return getUnique(
      projectList
        ?.map(i => ({
          label: i.project_type_label,
          value: i.project_type,
        }))
        ?.filter(i => i.value > 0),
    );
  }, [projectList]);

  const projectStatusOptions = useMemo(() => {
    return getUnique(
      projectList
        ?.map(i => ({label: i.project_status_label, value: i.project_status}))
        ?.filter(i => i.value > 0),
    );
  }, [projectList]);

  const projectQualityOptions = useMemo(() => {
    return getUnique(
      projectList
        ?.map(i => ({
          label: i.project_quality_label,
          value: i.project_quality,
        }))
        ?.filter(i => i.value > 0),
    );
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

    return getCount(towerCount);
  }, [projectList]);

  const unitData = useMemo(() => {
    const unitCount = projectList
      ?.map(i => parseInt(i.total_no_of_units, 10))
      .filter(i => !isNaN(i));

    return getCount(unitCount);
  }, [projectList]);

  const bungalowData = useMemo(() => {
    const bungalowCount = projectList
      ?.map(i => parseInt(i.total_no_of_bunglows, 10))
      ?.filter(i => !isNaN(i));

    return getCount(bungalowCount);
  }, [projectList]);

  const plotData = useMemo(() => {
    const plotCount = projectList
      ?.map(i => parseInt(i.total_no_of_plots, 10))
      ?.filter(i => !isNaN(i));

    return getCount(plotCount);
  }, [projectList]);

  const ownerOptions = useMemo(() => {
    return [
      ...new Set(
        projectList
          ?.filter(i => i?.owner_info?.length)
          ?.map(i => i.owner_info?.map(e => e.name))
          ?.flat(2),
      ),
    ];
  }, [projectList]);

  const securityData = useMemo(() => {
    return [
      ...new Set(
        projectList
          ?.filter(i => i?.security_info?.length)
          ?.map(i => i.security_info?.map(e => e.contact_person_name))
          ?.flat(2),
      ),
    ];
  }, [projectList]);

  const onSubmit = async values => {
    await updateProjectFilters(values);
    navigation.goBack();
  };

  const clearForm = () => {
    updateProjectFilters(DEFAULT_PROJECT_FILTERS);
    navigation.goBack();
  };

  const formikProps = useFormik({
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: projectFilters,
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
          onPress={navigation.goBack}
        />
        <Title>Project Filters</Title>
      </View>
      <RenderForm
        {...props}
        formikProps={formikProps}
        projectOptions={projectOptions}
        developerOptions={developerOptions}
        areaOptions={areaOptions}
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
        ownerOptions={ownerOptions}
        securityData={securityData}
        clearForm={clearForm}
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

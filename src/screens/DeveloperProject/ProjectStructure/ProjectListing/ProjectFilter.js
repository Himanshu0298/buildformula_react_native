import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {Caption, Divider, IconButton, Text, Title} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFormik, Formik} from 'formik';
import ActionButtons from 'components/Atoms/ActionButtons';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderInput from 'components/Atoms/RenderInput';
import dayjs from 'dayjs';
import RangeSlider from '@ptomasroos/react-native-multi-slider';

import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {useSelector} from 'react-redux';

const initialValues = {
  projectName: '',
  developerName: '',
  area: '',
  status: '',
  premium: '',
  possession: '',
  rera: '',
  projectType: '',
  restrictedUser: '',
  projectStatus: '',
  projectQuality: '',
  bhk: '',
  category: '',
  tower: '',
  unit: '',
  bungalow: '',
  plot: '',
  owner: '',
  security: '',
};

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

  // Tower
  const [towerMinVal, setTowerMinVal] = React.useState(0);
  const [towerMaxVal, setTowerMaxVal] = React.useState(1);
  const handleTowerRangeChange = towerVal => {
    setTowerMinVal(towerVal[0]);
    setTowerMaxVal(towerVal[1]);
  };

  // Unit
  const [unitMinVal, setUnitMinVal] = React.useState(0);
  const [unitMaxVal, setUnitMaxVal] = React.useState(1);
  const handleUnitRangeChange = unitVal => {
    setUnitMinVal(unitVal[0]);
    setUnitMaxVal(unitVal[1]);
  };

  // Bungalow
  const [bungalowMinVal, setBungalowMinVal] = React.useState(0);
  const [bungalowMaxVal, setBungalowMaxVal] = React.useState(1);
  const handleBungalowRangeChange = bungalowVal => {
    setBungalowMinVal(bungalowVal[0]);
    setBungalowMaxVal(bungalowVal[1]);
  };

  // Plot
  const [plotMinVal, setPlotMinVal] = React.useState(0);
  const [plotMaxVal, setPlotMaxVal] = React.useState(1);
  const handlePlotRangeChange = plotVal => {
    setPlotMinVal(plotVal[0]);
    setPlotMaxVal(plotVal[1]);
  };

  return (
    <View style={styles.formContainer}>
      <ScrollView style={styles.formContainer}>
        <RenderSelect
          multiselect
          name="projectName"
          label="Project Name"
          value={values.projectName}
          options={projectOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('projectName')}
          onSelect={value => {
            setFieldValue('projectName', value);
          }}
        />
        <RenderSelect
          multiselect
          name="developerName"
          label="Developer Name"
          value={values.developerName}
          options={developerOptions}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('developerName')}
          onSelect={value => {
            setFieldValue('developerName', value);
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
          <Text>Select no towers</Text>
          <RangeSlider
            values={[towerMinVal, towerMaxVal]}
            sliderLength={330}
            onValuesChange={handleTowerRangeChange}
            min={towerData?.towerMin}
            max={towerData?.towerMax}
            step={1}
            allowOverlap={false}
            snapped
            minMarkerOverlapDistance={30}
            trackStyle={styles.rangeTrack}
            selectedStyle={styles.rangeSelected}
            touchDimensions={{
              height: 40,
              width: 40,
              borderRadius: 20,
              slipDisplacement: 40,
            }}
          />
          <Caption>{`No of towers between ${towerMinVal} - ${towerMaxVal}`}</Caption>
          <Divider style={{marginVertical: 10}} />
        </View>

        <View style={styles.rangeContainer}>
          <Text>Select no units</Text>
          <RangeSlider
            values={[unitMinVal, unitMaxVal]}
            sliderLength={330}
            onValuesChange={handleUnitRangeChange}
            min={unitData?.unitMin}
            max={unitData?.unitMax}
            step={1}
            allowOverlap={false}
            snapped
            minMarkerOverlapDistance={30}
            trackStyle={styles.rangeTrack}
            selectedStyle={styles.rangeSelected}
            touchDimensions={{
              height: 40,
              width: 40,
              borderRadius: 20,
              slipDisplacement: 40,
            }}
          />
          <Caption>{`No of unit between ${unitMinVal} - ${unitMaxVal}`}</Caption>
          <Divider style={{marginVertical: 10}} />
        </View>

        <View style={styles.rangeContainer}>
          <Text>Select no bungalow</Text>
          <RangeSlider
            values={[bungalowMinVal, bungalowMaxVal]}
            sliderLength={330}
            onValuesChange={handleBungalowRangeChange}
            min={bungalowData?.bungalowMin}
            max={bungalowData?.bungalowMax}
            step={1}
            allowOverlap={false}
            snapped
            minMarkerOverlapDistance={30}
            trackStyle={styles.rangeTrack}
            selectedStyle={styles.rangeSelected}
            touchDimensions={{
              height: 40,
              width: 40,
              borderRadius: 20,
              slipDisplacement: 40,
            }}
          />
          <Caption>{`No of bungalow between ${bungalowMinVal} - ${bungalowMaxVal}`}</Caption>
          <Divider style={{marginVertical: 10}} />
        </View>

        <View style={styles.rangeContainer}>
          <Text>Select no plot</Text>
          <RangeSlider
            values={[plotMinVal, plotMaxVal]}
            sliderLength={330}
            onValuesChange={handlePlotRangeChange}
            min={plotData?.plotMin}
            max={plotData?.plotMax}
            step={1}
            allowOverlap={false}
            snapped
            minMarkerOverlapDistance={30}
            trackStyle={styles.rangeTrack}
            selectedStyle={styles.rangeSelected}
            touchDimensions={{
              height: 40,
              width: 40,
              borderRadius: 20,
              slipDisplacement: 40,
            }}
          />
          <Caption>{`No of plot between ${plotMinVal} - ${plotMaxVal}`}</Caption>
        </View>

        <RenderSelect
          multiselect
          name="owner"
          label="Project Owner"
          value={values.owner}
          options={ownerData}
          containerStyles={styles.inputStyles}
          onBlur={handleBlur('owner')}
          onSelect={value => {
            setFieldValue('owner', value);
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
        cancelLabel="Cancel"
        submitLabel="Apply"
        onCancel={navigation.goBack}
        onSubmit={handleSubmit}
      />
    </View>
  );
};

const ProjectFilter = props => {
  const {navigation} = props;

  const {getProjectMasterList, updateFilterCount} =
    useProjectStructureActions();

  const {selectedProject} = useSelector(s => s.project);
  const {projectList = [], masterList} = useSelector(s => s.projectStructure);

  const {master_bhks, project_structure_project_category} = masterList || [];

  const getMasters = async () => {
    await getProjectMasterList({project_id: selectedProject.id});
  };

  useEffect(() => {
    getMasters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const projectOptions = useMemo(() => {
    return projectList
      ?.filter(i => i.status === 1)
      ?.map(i => ({label: i.project_name, value: i.id}));
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
    const restrictedData = projectList?.map(i => i.restricted_user);
    return [...new Set(restrictedData?.filter(i => i !== ''))];
  }, [projectList]);

  const projectTypeOptions = useMemo(() => {
    const typeData = projectList?.map(i => i.project_type);
    return [...new Set(typeData?.filter(i => i !== ''))];
  }, [projectList]);

  const projectStatusOptions = useMemo(() => {
    const statusData = projectList?.map(i => i.project_status);
    return [...new Set(statusData?.filter(i => i !== ''))];
  }, [projectList]);

  const projectQualityOptions = useMemo(() => {
    const qualityData = projectList?.map(i => i.project_quality);
    return [...new Set(qualityData?.filter(i => i !== ''))];
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
    console.log('🚀 ~ file: ProjectFilter.js:556 ~ onSubmit ~ values:', values);
    const filterValues = Object.values(values);
    const filterCount = filterValues?.filter(i => i !== '')?.length;

    updateFilterCount(filterCount);

    //  navigation.goBack();
  };

  const formikProps = useFormik({
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {initialValues},
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
  rangeTrack: {
    height: 5,
    backgroundColor: '#d6dcf4',
  },
  rangeSelected: {
    backgroundColor: '#4872f4',
  },
});

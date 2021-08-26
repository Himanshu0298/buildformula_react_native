import React, {useEffect, useMemo, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {withTheme, Subheading, Caption, FAB} from 'react-native-paper';
import developerImage from 'assets/images/developer_building.png';
import supplierImage from 'assets/images/supplier_building.png';
import MaterialTabs from 'react-native-material-tabs';
import {getShadow} from 'utils';
import useProjectActions from '../../redux/actions/projectActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Layout from 'utils/Layout';
import {useAlert} from 'components/Atoms/Alert';
import LottieView from 'lottie-react-native';
import waiting from 'assets/animation/waiting.json';
import useAddProjectActions from 'redux/actions/addProjectActions';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import useNotificationActions from 'redux/actions/notificationActions';

const IMAGES = {
  Developer: developerImage,
  Supplier: supplierImage,
  Customer: developerImage,
};

const PROJECT_CONTAINER_WIDTH = Layout.window.width * 0.435;
const PROJECT_CONTAINER_MARGIN = Layout.window.width * 0.02;
const DEVELOPER_IMAGE_WIDTH = PROJECT_CONTAINER_WIDTH * 0.9;

function RenderProject({project, handleOnPress, tab}) {
  return (
    <TouchableOpacity
      // activeOpacity={0.9}
      onPress={() => handleOnPress(project)}
      style={styles.projectContainer}>
      <View
        style={
          tab === 'Supplier'
            ? styles.supplierImageContainer
            : styles.developerImageContainer
        }>
        <Image
          source={IMAGES[tab]}
          style={
            tab === 'Supplier' ? styles.supplierImage : styles.developerImage
          }
        />
      </View>

      <View style={styles.labelContainer}>
        <Subheading style={styles.projectLabel}>
          {project.project_name}
        </Subheading>
        <Caption numberOfLines={1} style={styles.projectLabel}>
          {project.project_id}
        </Caption>
      </View>
    </TouchableOpacity>
  );
}

function Home(props) {
  const {theme, navigation} = props;

  const alert = useAlert();

  const [selectedTab, setSelectedTab] = useState(0);

  const {loading, projects} = useSelector(state => state.project);

  const {getProjects} = useProjectActions();
  const {setProjectData} = useAddProjectActions();
  const {getAllNotifications} = useNotificationActions();

  useEffect(() => {
    getAllNotifications();
    getProjects().then(({value}) => {
      if (!value?.developers?.length) {
        navigation.navigate('ProjectCreationStepOne');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {tabs, projectsData} = useMemo(() => {
    const {developers, suppliers, customers} = projects;

    const _tabs = ['Developer'];
    const data = [developers];

    if (projects?.suppliers?.length) {
      _tabs.push('Supplier');
      data.push(suppliers);
    }
    if (projects?.customers?.length) {
      _tabs.push('Customer');
      data.push(customers);
    }
    return {tabs: _tabs, projectsData: data};
  }, [projects]);

  const handleOnPress = project => {
    if (project.project_structure === 'N') {
      setProjectData(project);
      navigation.navigate('ProjectStructureStepOne');
      return;
    }
    if (project.is_completed === 'N') {
      setProjectData(project);
      navigation.navigate('PlanSelect');
      return;
    }
    if (project.project_approved === 'Y') {
      const params = {project};
      if (tabs[selectedTab] === 'Developer') {
        navigation.navigate('DeveloperDashboard', {
          screen: 'DeveloperDashboard',
          params,
        });
      } else if (tabs[selectedTab] === 'Customer') {
        navigation.navigate('CustomerDashboard', {
          screen: 'Ownership',
          params,
        });
      }
    } else {
      alert.show({
        dismissable: false,
        title: false,
        showCancelButton: false,
        content: (
          <View style={styles.alertContainer}>
            <View style={styles.splashImage}>
              <LottieView source={waiting} autoPlay loop />
            </View>
            <Subheading style={styles.subtitleText}>
              Waiting for Project Approval
            </Subheading>
          </View>
        ),
      });
    }
  };

  const onRefresh = () => getProjects();

  return (
    <>
      <View style={styles.container}>
        <Spinner visible={loading} textContent={''} />
        <StatusBar barStyle="light-content" />
        <View style={styles.headerContainer}>
          <ProjectHeader {...props} showLogo={true} />
          {/* TODO: update tab implementation */}
          {tabs.length > 1 ? (
            <MaterialTabs
              items={tabs}
              selectedIndex={selectedTab}
              onChange={setSelectedTab}
              barColor="#fff"
              indicatorColor={theme.colors.primary}
              inactiveTextColor={'#919191'}
              activeTextColor={theme.colors.primary}
              uppercase={false}
              textStyle={{
                fontFamily: 'Nunito-Regular',
              }}
            />
          ) : null}
        </View>
        {projectsData?.[selectedTab]?.length > 0 ? (
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={onRefresh} />
            }>
            <View style={styles.projectsContainer}>
              {projectsData[selectedTab].map((project, index) => (
                <RenderProject
                  {...props}
                  key={index}
                  project={project}
                  tab={tabs[selectedTab]}
                  handleOnPress={handleOnPress}
                />
              ))}
            </View>
          </ScrollView>
        ) : (
          <View style={styles.noResultContainer}>
            <Subheading>{'No Projects Found'}</Subheading>
          </View>
        )}
      </View>
      {selectedTab === 0 ? (
        <FAB
          style={[styles.fab, {backgroundColor: theme.colors.primary}]}
          icon="plus"
          onPress={() => navigation.navigate('ProjectCreationStepOne')}
        />
      ) : null}
    </>
  );
}

export default withTheme(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    ...getShadow(5),
    backgroundColor: '#fff',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 20,
    bottom: 20,
  },
  scrollView: {
    flexGrow: 1,
  },
  projectsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: PROJECT_CONTAINER_MARGIN,
  },
  projectContainer: {
    borderWidth: 5,
    width: PROJECT_CONTAINER_WIDTH,
    margin: PROJECT_CONTAINER_MARGIN,
    borderRadius: 10,
    borderColor: '#DEE1E7',
  },
  developerImageContainer: {
    paddingTop: 10,
    marginBottom: -25,

    alignItems: 'center',
  },
  developerImage: {
    width: DEVELOPER_IMAGE_WIDTH,
    height: DEVELOPER_IMAGE_WIDTH * 0.8,
  },
  supplierImageContainer: {
    padding: 10,

    alignItems: 'center',
  },
  supplierImage: {
    height: 80,
    width: '80%',
  },
  labelContainer: {
    backgroundColor: '#DEE1E7',
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexGrow: 1,
  },
  projectLabel: {
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  noResultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  splashImage: {
    height: 300,
    width: 300,
  },
  subtitleText: {
    textAlign: 'center',
    color: 'rgba(4, 29, 54, 0.5)',
  },
});

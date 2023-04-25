import React, {useEffect, useMemo, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import {withTheme, Subheading, Caption} from 'react-native-paper';
import developerImage from 'assets/images/developer_building.png';
import supplierImage from 'assets/images/supplier_building.png';
import MaterialTabs from 'react-native-material-tabs';
import {getShadow} from 'utils';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Layout from 'utils/Layout';
import {useAlert} from 'components/Atoms/Alert';
import LottieView from 'lottie-react-native';
import waiting from 'assets/animation/waiting.json';
import subscription from 'assets/animation/project_subscription.json';
import useAddProjectActions from 'redux/actions/addProjectActions';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import useNotificationActions from 'redux/actions/notificationActions';
import useAppActions from 'redux/actions/appActions';
import dayjs from 'dayjs';
import useProjectActions from '../../redux/actions/projectActions';

const IMAGES = {
  Developer: developerImage,
  Supplier: supplierImage,
  Customer: developerImage,
};

const PROJECT_CONTAINER_WIDTH = Layout.window.width * 0.435;
const PROJECT_CONTAINER_MARGIN = Layout.window.width * 0.03;
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

const EXPIRED = true;

const getData = (data = []) =>
  Array.isArray(data) ? data : Object.values(data);

function Home(props) {
  const {theme, navigation} = props;

  const alert = useAlert();

  const [selectedTab, setSelectedTab] = useState(0);

  const {loading, projects} = useSelector(s => s.project);

  const {setDrawerType} = useAppActions();
  const {getProjects} = useProjectActions();
  const {setProjectData} = useAddProjectActions();
  const {getAllNotifications} = useNotificationActions();

  useEffect(() => {
    getAllNotifications();
    getProjects().then(({value}) => {
      // if (!value?.developers?.length) {
      //   navigation.navigate('ProjectCreationStepOne');
      // }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {tabs, projectsData} = useMemo(() => {
    const {developers = [], suppliers, customers} = projects || {};

    const _tabs = ['Developer'];
    const data = [getData(developers)];

    if (suppliers?.length) {
      _tabs.push('Supplier');
      data.push(getData(suppliers));
    }
    if (customers?.length) {
      _tabs.push('Customer');
      data.push(getData(customers));
    }
    return {tabs: _tabs, projectsData: data};
  }, [projects]);

  const checkProjectExpiry = expiry_date => {
    return dayjs().isAfter(dayjs(expiry_date));
  };

  const handleOnPress = project => {
    // if (project.is_completed === 'N' && project.project_structure === 'N') {
    //   setProjectData(project);
    //   navigation.navigate('ProjectStructureStepOne');
    //   return;
    // }
    // if (project.is_completed === 'N') {
    //   setProjectData(project);
    //   navigation.navigate('PlanSelect');
    //   return;
    // }

    if (project.project_approved === 'Y') {
      if (tabs[selectedTab] === 'Developer') {
        if (checkProjectExpiry(project.expired_date)) {
          alert.show({
            dismissable: false,
            title: false,
            showCancelButton: false,
            content: (
              <View style={styles.alertContainer}>
                <View style={styles.splashImage}>
                  <LottieView source={subscription} autoPlay loop />
                </View>
                <Subheading style={styles.subtitleText}>
                  Your project {project?.project_name} subscription is expired,
                  Kindly renew it.
                </Subheading>
              </View>
            ),
          });
        } else {
          setDrawerType('developer');
          navigation.navigate('DeveloperHome', {project});
        }
      } else if (tabs[selectedTab] === 'Customer') {
        setDrawerType('customer');
        navigation.navigate('Ownership', {project});
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

  const renderEmpty = () => (
    <View style={styles.noResultContainer}>
      <Subheading>No Projects Found</Subheading>
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <Spinner visible={loading} textContent="" />
        <StatusBar barStyle="dark-content" />
        <View style={styles.headerContainer}>
          <ProjectHeader {...props} showLogo />
          {/* TODO: update tab implementation */}
          {tabs.length > 1 ? (
            <MaterialTabs
              items={tabs}
              selectedIndex={selectedTab}
              onChange={setSelectedTab}
              barColor="#fff"
              indicatorColor={theme.colors.primary}
              inactiveTextColor="#919191"
              activeTextColor={theme.colors.primary}
              uppercase={false}
              textStyle={styles.text}
            />
          ) : null}
        </View>

        <FlatList
          data={projectsData?.[selectedTab] || []}
          extraData={projectsData?.[selectedTab] || []}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.scrollContainer}
          style={styles.scrollView}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
          ListEmptyComponent={renderEmpty}
          renderItem={({item}) => {
            return (
              <RenderProject
                {...props}
                project={item}
                tab={tabs[selectedTab]}
                handleOnPress={handleOnPress}
              />
            );
          }}
        />
      </View>

      {/* {selectedTab === 0 ? (
        <FAB
          style={[styles.fab, {backgroundColor: theme.colors.primary}]}
          icon="plus"
          onPress={() => navigation.navigate('ProjectCreationStepOne')}
        />
      ) : null} */}
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
  // fab: {
  //   position: 'absolute',
  //   margin: 16,
  //   right: 20,
  //   bottom: 20,
  // },
  scrollView: {
    flexGrow: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  projectContainer: {
    borderWidth: 5,
    paddingTop: 10,
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
    marginTop: 20,
    textAlign: 'center',
    color: 'rgba(4, 29, 54, 0.5)',
  },
  text: {
    fontFamily: 'Nunito-Regular',
  },
});

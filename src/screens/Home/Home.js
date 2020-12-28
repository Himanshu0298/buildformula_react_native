/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {Badge, withTheme, Subheading, Caption, FAB} from 'react-native-paper';
import logo from 'assets/images/logo.png';
import developerImage from 'assets/images/developer_building.png';
import supplierImage from 'assets/images/supplier_building.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialTabs from 'react-native-material-tabs';
import {getShadow} from 'utils';
import useProjectActions from '../../redux/actions/projectActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {secondaryTheme} from 'styles/theme';
import Layout from 'utils/Layout';
import {useAlert} from 'components/Atoms/Alert';
import LottieView from 'lottie-react-native';
import waiting from 'assets/animation/waiting.json';
import {COLORS} from 'utils/constant';
import {SafeAreaView} from 'react-native-safe-area-context';

const TABS = ['Developer', 'Supplier', 'Customer'];

function RenderHeader({theme}) {
  return (
    <SafeAreaView edges={['right', 'top', 'left']}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.banner} />
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity style={styles.bellContainer}>
            <MaterialCommunityIcons name={'bell'} color={'#000'} size={20} />
            <Badge size={10} style={styles.badge} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.personContainer,
              {backgroundColor: COLORS.primaryLight},
            ]}>
            <MaterialIcons
              name={'person'}
              color={theme.colors.primary}
              size={19}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

function RenderProject({project, handleOnPress, tab}) {
  return (
    <TouchableOpacity
      onPress={() => handleOnPress(project)}
      style={styles.projectContainer}>
      {tab === 'Developer' ? (
        <View style={styles.developerImageContainer}>
          <Image source={developerImage} style={styles.developerImage} />
        </View>
      ) : null}
      {tab === 'Supplier' ? (
        <View style={styles.supplierImageContainer}>
          <Image source={supplierImage} style={styles.supplierImage} />
        </View>
      ) : null}
      {tab === 'Customer' ? (
        <View style={styles.developerImageContainer}>
          <Image source={developerImage} style={styles.developerImage} />
        </View>
      ) : null}
      <View style={styles.labelContainer}>
        <Subheading theme={secondaryTheme} style={styles.projectLabel}>
          {project.project_name}
        </Subheading>
        <Caption theme={secondaryTheme} style={styles.projectLabel}>
          {project.project_address}
        </Caption>
      </View>
    </TouchableOpacity>
  );
}

function Home(props) {
  const {theme, navigation} = props;

  const alert = useAlert();

  const [selectedTab, setSelectedTab] = useState(0);

  const {loading, projects} = useSelector((state) => state.project);

  const {getProjects} = useProjectActions();

  useEffect(() => {
    getProjects().then(({value}) => {
      if (value.length === 0) {
        navigation.navigate('ProjectCreationStepOne');
      }
    });
  }, []);

  const projectsData = [projects, [], []];

  const handleOnPress = (project) => {
    if (project.project_approved === 'Y') {
      navigation.navigate('ProjectDashboard', {
        screen: 'ProjectDashboard',
        params: {project},
      });
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
            <Subheading theme={secondaryTheme} style={styles.subtitleText}>
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
          <RenderHeader theme={theme} />
          <MaterialTabs
            items={TABS}
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
        </View>
        {projectsData[selectedTab].length > 0 ? (
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
                  tab={TABS[selectedTab]}
                  handleOnPress={handleOnPress}
                />
              ))}
            </View>
          </ScrollView>
        ) : (
          <View style={styles.noResultContainer}>
            <Subheading theme={secondaryTheme}>
              {'No Projects Found'}
            </Subheading>
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
  header: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {},
  banner: {
    width: 160,
    height: 20,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderWidth: 1,
    borderColor: '#fff',
  },
  personContainer: {
    marginLeft: 15,
    padding: 5,
    borderRadius: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 20,
    bottom: 50,
  },
  scrollView: {
    flexGrow: 1,
  },
  projectsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: Layout.window.width * 0.02,
  },
  projectContainer: {
    borderWidth: 5,
    margin: Layout.window.width * 0.02,
    borderRadius: 10,
    width: Layout.window.width * 0.44,
    borderColor: '#DEE1E7',
  },
  developerImageContainer: {
    paddingTop: 10,
    marginBottom: -25,
    display: 'flex',
    alignItems: 'center',
  },
  developerImage: {
    height: 120,
    width: '90%',
  },
  supplierImageContainer: {
    padding: 10,
    display: 'flex',
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
    display: 'flex',
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

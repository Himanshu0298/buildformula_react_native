/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {Badge, withTheme, Subheading, Caption, FAB} from 'react-native-paper';
import logo from './../../assets/images/logo.png';
import developerImage from './../../assets/images/developer_building.png';
import supplierImage from './../../assets/images/supplier_building.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialTabs from 'react-native-material-tabs';
import {useState} from 'react';
import {getShadow} from '../../utils';
import {useEffect} from 'react';
import useProjectActions from '../../redux/actions/projectActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {secondaryTheme} from '../../styles/theme';
import Layout from '../../utils/Layout';
import useAppActions from '../../redux/actions/appActions';

const TABS = ['Developer', 'Supplier', 'Customer'];

// const projects = [
//   {
//     project: {
//       id: 15,
//       project_id: 'VB5f72537beb5bc',
//       company_name: 'test',
//       company_gst: '1234567899',
//       gst_verified: 'N',
//       gst_url: 'http://vshwanbuild.com/uploads/documents/8843gst_image.jpg',
//       company_tan: '1234567890',
//       tan_verified: 'N',
//       tan_url: 'http://vshwanbuild.com/uploads/documents/31159tan_image.jpg',
//       company_pan: '1234567890',
//       pan_verified: 'N',
//       pan_url: 'http://vshwanbuild.com/uploads/documents/68275pan_image.jpg',
//       rera_url: null,
//       project_name: 'test',
//       project_address: 'test,testing,testVilla 202020',
//       project_rera: '1234567899',
//       project_website: 'www.hello.com',
//       project_email: 'abcdef@gmail.com',
//       project_phone: '1234567890',
//       isPaid: 'N',
//       is_completed: 'N',
//       completed_time: null,
//       created: '2020-09-28 21:19:55',
//       project_approved: 'N',
//       approve_time: null,
//       status: 1,
//       user_id: 74,
//       admin_3: 0,
//       admin_2: 0,
//       project_types: 'N',
//       project_structure: 'N',
//     },
//     projectData: {
//       towerCount: 0,
//     },
//   },
// ];

function RenderHeader({theme}) {
  return (
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
            {backgroundColor: 'rgba(72,114,244,0.3)'},
          ]}>
          <MaterialIcons
            name={'person'}
            color={theme.colors.primary}
            size={19}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function RenderProject({data, navigation, tab}) {
  const {project} = data;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ProjectDashboard');
      }}
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

  const onRefresh = () => {
    getProjects();
  };

  const projectsData = [projects, [], []];

  return (
    <>
      <SafeAreaView style={styles.container}>
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
                  data={project}
                  tab={TABS[selectedTab]}
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
      </SafeAreaView>
      <FAB
        style={[styles.fab, {backgroundColor: theme.colors.primary}]}
        small
        icon="plus"
        onPress={() => navigation.navigate('ProjectCreationStepOne')}
      />
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
    paddingVertical: 15,
    paddingHorizontal: 20,
    display: 'flex',
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
    display: 'flex',
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
    paddingBottom: 60,
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
});

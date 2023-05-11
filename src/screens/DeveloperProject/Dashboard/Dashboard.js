import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import MaterialTabBar from 'components/Atoms/MaterialTabBar';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {TabView} from 'react-native-tab-view';
import useProjectActions from 'redux/actions/projectActions';
import Layout from 'utils/Layout';
import {Subheading} from 'react-native-paper';
import useNotificationActions from 'redux/actions/notificationActions';
import {useProjectLoading} from 'redux/selectors';
import useSalesActions from 'redux/actions/salesActions';
import Activity from './Components/Activity';
import DashboardDetails from './Components/DashboardDetails';

export default function DeveloperDashboard(props) {
  const {route} = props;
  const {project} = route?.params || {};

  const {
    getProjectData,
    getProjectCommonData,
    getDashboardData,
    getProjectPermissions,
    getProjectModules,
  } = useProjectActions();
  const {getProjectNotifications} = useNotificationActions();
  const {getSalesData} = useSalesActions();

  const loading = useProjectLoading();

  const [selectedTab, setSelectedTab] = useState(0);
  const [routes] = React.useState([
    {key: 0, title: 'Dashboard'},
    {key: 1, title: 'Activity'},
  ]);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project?.id]);

  const loadData = () => {
    if (project?.id) {
      getDashboardData(project.id);
      getProjectPermissions(project.id);
      getProjectModules({project_id: project.id});
      getProjectData(project.id);
      getProjectCommonData(project.id);
      getProjectNotifications({project_id: project.id});
      getSalesData({project_id: project.id});
    }
  };

  const renderScene = ({route: {key}}) => {
    switch (key) {
      case 0:
        return <DashboardDetails />;
      case 1:
        return <Activity onRefresh={loadData} />;
      default:
        return <View />;
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />
      <TabView
        navigationState={{index: selectedTab, routes}}
        renderScene={renderScene}
        onIndexChange={setSelectedTab}
        initialLayout={{width: Layout.window.width}}
        renderTabBar={tabBarProps => {
          return (
            <View style={styles.headerContainer}>
              <ProjectHeader {...props} />
              <View style={styles.titleContainer}>
                <Subheading>Project Dashboard</Subheading>
              </View>
              <MaterialTabBar {...tabBarProps} />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    paddingLeft: 20,
  },
});

import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import MaterialTabBar from 'components/Atoms/MaterialTabBar';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {TabView} from 'react-native-tab-view';
import {useSelector} from 'react-redux';
import useProjectActions from 'redux/actions/projectActions';
import Layout from 'utils/Layout';
import {Subheading} from 'react-native-paper';
import Statistics from './Components/Statistics';
import Activity from './Components/Activity';
import useNotificationActions from 'redux/actions/notificationActions';

export default function DeveloperDashboard(props) {
  const {route} = props;
  const {project} = route?.params || {};

  const {
    getProjectData,
    getProjectCommonData,
    getDashboardData,
    getProjectPermissions,
  } = useProjectActions();
  const {getProjectNotifications} = useNotificationActions();

  const {loading} = useSelector(state => state.project);

  const [selectedTab, setSelectedTab] = useState(0);
  const [routes] = React.useState([
    {key: 0, title: 'Stastics'},
    {key: 1, title: 'Activity'},
  ]);

  useEffect(() => {
    getDashboardData(project.id);
    getProjectPermissions(project.id);
    getProjectData(project.id);
    getProjectCommonData(project.id);
    getProjectNotifications({project_id: project.id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  const renderScene = ({route: {key}}) => {
    switch (key) {
      case 0:
        return <Statistics />;
      case 1:
        return <Activity />;
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent={''} />
      <TabView
        navigationState={{index: selectedTab, routes}}
        renderScene={renderScene}
        onIndexChange={setSelectedTab}
        initialLayout={{width: Layout.window.width}}
        renderTabBar={tabBarProps => {
          return (
            <View style={styles.headerContainer}>
              <ProjectHeader />
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

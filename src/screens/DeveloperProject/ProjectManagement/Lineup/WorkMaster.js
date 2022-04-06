import MaterialTabBar from 'components/Atoms/MaterialTabBar';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Subheading, withTheme} from 'react-native-paper';
import {TabView} from 'react-native-tab-view';
import {useSelector} from 'react-redux';
import useProjectManagementActions from 'redux/actions/projectManagementActions';
import {getShadow} from 'utils';
import Layout from 'utils/Layout';
import Milestone from './Components/Milestone';
import WorkCategory from './Components/WorkCategory';

function WorkMaster(props) {
  const {getWorkCategories, getMilestones} = useProjectManagementActions();

  const {selectedProject} = useSelector(s => s.project);
  const {loading} = useSelector(s => s.projectManagement);

  const [selectedTab, setSelectedTab] = useState(0);
  const [routes] = React.useState([
    {key: 0, title: 'Work category'},
    {key: 1, title: 'Milestone'},
  ]);

  useEffect(() => {
    getCategories();
    getMilestoneData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject.id]);

  const getCategories = () => {
    getWorkCategories({
      project_id: selectedProject.id,
      type: 'workcategory',
    });
  };

  const getMilestoneData = () => {
    getMilestones({
      project_id: selectedProject.id,
      type: 'milestone',
    });
  };

  const renderScene = ({route: {key}}) => {
    switch (key) {
      case 0:
        return <WorkCategory {...{selectedProject, getCategories}} />;
      case 1:
        return <Milestone {...{selectedProject, getMilestoneData}} />;
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
              <Subheading style={{marginLeft: 20}}>Project Lineup</Subheading>
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
  headerContainer: {
    ...getShadow(5),
    backgroundColor: '#fff',
  },
});

export default withTheme(WorkMaster);

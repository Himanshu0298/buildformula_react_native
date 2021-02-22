import MaterialTabBar from 'components/Atoms/MaterialTabBar';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Subheading} from 'react-native-paper';
import {TabView} from 'react-native-tab-view';
import {useSelector} from 'react-redux';
import useProjectManagementActions from 'redux/actions/projectManagementActions';
import {getShadow} from 'utils';
import Layout from 'utils/Layout';
import Milestone from './Components/Milestone';
import WorkCategory from './Components/WorkCategory';

function Lineup(props) {
  const {selectedProject} = useSelector((state) => state.project);
  const {getWorks} = useProjectManagementActions();

  const [selectedTab, setSelectedTab] = useState(0);
  const [routes] = React.useState([
    {key: 0, title: 'Work category'},
    {key: 1, title: 'Milestone'},
  ]);

  useEffect(() => {
    getWorks({
      project_id: selectedProject.id,
      type: 'milestone',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject.id]);

  const renderScene = ({route: {key}}) => {
    switch (key) {
      case 0:
        return <WorkCategory />;
      case 1:
        return <Milestone />;
    }
  };

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{index: selectedTab, routes}}
        renderScene={renderScene}
        onIndexChange={setSelectedTab}
        initialLayout={{width: Layout.window.width}}
        renderTabBar={(tabBarProps) => {
          return (
            <View style={styles.headerContainer}>
              <ProjectHeader />
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

export default Lineup;

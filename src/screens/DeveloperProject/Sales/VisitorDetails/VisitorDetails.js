import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {withTheme, FAB} from 'react-native-paper';
import {getPermissions, getShadow} from 'utils';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {theme} from 'styles/theme';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import {TabView} from 'react-native-tab-view';
import Layout from 'utils/Layout';
import MaterialTabBar from 'components/Atoms/MaterialTabBar';
import Details from './Components/Details';
import Activities from './Components/Activities';

function VisitorDetails(props) {
  const {route, navigation} = props;
  const {visitorId} = route?.params || {};

  const [activityFilter, setActivityFilter] = useState('all');
  const modulePermission = getPermissions('Visitors');

  const {getVisitor, getPipelineData, getVisitorActivities} = useSalesActions();

  const [selectedTab, setSelectedTab] = useState(0);
  const [routes] = React.useState([
    {key: 0, title: 'Visitor Info'},
    {key: 1, title: 'Activity'},
  ]);

  const {selectedProject} = useSelector(state => state.project);
  const {
    loading,
    visitor,
    pipelines,
    occupationOptions,
    sourceTypeOptions,
  } = useSelector(s => s.sales);

  useEffect(() => {
    getVisitor({project_id: selectedProject.id, visitor_id: visitorId});
    getPipelineData(selectedProject.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject.id, visitorId]);

  useEffect(() => {
    getVisitorActivities({
      project_id: selectedProject.id,
      visitor_id: visitorId,
      filter_mode: activityFilter,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityFilter]);

  const renderScene = ({route: {key}}) => {
    switch (key) {
      case 0:
        return (
          <Details
            {...props}
            visitor={visitor}
            pipelines={pipelines}
            occupationOptions={occupationOptions}
            sourceTypeOptions={sourceTypeOptions}
            modulePermission={modulePermission}
          />
        );
      case 1:
        return (
          <Activities filter={activityFilter} setFilter={setActivityFilter} />
        );
    }
  };

  const [selectDialog, setSelectDialog] = useState(false);

  const toggleSelectDialog = () => setSelectDialog(v => !v);

  const onStateChange = ({open}) => setSelectDialog(open);

  return (
    <>
      <Spinner visible={loading} textContent={''} />

      <View style={styles.body}>
        <TabView
          navigationState={{index: selectedTab, routes}}
          renderScene={renderScene}
          onIndexChange={setSelectedTab}
          initialLayout={{width: Layout.window.width}}
          renderTabBar={tabBarProps => {
            return (
              <View style={styles.headerContainer}>
                <ProjectHeader {...props} />
                <MaterialTabBar {...tabBarProps} />
              </View>
            );
          }}
        />
        {modulePermission?.editor || modulePermission?.admin ? (
          <FAB.Group
            open={selectDialog}
            style={styles.fab}
            fabStyle={{
              backgroundColor: selectDialog ? '#fff' : theme.colors.primary,
            }}
            icon={selectDialog ? 'window-close' : 'dots-horizontal'}
            small
            onPress={toggleSelectDialog}
            onStateChange={onStateChange}
            actions={[
              {
                icon: 'square-edit-outline',
                label: 'Edit',
                onPress: () => navigation.navigate('AddVisitor', {visitor}),
              },
              {
                icon: 'comment',
                label: 'Add comment',
                onPress: () =>
                  navigation.navigate('AddDetails', {
                    type: 'Comment',
                    visitorId,
                  }),
              },
              {
                icon: 'phone',
                label: 'Add Call Logs',
                onPress: () =>
                  navigation.navigate('AddDetails', {
                    type: 'Call Log',
                    visitorId,
                  }),
              },
              {
                icon: 'arrow-up',
                label: 'Add Follow-Up',
                onPress: () =>
                  navigation.navigate('AddDetails', {
                    type: 'Follow-up',
                    visitorId,
                  }),
              },
            ]}
          />
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    ...getShadow(5),
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
    position: 'relative',
  },
  fab: {
    position: 'absolute',
    right: 0,
  },
});

export default withTheme(VisitorDetails);

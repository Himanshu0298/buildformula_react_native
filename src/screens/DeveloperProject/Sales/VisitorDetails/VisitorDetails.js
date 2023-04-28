import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {withTheme, FAB, IconButton, Subheading} from 'react-native-paper';
import {getPermissions, getShadow} from 'utils';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import {TabView} from 'react-native-tab-view';
import Layout from 'utils/Layout';
import MaterialTabBar from 'components/Atoms/MaterialTabBar';
import {useSalesLoading} from 'redux/selectors';
import Details from './Components/Details';
import Activities from './Components/Activities';

function VisitorDetails(props) {
  const {theme, route, navigation} = props;
  const {visitorId} = route?.params || {};
  const {colors} = theme;

  const [activityFilter, setActivityFilter] = useState('all');
  const modulePermission = getPermissions('Inquiry');

  const {getVisitor, getPipelineData, getVisitorActivities} = useSalesActions();

  const [selectedTab, setSelectedTab] = useState(0);
  const [routes] = React.useState([
    {key: 0, title: 'Basic Info'},
    {key: 1, title: 'Activity'},
  ]);

  const {selectedProject} = useSelector(s => s.project);
  const {visitor, pipelines, occupationOptions, sourceTypeOptions} =
    useSelector(s => s.sales);

  const loading = useSalesLoading();

  useEffect(() => {
    getVisitor({project_id: selectedProject.id, visitor_id: visitorId});
    getPipelineData({project_id: selectedProject.id});
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
          <Activities
            {...props}
            filter={activityFilter}
            setFilter={setActivityFilter}
            visitorId={visitorId}
          />
        );
      default:
        return null;
    }
  };

  const [selectDialog, setSelectDialog] = useState(false);

  const toggleSelectDialog = () => setSelectDialog(v => !v);

  const onStateChange = ({open}) => setSelectDialog(open);

  return (
    <>
      <Spinner visible={loading} textContent="" />

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
                <TouchableOpacity
                  style={styles.headingContainer}
                  onPress={navigation.goBack}>
                  <IconButton
                    icon="keyboard-backspace"
                    size={25}
                    color={colors.primary}
                  />
                  <Subheading style={{color: colors.primary}}>
                    Inquiry Details
                  </Subheading>
                </TouchableOpacity>
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
              backgroundColor: selectDialog ? colors.white : colors.primary,
            }}
            icon={selectDialog ? 'window-close' : 'dots-horizontal'}
            small
            onPress={toggleSelectDialog}
            onStateChange={onStateChange}
            actions={[
              {
                icon: 'message',
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
              {
                icon: 'square-edit-outline',
                label: 'Edit Visitor Info ',
                onPress: () => navigation.navigate('AddVisitor', {visitor}),
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
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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

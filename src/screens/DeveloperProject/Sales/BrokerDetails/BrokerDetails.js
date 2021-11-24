import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {
  withTheme,
  Caption,
  Paragraph,
  FAB,
  IconButton,
  Text,
} from 'react-native-paper';
import {getPermissions, getShadow} from 'utils';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import Spinner from 'react-native-loading-spinner-overlay';
import {theme} from 'styles/theme';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import {PRIORITY_COLORS, STRUCTURE_TYPE_LABELS} from 'utils/constant';
import {TabView} from 'react-native-tab-view';
import Layout from 'utils/Layout';
import MaterialTabBar from 'components/Atoms/MaterialTabBar';
import CustomBadge from 'components/Atoms/CustomBadge';
import BrokerInfo from './Components/BrokerInfo';
import DealsClosed from './Components/DealsClosed';

function BrokerDetails(props) {
  const {route, navigation} = props;
  const {userData} = route.params;

  const {getBrokerDetails} = useSalesActions();

  const {selectedProject} = useSelector(s => s.project);
  const {loading, brokerDetails} = useSelector(state => state.sales);

  const projectId = selectedProject.id;

  const [selectedTab, setSelectedTab] = useState(0);
  const [routes] = React.useState([
    {key: 0, title: 'Broker Info'},
    {key: 1, title: 'Deals Closed'},
  ]);

  console.log('----->brokerDetails', brokerDetails);

  useEffect(() => {
    getBrokerDetails({project_id: projectId, broker_id: userData.id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, userData.id]);

  const renderScene = ({route: {key}}) => {
    switch (key) {
      case 0:
        return <BrokerInfo userData={userData} navigation={navigation} />;
      case 1:
        return (
          <DealsClosed
            navigation={navigation}
            dealsClosed={brokerDetails.dealClosedInfo || []}
          />
        );
    }
  };

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
});

export default withTheme(BrokerDetails);

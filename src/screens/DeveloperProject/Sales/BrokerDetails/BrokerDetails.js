import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {withTheme} from 'react-native-paper';
import {getShadow} from 'utils';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import {TabView} from 'react-native-tab-view';
import Layout from 'utils/Layout';
import MaterialTabBar from 'components/Atoms/MaterialTabBar';
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

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, userData.id]);

  const loadData = async () => {
    await getBrokerDetails({project_id: projectId, broker_id: userData.id});
  };

  const renderScene = ({route: {key}}) => {
    switch (key) {
      case 0:
        return (
          <BrokerInfo
            brokerInfo={brokerDetails.brokerInfo}
            userData={userData}
            navigation={navigation}
          />
        );
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

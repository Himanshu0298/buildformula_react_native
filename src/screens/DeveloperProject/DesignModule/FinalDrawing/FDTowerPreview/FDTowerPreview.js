import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {IconButton, Title} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RenderTowerBox} from 'components/Molecules/TowerSelector';
import {TabView} from 'react-native-tab-view';

import FDTabBar from '../Components/TabBar';
import FinalDrawingTowerFiles from '../Components/TowerFiles';
import FDFloorSelector from '../Components/FDFloorSelector';

function FDTowerPreview(props) {
  const {navigation, route} = props;

  const {towerLabel} = route?.params || {};

  const towerId = 1;

  const [selectedTab, setSelectedTab] = useState(0);

  const [routes] = useState([
    {key: 'first', title: 'Tower Files'},
    {key: 'second', title: 'Floor-wise Files'},
  ]);

  const renderTabBar = prop => (
    <View style={styles.headerSubContainer}>
      <FDTabBar {...prop} />
    </View>
  );
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <FinalDrawingTowerFiles {...props} />;
      case 'second':
        return <FDFloorSelector {...props} />;

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.titleContainer}
          onPress={navigation.goBack}>
          <IconButton icon="keyboard-backspace" />
          <Title> Towers</Title>
        </TouchableOpacity>
      </View>
      <View style={styles.towerContainer}>
        <RenderTowerBox towerId={towerId} label={towerLabel} active />
      </View>

      <View style={styles.mainContainer}>
        <TabView
          navigationState={{index: selectedTab, routes}}
          onIndexChange={setSelectedTab}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: -15,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  towerContainer: {
    backgroundColor: '#F5F2F3',
  },

  headerSubContainer: {
    backgroundColor: '#fff',
  },
  mainContainer: {
    flex: 1,
  },
});

export default FDTowerPreview;

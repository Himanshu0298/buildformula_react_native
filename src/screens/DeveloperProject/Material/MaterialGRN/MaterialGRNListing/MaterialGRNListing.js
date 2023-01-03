import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Subheading} from 'react-native-paper';
import {TabView} from 'react-native-tab-view';
import {getShadow} from 'utils';
import MaterialTabBar from 'components/Atoms/MaterialTabBar';
import MaterialGRN from '../FromPoGRNList/MaterialGRN';
import DirectGRN from '../DirectGRN';

const MaterialGRNListing = props => {
  const [selectedTab, setSelectedTab] = useState(0);

  const [routes] = useState([
    {key: 'first', title: 'From PO'},
    {key: 'second', title: 'Direct'},
  ]);

  const renderTabBar = prop => (
    <View style={styles.headerContainer}>
      <MaterialTabBar {...prop} />
    </View>
  );

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <MaterialGRN {...props} />;
      case 'second':
        return <DirectGRN {...props} />;

      default:
        return null;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Subheading style={styles.header}>Goods Received Note</Subheading>
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
};

export default MaterialGRNListing;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    ...getShadow(5),
    backgroundColor: '#fff',
  },
  header: {
    paddingLeft: 15,
    marginBottom: 10,
  },
});

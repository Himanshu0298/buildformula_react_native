import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {withTheme} from 'react-native-paper';

import {TabView} from 'react-native-tab-view';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import Layout from 'utils/Layout';
import MaterialTabBar from 'components/Atoms/MaterialTabBar';
import {getShadow} from 'utils';
import ProjectSheet from './Components/ProjectSheet';
import CategorySheet from './Components/CategorySheet/CategorySheet';
import UnitSheet from './Components/UnitAreaSheet/UnitSheet';

function AreaSheetSection(props) {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const [routes] = React.useState([
    {key: 0, title: 'Project'},
    {key: 1, title: 'Category'},
    {key: 2, title: 'Unit'},
  ]);

  const renderScene = ({route: {key}}) => {
    switch (key) {
      case 0:
        return <ProjectSheet {...props} />;
      case 1:
        return <CategorySheet {...props} />;
      case 2:
        return <UnitSheet {...props} />;
      default:
        return <View />;
    }
  };

  return (
    <TabView
      navigationState={{index: selectedTab, routes}}
      renderScene={renderScene}
      onIndexChange={setSelectedTab}
      initialLayout={{width: Layout.window.width}}
      renderTabBar={tabBarProps => {
        return (
          <>
            {/* <Spinner visible={loading} textContent="" /> */}
            <View style={styles.headerContainer}>
              <ProjectHeader {...props} />
              <MaterialTabBar {...tabBarProps} />
            </View>
          </>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#fff',
    marginHorizontal: -10,
    ...getShadow(2),
  },
});

export default withTheme(AreaSheetSection);

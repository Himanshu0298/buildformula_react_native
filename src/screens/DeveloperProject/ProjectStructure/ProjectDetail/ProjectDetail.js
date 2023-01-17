import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {IconButton, Subheading} from 'react-native-paper';
import {TabView} from 'react-native-tab-view';
import {getShadow} from 'utils';
import MaterialTabBar from 'components/Atoms/MaterialTabBar';
import ProjectPreview from './ProjectPreview';
import StructurePreview from './StructurePreview';

function ProjectDetail(props) {
  const {navigation} = props;
  const [selectedTab, setSelectedTab] = useState(0);

  const [routes] = useState([
    {key: 'first', title: 'Details'},
    {key: 'second', title: 'Structure'},
  ]);

  const renderTabBar = prop => (
    <View style={styles.headerContainer}>
      <MaterialTabBar {...prop} />
    </View>
  );

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <ProjectPreview {...props} />;
      case 'second':
        return <StructurePreview {...props} />;

      default:
        return null;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerWrapper}>
        <IconButton
          icon="keyboard-backspace"
          size={18}
          color="#4872f4"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Subheading style={styles.header}>Project Details</Subheading>
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
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  backIcon: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    marginRight: 11,
  },
});

export default ProjectDetail;

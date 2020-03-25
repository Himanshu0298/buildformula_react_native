import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Layout from '../../util/Layout';
import menuIcon from '../../assets/images/menu.png';
import providersIcon from '../../assets/images/providers.png';

const renderAbsoluteHeader = (navigation) => {
  return (
    <View style={styles.absoluteHeader}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Image style={styles.headerIcon} source={menuIcon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image style={styles.headerIcon} source={providersIcon} />
      </TouchableOpacity>
    </View>
  );
};

const renderContent = () => (
  <View style={styles.panel}>
    <Text>Hello</Text>
  </View>
);

const renderHeader = () => (
  <View style={styles.header}>
    <View style={styles.panelHeader}>
      <View style={styles.panelHandle} />
    </View>
  </View>
);

export default function Home(props) {

  const bs = React.createRef();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#eaeff1" />
      <BottomSheet
        ref={bs}
        snapPoints={[Layout.window.height, 300]}
        renderContent={renderContent}
        overdragResistanceFactor={0}
        enabledInnerScrolling={false}
        renderHeader={renderHeader}
        initialSnap={1}
      />
      <View style={styles.contentContainer}>
        {renderAbsoluteHeader(props.navigation)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeff1',
  },
  //Content (Maps)
  contentContainer: {
    position: 'relative',
  },
  //Top Icons for Menu and providers
  absoluteHeader: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerIcon: {
    height: 40,
    width: 40,
  },
  //Bottom Panel 
  panel: {
    height: Layout.window.height,
    backgroundColor:'#fff',
    padding: 20,
    elevation: 4,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  header: {
    shadowColor: '#000000',
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 7,
  },
});

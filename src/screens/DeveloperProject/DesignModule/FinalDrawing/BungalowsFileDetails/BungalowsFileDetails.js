import {RenderTowerBox} from 'components/Molecules/TowerSelector';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IconButton, Text, Title} from 'react-native-paper';
import {theme} from 'styles/theme';
import FinalDrawingTowerFiles from '../Components/TowerFiles';

function BungalowsFileDetails(props) {
  const {navigation} = props;

  const towerId = 1;
  const towerLabel = '01';
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

      <View style={{margin: 10}}>
        <Text style={{color: theme.colors.primary}}>
          {towerLabel} Bungalow File
        </Text>
      </View>

      <FinalDrawingTowerFiles navigation={navigation} />
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
});

export default BungalowsFileDetails;

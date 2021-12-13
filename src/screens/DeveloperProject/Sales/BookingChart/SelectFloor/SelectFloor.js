import React from 'react';
import {FlatList, View, StyleSheet, TouchableOpacity} from 'react-native';
import FloorBar from 'components/Atoms/FloorBar';
import {Button, IconButton, Subheading, withTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {RenderTowerBox} from 'components/Molecules/TowerSelector';

function SelectFloor(props) {
  const {route, navigation} = props;
  const {selectedStructure, towerType, towerId} = route.params || {};

  const {selectedProject} = useSelector(state => state.project);

  const structureData = selectedProject.projectData?.[selectedStructure] || {};

  const {floors} = structureData.towers[towerId];

  return (
    <View style={styles.container}>
      <Subheading>{towerType}</Subheading>

      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.titleContainer}
          onPress={navigation.goBack}>
          <IconButton icon="keyboard-backspace" />
          <RenderTowerBox {...props} towerId={towerId} active />
        </TouchableOpacity>
        <Button mode="contained" uppercase={false} onPress={navigation.goBack}>
          Change {towerType}
        </Button>
      </View>

      <Subheading style={{marginBottom: 10}}>Floors</Subheading>

      <FlatList
        data={Object.keys(floors)}
        contentContainerStyle={styles.contentContainerStyle}
        extraData={{...floors}}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyExtractor={item => item.toString()}
        renderItem={({item: floorId, index}) => (
          <FloorBar
            {...props}
            {...{floorId, index, towerId, floorData: floors}}
            inputProps={{
              value: floors?.[floorId]?.unitCount?.toString() || '',
              disabled: true,
            }}
            buttonProps={{color: '#5B6F7C'}}
            onPressNext={() =>
              navigation.navigate('BC_Step_Four', {floorId, ...route.params})
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
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
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 30,
    paddingTop: 5,
  },
});

export default withTheme(SelectFloor);

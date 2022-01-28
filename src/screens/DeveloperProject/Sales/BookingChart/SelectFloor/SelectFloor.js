import React from 'react';
import {FlatList, View, StyleSheet, TouchableOpacity} from 'react-native';
import FloorBar from 'components/Atoms/FloorBar';
import {IconButton, Subheading, withTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {RenderTowerBox} from 'components/Molecules/TowerSelector';
import NoResult from 'components/Atoms/NoResult';

function SelectFloor(props) {
  const {route, navigation} = props;
  const {selectedStructure, towerType, towerId} = route?.params || {};

  const {selectedProject} = useSelector(s => s.project);

  const structureData =
    selectedProject.project_structure?.[selectedStructure] || {};

  const {floors = {}} =
    structureData?.towers.find(i => i.tower_id === towerId) || {};

  const renderNoFloor = () => <NoResult title="No Floors available" />;

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
      </View>

      <Subheading style={styles.floorsTitle}>Floors</Subheading>

      <FlatList
        data={Object.keys(floors)}
        contentContainerStyle={styles.contentContainerStyle}
        extraData={{...floors}}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyExtractor={item => item.toString()}
        ListEmptyComponent={renderNoFloor}
        renderItem={({item: floorId, index}) => {
          const {structureType} = floors[floorId];

          return (
            <FloorBar
              {...props}
              {...{floorId, index, towerId, floorData: floors}}
              inputProps={{
                value: floors?.[floorId]?.unitCount?.toString() || '',
                disabled: true,
              }}
              buttonProps={{color: '#5B6F7C'}}
              onPressNext={() =>
                navigation.navigate('BC_Step_Four', {
                  floorId,
                  structureType,
                  ...route.params,
                })
              }
            />
          );
        }}
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
  floorsTitle: {
    marginVertical: 10,
  },
});

export default withTheme(SelectFloor);

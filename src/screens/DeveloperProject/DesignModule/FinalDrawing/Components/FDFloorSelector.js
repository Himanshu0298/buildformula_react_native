import React, {useState} from 'react';
import {FlatList, View, StyleSheet, Text} from 'react-native';
import FloorBar from 'components/Atoms/FloorBar';
import {Subheading, withTheme} from 'react-native-paper';

import NoResult from 'components/Atoms/NoResult';

import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import Spinner from 'react-native-loading-spinner-overlay';
import useDesignModuleActions from 'redux/actions/designModuleActions';
import {useSelector} from 'react-redux';
import FDFloorBar from './FDFloorbar';

function FDFloorSelector(props) {
  const {navigation, loadingUnitStatus, route} = props || {};

  const {folderId, tower_id} = route?.params || {};

  const [selectedFloor, setSelectedFloor] = useState([]);

  const {getFDTowerFloors} = useDesignModuleActions();

  const {fdTowerFloorsList} = useSelector(s => s.designModule);
  const {selectedProject} = useSelector(s => s.project);
  const project_id = selectedProject.id;

  const floors = fdTowerFloorsList?.data?.floors || [];

  React.useEffect(() => {
    loadFloors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadFloors = () => {
    getFDTowerFloors({
      project_id,
      folder_id: folderId,
      tower_id,
    });
  };

  const navToFloorFolder = floorId => {
    navigation.navigate('FDFloorFolder', {folderId, tower_id, floorId});
  };

  const navToAddRow = () => {
    navigation.navigate('AddRows', {folderId, tower_id});
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loadingUnitStatus} textContent="" />
      <View style={styles.headerContainer}>
        <Subheading>Floors</Subheading>
        <OpacityButton opacity={0.1} color="#4872f4" onPress={navToAddRow}>
          <Text style={{color: '#4872f4', padding: 5}}>Add Rows</Text>
        </OpacityButton>
      </View>

      <FlatList
        data={floors}
        contentContainerStyle={styles.contentContainerStyle}
        extraData={floors}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyExtractor={item => item.id}
        ListEmptyComponent={<NoResult />}
        renderItem={({item: floorData, index}) => {
          const {structureType, id: floorId, unitCount} = floorData;

          return (
            <>
              <FDFloorBar
                floorId={floorId}
                towerId={tower_id}
                floorData={floorData}
                toggle
                structureType={structureType}
                inputProps={{
                  value: unitCount?.toString() || '',
                  disabled: true,
                }}
                buttonProps={{color: '#5B6F7C'}}
                onSelectFloor={() => navToFloorFolder(floorId)}
                selectedFloor={selectedFloor}
                index={index}
              />
              {/* {selectedFloor?.includes(floorId)
                ? renderUnits({
                    structureType,
                    floorId,
                    floor_id,
                    index,
                  })
                : null} */}
            </>
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
    marginTop: 15,
  },

  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 30,
    paddingTop: 5,
  },
});

export default withTheme(FDFloorSelector);

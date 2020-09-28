/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {withTheme, Button} from 'react-native-paper';
import FormTitle from '../../../../components/FormTitle';
import {useTranslation} from 'react-i18next';
import {theme} from '../../../../styles/theme';
import {getShadow} from '../../../../utils';
import {useSnackbar} from '../../../../components/Snackbar';
import MaterialTabs from 'react-native-material-tabs';
import TowersScreen from './Components/TowersScreen';
import FloorsScreen from './Components/FloorsScreen';
import UnitsScreen from './Components/UnitsScreen';
import {MAX_TOWERS, MAX_FLOORS} from '../../../../utils/constant';
import useStructureActions from '../../../../redux/actions/structureActions';
import {useSelector} from 'react-redux';

function updateTower(structureType, towerCount) {
  return {
    structure: {
      [structureType]: {
        towerCount: towerCount,
        towers: {},
      },
    },
  };
}

function updateFloor(structure, structureType, towerIndex, floorCount) {
  const {towers} = structure[structureType];
  return {
    structure: {
      [structureType]: {
        towerCount: MAX_TOWERS,
        towers: {
          ...towers,
          [towerIndex]: {
            floorCount,
            floors: {},
          },
        },
      },
    },
  };
}

function StepTwo(props) {
  const {
    navigation,
    route: {params = {}},
  } = props;
  const {structureType = 1} = params;

  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTower, setSelectedTower] = useState();

  const {t} = useTranslation();
  const snackbar = useSnackbar();

  const {updateStructure, saveTowersCount} = useStructureActions();

  const {structureTypes, structure} = useSelector((state) => state.structure);
  const {user} = useSelector((state) => state.user);

  const toggleSelectedTower = (value) => {
    if (selectedTower === value) {
      setSelectedTower(undefined);
    } else {
      setSelectedTower(value);
    }
  };

  const updateTowers = (value) => {
    if (value && value > MAX_TOWERS) {
      snackbar.showMessage({
        variant: 'warning',
        message: `Max ${MAX_TOWERS} towers are allowed`,
      });
      updateStructure(updateTower(structureType, MAX_TOWERS));
    } else {
      updateStructure(updateTower(structureType, value));
    }
  };

  const updateFloors = (value) => {
    if (value && value > MAX_FLOORS) {
      snackbar.showMessage({
        variant: 'warning',
        message: `Max ${MAX_FLOORS} floors are allowed`,
      });
      updateStructure(updateFloor(structureType, selectedTower, MAX_FLOORS));
    } else {
      updateStructure(updateFloor(structureType, selectedTower, value));
    }
  };

  const saveTowers = () => {
    let formData = new FormData();

    formData.append('current_type_id', structureType);
    formData.append('tower', structure[structureType].towerCount);
    formData.append('user_id', user.id);
    formData.append('project_id', 1);

    saveTowersCount(formData).then(() => {
      setSelectedTab(1);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      <FormTitle
        title={t('projectStructureApartment')}
        subTitle={t('projectStructureSubtitleTowers')}
      />
      <View style={styles.barContainer}>
        <MaterialTabs
          items={['Towers', 'Floors', 'Units']}
          selectedIndex={selectedTab}
          onChange={setSelectedTab}
          barColor="#fff"
          indicatorColor={theme.colors.primary}
          inactiveTextColor={'#ccc'}
          activeTextColor={theme.colors.primary}
          uppercase={false}
          textStyle={{
            fontFamily: 'Nunito-Regular',
          }}
        />
      </View>
      {selectedTab === 0 ? (
        <TowersScreen
          towers={structure[structureType].towerCount}
          selectedTower={selectedTower}
          onChangeTowers={updateTowers}
          toggleSelectedTower={toggleSelectedTower}
          saveTowers={saveTowers}
        />
      ) : null}
      {selectedTab === 1 ? (
        <FloorsScreen
          floors={structure[structureType].towers[selectedTower].floorCount}
          onChangeFloors={updateFloors}
        />
      ) : null}
      {selectedTab === 2 ? <UnitsScreen /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  barContainer: {
    ...getShadow(5),
    backgroundColor: '#fff',
  },
});

export default withTheme(StepTwo);

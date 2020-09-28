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

function StepTwo(props) {
  const {navigation} = props;

  const [selectedTab, setSelectedTab] = useState(0);
  const [towers, setTowers] = useState(10);
  const [floors, setFloors] = useState();

  const {t} = useTranslation();
  const snackbar = useSnackbar();

  const updateTowers = (value) => {
    if (value && value > MAX_TOWERS) {
      snackbar.showMessage({
        variant: 'warning',
        message: `Max ${MAX_TOWERS} towers are allowed`,
      });
      setTowers(MAX_TOWERS);
    } else {
      setTowers(value);
    }
  };

  const updateFloors = (value) => {
    if (value && value > MAX_FLOORS) {
      snackbar.showMessage({
        variant: 'warning',
        message: `Max ${MAX_FLOORS} floors are allowed`,
      });
      setFloors(MAX_FLOORS);
    } else {
      setFloors(value);
    }
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
        <TowersScreen towers={towers} onChangeTowers={updateTowers} />
      ) : null}
      {selectedTab === 1 ? (
        <FloorsScreen floors={floors} onChangeFloors={updateFloors} />
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

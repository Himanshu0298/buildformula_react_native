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

function StepTwo(props) {
  const {navigation} = props;

  const [selectedTab, setSelectedTab] = useState(0);
  const [towers, setTowers] = useState(10);

  const {t} = useTranslation();
  const snackbar = useSnackbar();

  const updateTowers = (value) => {
    if (value && value > 30) {
      snackbar.showMessage({
        variant: 'warning',
        message: 'Max 30 towers are allowed',
      });
      setTowers(30);
    } else {
      setTowers(value);
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
      {selectedTab === 1 ? <FloorsScreen /> : null}
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

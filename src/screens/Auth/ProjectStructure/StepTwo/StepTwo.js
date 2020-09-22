import React, {useState} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Image,
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

function StepTwo(props) {
  const {navigation} = props;

  const [selectedTab, setSelectedTab] = useState(0);

  const {t} = useTranslation();
  const snackbar = useSnackbar();

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

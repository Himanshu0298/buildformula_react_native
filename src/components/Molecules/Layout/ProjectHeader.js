import React from 'react';
import {Subheading, Badge, withTheme} from 'react-native-paper';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {secondaryTheme} from 'styles/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import CountDown from 'react-native-countdown-component';
import useSalesActions from 'redux/actions/salesActions';

function ProjectHeader({theme, timer}) {
  const {toggleTimer} = useSalesActions();
  const {selectedProject} = useSelector((state) => state.project);
  const {timerData} = useSelector((state) => state.sales);
  const {showTimer, time} = timerData;

  return (
    <SafeAreaView edges={['right', 'top', 'left']}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Subheading theme={secondaryTheme}>
            {selectedProject.project_name}
          </Subheading>
        </View>
        <View style={styles.rightContainer}>
          {timer && showTimer ? (
            <CountDown
              until={time}
              onFinish={() => toggleTimer()}
              size={11}
              digitStyle={{backgroundColor: theme.colors.primary}}
              digitTxtStyle={{color: '#fff'}}
              timeToShow={['M', 'S']}
              timeLabels={{m: '', s: ''}}
            />
          ) : null}
          <TouchableOpacity style={styles.bellContainer}>
            <MaterialCommunityIcons name={'bell'} color={'#000'} size={20} />
            <Badge size={10} style={styles.badge} />
          </TouchableOpacity>
          <OpacityButton color={theme.colors.primary}>
            <MaterialIcons
              name={'person'}
              color={theme.colors.primary}
              size={19}
            />
          </OpacityButton>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default withTheme(ProjectHeader);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {},
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellContainer: {
    position: 'relative',
    marginLeft: 10,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderWidth: 1,
    borderColor: '#fff',
  },
});

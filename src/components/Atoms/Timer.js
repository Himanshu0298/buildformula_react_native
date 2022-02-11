import React, {useMemo} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import CountDown from 'react-native-countdown-component';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
// import useSalesActions from 'redux/reducers/salesActions';
import useSalesActions from 'redux/actions/salesActions';
import {theme} from 'styles/theme';

function Timer({displayTimer}) {
  const {toggleTimer} = useSalesActions();

  const {timerData} = useSelector(s => s.sales);
  const {showTimer, startTime, time} = timerData;

  const remainingTime = useMemo(() => {
    if (time && startTime) {
      const timeDiff = dayjs(dayjs()).diff(dayjs(startTime), 'second');

      if (timeDiff < time) {
        return time - timeDiff;
      }
      toggleTimer();
    }

    return 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, startTime]);

  if (displayTimer && showTimer) {
    return (
      <CountDown
        until={remainingTime}
        onFinish={toggleTimer}
        size={11}
        digitStyle={{backgroundColor: theme.colors.primary}}
        digitTxtStyle={{color: '#fff'}}
        timeToShow={['M', 'S']}
        timeLabels={{m: '', s: ''}}
      />
    );
  }
  return <View />;
}

Timer.propTypes = {
  displayTimer: PropTypes.bool,
};

Timer.defaultProps = {
  displayTimer: false,
};

export default Timer;

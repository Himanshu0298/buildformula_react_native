import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import CountDown from 'react-native-countdown-component';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import useSalesActions from 'redux/actions/salesActions';
import {theme} from 'styles/theme';

function Timer({displayTimer}) {
  const {toggleTimer} = useSalesActions();

  const {timerData} = useSelector((state) => state.sales);
  let {showTimer, startTime, time} = timerData;

  const [remainingTime, setRemaining] = useState(time);

  useEffect(() => {
    if (time && startTime) {
      const timeDiff = dayjs(dayjs()).diff(startTime, 'second');
      if (timeDiff - time > 0) {
        setRemaining(timeDiff - time);
      } else {
        toggleTimer();
      }
    }

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

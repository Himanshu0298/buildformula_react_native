import { Animated, SafeAreaView, Alert, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { useSelector } from 'react-redux';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from './styles';
import useAuthActions from '../../../redux/actions/authActions';
import BaseText from '../../../components/BaseText';

const { Value, Text: AnimatedText } = Animated;

const CELL_COUNT = 6;

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

const OtpScreen = (props) => {

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [inputProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const { confirmation, user, token } = useSelector(state => state.user);
  const { signUp, login } = useAuthActions();

  const invalidCodeAlert = () => {
    return (
      Alert.alert(
        'Alert',
        'Invalid Code, Please try again',
        [
          { text: 'OK', onPress: () => setValue('') },
        ],
        { cancelable: false },
      )
    );
  };

  const verifyOtp = async () => {
    try {
      await confirmation.confirm(value);

      auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
          login({ user, token });
        }
      });
    } catch (e) {
      console.log('-----> verifyOtp error', e);
      invalidCodeAlert();
    }
  };

  const renderCell = ({ index, symbol, isFocused }) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
          inputRange: [0, 1],
          outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
        })
        : animationsColor[index].interpolate({
          inputRange: [0, 1],
          outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
        }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.root}>
        <BaseText style={styles.title}>Verification</BaseText>
        <BaseText style={styles.subTitle}>
          Please enter the verification code{'\n'}
          send to {`+91 ${user.phone}`}
        </BaseText>

        <CodeField
          ref={ref}
          {...inputProps}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFiledRoot}
          keyboardType="number-pad"
          renderCell={renderCell}
        />
        <TouchableOpacity
          onPress={verifyOtp}
          style={styles.nextButton}>
          <BaseText style={styles.nextButtonText}>Verify</BaseText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OtpScreen;

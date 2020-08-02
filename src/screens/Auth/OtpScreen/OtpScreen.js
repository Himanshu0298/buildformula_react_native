import React, { useState } from 'react';
import { Animated, SafeAreaView, Alert, View, StyleSheet, Platform, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import image from './../../../assets/images/otp.png';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import BaseText from '../../../components/BaseText';
import { theme } from '../../../styles/theme';
import { Button, withTheme } from 'react-native-paper';
import Layout from '../../../utils/Layout';
import Spinner from 'react-native-loading-spinner-overlay';
import useOtpActions from '../../../redux/actions/otpActions';

const CELL_SIZE = 50;
const CELL_BORDER_RADIUS = 8;
const DEFAULT_CELL_BG_COLOR = 'rgba(4, 29, 54, 0.1)';
const NOT_EMPTY_CELL_BG_COLOR = 'rgba(4, 29, 54, 0.1)';
const ACTIVE_CELL_BG_COLOR = '#fff';

const { Value, Text: AnimatedText } = Animated;

const CELL_COUNT = 6;

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 1 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

const OtpInput = ({ value, setValue, colors }) => {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [inputProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

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
      borderWidth: isFocused
        ? animationsScale[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }) : null,
      borderColor: isFocused
        ? animationsScale[index].interpolate({
          inputRange: [0, 1],
          outputRange: ['transparent', colors.primary],
        }) : null,
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
  );
};

const OtpScreen = (props) => {
  const { navigation } = props;

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const { colors } = props.theme;
  const { user, loading } = useSelector(state => state.user);
  const { verifyOtp } = useOtpActions();

  const submit = async () => {
    let formData = new FormData();
    //TODO: Update translations
    formData.append('mobile_otp', phone);
    formData.append('user_id', user.id);
    formData.append('email_otp', email);

    verifyOtp(formData)
      .then(data => {
        navigation.navigate('PackageSelect');
      })
      .catch(error => {
        console.log('-----> error', error);
        Alert.alert(
          'Alert',
          error,
          [
            {
              text: 'OK', onPress: () => {
                if (error === 'Email OTP is invalid') {
                  setEmail('');
                }
                else if (error === 'OTP not match') {
                  setPhone('');
                }
                else {
                  setEmail('');
                  setPhone('');
                }
              },
            },
          ],
          { cancelable: false },
        );
      });
  };



  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={loading}
        textContent={''}
      />
      <View style={styles.root}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>
        <BaseText style={styles.title}>Verification Code</BaseText>
        <BaseText style={styles.subTitle}>
          Enter the OTP send to {`+91 ${user.phone || '1111111111'}`}
          {/* send to {`+91 ${user.phone}`} */}
        </BaseText>
        <OtpInput
          value={phone}
          setValue={setPhone}
          colors={colors}
        />

        <View style={styles.resendContainer}>
          <BaseText style={styles.subTitle}>Didn’t receive a code.</BaseText>
          <TouchableOpacity onPress={() => console.log('----->resend ')}>
            <BaseText style={styles.resend}> Resend</BaseText>
          </TouchableOpacity>
        </View>

        <BaseText style={styles.subTitle}>
          Enter the OTP send to {`${user.email}`}
          {/* send to {`+91 ${user.phone}`} */}
        </BaseText>
        <OtpInput
          value={email}
          setValue={setEmail}
          colors={colors}
        />
        <View style={styles.resendContainer}>
          <BaseText style={styles.subTitle}>Didn’t receive a code.</BaseText>
          <TouchableOpacity onPress={() => console.log('----->resend ')}>
            <BaseText style={styles.resend}> Resend</BaseText>
          </TouchableOpacity>
        </View>
        <Button
          onPress={submit}
          color={colors.primary}
          mode="contained"
          style={styles.nextButton}
          contentStyle={{ paddingVertical: 10, borderRadius: 15 }}
          theme={{ roundness: 18 }}
        >
          CONFIRM
        </Button>
      </View>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  codeFiledRoot: {
    height: CELL_SIZE,
    marginTop: 30,
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  cell: {
    margin: 0,
    height: CELL_SIZE + 5,
    width: CELL_SIZE - 12,
    lineHeight: CELL_SIZE,
    ...Platform.select({ web: { lineHeight: 65 } }),
    fontSize: 30,
    textAlign: 'center',
    color: '#000',

    // // IOS
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,

    // // Android
    // elevation: 3,
  },

  // =======================
  container: {
    height: '100%',
  },
  root: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: Layout.window.width * 0.30,
    height: (Layout.window.width * 0.32),
  },
  title: {
    fontSize: 25,
    color: '#000',
    fontWeight: '500',
    textAlign: 'center',
  },
  subTitle: {
    paddingTop: 10,
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
  },
  resendContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  resend: {
    paddingTop: 10,
    fontSize: 13,
    color: theme.colors.primary,
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 20,
    width: '50%',
  },
  nextButtonText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
});


export default withTheme(OtpScreen);

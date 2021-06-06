import React from 'react';
import {Animated, StyleSheet, Platform} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {withTheme} from 'react-native-paper';
import PropTypes from 'prop-types';

const CELL_SIZE = 50;
const CELL_BORDER_RADIUS = 8;
const DEFAULT_CELL_BG_COLOR = 'rgba(4, 29, 54, 0.1)';
const NOT_EMPTY_CELL_BG_COLOR = 'rgba(4, 29, 54, 0.1)';
const ACTIVE_CELL_BG_COLOR = '#fff';

const {Value, Text: AnimatedText} = Animated;

const CELL_COUNT = 6;

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({hasValue, index, isFocused}) => {
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

function OtpInput(props) {
  const {value, setValue, theme, onFocus} = props;
  const {colors} = theme;

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [inputProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const renderCell = ({index, symbol, isFocused}) => {
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
          })
        : null,
      borderColor: isFocused
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: ['transparent', colors.primary],
          })
        : null,
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
      animateCell({hasValue, index, isFocused});
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
      onFocus={onFocus}
      rootStyle={styles.codeFiledRoot}
      keyboardType="number-pad"
      renderCell={renderCell}
    />
  );
}

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
    ...Platform.select({web: {lineHeight: 65}}),
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
});

OtpInput.protoTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default withTheme(React.memo(OtpInput));

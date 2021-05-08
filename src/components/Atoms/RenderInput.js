import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {TextInput} from 'react-native-paper';
import {theme} from 'styles/theme';

export const RenderError = ({error}) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorStyles}>{error}</Text>
    </View>
  );
};

const RenderInput = React.forwardRef((props, ref) => {
  let {
    error,
    containerStyles,
    style,
    value,
    placeholder,
    label,
    ...rest
  } = props;

  value = value ? (!isNaN(value) ? value.toString() : value) : '';

  return (
    <View style={[styles.container, containerStyles]}>
      <View style={styles.inputContainer}>
        <TextInput
          ref={ref}
          dense
          error={error}
          mode="outlined"
          label={label}
          value={value}
          placeholder={placeholder || label}
          style={[styles.input, style]}
          blurOnSubmit
          theme={{
            roundness: 10,
            colors: {
              underlineColor: 'transparent',
              text: '#000',
              accent: theme.colors.primary,
            },
          }}
          {...rest}
        />
      </View>
      {error && <RenderError error={error} />}
    </View>
  );
});

RenderInput.defaultProps = {
  returnKeyType: 'next',
  autoCapitalize: 'none',
  containerStyles: {},
};

RenderInput.prototype = {
  error: PropTypes.string,
  containerStyles: PropTypes.object,
  ...TextInput.PropTypes,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    width: '100%',
  },
  //Errors
  errorContainer: {
    marginLeft: 15,
  },
  errorStyles: {
    color: 'red',
  },
});

export default RenderInput;

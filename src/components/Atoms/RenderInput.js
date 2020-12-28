import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {TextInput} from 'react-native-paper';
import {theme} from 'styles/theme';

const RenderInput = React.forwardRef((props, ref) => {
  let {error, containerStyles, style, value, ...rest} = props;
  value = value || !isNaN(value) ? value.toString() : value;

  return (
    <View style={[styles.container, containerStyles]}>
      <View style={styles.inputContainer}>
        <TextInput
          ref={ref}
          dense
          error={error}
          mode="outlined"
          value={value}
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
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorStyles}>{error}</Text>
        </View>
      )}
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
    marginLeft: 25,
  },
  errorStyles: {
    color: 'red',
  },
});

export default RenderInput;
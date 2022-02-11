import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {TextInput, withTheme} from 'react-native-paper';
import _ from 'lodash';

export function RenderError({error, style}) {
  return (
    <View style={[styles.errorContainer, style]}>
      <Text style={styles.errorStyles}>{error}</Text>
    </View>
  );
}

const RenderInput = React.forwardRef((props, ref) => {
  let {
    theme,
    error,
    containerStyles,
    style,
    roundness,
    value,
    placeholder,
    label,
    ...rest
  } = props;

  value = (_.isFinite(value) ? value?.toString() : value) || '';

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
            roundness,
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
  roundness: 10,
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
    alignItems: 'center',
  },
  input: {
    flexGrow: 1,
  },
  // Errors
  errorContainer: {
    marginLeft: 15,
  },
  errorStyles: {
    color: 'red',
  },
});

export default withTheme(RenderInput);

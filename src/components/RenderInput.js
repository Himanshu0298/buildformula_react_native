import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {TextInput} from 'react-native-paper';
import {theme} from 'styles/theme';

const RenderInput = React.forwardRef((props, ref) => {
  const {error, containerStyles, ...rest} = props;

  return (
    <View style={[containerStyles, styles.container]}>
      <View style={styles.inputContainer}>
        <TextInput
          {...rest}
          ref={ref}
          dense
          error={error}
          mode="outlined"
          style={styles.input}
          blurOnSubmit
          theme={{
            roundness: 10,
            colors: {
              underlineColor: 'transparent',
              text: '#000',
              accent: theme.colors.primary,
            },
          }}
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

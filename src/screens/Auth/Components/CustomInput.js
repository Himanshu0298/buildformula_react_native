import React, { Fragment } from 'react';
import { StyleSheet, View, TextInput, Image, Text } from 'react-native';
import PropTypes from 'prop-types';

const CustomInput = React.forwardRef(({ icon, error, ...rest }, ref) => (
  <View style={styles.container}>
    <View style={styles.inputContainer}>
      <View style={styles.imageContainer}>
        {icon}
      </View>
      <TextInput
        {...rest}
        ref={ref}
        placeholderTextColor="grey"
        style={styles.input}
        blurOnSubmit
      />
    </View>
    {error &&
      <View style={styles.errorContainer}>
        <Text style={styles.errorStyles}>{error}</Text>
      </View>
    }
  </View>
));

CustomInput.defaultProps = {
  returnKeyType: 'next',
};

CustomInput.prototype = {
  image: PropTypes.element,
  error: PropTypes.string,
  ...TextInput.PropTypes,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width:'100%',
  },
  inputContainer: {
    backgroundColor: '#e6e6e6',
    flexDirection: 'row',
    borderRadius: 20,
    height: 45,
    display: 'flex',
    alignItems: 'center',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    marginHorizontal: 20,
  },
  iconStyle: {
  },
  input: {
    height: 45,
    flex: 1,
  },
  //Errors
  errorContainer: {
    marginLeft: 25,
  },
  errorStyles: {
    color: 'red',
  },
});

export default CustomInput;

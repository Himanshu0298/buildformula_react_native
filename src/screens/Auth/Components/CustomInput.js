import React, { Fragment } from 'react';
import { StyleSheet, View, TextInput, Image, Text } from 'react-native';
import PropTypes from 'prop-types';

const CustomInput = React.forwardRef(({ image, error, ...rest }, ref) => (
  <Fragment>
    <View style={styles.inputContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={{ height: 20, width: 20 }}
          source={image}
        />
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
  </Fragment>
));

CustomInput.defaultProps = {
  returnKeyType: 'next',
};

CustomInput.prototype = {
  image: PropTypes.element,
  error: PropTypes.string,
  ...PropTypes.instanceOf(TextInput),
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 5,
    height: 45,
    marginVertical: 5,
    display: 'flex',
    alignItems: 'center',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    marginHorizontal: 10,
  },
  iconStyle: {
  },
  input: {
    height: 45,
    flex: 1,
  },
  //Errors
  errorContainer: {
    marginLeft: 15,
  },
  errorStyles: {
    color: '#fff',
  },
});

export default CustomInput;

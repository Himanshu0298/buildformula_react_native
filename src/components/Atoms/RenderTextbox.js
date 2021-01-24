import React from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {TextInput} from 'react-native-paper';
import {theme} from 'styles/theme';
import RenderInput from './RenderInput';

const RenderTextBox = React.forwardRef((props, ref) => {
  let {numberOfLines, minHeight, ...rest} = props;

  minHeight = minHeight || numberOfLines * 20;

  return (
    <RenderInput
      {...rest}
      ref={ref}
      name="payment_remark"
      multiline
      numberOfLines={Platform.OS === 'ios' ? null : numberOfLines}
      minHeight={Platform.OS === 'ios' ? minHeight : null}
    />
  );
});

RenderTextBox.defaultProps = {
  numberOfLines: 1,
};

RenderTextBox.prototype = {
  numberOfLines: PropTypes.number.isRequired,
  minHeight: PropTypes.number.isRequired,
  ...RenderInput.PropTypes,
};

export default RenderTextBox;

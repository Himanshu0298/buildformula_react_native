import React from 'react';
import {Platform} from 'react-native';
import PropTypes from 'prop-types';
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
      blurOnSubmit={false}
      returnKeyType={Platform.OS === 'ios' ? 'default' : 'null'}
      numberOfLines={Platform.OS === 'ios' ? null : numberOfLines}
      minHeight={Platform.OS === 'ios' ? minHeight : null}
    />
  );
});

RenderTextBox.defaultProps = {
  numberOfLines: 1,
};

RenderTextBox.propTypes = {
  numberOfLines: PropTypes.number.isRequired,
  minHeight: PropTypes.number,
};

export default RenderTextBox;

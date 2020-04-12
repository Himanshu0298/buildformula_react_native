//@flow

import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

function BaseText({ style, variant, children, ...restProps }) {
  const defaultStyles = {
    fontFamily: `Nunito-${variant.charAt(0).toUpperCase() + variant.slice(1)}`,
    color: '#fff',
  };

  return (
    <Text
      {...restProps}
      style={Array.isArray(style) ?
        [...style, defaultStyles]
        :
        {
          ...defaultStyles,
          ...style,
        }
      }>
      {children}
    </Text >
  );
}

BaseText.defaultProps = {
  variant: 'regular',
};

BaseText.propTypes = {
  variant: PropTypes.oneOf(['regular', 'extraLight', 'light', 'regular', 'semiBold']),
  ...Text.propTypes,
};

export default BaseText;

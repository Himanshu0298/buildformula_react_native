//@flow

import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

function BaseText({ style, variant, children, ...restProps }) {
  return (
    <Text
      {...restProps}
      style={Array.isArray(style) ?
        [...style, { fontFamily: `Poppins-${variant.charAt(0).toUpperCase() + variant.slice(1)}` }]
        :
        {
          fontFamily: `Poppins-${variant.charAt(0).toUpperCase() + variant.slice(1)}`,
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
  variant: PropTypes.string,
  ...Text.propTypes,
};

export default BaseText;

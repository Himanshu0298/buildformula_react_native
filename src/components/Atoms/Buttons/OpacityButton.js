import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {theme} from 'styles/theme';

const hex2rgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

function OpacityButton({style, color, opacity, children, ...restProps}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {backgroundColor: hex2rgba(color, opacity)},
        style,
      ]}
      {...restProps}>
      {children}
    </TouchableOpacity>
  );
}

OpacityButton.propTypes = {
  color: PropTypes.string.isRequired,
  opacity: PropTypes.number,
};

OpacityButton.defaultProps = {
  color: theme.colors.primary,
  opacity: 0.3,
};

const styles = StyleSheet.create({
  button: {
    marginLeft: 15,
    padding: 5,
    borderRadius: 20,
  },
});

export default OpacityButton;
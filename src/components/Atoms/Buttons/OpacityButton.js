import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {theme} from 'styles/theme';

const hex2rgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

function OpacityButton(props) {
  const {style, color, onPress, opacity, children, ...restProps} = props;

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={[
        styles.button,
        {backgroundColor: hex2rgba(color, opacity)},
        style,
      ]}
      onPress={onPress}
      {...restProps}>
      {children}
    </Container>
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
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OpacityButton;

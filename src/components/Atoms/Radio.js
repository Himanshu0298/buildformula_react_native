import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {RadioButton, Text, withTheme} from 'react-native-paper';
import {theme} from 'styles/theme';

const Radio = React.forwardRef((props, ref) => {
  const {value, checked, onChange, label, style, color, ...rest} = props;

  return (
    <TouchableOpacity
      onPress={() => onChange(value)}
      style={[styles.container, style]}>
      <RadioButton.Android
        {...rest}
        value={value}
        color={color}
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => onChange(value)}
      />
      <Text style={[styles.caption, checked ? {color} : {}]}>{label}</Text>
    </TouchableOpacity>
  );
});

Radio.defaultProps = {
  uncheckedColor: '#bcbcbc',
  color: theme.colors.primary,
};

Radio.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  uncheckedColor: PropTypes.string,
  color: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 5,
  },
  caption: {
    marginLeft: 5,
    flexShrink: 1,
  },
});

export default withTheme(Radio);

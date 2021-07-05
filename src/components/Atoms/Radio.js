import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Caption, RadioButton, withTheme} from 'react-native-paper';
import {theme} from 'styles/theme';

const Radio = React.forwardRef((props, ref) => {
  const {value, checked, onChange, label, style, color, ...rest} = props;

  return (
    <TouchableOpacity
      onPress={() => onChange(value)}
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 5,
        ...style,
      }}>
      <RadioButton.Android
        {...rest}
        value={value}
        color={color}
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => onChange(value)}
      />
      <Caption style={[styles.caption, checked ? {color} : {}]}>
        {label}
      </Caption>
    </TouchableOpacity>
  );
});

Radio.defaultProps = {
  onChange: () => {},
  checked: false,
  uncheckedColor: '#bcbcbc',
  color: theme.colors.primary,
};

Radio.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  caption: {
    marginLeft: 5,
    flexShrink: 1,
  },
});

export default withTheme(Radio);

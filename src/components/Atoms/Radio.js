import React from 'react';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Caption, RadioButton, withTheme} from 'react-native-paper';
import {secondaryTheme, theme} from 'styles/theme';

const Radio = React.forwardRef((props, ref) => {
  const {value, checked, onChange, label, style, ...rest} = props;

  return (
    <TouchableOpacity
      onPress={() => onChange(value)}
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 5,
        ...style,
      }}>
      <RadioButton.Android
        {...rest}
        value={value}
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => onChange(value)}
      />
      <Caption style={{marginLeft: 5, flexShrink: 1}}>{label}</Caption>
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

export default withTheme(Radio);

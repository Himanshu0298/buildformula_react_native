import React from 'react';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Caption, Checkbox, withTheme} from 'react-native-paper';
import {secondaryTheme, theme} from 'styles/theme';

const CustomCheckbox = React.forwardRef((props, ref) => {
  const {checked, onChange, label, style, ...rest} = props;

  return (
    <TouchableOpacity
      onPress={() => onChange()}
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        ...style,
      }}>
      <Checkbox.Android
        {...rest}
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => onChange()}
      />
      <Caption style={{marginLeft: 5, flexShrink: 1}} theme={secondaryTheme}>
        {label}
      </Caption>
    </TouchableOpacity>
  );
});

CustomCheckbox.defaultProps = {
  onChange: () => {},
  checked: false,
  uncheckedColor: '#bcbcbc',
  color: theme.colors.primary,
};

CustomCheckbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default withTheme(CustomCheckbox);

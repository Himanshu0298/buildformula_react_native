import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Text, Checkbox, withTheme} from 'react-native-paper';
import {theme} from 'styles/theme';

const CustomCheckbox = React.forwardRef((props, ref) => {
  const {checked, onChange, label, style, checkboxStyle, ...rest} = props;

  return (
    <TouchableOpacity onPress={onChange} style={[styles.container, style]}>
      <Checkbox.Android
        {...rest}
        ref={ref}
        onPress={onChange}
        style={checkboxStyle}
        status={checked ? 'checked' : 'unchecked'}
      />
      {label ? (
        typeof label === 'string' ? (
          <Text style={styles.caption}>{label}</Text>
        ) : (
          label
        )
      ) : null}
    </TouchableOpacity>
  );
});

CustomCheckbox.defaultProps = {
  uncheckedColor: '#bcbcbc',
  color: theme.colors.primary,
  label: '',
};

CustomCheckbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string,
  uncheckedColor: PropTypes.string,
  color: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  caption: {
    marginLeft: 5,
    flexShrink: 1,
  },
});

export default withTheme(CustomCheckbox);

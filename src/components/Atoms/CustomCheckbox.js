import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Text, Checkbox, withTheme} from 'react-native-paper';
import {theme} from 'styles/theme';

const CustomCheckbox = React.forwardRef((props, ref) => {
  const {checked, onChange, label, style, ...rest} = props;

  return (
    <TouchableOpacity onPress={onChange} style={[styles.container, style]}>
      <Checkbox.Android
        {...rest}
        ref={ref}
        status={checked ? 'checked' : 'unchecked'}
      />
      <Text style={styles.caption}>{label}</Text>
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

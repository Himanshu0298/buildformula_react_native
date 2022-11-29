import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {Text} from 'react-native-paper';
import {secondaryTheme, theme} from 'styles/theme';

function CustomBadge(props) {
  const {color: backgroundColor, style, label, labelStyles} = props;

  return (
    <View style={[styles.badge, {backgroundColor}, style]}>
      {label ? (
        <Text theme={secondaryTheme} style={[styles.badgeLabel, labelStyles]}>
          {label}
        </Text>
      ) : null}
    </View>
  );
}

CustomBadge.defaultProps = {
  color: theme.colors.primary,
};

// CustomBadge.propTypes = {
//   color: PropTypes.string.isRequired,
//   label: PropTypes.string,
// };

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeLabel: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 10,
    borderRadius: 10,
  },
});

export default CustomBadge;

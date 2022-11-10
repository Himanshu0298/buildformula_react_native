import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropType from 'prop-types';
import {theme} from 'styles/theme';

function SheetHeader({panelColor, color}) {
  return (
    <View style={[styles.header, {backgroundColor: color, shadowColor: color}]}>
      <View style={styles.panelHeader}>
        <View style={[styles.panelHandle, {backgroundColor: panelColor}]} />
      </View>
    </View>
  );
}

SheetHeader.prototype = {
  panelColor: PropType.string,
  color: PropType.string,
};

SheetHeader.defaultProps = {
  panelColor: '#00000040',
  color: theme.colors.primary,
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
});

export default SheetHeader;

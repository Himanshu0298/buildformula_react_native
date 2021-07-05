import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {addOpacity} from 'utils';
import BaseText from '../BaseText';
import PropTypes from 'prop-types';

function BhkButton({bhk, onPress, selected}) {
  return (
    <View style={styles.bhkContainer}>
      <TouchableOpacity
        onPress={() => onPress(bhk.type)}
        style={[
          styles.bhkButton,
          {
            backgroundColor: selected
              ? addOpacity(bhk.color, 1)
              : addOpacity(bhk.color, 0.1),
          },
        ]}>
        <BaseText
          style={[
            styles.bhkLabel,
            {
              color: selected ? '#fff' : addOpacity(bhk.color, 1),
            },
          ]}>
          {bhk.type} BHK
        </BaseText>
      </TouchableOpacity>
    </View>
  );
}

BhkButton.propTypes = {
  bhk: PropTypes.shape({
    type: PropTypes.number,
    color: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func,
  selected: PropTypes.bool,
};

const styles = StyleSheet.create({
  bhkContainer: {},
  bhkButton: {
    margin: 5,
    paddingHorizontal: 14,
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bhkLabel: {
    fontSize: 13,
  },
});

export default BhkButton;

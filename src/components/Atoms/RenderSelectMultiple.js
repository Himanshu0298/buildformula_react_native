import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Chip} from 'react-native-paper';

import RenderSelect from './RenderSelect';

const RenderSelectMultiple = props => {
  const {value = [], onSelect, ...rest} = props;

  const handleSelect = v => {
    const updatedValue = [...(value || [])];
    const index = updatedValue.indexOf(v);

    if (index !== -1) {
      updatedValue.splice(index, 1);
    } else {
      updatedValue.push(v);
    }

    onSelect?.(updatedValue);
  };

  const handleClose = index => {
    const _value = [...value];
    _value.splice(index, 1);
    onSelect?.(_value);
  };

  return (
    <View>
      <RenderSelect {...rest} onSelect={handleSelect} />
      {value.length ? (
        <View style={styles.valueContainer}>
          {value?.map((item, index) => {
            return (
              <View style={styles.chipContainer} key={item}>
                <Chip onClose={() => handleClose(index)} mode="outlined">
                  <Text>{item} </Text>
                </Chip>
              </View>
            );
          })}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexGrow: 1,
  },
  chipContainer: {
    margin: 2,
  },
});

export default RenderSelectMultiple;

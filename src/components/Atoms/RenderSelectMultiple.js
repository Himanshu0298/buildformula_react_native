import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Chip, useTheme} from 'react-native-paper';

import RenderSelect from './RenderSelect';

const RenderSelectMultiple = props => {
  const {value = [], onSelect, ...rest} = props;

  const theme = useTheme();

  const handleSelect = v => {
    const index = value.indexOf(v);

    if (index !== -1) {
      value.splice(index, 1);
    } else {
      value.push(v);
    }

    onSelect?.(value);
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
          {value.map((item, index) => {
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

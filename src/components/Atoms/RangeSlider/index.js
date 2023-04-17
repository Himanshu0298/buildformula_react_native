import React, {useCallback, useState} from 'react';
import RangeSliderRN from 'rn-range-slider';
import {View, Text} from 'react-native';

import Label from './Label';
import Notch from './Notch';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Thumb from './Thumb';

const RangeSlider = ({min = 0, max = 100, handleChange, rangeData}) => {
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);

  const handleValueChange = useCallback((newLow, newHigh) => {
    console.log(rangeData, newLow !== min, newHigh !== max);
    if (rangeData || newLow !== min || newHigh !== max) {
      const values = {
        low: newLow,
        high: newHigh,
      };
      handleChange(values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 5,
          marginBottom: 10,
        }}>
        <View>
          <Text
            style={[
              {fontStyle: 'italic'},
              {textAlign: 'left', fontSize: 14, color: '#D2D2D2'},
            ]}>
            Min
          </Text>
          <Text
            style={[{fontWeight: 'bold'}, {fontSize: 18, color: '#000000'}]}>
            {rangeData?.low || 0}
          </Text>
        </View>
        <View>
          <Text
            style={[
              {fontStyle: 'italic'},
              {textAlign: 'right', fontSize: 14, color: '#D2D2D2'},
            ]}>
            Max
          </Text>
          <Text
            style={[{fontWeight: 'bold'}, {fontSize: 18, color: '#000000'}]}>
            {rangeData?.high || 0}
          </Text>
        </View>
      </View>
      <RangeSliderRN
        // style={styles.slider}
        min={min}
        max={max}
        low={rangeData?.low || min}
        high={rangeData?.high || max}
        step={1}
        floatingLabel
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        // renderLabel={renderLabel}
        // renderNotch={renderNotch}
        onValueChanged={handleValueChange}
      />
    </>
  );
};

export default RangeSlider;

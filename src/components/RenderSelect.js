import React, {useMemo} from 'react';
import {TouchableOpacity, Keyboard} from 'react-native';
import PropTypes from 'prop-types';
import {TextInput} from 'react-native-paper';
import {secondaryTheme} from '../styles/theme';
import {useActionSheet} from '@expo/react-native-action-sheet';
import RenderInput from './RenderInput';

const RenderSelect = React.forwardRef((props, ref) => {
  let {
    error,
    options,
    destructiveButtonIndex,
    cancelButtonIndex,
    onSelect,
    value,
    ...rest
  } = props;

  const {showActionSheetWithOptions} = useActionSheet();

  let {parsedOptions, withValue} = useMemo(() => {
    if (options[0] && options[0].label) {
      const result = options.map((option) => option.label);
      return {parsedOptions: result, withValue: true};
    }
    return {parsedOptions: options, withValue: false};
  }, [options]);

  value = useMemo(() => {
    if (withValue) {
      let index = options.findIndex((option) => option.value === value);
      if (index > -1) {
        return options[index].label;
      }
    }
    return value;
  }, [options, value, withValue]);

  const toggleOptions = () => {
    Keyboard.dismiss();

    showActionSheetWithOptions(
      {
        options: parsedOptions,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex > 0) {
          let selectedValue = parsedOptions[buttonIndex];
          if (withValue && options[buttonIndex].value) {
            selectedValue = options[buttonIndex].value;
          }
          onSelect(selectedValue);
        }
      },
    );
  };

  return (
    <TouchableOpacity onPress={toggleOptions}>
      <RenderInput
        editable={false}
        {...rest}
        value={value}
        right={
          <TextInput.Icon
            name="menu-down"
            theme={secondaryTheme}
            onPress={toggleOptions}
          />
        }
      />
    </TouchableOpacity>
  );
});

RenderSelect.defaultProps = {
  options: [],
  destructiveButtonIndex: 0,
  cancelButtonIndex: 0,
  onSelect: () => {},
};

RenderSelect.prototype = {
  error: PropTypes.string,
  ...TextInput.PropTypes,
};

export default RenderSelect;

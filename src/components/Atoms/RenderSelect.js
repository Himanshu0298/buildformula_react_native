import React, {useImperativeHandle, useMemo} from 'react';
import {TouchableOpacity, Keyboard} from 'react-native';
import PropTypes from 'prop-types';
import {TextInput} from 'react-native-paper';
import {useActionSheet} from '@expo/react-native-action-sheet';
import truncate from 'lodash/truncate';
import _ from 'lodash';
import RenderInput from './RenderInput';

const RenderSelect = React.forwardRef((props, ref) => {
  let {
    options,
    destructiveButtonIndex,
    onSelect,
    value,
    disabled,
    truncateLength,
    ...rest
  } = props;

  const {showActionSheetWithOptions} = useActionSheet();

  useImperativeHandle(ref, () => ({
    focus: () => {
      toggleOptions();
    },
  }));

  const {parsedOptions, withValue} = useMemo(() => {
    if (options?.[0]?.value) {
      const result = options.map(option => option.label);
      return {parsedOptions: result, withValue: true};
    }
    return {parsedOptions: options, withValue: false};
  }, [options]);

  value = useMemo(() => {
    if (withValue) {
      const index = options.findIndex(option => option.value === value);
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
        options: [...parsedOptions, 'Cancel'],
        cancelButtonIndex: parsedOptions.length,
        destructiveButtonIndex,
      },
      buttonIndex => {
        if (buttonIndex < parsedOptions.length) {
          let selectedValue = parsedOptions[buttonIndex];
          if (
            (withValue && options?.[buttonIndex]?.value) ||
            !isNaN(options?.[buttonIndex]?.value)
          ) {
            selectedValue = options[buttonIndex].value;
          }
          onSelect(selectedValue);
        }
      },
    );
  };

  value = truncateLength ? truncate(value, {length: truncateLength}) : value;

  return (
    <TouchableOpacity disabled={disabled} onPress={toggleOptions}>
      <RenderInput
        editable={false}
        disabled={disabled}
        pointerEvents="none"
        keyboardShouldPersistTaps="always"
        ref={ref}
        {...rest}
        value={value}
        right={
          <TextInput.Icon
            disabled={disabled}
            name="menu-down"
            onPress={toggleOptions}
          />
        }
      />
    </TouchableOpacity>
  );
});

RenderSelect.defaultProps = {
  options: [],
  destructiveButtonIndex: null,
  onSelect: undefined,
};

RenderSelect.prototype = {
  options: PropTypes.array,
  destructiveButtonIndex: PropTypes.number,
  onSelect: PropTypes.func,
};

export default RenderSelect;

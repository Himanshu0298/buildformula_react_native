import React, {useImperativeHandle, useState} from 'react';
import {Keyboard, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import {Button, Dialog, Portal, TextInput, withTheme} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import Layout from 'utils/Layout';
import RenderInput from './RenderInput';

const RenderDatePicker = React.forwardRef((props, ref) => {
  const {
    error,
    value,
    mode,
    onChange,
    theme,
    format,
    min,
    max,
    disabled,
    ...rest
  } = props;

  useImperativeHandle(ref, () => ({
    focus: () => {
      togglePicker();
    },
  }));

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(value || new Date());

  const togglePicker = () => {
    setOpen(v => !v);
    Keyboard.dismiss();
  };

  const handleConfirm = () => {
    togglePicker();
    onChange(date || new Date());
  };

  const valueFormat = format || (mode === 'date' ? 'DD/MM/YYYY' : 'hh:mm A');

  return (
    <>
      <TouchableOpacity
        disabled={disabled}
        onPress={!disabled ? togglePicker : null}>
        <RenderInput
          ref={ref}
          pointerEvents="none"
          editable={false}
          {...rest}
          disabled={disabled}
          error={error}
          value={value ? dayjs(value).format(valueFormat) : value}
          right={
            <TextInput.Icon
              name={
                mode === 'date'
                  ? 'calendar-blank'
                  : 'clock-time-three-outline' && 'calendar-clock-outline'
              }
              onPress={!disabled ? togglePicker : null}
            />
          }
        />
      </TouchableOpacity>
      <Portal>
        <Dialog visible={open} onDismiss={togglePicker}>
          <Dialog.Content>
            <DatePicker
              style={{width: Layout.window.width * 0.8}}
              date={dayjs(date).toDate()}
              mode={mode}
              theme="light"
              onDateChange={setDate}
              minimumDate={min}
              maximumDate={max}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button color={theme.colors.error} onPress={togglePicker}>
              Cancel
            </Button>
            <Button style={{minWidth: 80}} onPress={handleConfirm}>
              Confirm
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
});

RenderDatePicker.defaultProps = {
  mode: 'date',
};

RenderDatePicker.prototype = {
  mode: PropTypes.string,
  ...TextInput.PropTypes,
};

export default withTheme(RenderDatePicker);

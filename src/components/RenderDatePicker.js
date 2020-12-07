import React, {useImperativeHandle, useState} from 'react';
import {Keyboard, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import {Button, Dialog, Portal, TextInput, withTheme} from 'react-native-paper';
import {secondaryTheme} from 'styles/theme';
import RenderInput from './RenderInput';
import DatePicker from 'react-native-date-picker';

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
    ...rest
  } = props;

  useImperativeHandle(ref, () => ({
    focus: () => {
      togglePicker();
    },
  }));

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(value);

  const togglePicker = () => {
    setOpen((v) => !v);
    Keyboard.dismiss();
  };

  const handleConfirm = () => {
    togglePicker();
    onChange(date || new Date());
  };

  const valueFormat = format || mode === 'date' ? 'DD/MM/YYYY' : 'hh:mm A';

  return (
    <>
      <TouchableOpacity onPress={togglePicker}>
        <RenderInput
          ref={ref}
          pointerEvents="none"
          editable={false}
          {...rest}
          error={error}
          value={value ? dayjs(value).format(valueFormat) : value}
          right={
            <TextInput.Icon
              name={
                mode === 'date' ? 'calendar-blank' : 'clock-time-three-outline'
              }
              theme={secondaryTheme}
              onPress={togglePicker}
            />
          }
        />
      </TouchableOpacity>
      <Portal>
        <Dialog visible={open} onDismiss={togglePicker}>
          <Dialog.Content>
            <DatePicker
              date={dayjs(date).toDate()}
              mode={mode}
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
  onChange: () => {},
};

RenderDatePicker.prototype = {
  mode: PropTypes.string,
  ...TextInput.PropTypes,
};

export default withTheme(RenderDatePicker);

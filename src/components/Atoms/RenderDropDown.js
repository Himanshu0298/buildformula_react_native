import React, {forwardRef, useEffect, useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {Menu, useTheme, TextInput, withTheme} from 'react-native-paper';
import RenderInput from './RenderInput';

const DropDown = forwardRef((props, ref) => {
  const theme = useTheme();
  const {
    value,
    setValue,
    label,
    placeholder,
    inputProps,
    list,
    dropDownContainerMaxHeight,
  } = props;
  const [displayValue, setDisplayValue] = useState('');
  const [inputLayout, setInputLayout] = useState({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });
  const [showDropDown, setShowDropDown] = useState(false);

  const toggleDropDOwn = () => setShowDropDown((v) => !v);

  const onLayout = (event: LayoutChangeEvent) => {
    setInputLayout(event.nativeEvent.layout);
  };

  useEffect(() => {
    const _label = list.find((_) => _.value === value)?.label;
    if (_label) {
      setDisplayValue(_label);
    }
  }, [list, value]);

  return (
    <Menu
      visible={showDropDown}
      onDismiss={toggleDropDOwn}
      theme={theme}
      anchor={
        <TouchableOpacity
          ref={ref}
          onPress={toggleDropDOwn}
          onLayout={onLayout}>
          <View pointerEvents={'none'}>
            <RenderInput
              value={displayValue}
              label={label}
              placeholder={placeholder}
              pointerEvents={'none'}
              {...inputProps}
            />
          </View>
        </TouchableOpacity>
      }
      style={{
        maxWidth: inputLayout?.width,
        width: inputLayout?.width,
        marginTop: inputLayout?.height,
      }}>
      <ScrollView style={{maxHeight: dropDownContainerMaxHeight || 200}}>
        {list.map((_item, _index) => (
          <Menu.Item
            key={_index}
            titleStyle={
              value === _item.value
                ? {
                    color: theme.colors.primary,
                  }
                : {}
            }
            onPress={() => {
              setValue(_item.value);
              toggleDropDOwn();
            }}
            title={_item.custom || _item.label}
            style={{width: inputLayout?.width}}
          />
        ))}
      </ScrollView>
    </Menu>
  );
});

function RenderDropDown(props) {
  const {label, value, containerStyles, error, options, onChange} = props;

  return (
    <View style={containerStyles}>
      <DropDown
        label={label}
        mode={'outlined'}
        value={value}
        setValue={onChange}
        list={options}
        inputProps={{
          right: <TextInput.Icon name={'menu-down'} />,
          error,
        }}
      />
    </View>
  );
}

export default withTheme(RenderDropDown);

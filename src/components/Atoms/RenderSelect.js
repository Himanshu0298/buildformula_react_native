import React, {useImperativeHandle, useMemo, useState} from 'react';
import {TouchableOpacity, StyleSheet, View, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {Chip, Searchbar, TextInput, useTheme, Text} from 'react-native-paper';
import truncate from 'lodash/truncate';
import ReactNativeModal from 'react-native-modal';
import {
  initialWindowSafeAreaInsets,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {getShadow} from 'utils';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RenderInput from './RenderInput';
import {SafeAreaContainer} from './SafeAreaContainer';

const RenderSelect = React.forwardRef((props, ref) => {
  const {
    options,
    creatable,
    multiselect,
    onSelect,
    value,
    disabled,
    truncateLength,
    ...rest
  } = props;

  const {colors} = useTheme();

  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useImperativeHandle(ref, () => ({
    focus: () => {
      toggleOptions();
    },
  }));

  const parsedOptions = useMemo(() => {
    let updatedOptions = options?.[0]?.value
      ? [...options]
      : [...options].map(i => ({label: i, value: i}));

    if (searchQuery) {
      updatedOptions = updatedOptions?.filter(i =>
        i?.label?.includes(searchQuery),
      );
    }

    if (creatable && searchQuery) {
      updatedOptions.unshift({
        label: searchQuery,
        value: searchQuery,
        added: true,
      });
    }

    if (creatable) {
      if (multiselect) {
        const existingValue = value?.find(
          i => !updatedOptions.find(o => o.value === i),
        );

        if (value?.length && existingValue) {
          updatedOptions.unshift({label: existingValue, value, added: true});
        }
      } else {
        const existingValue = updatedOptions.find(i => i.value === value);

        if (value && !existingValue) {
          updatedOptions.unshift({label: value, value, added: true});
        }
      }
    }

    return updatedOptions;
  }, [creatable, multiselect, options, searchQuery, value]);

  const displayValue = useMemo(() => {
    // if (multiselect) {
    //   return value?.length ? `${value.length - 1} selected` : '';
    // }
    const index = options.findIndex(option => option.value === value);
    if (index > -1) {
      return options[index].label;
    }
    return truncateLength
      ? truncate(value, {length: truncateLength})
      : value || '';
  }, [options, truncateLength, value]);

  const selectedOptions = useMemo(() => {
    if (multiselect) {
      return parsedOptions?.filter(i => value?.includes(i.value));
    }
    return [];
  }, [multiselect, parsedOptions, value]);

  const toggleOptions = () => setOpen(v => !v);

  const handleMultiSelect = v => {
    const updatedValue = [...(value || [])];
    const index = updatedValue.indexOf(v);
    if (index > -1) {
      updatedValue.splice(index, 1);
    } else {
      updatedValue.push(v);
    }

    onSelect([...updatedValue]);
  };

  const handleSelect = v => {
    onSelect(v);
    setSearchQuery();
    toggleOptions();
  };

  return (
    <>
      <TouchableOpacity disabled={disabled} onPress={toggleOptions}>
        <RenderInput
          ref={ref}
          editable={false}
          disabled={disabled}
          pointerEvents="none"
          multiline
          keyboardShouldPersistTaps="always"
          {...rest}
          value={displayValue}
          right={
            <TextInput.Icon
              disabled={disabled}
              name="menu-down"
              onPress={toggleOptions}
            />
          }
        />
      </TouchableOpacity>
      {selectedOptions?.length ? (
        <View style={styles.valueContainer}>
          {selectedOptions?.map(item => {
            return (
              <View style={styles.chipContainer} key={item.label}>
                <Chip
                  onClose={() => handleMultiSelect(item.value)}
                  mode="outlined">
                  <Text>{item.label} </Text>
                </Chip>
              </View>
            );
          })}
        </View>
      ) : null}
      <ReactNativeModal
        isVisible={open}
        onBackdropPress={toggleOptions}
        onBackButtonPress={toggleOptions}
        style={styles.modal}>
        <View style={styles.container}>
          <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
            <SafeAreaContainer edges={['bottom']}>
              <Searchbar
                theme={{roundness: 5}}
                placeholder="Search"
                style={styles.searchBar}
                inputStyle={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <View style={styles.optionsContainer}>
                <ScrollView
                  style={styles.scrollView}
                  showsVerticalScrollIndicator={false}>
                  {parsedOptions.map(option => {
                    const {label, added, value: optionValue} = option;

                    const selected = multiselect
                      ? value?.includes(optionValue)
                      : value === optionValue;

                    const handle = multiselect
                      ? handleMultiSelect
                      : handleSelect;

                    return (
                      <TouchableOpacity
                        style={styles.optionContainer}
                        onPress={() => handle(optionValue)}>
                        <Text>
                          {added ? 'Add ' : ''}
                          {label}
                        </Text>
                        {selected ? (
                          <MaterialIcon
                            name="check"
                            color={colors.primary}
                            size={20}
                          />
                        ) : null}
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </SafeAreaContainer>
          </SafeAreaProvider>
        </View>
      </ReactNativeModal>
    </>
  );
});

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    flexGrow: 1,
    marginTop: 200,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    width: '100%',
    borderTopRightRadius: 20,
    padding: 20,
  },
  optionsContainer: {
    flexGrow: 1,
    marginTop: 10,
  },
  scrollView: {
    marginBottom: 100,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    backgroundColor: '#fff',
    ...getShadow(2),
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  chipContainer: {
    margin: 2,
  },
});

RenderSelect.defaultProps = {
  options: [],
  destructiveButtonIndex: null,
  onSelect: undefined,
  creatable: false,
  multiselect: false,
};

RenderSelect.prototype = {
  destructiveButtonIndex: PropTypes.number,
  onSelect: PropTypes.func,
  creatable: PropTypes.bool,
  multiselect: PropTypes.bool,
};

export default RenderSelect;

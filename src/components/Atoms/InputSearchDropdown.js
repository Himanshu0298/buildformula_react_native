import _ from 'lodash';
import React, {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Divider, Menu, Searchbar, withTheme} from 'react-native-paper';
import {getShadow} from 'utils';

function InputSearchDropdown(props) {
  const {
    placeholder,
    options,
    searchQuery,
    selected,
    onSelect,
    onChangeText,
    icon,
  } = props;

  const {t} = useTranslation();

  const [isFocused, setFocused] = useState(false);

  const updatedOptions = useMemo(() => {
    if (searchQuery) {
      const _options = [...options];
      _options?.unshift({label: searchQuery, value: searchQuery});
      return _options;
    }

    return options;
  }, [options, searchQuery]);

  const showOptions =
    !_.isFinite(selected) && isFocused && updatedOptions?.length;

  return (
    <>
      <Searchbar
        theme={{roundness: 5}}
        icon={icon}
        placeholder={t(placeholder)}
        onFocus={() => setFocused(true)}
        style={styles.searchBar}
        inputStyle={styles.searchInput}
        value={searchQuery}
        onChangeText={v => {
          onChangeText(v);
          if (!v || (v && selected)) {
            onSelect();
          }
        }}
      />

      {showOptions ? (
        <View style={styles.listContainer}>
          <ScrollView
            nestedScrollEnabled
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled">
            {updatedOptions?.map(({label, value}, index) => {
              return (
                <TouchableOpacity
                  key={index.toString()}
                  hasTVPreferredFocus
                  onPress={() => {
                    Keyboard.dismiss();
                    onChangeText(label);
                    onSelect(value);
                  }}>
                  <Menu.Item title={label} />
                  <Divider />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      ) : null}
    </>
  );
}

InputSearchDropdown.defaultProps = {
  placeholder: 'label_search',
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  listContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 5,
    maxHeight: 200,
    ...getShadow(2),
  },
  searchBar: {
    backgroundColor: 'rgba(4,29,54,0.1)',
    marginVertical: 10,
    borderWidth: 1,

    ...getShadow(2),
  },
  searchInput: {
    fontSize: 17,
  },
});

export default withTheme(InputSearchDropdown);

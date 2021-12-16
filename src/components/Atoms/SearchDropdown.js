import React, {useState} from 'react';
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

function SearchDropdown(props) {
  const {
    placeholder,
    options,
    searchQuery,
    selected,
    onSelect,
    onChangeText,
  } = props;

  const {t} = useTranslation();

  const [isFocused, setFocused] = useState(false);

  return (
    <>
      <Searchbar
        theme={{roundness: 8}}
        placeholder={t(placeholder)}
        onFocus={() => setFocused(true)}
        style={styles.searchBar}
        value={searchQuery}
        onChangeText={v => {
          onChangeText(v);
          if (!v || (v && selected)) {
            onSelect();
          }
        }}
      />

      {Number.isNaN(selected) && isFocused && options?.length > 0 ? (
        <View style={styles.listContainer}>
          <ScrollView
            nestedScrollEnabled
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled">
            {options.map(({label, value}, index) => {
              return (
                <TouchableOpacity
                  key={index.toString()}
                  onPress={() => {
                    Keyboard.dismiss();
                    onChangeText(label);
                    onSelect(value);
                  }}>
                  <Menu.Item icon="account-question-outline" title={label} />
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

SearchDropdown.defaultProps = {
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
    ...getShadow(0),
  },
});

export default withTheme(SearchDropdown);

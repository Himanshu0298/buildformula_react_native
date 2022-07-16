import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {
  Menu,
  Divider,
  IconButton,
  Searchbar,
  Caption,
} from 'react-native-paper';
import {getShadow} from 'utils';
import {csListing} from './csListing';

const CustomerList = ({navigation}) => {
  const [visible, setVisible] = React.useState(false);

  const [filter, setFilter] = React.useState('name');

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const FILTER = [
    {value: 'recent', label: 'Recent'},
    {value: 'asc', label: 'Ascending'},
    {value: 'desc', label: 'Descending'},
  ];

  function listItem() {
    return (
      <View style={{marginTop: 10}}>
        <FlatList
          data={csListing}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CustomerInnerDetails', {
                    id: `${item.id}`,
                  });
                }}>
                <Divider />
                <View style={styles.listContainer} key={item.id}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.idBox}>
                      <Text>{item.id}</Text>
                    </View>
                    <View style={styles.customerDetails}>
                      <Text>{item.name}</Text>
                      <Caption>{item.phone}</Caption>
                    </View>
                  </View>
                  <View style={styles.customerBookings}>
                    <Text>{item.bookings}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Customer List</Text>
        <Menu
          style={styles.filterMenu}
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <IconButton
              icon="filter-variant"
              size={23}
              onPress={openMenu}
              color="#4872f4"
              style={{backgroundColor: 'rgba(72, 114, 244, 0.1)'}}
            />
          }>
          {FILTER.map((i, index) => {
            const active = i.value === filter;
            return (
              <Menu.Item
                index={index?.toString()}
                title={i.label}
                style={active ? {backgroundColor: '#4872f4'} : {}}
                titleStyle={active ? {color: '#fff'} : {}}
                onPress={() => {
                  setFilter(i.value);
                  setVisible(false);
                }}
              />
            );
          })}
        </Menu>
      </View>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search Customer"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.search}
        />
      </View>
      {listItem()}
    </View>
  );
};

export default CustomerList;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 15,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 20,
    color: '#4872f4',
  },
  searchContainer: {
    marginTop: 10,
  },
  listContainer: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  idBox: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    padding: 10,
    borderRadius: 5,
  },
  customerDetails: {
    marginLeft: 10,
  },
  customerBookings: {
    width: 170,
    overflow: 'scroll',
  },
  filterMenu: {
    borderRadius: 10,
    paddingVertical: 0,
  },
  search: {
    backgroundColor: '#EAECF11A',
    borderWidth: 1,
    borderColor: 'rgba(4, 29, 54, 0.1)',
    ...getShadow(0),
  },
});

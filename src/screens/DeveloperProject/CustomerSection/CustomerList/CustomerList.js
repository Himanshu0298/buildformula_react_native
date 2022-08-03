import React, {useEffect, useMemo} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {
  Menu,
  Divider,
  IconButton,
  Searchbar,
  Caption,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import useCustomerActions from 'redux/actions/customerActions';
import {getShadow} from 'utils';

const CustomerList = ({navigation}) => {
  const {selectedProject} = useSelector(s => s.project);

  const project_id = selectedProject.id;

  const {getVisitorCustomerList} = useCustomerActions();

  const {customerList = []} = useSelector(s => s.customer);

  console.log('-------->customerList', customerList);

  useEffect(() => {
    getVisitorCustomerList({project_id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [visible, setVisible] = React.useState(false);

  const toggleMenu = () => setVisible(v => !v);

  const [filter, setFilter] = React.useState('name');

  const [searchQuery, setSearchQuery] = React.useState('');

  const onSearch = v => setSearchQuery(v);

  const filteredCustomer = useMemo(() => {
    return customerList?.filter(
      i =>
        i.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.last_name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [customerList, searchQuery]);

  console.log('-------->filteredCustomer  ', filteredCustomer);

  const FILTER = [
    {value: 'recent', label: 'Recent'},
    {value: 'asc', label: 'Ascending'},
    {value: 'desc', label: 'Descending'},
  ];

  function listItem() {
    return (
      <FlatList
        data={filteredCustomer}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              // style={{borderWidth: 1}}
              onPress={() => {
                navigation.navigate('CustomerInnerDetails', {
                  id: `${item.visitor_id}`,
                  linkedProperty: `${item.linked_property}`,
                  customerId: item.id,
                });
              }}>
              <Divider />
              <View style={styles.listContainer} key={item.id}>
                <View style={styles.customerContainer}>
                  <View style={styles.idBox}>
                    <Text>{index + 1}</Text>
                  </View>
                  <View style={styles.customerDetails}>
                    <Text>{`${item.first_name} ${item.last_name}`}</Text>
                    <Caption>{item.phone}</Caption>
                  </View>
                </View>
                <View style={styles.customerBookings}>
                  <Text>{item.linked_property}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Customer List</Text>
        <Menu
          style={styles.filterMenu}
          visible={visible}
          onDismiss={toggleMenu}
          anchor={
            <IconButton
              icon="filter-variant"
              size={23}
              onPress={toggleMenu}
              color="#4872f4"
              style={styles.iconButton}
            />
          }>
          {FILTER.map((i, index) => {
            const active = i.value === filter;
            return (
              <Menu.Item
                index={index?.toString()}
                title={i.label}
                style={active ? styles.menuItem : {}}
                titleStyle={active ? styles.titleStyle : {}}
                onPress={() => {
                  setFilter(i.value);
                  toggleMenu();
                }}
              />
            );
          })}
        </Menu>
      </View>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search Customer"
          onChangeText={onSearch}
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
    flexGrow: 1,
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
    // overflow: 'hidden',
    justifyContent: 'space-between',
  },
  idBox: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
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
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    ...getShadow(2),
  },
  contentContainerStyle: {
    marginTop: 10,
  },
  iconButton: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
  },
  customerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItem: {
    backgroundColor: '#4872f4',
  },
  titleStyle: {
    color: '#fff',
  },
});
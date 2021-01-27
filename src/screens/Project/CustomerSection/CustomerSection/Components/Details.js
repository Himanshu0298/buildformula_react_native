import * as React from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import {Avatar, Caption, Divider, Text, withTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {secondaryTheme} from 'styles/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function RenderCustomer({customer, navToDetails}) {
  const {profile_pic, name, role} = customer;
  return (
    <>
      <TouchableOpacity
        onPress={() => navToDetails(customer)}
        style={styles.customerContainer}>
        <View style={styles.leftContainer}>
          <Avatar.Image
            size={50}
            source={{
              uri: profile_pic,
            }}
          />
          <View style={styles.nameContainer}>
            <Text>{name}</Text>
            <Caption>{role}</Caption>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={25}
            color="#8B959F"
          />
        </View>
      </TouchableOpacity>
      <Divider style={{marginVertical: 10}} />
    </>
  );
}

function Details(props) {
  const {theme, navigation, route} = props;
  const {params} = route;
  const {customerData} = useSelector((state) => state.customer);
  // const customerDetails = [
  //   {
  //     profile_pic: 'https://reactnative.dev/img/tiny_logo.png',
  //     name: 'James Parker',
  //     role: 'Main customer',
  //   },
  //   {
  //     profile_pic: 'https://reactnative.dev/img/tiny_logo.png',
  //     name: 'James Parker',
  //     role: 'Main customer',
  //   },
  //   {
  //     profile_pic: 'https://reactnative.dev/img/tiny_logo.png',
  //     name: 'James Parker',
  //     role: 'Main customer',
  //   },
  // ];

  const navToDetails = (customer) => {
    navigation.push('CustomerDetails', {customer});
  };

  const navToAdd = (customer) => {
    navigation.push('AddCustomer', {...params});
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {customerData.map((customer, index) => (
          <RenderCustomer
            key={index}
            customer={customer}
            navToDetails={navToDetails}
          />
        ))}
        <View style={styles.addPanel}>
          <TouchableOpacity style={styles.addButton} onPress={navToAdd}>
            <Text style={{color: theme.colors.primary}}>+ Add Joint name</Text>
          </TouchableOpacity>
          <Caption>You can add upto 10 joint names for your property</Caption>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  customerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameContainer: {
    marginLeft: 10,
    marginTop: 7,
    justifyContent: 'space-around',
  },
  addPanel: {
    marginTop: 5,
    backgroundColor: '#E5EAFA',
    padding: 10,
    alignItems: 'center',
  },
  addButton: {
    padding: 5,
  },
});

export default withTheme(Details);

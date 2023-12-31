import * as React from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import {Caption, Divider, Text, withTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getPermissions} from 'utils';
import UserAvatar from 'components/Atoms/UserAvatar';
import {Tabs} from 'react-native-collapsible-tab-view';

function RenderCustomer({customer, navToDetails, index}) {
  const {profile_pic, customer_first_name} = customer;

  return (
    <>
      <TouchableOpacity
        onPress={() => navToDetails(customer, index)}
        style={styles.customerContainer}>
        <View style={styles.leftContainer}>
          <UserAvatar size={50} uri={profile_pic} />
          <View style={styles.nameContainer}>
            <Text>{customer_first_name}</Text>
            <Caption>{index + 1} Member</Caption>
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
  const {theme, navigation, route, isCustomer} = props;
  const {params} = route;

  const modulePermissions = getPermissions('Ownership');

  const {customerData} = useSelector(s => s.customer);

  const navToDetails = (customer, index) => {
    navigation.navigate('CustomerDetails', {
      customer,
      unit: params.unit,
      index,
    });
  };

  const navToAdd = customer => {
    navigation.navigate('AddCustomer', {...params});
  };

  const ContainerView = isCustomer ? ScrollView : Tabs.ScrollView;

  return (
    <ContainerView contentContainerStyle={styles.contentContainerStyle}>
      <View style={styles.container}>
        {customerData?.members?.map((customer, index) => (
          <RenderCustomer
            key={customer.id}
            index={index}
            customer={customer}
            navToDetails={navToDetails}
          />
        ))}
        <View style={styles.addPanel}>
          {modulePermissions?.editor || modulePermissions?.admin ? (
            <TouchableOpacity style={styles.addButton} onPress={navToAdd}>
              <Text style={{color: theme.colors.primary}}>
                + Add Joint name
              </Text>
            </TouchableOpacity>
          ) : null}

          <Caption>You can add upto 10 joint names for your property</Caption>
        </View>
      </View>
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 5,
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
  contentContainerStyle: {
    flexGrow: 1,
  },
});

export default withTheme(Details);

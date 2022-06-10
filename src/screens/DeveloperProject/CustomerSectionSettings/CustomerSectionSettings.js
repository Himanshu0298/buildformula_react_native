import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Divider, Subheading, withTheme} from 'react-native-paper';

const CustomerUserData = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Text>Total Customer Count:</Text>
      <Text>36</Text>
      <Text>Allowed Count:</Text>
      <Text>36</Text>
      <Text>Blocked Count:</Text>
      <Text>0</Text>
    </View>
  );
};

function CustomerSectionSettings(props) {
  return (
    <View style={{flex: 1, marginTop: 10}}>
      <Subheading>Customer Section Settings</Subheading>
      <Divider />
      <CustomerUserData />
    </View>
  );
}

const styles = StyleSheet.create({});

export default withTheme(CustomerSectionSettings);

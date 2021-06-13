import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector} from 'react-redux';
import {BookingDetails} from 'screens/DeveloperProject/CustomerSection/CustomerSection/Components';

function CustomerBooking(props) {
  const {loading} = useSelector(state => state.project);
  const {loading: customerDataLoading} = useSelector(state => state.customer);

  return (
    <View style={styles.container}>
      <Spinner visible={loading || customerDataLoading} textContent="" />
      <BookingDetails {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

export default CustomerBooking;

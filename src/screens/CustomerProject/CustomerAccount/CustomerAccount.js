import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector} from 'react-redux';
import {Account} from 'screens/DeveloperProject/CustomerSection/CustomerSection/Components';

function CustomerAccount(props) {
  const {loading} = useSelector(state => state.project);
  const {loading: customerDataLoading} = useSelector(state => state.customer);

  return (
    <View style={styles.container}>
      <Spinner visible={loading || customerDataLoading} textContent="" />
      <Account {...props} viewOnly={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

export default CustomerAccount;

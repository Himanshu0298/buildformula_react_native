import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector} from 'react-redux';
import {useProjectLoading} from 'redux/selectors';
import {Files} from 'screens/DeveloperProject/CustomerSection/CustomerSection/Components';

function CustomerFiles(props) {
  const {loading: customerDataLoading} = useSelector(s => s.customer);
  const loading = useProjectLoading();

  return (
    <View style={styles.container}>
      <Spinner visible={loading || customerDataLoading} textContent="" />
      <Files {...props} isCustomer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

export default CustomerFiles;

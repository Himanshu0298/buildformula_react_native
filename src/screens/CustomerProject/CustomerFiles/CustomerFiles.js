import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector} from 'react-redux';
import {Files} from 'screens/DeveloperProject/CustomerSection/CustomerSection/Components';

function CustomerFiles(props) {
  const {loading} = useSelector(s => s.project);
  const {loading: customerDataLoading} = useSelector(s => s.customer);

  return (
    <View style={styles.container}>
      <Spinner visible={loading || customerDataLoading} textContent="" />
      <Files {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

export default CustomerFiles;

import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector} from 'react-redux';
import {Account} from 'screens/DeveloperProject/CustomerSection/CustomerSection/Components';

function CustomerAccount(props) {
  const {navigation} = props;

  const {loading, selectedUnit} = useSelector(state => state.project);
  const {loading: customerDataLoading} = useSelector(s => s.customer);

  React.useEffect(() => {
    navigation.setParams({unit: selectedUnit});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUnit]);

  return (
    <View style={styles.container}>
      <Spinner visible={loading || customerDataLoading} textContent="" />
      <Account {...props} showUpdateStatus={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

export default CustomerAccount;

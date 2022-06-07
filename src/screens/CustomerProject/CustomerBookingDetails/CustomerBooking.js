import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector} from 'react-redux';
import {useProjectLoading} from 'redux/selectors';
import {BookingDetails} from 'screens/DeveloperProject/CustomerSection/CustomerSection/Components';

function CustomerBooking(props) {
  const {navigation} = props;

  const {selectedUnit} = useSelector(s => s.project);
  const {loading: customerDataLoading} = useSelector(s => s.customer);
  const loading = useProjectLoading();

  React.useEffect(() => {
    navigation.setParams({unit: selectedUnit});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUnit]);

  return (
    <View style={styles.container}>
      <Spinner visible={loading || customerDataLoading} textContent="" />
      <BookingDetails {...props} isCustomer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

export default CustomerBooking;

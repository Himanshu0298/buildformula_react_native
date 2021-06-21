import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector} from 'react-redux';
import useCustomerActions from 'redux/actions/customerActions';
import useProjectActions from 'redux/actions/projectActions';
import {Details} from 'screens/DeveloperProject/CustomerSection/CustomerSection/Components';

function Ownership(props) {
  const {route, navigation} = props;
  const {project} = route?.params || {};
  const {id: project_id, unit_info} = project;
  unit_info.unit_id = unit_info.id;
  const {unit_id} = unit_info;

  const {
    getProjectData,
    getProjectCommonData,
    setSelectedUnit,
  } = useProjectActions();
  const {
    getCustomerDetails,
    getBookingDetails,
    getBankDetails,
    getModifyRequests,
    getAccountDetails,
  } = useCustomerActions();

  const {loading} = useSelector(state => state.project);
  const {loading: customerDataLoading} = useSelector(state => state.customer);
  const {user} = useSelector(state => state.user);

  React.useEffect(() => {
    setSelectedUnit(unit_info);
    navigation.setParams({unit: unit_info});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit_id]);

  React.useEffect(() => {
    getProjectData(project.id);
    getProjectCommonData(project.id);
    getCustomerDetails({user_id: user.id, project_id, unit_id});
    getBookingDetails({project_id, unit_id});
    getBankDetails({project_id, unit_id});
    getModifyRequests({project_id});
    getAccountDetails({project_id, unit_id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  return (
    <View style={styles.container}>
      <Spinner visible={loading || customerDataLoading} textContent="" />
      <Details {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

export default Ownership;
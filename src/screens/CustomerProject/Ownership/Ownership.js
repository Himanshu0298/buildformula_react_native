import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector} from 'react-redux';
import useCustomerActions from 'redux/actions/customerActions';
import useNotificationActions from 'redux/actions/notificationActions';
import useProjectActions from 'redux/actions/projectActions';
import {useProjectLoading} from 'redux/selectors';
import {Details} from 'screens/DeveloperProject/CustomerSection/CustomerSection/Components';

function Ownership(props) {
  const {route, navigation} = props;
  const {project} = route?.params || {};
  const {id: project_id, unit_info} = project;
  unit_info.unit_id = unit_info.id;
  const {unit_id} = unit_info;

  const {getProjectData, getProjectCommonData, setSelectedUnit} =
    useProjectActions();

  const {getProjectNotifications} = useNotificationActions();

  const {
    getCustomerDetails,
    getBookingDetails,
    getBankDetails,
    getModifyRequests,
    getAccountDetails,
  } = useCustomerActions();

  const {loading: customerDataLoading} = useSelector(s => s.customer);
  const {selectedProject} = useSelector(s => s.project);

  const {user} = useSelector(s => s.user);
  const loading = useProjectLoading();

  React.useEffect(() => {
    setSelectedUnit(unit_info);
    navigation.setParams({unit: unit_info});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit_id]);

  React.useEffect(() => {
    console.log('-------->ownership useeffext');
    getProjectData(project.id);
    getProjectCommonData(project.id);
    getCustomerDetails({user_id: user.id, project_id, unit_id});
    getBookingDetails({project_id, unit_id});
    getBankDetails({project_id, unit_id});
    getModifyRequests({project_id});
    getAccountDetails({project_id, unit_id});
    getProjectNotifications({project_id: selectedProject.id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  return (
    <View style={styles.container}>
      <Spinner visible={loading || customerDataLoading} textContent="" />
      <Details {...props} isCustomer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

export default Ownership;

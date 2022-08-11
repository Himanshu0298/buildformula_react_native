import React, {useEffect, useMemo, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {IconButton, FAB} from 'react-native-paper';
import {useSelector} from 'react-redux';
import useCustomerActions from 'redux/actions/customerActions';
import dayjs from 'dayjs';
import Activities from 'screens/DeveloperProject/Sales/VisitorDetails/Components/Activities';
import {theme} from 'styles/theme';
import useSalesActions from 'redux/actions/salesActions';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSalesLoading} from 'redux/selectors';

const CustDetails = props => {
  const {visitors_info, linkedProperty, BrokerData} = props;
  const {first_name, last_name, email, phone, address, dob, anniversary_date} =
    visitors_info || {};
  return (
    <ScrollView style={styles.custContainer}>
      <View style={styles.valueContainer}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{`${first_name} ${last_name}`}</Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{email}</Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.label}>Phone no.</Text>
        <Text style={styles.value}>{phone}</Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.label}>Related Property</Text>
        <TouchableOpacity onPress={() => console.log('-------->To do')}>
          <Text style={styles.propLink}>{linkedProperty}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.label}>Broker</Text>
        <Text style={styles.value}>
          {BrokerData ? BrokerData?.label : '---'}
        </Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.label}>Birthdate</Text>
        <Text style={styles.value}>
          {dob ? dayjs(dob).format('MMMM D, YYYY	') : '---'}
        </Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.label}>Anniversary Date</Text>
        <Text style={styles.value}>
          {anniversary_date
            ? dayjs(anniversary_date).format('MMMM D, YYYY	')
            : '---'}
        </Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>{address || '---'}</Text>
      </View>
    </ScrollView>
  );
};

const CustomerInnerDetails = ({navigation, route: routeData}) => {
  const {id: visitorId, linkedProperty, customerId} = routeData.params || {};

  const {selectedProject} = useSelector(s => s.project);

  const project_id = selectedProject.id;
  const {colors} = theme;

  const [activityFilter, setActivityFilter] = useState('all');

  const [selectDialog, setSelectDialog] = useState(false);

  const toggleSelectDialog = () => setSelectDialog(v => !v);

  const onStateChange = ({open}) => setSelectDialog({open});

  const {getVisitorCustomerListDetails} = useCustomerActions();
  const {getVisitorActivities} = useSalesActions();
  const loading = useSalesLoading();

  const {customerListDetails, loading: customerLoading} = useSelector(
    s => s.customer,
  );

  const {visitors_info = {}, brokers = []} = customerListDetails || {};

  const brokerOptions = useMemo(() => {
    return brokers?.map(i => ({
      label: `${i.first_name} ${i.last_name}`,
      value: i.id,
    }));
  }, [brokers]);

  const BrokerData = useMemo(() => {
    return brokerOptions?.find(item => item.value === visitors_info.brokers_id);
  }, [brokerOptions, visitors_info.brokers_id]);

  useEffect(() => {
    getVisitorCustomerListDetails({project_id, visitors_id: visitorId});
    getVisitorActivities({project_id, visitor_id: visitorId || customerId});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getVisitorActivities({
      project_id: selectedProject.id,
      visitor_id: visitorId,
      filter_mode: activityFilter,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityFilter]);

  const layout = useWindowDimensions();

  const [selectedTab, setSelectedTab] = useState(0);

  const [routes] = React.useState([
    {key: 'first', title: 'Customer Details'},
    {key: 'second', title: 'Activity'},
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      activeColor="#4872f4"
      inactiveColor="#041d36"
      initialLayout={{width: layout.width}}
      style={styles.renderTab}
      tabStyle={styles.tabStyle}
      indicatorStyle={styles.indicatorStyle}
    />
  );

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return (
          <CustDetails
            visitors_info={visitors_info}
            linkedProperty={linkedProperty}
            BrokerData={BrokerData}
          />
        );
      case 'second':
        return (
          <Activities filter={activityFilter} setFilter={setActivityFilter} />
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Spinner visible={loading || customerLoading} textContent="" />

      <View style={styles.headerContainer}>
        <IconButton
          icon="keyboard-backspace"
          size={25}
          color="#4872f4"
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Customer details</Text>
      </View>
      <TabView
        navigationState={{index: selectedTab, routes}}
        onIndexChange={setSelectedTab}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
      />
      <FAB.Group
        onPress={toggleSelectDialog}
        onStateChange={onStateChange}
        open={selectDialog.open}
        fabStyle={{
          backgroundColor: selectDialog.open ? colors.white : colors.primary,
        }}
        icon={selectDialog.open ? 'window-close' : 'dots-horizontal'}
        small
        actions={[
          {
            icon: 'message',
            label: 'Add Comment',
            onPress: () =>
              navigation.navigate('AddDetails', {
                type: 'Comment',
                customerId,
              }),
          },
          {
            icon: 'phone',
            label: 'Add Call Logs',
            onPress: () =>
              navigation.navigate('AddDetails', {
                type: 'Call Log',
                customerId,
              }),
          },
          {
            icon: 'arrow-up',
            label: 'Add Follow-up',
            onPress: () =>
              navigation.navigate('AddDetails', {
                type: 'Follow-up',
                customerId,
              }),
          },
          {
            icon: 'account-edit',
            label: 'Edit Customer Info',
            onPress: () =>
              navigation.navigate('EditCustomerDetails', {
                visitorId,
                visitors_info,
                brokers,
              }),
          },
        ]}
      />
    </View>
  );
};

export default CustomerInnerDetails;

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 5,
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#4872f4',
  },
  custContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
    overflow: 'visible',
  },
  valueContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 13,
    color: '#041d36',
  },
  value: {
    fontSize: 14,
    color: '#5E6D7C',
    marginTop: 5,
    marginLeft: 2,
  },
  propLink: {
    fontSize: 16,
    color: '#4872f4',
    marginTop: 5,
  },
  renderTab: {
    backgroundColor: 'transparent',
  },
  tabStyle: {
    borderBottomColor: 'red',
  },
  indicatorStyle: {
    backgroundColor: '#4872f4',
  },
  iconButton: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
  },
});

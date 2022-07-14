import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  RefreshControl,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {
  withTheme,
  Caption,
  FAB,
  Title,
  Subheading,
  Text,
} from 'react-native-paper';
import {getPermissions} from 'utils';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import NoDataFound from 'assets/images/NoDataFound.png';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {useSalesLoading} from 'redux/selectors';

function RenderBroker(props) {
  const {theme, data, navigation, index} = props;
  const {first_name, last_name, phone, email, dealsClosed} = data;

  const navToDetails = () => {
    navigation.navigate('BrokerDetails', {userData: data});
  };

  return (
    <TouchableOpacity onPress={navToDetails} style={styles.listItem}>
      <View style={{flexDirection: 'row'}}>
        <View style={{marginRight: 10}}>
          <Text>
            <OpacityButton
              color={theme.colors.primary}
              opacity={0.2}
              style={styles.id}>
              <Text>{index + 1}</Text>
            </OpacityButton>
          </Text>
        </View>
        <View style={{flexGrow: 1}}>
          <View style={{flexDirection: 'row'}}>
            <Text>
              {first_name} {last_name}
            </Text>
          </View>
          <View style={styles.rowBetween}>
            <Caption>{email}</Caption>
            <Caption>+91 {phone}</Caption>
          </View>
          <Caption>Deals closed: {dealsClosed}</Caption>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function RenderBrokers(props) {
  const {theme, data, onRefresh, navToDetails, navigation} = props;

  return (
    <View style={styles.contentContainer}>
      <Subheading style={{color: theme.colors.primary, marginBottom: 15}}>
        Broker List
      </Subheading>

      <FlatList
        data={data}
        extraData={data}
        keyExtractor={(item, index) => index.toString()}
        style={styles.scrollView}
        contentContainerStyle={{flexGrow: 1, paddingBottom: 60}}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <RenderBroker
            {...props}
            index={index}
            data={item}
            navigation={navigation}
            navToDetails={navToDetails}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.noResultContainer}>
            <Image source={NoDataFound} />
            <Title style={[styles.emptyTitle, {color: theme.colors.primary}]}>
              Start adding your Brokers
            </Title>
          </View>
        }
      />
    </View>
  );
}

function BrokerList(props) {
  const {theme, navigation} = props;

  const {selectedProject} = useSelector(s => s.project);
  const {visitorAnalytics, brokersList} = useSelector(s => s.sales);

  const loading = useSalesLoading();

  // TODO: setup permissions
  const modulePermission = getPermissions('Visitors');

  const {getBrokersList} = useSalesActions();
  const [filter, setFilter] = React.useState('name');

  const projectId = selectedProject.id;

  useEffect(() => {
    getBrokersList({project_id: projectId});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const navToDetails = id => {
    navigation.navigate('VisitorDetails', {visitorId: id});
  };

  return (
    <View style={{padding: 15, flexGrow: 1}}>
      <Spinner visible={loading} textContent="" />
      <RenderBrokers
        {...props}
        filter={filter}
        data={brokersList}
        showAnalyticsRow
        visitorAnalytics={visitorAnalytics}
        setFilter={setFilter}
        navigation={navigation}
        navToDetails={navToDetails}
      />
      {/* {modulePermission?.editor || modulePermission?.admin ? ( */}
      <FAB
        style={[styles.fab, {backgroundColor: theme.colors.primary}]}
        large
        icon="plus"
        onPress={() => navigation.navigate('AddBroker')}
      />
    </View>
  );
}

export default withTheme(BrokerList);

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    marginTop: 2,
  },
  scrollView: {
    flexGrow: 1,
    marginBottom: 15,
  },
  id: {
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  noResultContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  listItem: {
    backgroundColor: '#F2F4F5',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  rowBetween: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 5,
  },
  emptyTitle: {
    fontSize: 22,
    marginTop: 10,
  },
});

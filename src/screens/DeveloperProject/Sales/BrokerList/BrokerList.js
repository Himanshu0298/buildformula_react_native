import React, {useEffect, useMemo} from 'react';
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
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function RenderBrokerList(props) {
  const {theme, data, navigation, navToDetails} = props;
  const {id, first_name, last_name, phone, email, dealsClosed} = data;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('BrokerDetails', {
          userData: data,
        })
      }
      style={{
        backgroundColor: '#F2F4F5',
        padding: 10,
        marginBottom: 20,
        borderRadius: 10,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{marginRight: 10}}>
          <Text>
            <OpacityButton
              color={theme.colors.primary}
              opacity={0.2}
              style={styles.id}>
              <Text>{id}</Text>
            </OpacityButton>
          </Text>
        </View>
        <View style={{flexGrow: 1}}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text>
              {first_name} {last_name}
            </Text>
            <OpacityButton
              color={theme.colors.primary}
              opacity={0.2}
              onPress={() => console.log('----->options button pressed')}
              style={styles.optionIconButton}>
              <MaterialIcons
                name={'dots-vertical'}
                color={theme.colors.primary}
                size={15}
              />
            </OpacityButton>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginTop: 5,
            }}>
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
  const {
    theme,
    data,
    onRefresh,
    showAnalyticsRow,
    visitorAnalytics,
    navToDetails,
    setFilter,
    navigation,
  } = props;

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
          <RenderBrokerList
            {...props}
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
            <Title
              style={{
                color: theme.colors.primary,
                fontSize: 22,
                marginTop: 10,
              }}>
              Start adding your visitor
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
  const {loading, visitors, visitorAnalytics, brokersList} = useSelector(
    s => s.sales,
  );

  console.log('----->brokersList', brokersList);

  // const _brokersList = brokersList.sort((a, b) => (a.id > b.id ? 1 : -1));

  const modulePermission = getPermissions('Visitors');

  const {getBrokersList} = useSalesActions();
  const [filter, setFilter] = React.useState('name');

  const projectId = selectedProject.id;

  useEffect(() => {
    getBrokersList({project_id: projectId});
  }, [projectId]);

  const navToDetails = id => {
    navigation.navigate('VisitorDetails', {visitorId: id});
  };

  return (
    <View style={{padding: 15, position: 'relative'}}>
      <Spinner visible={loading} textContent={''} />
      <RenderBrokers
        {...props}
        filter={filter}
        data={brokersList}
        showAnalyticsRow={true}
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
  optionIconButton: {
    borderRadius: 20,
  },
  id: {
    borderRadius: 20,
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
});

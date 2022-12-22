import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';

import React from 'react';
import {Caption, Divider, Subheading, Text} from 'react-native-paper';
import {getShadow} from 'utils';
import {useSelector} from 'react-redux';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import Spinner from 'react-native-loading-spinner-overlay';

const STORE_KEEPER_STATUS = {
  pending: {label: 'Pending', color: '#F4AF48'},
  approved: {label: 'Approved', color: '#07CA03'},
  issued: {label: 'Issued', color: '#07CA03'},
  inspected: {label: 'Inspected', color: '#07CA03'},
};

const ListingCard = props => {
  const {item, navigation} = props;

  const {id, email, type, authorizedstatus, first_name, last_name, created} =
    item;

  const navToPreview = () => navigation.navigate('StoreKeeperPreview', {id});
  return (
    <TouchableOpacity onPress={navToPreview}>
      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <View>
            <View style={styles.subContainer}>
              <Text>Indent ID</Text>
            </View>

            <Text style={styles.ID}>{id}</Text>
          </View>
          <View>
            <View style={styles.subContainer}>
              <Text> Type</Text>
            </View>

            <Text>{type}</Text>
          </View>
          <View>
            <View style={styles.subContainer}>
              <Text> Status</Text>
            </View>

            <Text
              style={{
                color: STORE_KEEPER_STATUS[authorizedstatus]?.color,
              }}>
              {STORE_KEEPER_STATUS[authorizedstatus]?.label}
            </Text>
          </View>
        </View>
        <Divider />
        <View style={styles.cardDetails}>
          <Text> Create Details:</Text>
          <Subheading>
            {first_name}-{last_name}
          </Subheading>
          <View style={styles.cardContent}>
            <Caption>{email}</Caption>
          </View>
          <View style={styles.cardHeader}>
            <Text>{created}</Text>
          </View>
          <Divider />
          <AuthorizedDetails item={item} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const AuthorizedDetails = props => {
  const {item} = props;

  const {
    authorizedby_email,
    authorizeddate,
    authorizedby_fname,
    authorizedby_lname,
  } = item;
  return (
    <View>
      <View style={styles.authorizedDetails}>
        <Text> Authorized Details:</Text>
      </View>
      <Subheading>
        {authorizedby_fname} {authorizedby_lname}
      </Subheading>
      <View style={styles.cardContent}>
        <Caption>{authorizedby_email}</Caption>
      </View>
      <View style={styles.cardHeader}>
        <Text>{authorizeddate}</Text>
      </View>
    </View>
  );
};

function StoreKeeperList(props) {
  const {navigation} = props;

  const {getStoreKeeperList} = useMaterialManagementActions();

  const {storeKeeperList, loading} = useSelector(s => s.materialManagement);
  const {selectedProject} = useSelector(s => s.project);

  const material = storeKeeperList.storekeeperlist;

  React.useEffect(() => {
    getStoreKeeperList({project_id: selectedProject.id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text>No Data found</Text>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Subheading style={styles.headerText}>StoreKeeper List</Subheading>
      </View>
      <Spinner visible={loading} textContent="" />

      <View style={styles.bodyContainer}>
        <FlatList
          style={styles.flatList}
          data={material}
          extraData={material}
          refreshControl={<RefreshControl refreshing={false} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={i => i.id}
          ListEmptyComponent={renderEmpty}
          renderItem={({item}) => {
            return <ListingCard {...{props, item, navigation}} />;
          }}
        />
      </View>
    </View>
  );
}

export default StoreKeeperList;

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    padding: 20,
  },

  headerContainer: {
    marginBottom: 10,
  },

  subContainer: {
    marginBottom: 10,
  },
  flatList: {
    height: '96%',
  },
  headerText: {
    fontSize: 18,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  authorizedDetails: {
    marginVertical: 10,
  },
  cardContainer: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    ...getShadow(2),
  },

  cardDetails: {
    padding: 5,
  },
  cardHeader: {
    padding: 10,
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ID: {
    width: 30,
    backgroundColor: '#E5EAFA',
    padding: 5,
    borderRadius: 10,
    fontSize: 13,
    color: 'rgba(72, 114, 244, 1)',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

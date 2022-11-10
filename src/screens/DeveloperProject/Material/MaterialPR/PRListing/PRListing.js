import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import NoResult from 'components/Atoms/NoResult';

import React from 'react';
import {Caption, Divider, FAB, Subheading, Text} from 'react-native-paper';
import {getShadow} from 'utils';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector} from 'react-redux';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {PR_REQUEST_STATUS} from 'utils/constant';

const ListingCard = props => {
  const {navigation, item} = props;

  const {id, status, created, approved_by, subject} = item;

  const handleNav = () => navigation.navigate('PRPreview', {id, status});

  return (
    <TouchableOpacity onPress={handleNav}>
      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <Text style={styles.ID}>{id}</Text>
          <Caption
            style={{
              color: PR_REQUEST_STATUS[status]?.color,
            }}>
            {PR_REQUEST_STATUS[status]?.label}
          </Caption>
        </View>
        <Divider />
        <View style={styles.cardDetails}>
          <Subheading>{subject}</Subheading>
          <View style={styles.cardContent}>
            <Caption>Approved by:</Caption>
            <Text style={styles.detail}>{approved_by}</Text>
          </View>
          <Caption>{created}</Caption>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function PRListing(props) {
  const {navigation} = props;

  const {getPRMaterialOrderList} = useMaterialManagementActions();

  const {PRList = [], loading} = useSelector(s => s.materialManagement);
  const {selectedProject} = useSelector(s => s.project);

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = () =>
    getPRMaterialOrderList({project_id: selectedProject.id});

  const renderEmpty = () => <NoResult />;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Subheading style={styles.headerText}>PR Listing</Subheading>
      </View>
      <View style={styles.bodyContainer}>
        <Spinner visible={loading} textContent="" />

        <FlatList
          style={styles.flatList}
          data={PRList}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={getData} />
          }
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmpty}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return <ListingCard {...props} item={item} />;
          }}
        />
      </View>
      <FAB
        style={styles.fab}
        large
        icon="plus"
        onPress={() => navigation.navigate('CreatePR', {PRList})}
      />
    </View>
  );
}

export default PRListing;

const styles = StyleSheet.create({
  mainContainer: {
    margin: 20,
    flexGrow: 1,
  },

  headerContainer: {
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
    marginTop: 10,
  },
  bodyContainer: {
    flex: 1,
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
    alignItems: 'center',
  },
  ID: {
    backgroundColor: '#E5EAFA',
    padding: 7,
    borderRadius: 5,
    fontSize: 10,
    color: 'rgba(72, 114, 244, 1)',
  },
  detail: {
    marginLeft: 7,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#4872f4',
  },
});

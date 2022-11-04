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
import {STORE_KEEPER_DATA} from './StoreKeeperData';

const ListingCard = props => {
  const {item, navigation} = props;

  const {id, validityDate, createdBy, createrEmail: creatorEmail, query} = item;

  const navToPreview = () => navigation.navigate('StoreKeeperPreview');
  return (
    <TouchableOpacity onPress={navToPreview}>
      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <View>
            <View style={styles.subContainer}>
              <Text> ID</Text>
            </View>

            <Text style={styles.ID}>{id}</Text>
          </View>
          <View>
            <View style={styles.subContainer}>
              <Text> Type</Text>
            </View>

            <Text>{query}</Text>
          </View>
          <View>
            <View style={styles.subContainer}>
              <Text> Status</Text>
            </View>

            <Text style={styles.subContainer}>Pending</Text>
          </View>
        </View>
        <Divider />
        <View style={styles.cardDetails}>
          <Text> Create Details:</Text>
          <Subheading>{createdBy}</Subheading>
          <View style={styles.cardContent}>
            <Caption>{creatorEmail}</Caption>
          </View>
          <View style={styles.cardHeader}>
            <Text>{validityDate}</Text>
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

  const {authorizedEmail, authorizedName, authorizedDate} = item;
  return (
    <View>
      <View style={styles.authorizedDetails}>
        <Text> Authorized Details:</Text>
      </View>
      <Subheading>{authorizedName}</Subheading>
      <View style={styles.cardContent}>
        <Caption>{authorizedEmail}</Caption>
      </View>
      <View style={styles.cardHeader}>
        <Text>{authorizedDate}</Text>
      </View>
    </View>
  );
};

function StoreKeeperList(props) {
  //   const {navigation} = props;
  //   const [selectDialog, setSelectDialog] = React.useState(false);

  //   const {colors} = theme;

  //   const toggleSelectDialog = () => setSelectDialog(v => !v);

  //   const renderEmpty = () => <NoResult />;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Subheading style={styles.headerText}>Material Indent</Subheading>
      </View>
      <View style={styles.bodyContainer}>
        <FlatList
          style={styles.flatList}
          data={STORE_KEEPER_DATA}
          refreshControl={<RefreshControl refreshing={false} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return <ListingCard {...props} item={item} />;
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
    // alignItems: 'center',
  },
  ID: {
    backgroundColor: '#E5EAFA',
    padding: 5,
    borderRadius: 10,
    fontSize: 10,
    color: 'rgba(72, 114, 244, 1)',
  },
});

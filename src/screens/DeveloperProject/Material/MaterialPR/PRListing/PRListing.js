import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import {Caption, Divider, FAB, Subheading} from 'react-native-paper';
import {getShadow} from 'utils';
import {PRList} from './PRData';

const PRListing = props => {
  const {navigation} = props;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Subheading style={styles.headerText}>PR Listing</Subheading>
      </View>
      <View style={styles.bodyContainer}>
        <FlatList
          style={styles.flatList}
          data={PRList}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('PRPreview');
                }}>
                <View style={styles.cardContainer}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.ID}>{item.id}</Text>
                    <Text
                      style={
                        item.status === 'Pending'
                          ? styles.pending
                          : item.status === 'Rejected'
                          ? styles.rejected
                          : item.status === 'Approved'
                          ? styles.approved
                          : null
                      }>
                      {item.status}
                    </Text>
                  </View>
                  <Divider />
                  <View style={styles.cardDetails}>
                    <Subheading>{item.name}</Subheading>
                    <View style={styles.cardContent}>
                      <Caption>Approved by:</Caption>
                      <Subheading style={styles.detail}>
                        {item.approvedBy}
                      </Subheading>
                    </View>
                    <Caption>{item.date}</Caption>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <FAB
        style={styles.fab}
        large
        icon="plus"
        onPress={() => navigation.navigate('CreatePR')}
      />
    </View>
  );
};

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
  pending: {
    color: 'rgba(244, 175, 72, 1)',
  },
  rejected: {
    color: 'rgba(255, 93, 93, 1)',
  },
  approved: {
    color: 'rgba(7, 202, 3, 1)',
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

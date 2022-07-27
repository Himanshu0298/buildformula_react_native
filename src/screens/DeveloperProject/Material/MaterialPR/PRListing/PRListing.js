import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import {Caption, Divider, FAB} from 'react-native-paper';
import {PRList} from './PRData';

const PRListing = props => {
  const {navigation} = props;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>PR Listing</Text>
      </View>
      <View style={styles.bodyContainer}>
        <FlatList
          style={{height: '96%'}}
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
                  <Divider style={{color: 'rgba(0, 0, 0, 0.2)', height: 1}} />
                  <View>
                    <Text style={{marginTop: 5}}>{item.name}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                      }}>
                      <Caption>Approved by:</Caption>
                      <Text style={{marginLeft: 5}}>{item.approvedBy}</Text>
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
        style={[styles.fab, {backgroundColor: '#4872f4'}]}
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
    padding: 5,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '400',
  },
  cardContainer: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#e5eafa',
    borderRadius: 5,
    paddingHorizontal: 10,
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
    padding: 5,
    borderRadius: 3,
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
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});

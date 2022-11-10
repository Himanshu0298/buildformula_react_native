import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import {Title, Divider, Caption} from 'react-native-paper';
import CustomCheckbox from 'components/Atoms/CustomCheckbox';
import ActionButtons from 'components/Atoms/ActionButtons';
import {PRList} from '../../MaterialPR/PRListing/PRData';

const PRListing = () => {
  const [checked, setChecked] = useState(false);

  return (
    <FlatList
      style={{height: '83%'}}
      data={PRList.filter(s => s.status !== 'Approved')}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            onPress={() => {
              setChecked(!checked);
            }}>
            <View style={styles.cardContainer}>
              <View style={styles.cardHeader}>
                <Text style={styles.ID}>{item.id}</Text>
                <CustomCheckbox
                  checked={checked}
                  onChange={() => {
                    setChecked(!checked);
                  }}
                />
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
                <View style={styles.cardHeader}>
                  <Caption>{item.date}</Caption>
                  <Text style={styles.approved}>{item.status}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const FromPRListing = props => {
  const {navigation} = props;
  return (
    <View style={styles.mainContainer}>
      <Title>Select Purchase Request</Title>
      <View style={styles.bodyContainer}>
        <PRListing />
      </View>

      <ActionButtons
        style={{justifyContent: 'flex-end'}}
        cancelLabel="Cancel"
        submitLabel="Next"
        onCancel={navigation.goBack}
        onSubmit={() => navigation.navigate('CreatePI', {PO_Type: 'FROMPO'})}
      />
    </View>
  );
};

export default FromPRListing;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 10,
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
  approved: {
    color: 'rgba(7, 202, 3, 1)',
  },
});

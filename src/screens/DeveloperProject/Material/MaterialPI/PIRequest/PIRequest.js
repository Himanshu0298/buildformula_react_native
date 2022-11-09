import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState} from 'react';

import {Caption, Divider, Subheading} from 'react-native-paper';
import {getShadow} from 'utils';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomCheckbox from 'components/Atoms/CustomCheckbox';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import {PIRequestList} from './PIRequestData';

function PIRequest(props) {
  const {navigation} = props;

  const [selectedMaterials, setSelectedMaterials] = useState([]);

  const toggleMaterial = id => {
    const _selectedMaterials = [...selectedMaterials];
    const index = _selectedMaterials.indexOf(id);

    if (index === -1) {
      _selectedMaterials.push(id);
    } else {
      _selectedMaterials.splice(index, 1);
    }

    setSelectedMaterials(_selectedMaterials);
  };

  return (
    <View style={styles.container}>
      <ProjectHeader {...props} />
      <View>
        <Subheading> Select Purchase Request</Subheading>
      </View>
      <View style={styles.bodyContainer}>
        <FlatList
          style={styles.flatList}
          data={PIRequestList}
          renderItem={({item, index}) => {
            const {id} = item;

            return (
              <View style={styles.cardContainer}>
                <View style={styles.cardHeader}>
                  <Text style={styles.ID}>{item.id}</Text>
                  <View style={styles.row}>
                    <CustomCheckbox
                      onChange={() => toggleMaterial(id)}
                      checked={selectedMaterials.includes(id)}
                    />
                  </View>
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
                  <View style={styles.cardHeader}>
                    <Caption>{item.date}</Caption>
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
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

export default PIRequest;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    margin: 20,
  },
  cardHeader: {
    // padding: 10,
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ID: {
    backgroundColor: '#E5EAFA',
    borderRadius: 5,
    paddingHorizontal: 5,
    fontSize: 15,
    color: 'rgba(72, 114, 244, 1)',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 10,
  },
  cardContainer: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    ...getShadow(2),
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
});

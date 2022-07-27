import {StyleSheet, Text, View, FlatList, Dimensions} from 'react-native';
import React, {useState} from 'react';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import {IconButton, Caption} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import ActionButtons from 'components/Atoms/ActionButtons';
import {useAlert} from 'components/Atoms/Alert';
import PRMaterialData from '../CreatePR/PRMaterialData';

const {height} = Dimensions.get('window');

const dynamicHeight = height - 245;

const PRPreview = props => {
  const {navigation} = props;
  const alert = useAlert();

  const [status, setStatus] = useState();

  return (
    <View>
      <ProjectHeader {...props} />
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <IconButton
              icon="keyboard-backspace"
              size={22}
              color="#4872f4"
              style={{backgroundColor: 'rgba(72, 114, 244, 0.1)'}}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerText}>PR Preview</Text>
          </View>
          <View
            style={{flexDirection: 'row', marginEnd: 10, alignSelf: 'center'}}>
            {status == null ? (
              <View style={{marginRight: 15}}>
                <OpacityButton
                  color="#4872f4"
                  opacity={0.18}
                  style={{borderRadius: 20, marginLeft: 15}}
                  onPress={() => {
                    navigation.navigate('CreatePR');
                  }}>
                  <MaterialIcons name="edit" color="#4872f4" size={13} />
                </OpacityButton>
              </View>
            ) : null}
            <View>
              <OpacityButton
                color="#FF5D5D"
                opacity={0.18}
                onPress={() => {
                  alert.show({
                    title: 'Alert',
                    message: 'Are you sure want to delete this?',
                    dismissable: false,
                  });
                }}
                style={{borderRadius: 20}}>
                <MaterialIcons name="delete" color="#FF5D5D" size={13} />
              </OpacityButton>
            </View>
          </View>
        </View>
        <View style={styles.bodyContent}>
          <View style={styles.materialListContainer}>
            <FlatList
              data={PRMaterialData}
              renderItem={({item}) => {
                return (
                  <View style={styles.cardContainer}>
                    <View style={styles.cardHeader}>
                      <View style={styles.dataRow}>
                        <Caption style={styles.lightData}>
                          {dynamicHeight}:
                        </Caption>
                        <Text>{item.category}</Text>
                      </View>
                    </View>
                    <View style={styles.dataRow}>
                      <Caption style={styles.lightData}>Sub Category:</Caption>
                      <Text>{item.subCategory}</Text>
                    </View>
                    <View style={styles.dataRow}>
                      <Caption style={styles.lightData}>Unit:</Caption>
                      <Text>{item.unit}</Text>
                    </View>
                    <View style={styles.dataRow}>
                      <Caption style={styles.lightData}>Required date:</Caption>
                      <Text>{item.requiredDate}</Text>
                    </View>
                    <View style={styles.dataRow}>
                      <Caption style={styles.lightData}>Quantity:</Caption>
                      <Text>{item.qty}</Text>
                    </View>
                  </View>
                );
              }}
              ListHeaderComponent={
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={styles.dataRow}>
                      <Caption style={styles.lightData}>PR ID:</Caption>
                      <Text>022</Text>
                    </View>
                    {status === 'PR Rejected' ? (
                      <View style={{alignSelf: 'center', flexDirection: 'row'}}>
                        <MaterialIcons
                          name="cancel"
                          size={18}
                          color="#FF5D5D"
                        />
                        <Text
                          style={{
                            color: '#FF5D5D',
                            marginLeft: 5,
                          }}>
                          PR Rejected
                        </Text>
                      </View>
                    ) : status === 'PR Approved' ? (
                      <View style={{alignSelf: 'center', flexDirection: 'row'}}>
                        <MaterialIcons
                          name="check-circle"
                          size={18}
                          color="#07CA03"
                        />
                        <Text
                          style={{
                            color: '#07CA03',
                            marginLeft: 5,
                          }}>
                          PR Approved
                        </Text>
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.dataRow}>
                    <Caption style={styles.lightData}>Subject:</Caption>
                    <Text>OPC</Text>
                  </View>
                  <View style={styles.dataRow}>
                    <Caption style={styles.lightData}>Required Vendor:</Caption>
                    <Text>Hiren tarale</Text>
                  </View>
                  <View style={styles.dataRow}>
                    <Caption style={styles.lightData}>Required For:</Caption>
                    <Text>(Task Link, ID, Name)</Text>
                  </View>
                  <View style={styles.dataRow}>
                    <Caption style={styles.lightData}>Remark:</Caption>
                    <Text style={{flexShrink: 1}}>
                      Please Soon as Possible Order it we have not enough
                      cement.ssible Order it we have not enough cement.
                    </Text>
                  </View>
                  <View style={styles.dataRow}>
                    <Caption style={styles.lightData}>Creater Name:</Caption>
                    <Text>Jaismin Fataniya</Text>
                  </View>
                  <View style={styles.dataRow}>
                    <Caption style={styles.lightData}>Created on:</Caption>
                    <Text>15 April, 2022</Text>
                  </View>
                </View>
              }
            />
          </View>
          <View>
            <ActionButtons
              cancelLabel="Reject"
              submitLabel="Approve"
              onCancel={() => setStatus('PR Rejected')}
              onSubmit={() => setStatus('PR Approved')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default PRPreview;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 21,
    fontWeight: '400',
  },
  lightData: {
    fontSize: 13,
    marginRight: 5,
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 0.5,
  },
  materialListContainer: {
    marginTop: 10,
    height: dynamicHeight,
  },
  cardContainer: {
    marginVertical: 10,
    borderWidth: 0.2,
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

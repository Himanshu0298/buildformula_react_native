import {StyleSheet, Text, View, SafeAreaView, Dimensions} from 'react-native';
import React from 'react';
import {Caption} from 'react-native-paper';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAlert} from 'components/Atoms/Alert';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import ActionButtons from 'components/Atoms/ActionButtons';
import PRMaterialData from './PRMaterialData';

const {height} = Dimensions.get('window');

const dynamicHeight = height - 250;

const AddMaterialList = props => {
  const {navigation} = props;
  const alert = useAlert();

  return (
    <SafeAreaView style={{flexGrow: 1}}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Add Material</Text>
        </View>
        <View style={styles.bodyContent}>
          <FlatList
            data={PRMaterialData}
            renderItem={({item}) => {
              return (
                <View style={styles.cardContainer}>
                  <View style={styles.cardHeader}>
                    <View style={styles.dataRow}>
                      <Caption style={styles.lightData}>Category:</Caption>
                      <Text>{item.category}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{marginRight: 10}}>
                        <OpacityButton
                          color="#4872f4"
                          opacity={0.18}
                          style={{borderRadius: 20, marginLeft: 10}}
                          onPress={() => {
                            navigation.navigate('CreatePRMaterial');
                          }}>
                          <MaterialIcons
                            name="edit"
                            color="#4872f4"
                            size={13}
                          />
                        </OpacityButton>
                      </View>
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
                          <MaterialIcons
                            name="delete"
                            color="#FF5D5D"
                            size={13}
                          />
                        </OpacityButton>
                      </View>
                    </View>
                  </View>
                  <View style={styles.dataRow}>
                    <Caption style={styles.lightData}>Sub Category:</Caption>
                    <Text>OPC</Text>
                  </View>
                  <View style={styles.dataRow}>
                    <Caption style={styles.lightData}>Unit:</Caption>
                    <Text>CUM or m3</Text>
                  </View>
                  <View style={styles.dataRow}>
                    <Caption style={styles.lightData}>Required date:</Caption>
                    <Text>15 July, 2022</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.btnAddMore}
          onPress={() => navigation.navigate('CreatePRMaterial')}>
          <MaterialIcons name="add" color="#4872f4" size={17} />
          <Text style={styles.addmoreTxt}>Add More</Text>
        </TouchableOpacity>
        <View>
          <ActionButtons
            cancelLabel="Previous"
            submitLabel="Save"
            onCancel={navigation.goBack}
            onSubmit={() => navigation.navigate('PRPreview')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddMaterialList;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 5,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '400',
  },
  bodyContent: {
    marginVertical: 10,
    height: dynamicHeight,
  },
  cardContainer: {
    marginVertical: 10,
    borderWidth: 0.3,
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
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lightData: {
    fontSize: 13,
  },
  btnAddMore: {
    borderWidth: 0.4,
    borderColor: 'rgba(72, 114, 244, 1)',
    color: 'blue',
    padding: 19,
    marginTop: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addmoreTxt: {
    color: '#4872f4',
  },
});

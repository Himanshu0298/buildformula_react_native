import {StyleSheet, View, SafeAreaView, Dimensions} from 'react-native';
import React from 'react';
import {Caption, Text} from 'react-native-paper';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAlert} from 'components/Atoms/Alert';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import ActionButtons from 'components/Atoms/ActionButtons';
import {getShadow} from 'utils';

const {height} = Dimensions.get('window');

const dynamicHeight = height - 250;

const PIMaterialList = [
  {
    id: 1,
    category: 'Cement',
    subCategory: 'OPC',
    unit: ' CUM or m3',
    requiredDate: '15 July, 2022',
  },
];

function AddReturnMaterialList(props) {
  const {navigation} = props;
  const alert = useAlert();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Add Material</Text>
        </View>
        <View style={styles.bodyContent}>
          <TouchableOpacity
            style={styles.btnAddMore}
            onPress={() => navigation.navigate('AddReturnMaterial')}>
            <MaterialIcons name="add" color="#4872f4" size={17} />
            <Text style={styles.add}>Add Material</Text>
          </TouchableOpacity>
          <FlatList
            data={PIMaterialList}
            renderItem={({item}) => {
              return (
                <View style={styles.cardContainer}>
                  <View style={styles.cardHeader}>
                    <View style={styles.dataRow}>
                      <Caption style={styles.lightData}>Category:</Caption>
                      <Text>{item.category}</Text>
                    </View>
                    <View style={styles.subContainer}>
                      <View style={styles.buttonContainer}>
                        <OpacityButton
                          color="#4872f4"
                          opacity={0.18}
                          style={styles.opacity}
                          onPress={() => {
                            navigation.navigate('AddReturnMaterial');
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
                          style={styles.deleteButton}>
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
                    <Caption style={styles.lightData}>Fine Quantity:</Caption>
                    <Text>1000</Text>
                  </View>
                  <View style={styles.dataRow}>
                    <Caption style={styles.lightData}>Damage:</Caption>
                    <Text>150</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>

        <View>
          <ActionButtons
            cancelLabel="Previous"
            submitLabel="Next"
            onCancel={navigation.goBack}
            onSubmit={() => navigation.navigate('AddAttachments')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default AddReturnMaterialList;

const styles = StyleSheet.create({
  mainContainer: {
    margin: 10,
  },

  container: {
    flexGrow: 1,
    margin: 10,
  },
  headerText: {
    fontSize: 18,
  },
  deleteButton: {
    borderRadius: 20,
  },
  bodyContent: {
    marginVertical: 10,
    height: dynamicHeight,
  },
  cardContainer: {
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 12,
    ...getShadow(2),
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
    marginTop: 15,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  add: {
    color: '#4872f4',
  },

  subContainer: {
    flexDirection: 'row',
  },

  opacity: {
    borderRadius: 20,
    marginLeft: 10,
  },
  buttonContainer: {
    marginRight: 10,
  },
});

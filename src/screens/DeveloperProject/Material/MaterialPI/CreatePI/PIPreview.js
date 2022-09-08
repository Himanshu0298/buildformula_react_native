import {StyleSheet, Text, View, FlatList, Dimensions} from 'react-native';
import React from 'react';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import {IconButton, Caption, Title} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {useAlert} from 'components/Atoms/Alert';
import PRMaterialData from '../../MaterialPR/CreatePR/PRMaterialData';

const {height} = Dimensions.get('window');

const dynamicHeight = height - 180;

const PIPreview = props => {
  const {navigation} = props;
  const alert = useAlert();

  return (
    <View>
      <ProjectHeader {...props} />
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <IconButton
              icon="keyboard-backspace"
              size={20}
              color="#4872f4"
              style={{backgroundColor: 'rgba(72, 114, 244, 0.1)'}}
              onPress={() => navigation.goBack()}
            />
            <Title>PI Preview</Title>
          </View>
          <View
            style={{flexDirection: 'row', marginEnd: 10, alignSelf: 'center'}}>
            <View style={{marginRight: 15}}>
              <OpacityButton
                color="#4872f4"
                opacity={0.18}
                style={{borderRadius: 20, marginLeft: 15}}
                onPress={() => {
                  navigation.navigate('CreatePI');
                }}>
                <MaterialIcons name="edit" color="#4872f4" size={13} />
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
                <MaterialIcons name="delete" color="#FF5D5D" size={13} />
              </OpacityButton>
            </View>
          </View>
        </View>
        <View style={styles.bodyContent}>
          <View style={styles.materialListContainer}>
            <FlatList
              data={PRMaterialData}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <View style={styles.cardContainer}>
                    <View style={styles.cardHeader}>
                      <View style={styles.dataRow}>
                        <Caption style={styles.lightData}>Category:</Caption>
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
                    <View style={styles.dataRow}>
                      <Caption style={styles.lightData}>List of Makes:</Caption>
                      <View style={styles.lomContainer}>
                        <Text style={styles.lom}>Birla</Text>
                        <Text style={styles.lom}>Ambhuja</Text>
                        <Text style={styles.lom}>Aditya</Text>
                      </View>
                    </View>
                  </View>
                );
              }}
              ListHeaderComponent={
                <View>
                  <View style={styles.dataCells}>
                    <View>
                      <Caption style={styles.lightData}>Inquiry ID:</Caption>
                      <Text>022</Text>
                    </View>
                    <View>
                      <Caption style={styles.lightData}>PR ID:</Caption>
                      <Text>022</Text>
                    </View>
                  </View>
                  <View style={styles.dataCells}>
                    <View>
                      <Caption style={styles.lightData}>Inquiry Date:</Caption>
                      <Text>02 Nov, 2022</Text>
                    </View>
                    <View>
                      <Caption style={styles.lightData}>Validity Date:</Caption>
                      <Text>02 Nov, 2022</Text>
                    </View>
                  </View>
                  <View>
                    <Caption style={styles.lightData}>Project Name:</Caption>
                    <Text>Satyamev Builder</Text>
                  </View>
                  <View style={styles.dataCells}>
                    <View>
                      <Caption style={styles.lightData}>Contact Name:</Caption>
                      <Text>Himanshu Nanikwal</Text>
                    </View>
                    <View>
                      <Caption style={styles.lightData}>
                        Contact Number:
                      </Caption>
                      <Text>+91 8460159550</Text>
                    </View>
                  </View>
                  <View style={styles.dataCells}>
                    <View>
                      <Caption style={styles.lightData}>GST Number:</Caption>
                      <Text>22XXXXXXX32ZW</Text>
                    </View>
                    <View>
                      <Caption style={styles.lightData}>PAN Number:</Caption>
                      <Text>EOPPXXXX5J</Text>
                    </View>
                  </View>
                  <View>
                    <Caption style={styles.lightData}>Billing Address:</Caption>
                    <Text style={{flexShrink: 1}}>
                      1st Floor, Road, above Central Bank of India, near SBI
                      Bank, Patiya, Naroda Patiya, Naroda, Ahmedabad, Gujarat
                      382340.
                    </Text>
                  </View>
                  <View>
                    <Caption style={styles.lightData}>
                      Delivery Address:
                    </Caption>
                    <Text style={{flexShrink: 1}}>
                      1st Floor, Road, above Central Bank of India, near SBI
                      Bank, Patiya, Naroda Patiya, Naroda, Ahmedabad, Gujarat
                      382340.
                    </Text>
                  </View>
                </View>
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default PIPreview;

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
    borderWidth: 0.5,
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
  lomContainer: {
    flexDirection: 'row',
  },
  lom: {
    paddingHorizontal: 5,
    backgroundColor: '#4872f4',
    color: '#fff',
    marginHorizontal: 2.5,
  },
  dataCells: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
});

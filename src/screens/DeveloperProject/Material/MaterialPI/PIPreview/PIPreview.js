import {StyleSheet, View, FlatList, Dimensions, ScrollView} from 'react-native';
import React, {useState} from 'react';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import {IconButton, Caption, Subheading, Text} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {useAlert} from 'components/Atoms/Alert';
import {getShadow} from 'utils';
import PIMaterialData from './PIMaterialData';

const {height} = Dimensions.get('window');

const dynamicHeight = height - 300;

const MAKES_LIST = [{nub: ' A-102'}, {nub: ' A-502'}, {nub: ' A-305'}];

function TermsAndConditions() {
  return (
    <View style={styles.container}>
      <View style={{marginTop: 50}}>
        <Caption>Teams & Conditions :</Caption>
        <Text>
          Width 388px Height 57px Top 1423px Left 20px When was the last time
          you reviewed your T&C? T&C are typically the basis of a binding
          contract between you and the user. Those terms are vital to your
          company see more...
        </Text>
      </View>
      <View style={styles.bottomSubContainer}>
        <Caption> Created On:</Caption>
        <Text> 15 April,2022</Text>
      </View>
      <View style={styles.bottomContainer}>
        <Caption> Created By:</Caption>
        <Text> Hiren tarele</Text>
      </View>
    </View>
  );
}

function PreviewDetails() {
  return (
    <View style={styles.detailContainer}>
      <View style={styles.dataRow}>
        <View style={{alignItems: 'center'}}>
          <Caption> Inquiry ID: </Caption>
          <Text> 021</Text>
        </View>
        <View style={styles.idSubContainer}>
          <Caption> PR ID: </Caption>
          <Text> 021</Text>
        </View>
      </View>
      <View style={styles.dataRow}>
        <View style={{alignItems: 'center'}}>
          <Caption> Inquiry Date: </Caption>
          <Text> 02 Nov,2022</Text>
        </View>
        <View style={styles.validity}>
          <Caption> Validity Date: </Caption>
          <Text> 02 Nov,2022</Text>
        </View>
      </View>
      <View style={{paddingTop: 5}}>
        <Caption> Project Name:</Caption>
        <Text> Satyamev Builder </Text>
      </View>

      <View style={styles.subContainer}>
        <View style={{alignItems: 'center', paddingVertical: 5}}>
          <Caption> Contact Name: </Caption>
          <Text> Hiren tarele</Text>
        </View>
        <View style={styles.contactContainer}>
          <Caption> Contact Number: </Caption>
          <Text> +91 2254124551</Text>
        </View>
      </View>
      <View style={styles.subContainer}>
        <View style={{alignItems: 'center', paddingVertical: 5}}>
          <Caption>GST Number: </Caption>
          <Text>22XXXXXXX32ZW</Text>
        </View>
        <View style={styles.panContainer}>
          <Caption> PAN Number: </Caption>
          <Text> EOPPXXXX5J</Text>
        </View>
      </View>
      <View style={styles.detailHeader}>
        <View style={{paddingVertical: 10}}>
          <Caption> Billing Address: </Caption>
          <Text>
            1st Floor, Road, above Central Bank of India, near SBI Bank, Patiya,
            Naroda Patiya, Naroda, Ahmedabad, Gujarat 382340
          </Text>
        </View>
      </View>
      <View style={styles.detailHeader}>
        <View style={styles.textContainer}>
          <Caption> Delivery Address: </Caption>
          <Text>
            210,Shramjivi Vasahat Rajendra Park Cross Road, Near Van Raj Shop,
            National Highyway No 8,Rakhiyal, Amraiwadi, Ahmedabad, Gujarat
            380026
          </Text>
        </View>
      </View>
    </View>
  );
}

function PIPreview(props) {
  const {navigation} = props;
  const alert = useAlert();

  const [status, setStatus] = useState();

  return (
    <ScrollView>
      <View style={styles.container}>
        <ProjectHeader {...props} />

        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.subContainer}>
              <IconButton
                icon="keyboard-backspace"
                size={22}
                color="#4872f4"
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              />
              <Subheading style={styles.headerText}>PI Preview</Subheading>
            </View>
            <View style={styles.statusContainer}>
              {status == null ? (
                <View style={styles.status}>
                  <OpacityButton
                    color="#4872f4"
                    opacity={0.18}
                    onPress={() => {
                      navigation.navigate('CreatePI');
                    }}
                    style={styles.button}>
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
                  style={styles.button}>
                  <MaterialIcons name="delete" color="#FF5D5D" size={13} />
                </OpacityButton>
              </View>
            </View>
          </View>
          <PreviewDetails />
          <View style={styles.bodyContent}>
            <View style={styles.materialListContainer}>
              {PIMaterialData.map(item => {
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
                    <View style={styles.makerContainer}>
                      <Caption> List of Makes :</Caption>
                      {MAKES_LIST.map(i => {
                        return (
                          <View style={styles.list}>
                            <Text style={styles.text}> {i.nub}</Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
        <TermsAndConditions />
      </View>
    </ScrollView>
  );
}

export default PIPreview;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    margin: 10,
  },

  detailContainer: {
    margin: 15,
  },

  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },

  bottomSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  statusContainer: {
    flexDirection: 'row',
    marginEnd: 10,
    alignSelf: 'center',
  },
  status: {
    marginRight: 15,
  },

  validity: {
    alignItems: 'center',
    paddingTop: 5,
    marginLeft: 85,
  },

  textContainer: {
    paddingVertical: 10,
  },
  button: {
    borderRadius: 20,
  },

  backButton: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  mainContainer: {
    paddingHorizontal: 5,
  },

  headerText: {
    fontSize: 17,
  },
  lightData: {
    fontSize: 13,
    marginRight: 5,
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  materialListContainer: {
    marginTop: 10,
    height: dynamicHeight,
  },
  cardContainer: {
    margin: 5,

    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    ...getShadow(3),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  list: {
    backgroundColor: '#4872f4',

    justifyContent: 'space-between',
    marginHorizontal: 8,
    paddingRight: 8,
    borderRadius: 5,
  },

  makerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
  panContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    marginLeft: 60,
  },
  contactContainer: {
    alignItems: 'center',
    paddingVertical: 5,
    marginLeft: 80,
  },

  idSubContainer: {
    alignItems: 'center',
    marginLeft: 100,
  },
});

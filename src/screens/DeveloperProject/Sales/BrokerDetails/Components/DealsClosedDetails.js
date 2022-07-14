import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import {
  Caption,
  Divider,
  IconButton,
  Portal,
  Dialog,
  Button,
  FAB,
} from 'react-native-paper';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const DealsClosedDetails = props => {
  const {navigation} = props;
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  return (
    <View style={{height: '100%'}}>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{borderRadius: 20, padding: 10, alignItems: 'center'}}>
          <View>
            <Text style={{color: '#ff5d5d', fontSize: 15}}>
              Are you sure want to delete this?
            </Text>
            <Dialog.Actions style={{marginTop: 10, justifyContent: 'center'}}>
              <Button onPress={() => hideDialog()}>Cancel</Button>
              <Button onPress={() => console.log('Ok')}>Ok</Button>
            </Dialog.Actions>
          </View>
        </Dialog>
      </Portal>
      <ProjectHeader {...props} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <IconButton
          icon="keyboard-backspace"
          size={25}
          color="#4872f4"
          style={{backgroundColor: 'rgba(72, 114, 244, 0.1)'}}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Closed Deal Details</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={{flexDirection: 'row', marginVertical: 10}}>
          <View style={{width: '50%'}}>
            <View style={styles.propDetailBox}>
              <Text style={styles.textSize}>Project type: </Text>
              <Text style={[styles.textSize, styles.blueText]}>Apartment</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textSize}>Floor: </Text>
              <Text style={[styles.textSize, styles.blueText]}>12th Floor</Text>
            </View>
          </View>
          <View style={{width: '50%'}}>
            <View style={styles.propDetailBox}>
              <Text style={styles.textSize}>Tower: </Text>
              <Text style={[styles.textSize, styles.blueText]}>A</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textSize}>Unit number: </Text>
              <Text style={[styles.textSize, styles.blueText]}>1204</Text>
            </View>
          </View>
        </View>
        <Divider style={{height: 2}} />
        <View style={styles.brokerPaymentDetails}>
          <Text style={styles.blueText}>Broker Payment</Text>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 6,
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={[styles.textSize, {marginVertical: 3}]}>
                Total Brokerage
              </Text>
              <Text style={styles.commonText}>Rs. 1,50,000</Text>
            </View>
            <View>
              <Text style={[styles.textSize, {marginVertical: 3}]}>
                Remaining
              </Text>
              <Text style={styles.commonText}>Rs. 1,35,000</Text>
            </View>
            <View>
              <Text style={[styles.textSize, {marginVertical: 3}]}>Paid</Text>
              <Text style={styles.commonText}>Rs. 15000</Text>
            </View>
          </View>
        </View>
        <View style={styles.bankDetailsBox}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.textSize}>Date</Text>
              <Caption>15 July 2020</Caption>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{marginRight: 10}}>
                <OpacityButton
                  color="#4872f4"
                  opacity={0.18}
                  style={{borderRadius: 20, marginLeft: 10, marginBottom: 10}}
                  onPress={() => {
                    Alert.alert('edit');
                  }}>
                  <MaterialIcons name="edit" color="#4872f4" size={13} />
                </OpacityButton>
              </View>
              <View>
                <OpacityButton
                  color="#FF5D5D"
                  opacity={0.18}
                  onPress={() => showModal()}
                  style={{borderRadius: 20}}>
                  <MaterialIcons name="delete" color="#FF5D5D" size={13} />
                </OpacityButton>
              </View>
            </View>
          </View>
          <View style={{marginVertical: 4}}>
            <Text style={styles.textSize}>Bank Name & Branch</Text>
            <Caption>HDFC bank,Maninagar</Caption>
          </View>
          <View style={{marginVertical: 4}}>
            <Text style={styles.textSize}>Check no. / Transaction no.</Text>
            <Caption>006584</Caption>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{marginVertical: 4}}>
              <Text style={styles.textSize}>Payment Mode</Text>
              <Caption>Netbanking</Caption>
            </View>
            <View style={{marginVertical: 4}}>
              <Text style={styles.textSize}>Credit </Text>
              <Caption>₹ 10,00,00</Caption>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{marginVertical: 4}}>
              <Text style={styles.textSize}>Debit </Text>
              <Caption>-</Caption>
            </View>
            <View style={{marginVertical: 4}}>
              <Text style={styles.textSize}>Balance </Text>
              <Caption>₹ 10,00,00</Caption>
            </View>
          </View>
          <View style={{marginVertical: 4}}>
            <Text style={styles.textSize}>Remark </Text>
            <Caption>
              Please call me to discuss about the project in detail at 7:00 PM
              tommorow
            </Caption>
          </View>
        </View>
      </View>
      <FAB
        style={[styles.fab, {backgroundColor: '#4872f4'}]}
        large
        icon="plus"
        onPress={() => navigation.navigate('AddBrokerPaymentDetails')}
      />
    </View>
  );
};

export default DealsClosedDetails;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
  },
  propDetailBox: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  headerText: {
    fontSize: 19,
    color: '#4872f4',
    paddingVertical: 10,
    paddingLeft: 5,
  },
  textSize: {
    fontSize: 14,
  },
  blueText: {
    color: '#4872f4',
  },
  commonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  brokerPaymentDetails: {
    marginVertical: 15,
  },
  bankDetailsBox: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#C3C3C3',
  },
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 40,
  },
});

import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useState} from 'react';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import {IconButton} from 'react-native-paper';
import RenderInput from 'components/Atoms/RenderInput';
import Radio from 'components/Atoms/Radio';
import RenderSelect from 'components/Atoms/RenderSelect';
import ActionButtons from 'components/Atoms/ActionButtons';

const AddBrokerPaymentDetails = props => {
  const {navigation} = props;
  const [paymentValue, setPaymentValue] = useState();
  const options = [
    'DD',
    'NetBanking',
    'Cheque',
    'RTGS',
    'NEFT',
    'Cash',
    'UPI',
    'Debit Card',
  ];
  return (
    <View>
      <ProjectHeader {...props} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <IconButton
          icon="keyboard-backspace"
          size={25}
          color="#4872f4"
          style={{backgroundColor: 'rgba(72, 114, 244, 0.1)'}}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Add Brokrage</Text>
      </View>
      <View style={styles.mainContainer}>
        <RenderInput
          name="bankName"
          label="Bank Name"
          containerStyles={styles.inputBox}
          // value={name}
          onChangeText={console.log('clicked')}
        />
        <RenderInput
          name="bankBranch"
          label="Bank Branch"
          containerStyles={styles.inputBox}
          // value={name}
          onChangeText={console.log('clicked')}
        />
        <RenderInput
          name="transactionNo"
          label="Check no / Transaction no"
          containerStyles={styles.inputBox}
          // value={name}
          onChangeText={console.log('clicked')}
        />
        <RenderInput
          name="transactionDate"
          label="Transaction Date"
          containerStyles={styles.inputBox}
          // value={name}
          onChangeText={console.log('clicked')}
        />
        <View style={styles.bankRadioContainer}>
          <Text>Collection Type </Text>
          <View style={styles.bankRadioRow}>
            <Radio
              label="Credit"
              value="credit"
              checked={paymentValue}
              onChange={value => setPaymentValue('Value', value)}
            />
            <Radio
              label="Debit"
              value="debit"
              color="#4872f4"
              checked={paymentValue}
              onChange={value => setPaymentValue('Value', value)}
            />
          </View>
        </View>
        <RenderInput
          name="amount"
          label="Amount"
          containerStyles={styles.inputBox}
          // value={name}
          onChangeText={console.log('clicked')}
        />
        <RenderInput
          name="amount"
          label="Amount"
          containerStyles={styles.inputBox}
          // value={name}
          onChangeText={console.log('clicked')}
        />
        <RenderSelect
          name="paymentMode"
          label="Select Other Charges"
          options={options}
          containerStyles={styles.inputBox}
          onSelect={() => {
            console.log('selected');
          }}
        />
        <RenderInput
          name="Remark"
          label="Remark"
          containerStyles={styles.inputBox}
          // value={name}
          onChangeText={console.log('clicked')}
        />
      </View>
      <ActionButtons
        cancelLabel="Cancel"
        submitLabel="Save"
        onCancel={navigation.goBack}
        onSubmit={() => Alert.alert('submit')}
      />
    </View>
  );
};

export default AddBrokerPaymentDetails;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
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
  inputBox: {
    marginVertical: 7,
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
  bankRadioContainer: {
    marginTop: 20,
  },
  bankRadioRow: {
    flexDirection: 'row',
    marginTop: 7,
  },
});

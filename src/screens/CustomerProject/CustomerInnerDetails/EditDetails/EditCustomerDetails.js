import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import ActionButtons from 'components/Atoms/ActionButtons';
import RenderInput from 'components/Atoms/RenderInput';

const EditCustomerDetails = props => {
  const {navigation} = props;
  const [name, setName] = useState('Name');
  const [email, setEmail] = useState('name@gmail.com');
  const [phone, setPhone] = useState('+91 8460159550');
  const [relatedProp, setrelatedProp] = useState('A-101');
  const [broker, setBroker] = useState('MM');
  const [dob, setDob] = useState('10 Feb 1998');
  const [anniversary, setAnniversary] = useState('10 Feb 1998');
  const [address, setAddress] = useState('India');
  return (
    <View>
      <ProjectHeader {...props} />
      <Text style={styles.headerText}>Edit Customer Info</Text>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.inputBox}>
          <RenderInput
            name="name"
            label="Name"
            containerStyles={styles.inputBox}
            value={name}
            onChangeText={text => setName(text)}
          />
          <RenderInput
            name="email"
            label="Email"
            containerStyles={styles.inputBox}
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <RenderInput
            name="phone"
            label="Phone"
            containerStyles={styles.inputBox}
            value={phone}
            onChangeText={text => setPhone(text)}
          />
          <RenderInput
            name="relatedProp"
            label="Related Property"
            containerStyles={styles.inputBox}
            value={relatedProp}
            onChangeText={text => setrelatedProp(text)}
          />
          <RenderInput
            name="broker"
            label="Broker"
            containerStyles={styles.inputBox}
            value={broker}
            onChangeText={text => setBroker(text)}
          />
          <RenderInput
            name="dob"
            label="Birthdate"
            containerStyles={styles.inputBox}
            value={dob}
            onChangeText={text => setDob(text)}
          />
          <RenderInput
            name="anniversary"
            label="Anniversary Date"
            containerStyles={styles.inputBox}
            value={anniversary}
            onChangeText={text => setAnniversary(text)}
          />
          <RenderInput
            name="address"
            label="Address"
            containerStyles={styles.inputBox}
            value={address}
            onChangeText={text => setAddress(text)}
          />
        </View>
      </ScrollView>
      <ActionButtons
        cancelLabel="Cancel"
        submitLabel="Save"
        onCancel={navigation.goBack}
        onSubmit={() => Alert.alert('submit')}
      />
    </View>
  );
};

export default EditCustomerDetails;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 19,
    color: '#4872f4',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  inputBox: {
    paddingVertical: 10,
  },
});

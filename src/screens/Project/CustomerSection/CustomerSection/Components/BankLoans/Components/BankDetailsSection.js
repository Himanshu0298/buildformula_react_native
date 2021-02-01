import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Caption, IconButton} from 'react-native-paper';
import {theme} from 'styles/theme';

function RenderDetail({label, value}) {
  return (
    <View style={styles.detailContainer}>
      <Text>{label}:</Text>
      <Caption>{value}</Caption>
    </View>
  );
}

function BankDetailsSection(props) {
  const {bankDetails, navigation, route} = props;
  const {project_id, unit} = route?.params || {};

  const {bank_name, bank_branch, bank_address} = bankDetails.details;

  return (
    <View style={styles.container}>
      <RenderDetail label="Bank name" value={bank_name} />
      <RenderDetail label="Bank Branch" value={bank_branch} />
      <RenderDetail label="Bank Address" value={bank_address} />
      <RenderDetail label="Loan approval letter" />
      <RenderDetail label="Loan amount" />
      <RenderDetail label="Installment amount" />
      <View style={styles.buttonContainer}>
        <OpacityButton
          opacity={0.2}
          color={theme.colors.primary}
          style={styles.modifyButton}
          onPress={() =>
            navigation.navigate('AddBankDetails', {...route?.params})
          }>
          <IconButton icon="pencil" size={18} color={theme.colors.primary} />
          <Text style={{color: theme.colors.primary}}>{'Modify Details'}</Text>
        </OpacityButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  detailContainer: {
    marginVertical: 5,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  modifyButton: {
    borderRadius: 10,
    paddingRight: 20,
  },
});

export default BankDetailsSection;

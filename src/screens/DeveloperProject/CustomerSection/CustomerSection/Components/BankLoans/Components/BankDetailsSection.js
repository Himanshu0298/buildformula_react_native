import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Caption, IconButton} from 'react-native-paper';
import {theme} from 'styles/theme';

function RenderDetail({label, value}) {
  return (
    <View style={styles.detailContainer}>
      <Text>{label}:</Text>
      <Caption>{value || 'NA'}</Caption>
    </View>
  );
}

function BankDetailsSection(props) {
  const {navigation, route, modulePermissions, bankDetails = {}} = props;

  const {bank_name, bank_branch, bank_address} = bankDetails?.details || {};

  const detailsAvailable = Object.keys(bankDetails?.details || {}).length > 0;

  const navToAddBankDetails = () =>
    navigation.navigate('AddBankDetails', {
      ...route?.params,
      id: bankDetails.id,
    });

  return (
    <View style={styles.container}>
      {detailsAvailable ? (
        <>
          <RenderDetail label="Bank name" value={bank_name} />
          <RenderDetail label="Bank Branch" value={bank_branch} />
          <RenderDetail label="Bank Address" value={bank_address} />
          <RenderDetail label="Loan approval letter" />
          <RenderDetail label="Loan amount" />
          <RenderDetail label="Installment amount" />
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text>No Bank Details added yet</Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        {modulePermissions?.editor || modulePermissions?.admin ? (
          <OpacityButton
            opacity={0.2}
            color={theme.colors.primary}
            style={styles.modifyButton}
            onPress={navToAddBankDetails}>
            <IconButton icon="pencil" size={18} color={theme.colors.primary} />
            <Text style={{color: theme.colors.primary}}>
              {detailsAvailable ? 'Modify Details' : 'Add Details'}
            </Text>
          </OpacityButton>
        ) : null}
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
    padding: 0,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
});

export default BankDetailsSection;

import * as React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Caption, Subheading, Text, withTheme} from 'react-native-paper';
import backArrow from 'assets/images/back_arrow.png';
import dayjs from 'dayjs';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAlert} from 'components/Atoms/Alert';
import useCustomerActions from 'redux/actions/customerActions';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector} from 'react-redux';
import {theme} from 'styles/theme';

const TITLE = {
  document: 'Documentation charges',
  property: 'Property Final Amount',
  gst: 'GST Amount',
};

function Item({label, value}) {
  return (
    <View style={styles.listItemContainer}>
      <Text>{label}</Text>
      <Caption>{value}</Caption>
    </View>
  );
}

const RenderCharge = React.memo(props => {
  const {charge, payment_mode, navigation, type, navToEdit, handleDelete} =
    props;
  const {
    bank_name,
    branch_name,
    transaction_number,
    transaction_date,
    transaction_type,
    amount,
    remark,
  } = charge;

  const navToDownload = () => navigation.navigate(console.log('-------->'));

  return (
    <View style={styles.chargeContainer}>
      <Item
        label="Date"
        value={dayjs(transaction_date).format('DD MMM YYYY')}
      />
      <Item label="Payment Mode" value={payment_mode} />

      {type !== 'document' ? (
        <>
          <Item
            label="Bank name &  branch"
            value={`${bank_name}, ${branch_name}`}
          />
          <Item
            label="Check no. /  Transection no."
            value={transaction_number}
          />
        </>
      ) : null}
      <View style={styles.itemRow}>
        <Item
          label="Credit"
          value={
            transaction_type === 'credit' ? `₹ ${parseFloat(amount)}` : '-'
          }
        />
        <Item
          label="Debit"
          value={transaction_type === 'debit' ? `₹ ${parseFloat(amount)}` : '-'}
        />
        <Item label="Balance" value={`₹ ${parseFloat(amount)}`} />
      </View>
      <Item label="Remark" value={remark} />
      <View style={styles.actionContainer}>
        <OpacityButton
          opacity={0.08}
          color={theme.colors.primary}
          style={styles.rightContent}
          onPress={navToDownload}>
          <MaterialCommunityIcons
            name="download"
            size={18}
            color={theme.colors.primary}
          />
        </OpacityButton>
        <OpacityButton
          opacity={0.1}
          color={theme.colors.primary}
          style={styles.rightContent}
          onPress={() => navToEdit(charge)}>
          <MaterialIcon name="edit" color={theme.colors.primary} size={18} />
        </OpacityButton>
        <OpacityButton
          opacity={0.1}
          color={theme.colors.red}
          style={styles.deleteButton}
          onPress={() => handleDelete(charge)}>
          <MaterialIcon name="delete" color={theme.colors.red} size={18} />
        </OpacityButton>
      </View>
    </View>
  );
});

function PaymentCollections(props) {
  const {navigation, route} = props;
  const {type} = route?.params || {};

  const alert = useAlert();
  const {deleteCollection, getAccountDetails} = useCustomerActions();

  const {loading, accountDetails} = useSelector(s => s.customer);
  const {paymentCollection = {}} = accountDetails;

  const charges = React.useMemo(() => {
    const {documentcharges, propertyfinalamount, gst} = paymentCollection;

    switch (type) {
      case 'document':
        return documentcharges || [];
      case 'property':
        return propertyfinalamount || [];
      case 'gst':
        return gst || [];
      default:
        return [];
    }
  }, [paymentCollection, type]);

  const amountCollected = React.useMemo(() => {
    return charges.reduce((sum, i) => sum + parseFloat(i.amount), 0);
  }, [charges]);

  const navToEdit = collection => {
    navigation.navigate('AddCollection', {...route.params, collection});
  };
  const navToAddCollection = () =>
    navigation.navigate('AddCollection', {...route.params});

  const navToPrintAll = () => navigation.navigate(console.log('-------->'));

  const handleDelete = ({project_id, id, unit_id}) => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete this collection?',
      confirmText: 'Yes',
      onConfirm: async () => {
        await deleteCollection({project_id, collection_id: id});
        getAccountDetails({project_id, unit_id});
      },
    });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      <Spinner visible={loading} textContent="" />
      <View style={styles.container}>
        <View style={styles.actionButton}>
          <View>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.titleContainer}>
              <Image source={backArrow} style={styles.backArrow} />
              <Subheading>Payment Collection</Subheading>
            </TouchableOpacity>
          </View>
          <View style={styles.actionRow}>
            <OpacityButton opacity={0.2} onPress={navToAddCollection}>
              {/* <Text style={[{color: theme.colors.primary,styles.buttonLabel }]}> */}
              <Text style={[{color: theme.colors.primary}, styles.buttonLabel]}>
                Add collection
              </Text>
            </OpacityButton>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <Text style={{color: theme.colors.documentation}}>{TITLE[type]}</Text>
          <View style={styles.totalCollection}>
            <Caption>Total collected:</Caption>
            <Caption
              style={[styles.amount, {color: theme.colors.documentation}]}>
              ₹ {amountCollected || 0}
            </Caption>
            <OpacityButton
              opacity={0.1}
              color={theme.colors.primary}
              style={styles.printAll}
              onPress={navToPrintAll}>
              <Ionicons name="print" size={22} color={theme.colors.primary} />
            </OpacityButton>
          </View>

          {charges?.map((charge, i) => (
            <RenderCharge
              key={i}
              {...props}
              {...{charge, type, navToEdit, handleDelete}}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  backArrow: {
    height: 23,
    width: 23,
    marginRight: 5,
  },
  contentContainer: {
    marginVertical: 15,
  },
  chargeContainer: {
    position: 'relative',
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(222, 225, 231, 1)',
    borderRadius: 10,
  },
  actionContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemContainer: {
    marginVertical: 5,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  buttonLabel: {
    paddingHorizontal: 5,
  },
  totalCollection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  printAll: {
    borderRadius: 50,
    marginRight: 10,
  },
  rightContent: {
    borderRadius: 50,
    marginRight: 10,
  },
  deleteButton: {
    borderRadius: 50,
  },
  amount: {
    alignSelf: 'center',
    paddingEnd: 150,
  },
});

export default withTheme(PaymentCollections);

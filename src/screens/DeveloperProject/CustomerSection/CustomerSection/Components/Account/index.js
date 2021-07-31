import * as React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Badge,
  Button,
  Caption,
  Dialog,
  Divider,
  Portal,
  Subheading,
  Text,
  withTheme,
} from 'react-native-paper';
import {BOOKING_STATUS_STYLES} from 'components/Molecules/UnitSelector/RenderUnits';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ActivityDialog from './Components/ActivityDialog';
import {useSelector} from 'react-redux';
import useCustomerActions from 'redux/actions/customerActions';
import {getPermissions} from 'utils';

function StatusDialog(props) {
  const {open, status, updateStatus, handleClose} = props;

  const [selectedStatus, setSelectedStatus] = React.useState(status);

  return (
    <Portal>
      <Dialog visible={open} onDismiss={handleClose}>
        <Dialog.Content>
          <View style={styles.statusContainer}>
            <Button
              mode={selectedStatus === 3 ? 'contained' : 'text'}
              style={styles.statusBadge}
              onPress={() => setSelectedStatus(3)}>
              Stand By
            </Button>
            <Button
              mode={selectedStatus === 4 ? 'contained' : 'text'}
              style={styles.statusBadge}
              onPress={() => setSelectedStatus(4)}>
              Booked
            </Button>
          </View>
          <Button
            style={{marginTop: 15, marginHorizontal: 15}}
            mode="contained"
            onPress={() => updateStatus(selectedStatus)}>
            Update
          </Button>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}

function Account(props) {
  const {route, theme, navigation, showUpdateStatus = true} = props;
  const {project_id, unit} = route?.params || {};

  const modulePermissions = getPermissions('Account');

  const {updateBookingStatus, getAccountDetails} = useCustomerActions();

  const {accountDetails} = useSelector(state => state.customer);
  const {
    paymentSchedule,
    paymentCollection = {},
    activityLog,
    bookingCurrentStatus = 3,
  } = accountDetails;
  const {documentCharges, propertyfinalamount, bankLoanDetail} =
    paymentSchedule || {};

  const [activityDialog, setActivityDialog] = React.useState(false);
  const [statusDialog, setStatusDialog] = React.useState(false);

  const bookingStyle = BOOKING_STATUS_STYLES[bookingCurrentStatus] || {};

  const {documentCollected, propertyCollected} = React.useMemo(() => {
    const {
      documentcharges = [],
      propertyfinalamount: property = [],
    } = paymentCollection;
    return {
      documentCollected: documentcharges.reduce(
        (sum, i) => sum + parseFloat(i.amount),
        0,
      ),
      propertyCollected: property.reduce(
        (sum, i) => sum + parseFloat(i.amount),
        0,
      ),
    };
  }, [paymentCollection]);

  const toggleStatusDialog = () => setStatusDialog(v => !v);
  const toggleActivityDialog = () => setActivityDialog(v => !v);

  const updateStatus = status => {
    updateBookingStatus({
      project_id,
      unit_id: unit.unitId,
      booking_status: status,
    }).then(() => {
      toggleStatusDialog();

      getAccountDetails({project_id, unit_id: unit.unitId});
    });
  };

  const navToDetails = (type, data) =>
    navigation.navigate('PaymentCollections', {type, data});

  const navToSchedule = () =>
    navigation.navigate('PaymentSchedule', {data: paymentSchedule});

  const navToAddCollection = () =>
    navigation.navigate('AddCollection', {...route.params});

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      <ActivityDialog
        open={activityDialog}
        handleClose={toggleActivityDialog}
        data={activityLog}
      />
      {statusDialog ? (
        <StatusDialog
          open={statusDialog}
          status={bookingCurrentStatus}
          handleClose={toggleStatusDialog}
          updateStatus={updateStatus}
        />
      ) : null}
      <View style={styles.container}>
        <Subheading>Booking status</Subheading>
        <View style={styles.statusCard}>
          <View style={styles.statusLeft}>
            <Badge
              style={[
                styles.badge,
                {backgroundColor: bookingStyle.borderColor},
              ]}>
              {bookingStyle.badge}
            </Badge>
            <Text>{bookingStyle.label}</Text>
          </View>
          {showUpdateStatus &&
          (modulePermissions?.editor || modulePermissions?.admin) ? (
            <View>
              <OpacityButton
                opacity={0.1}
                style={styles.editIcon}
                onPress={toggleStatusDialog}>
                <MaterialIcon
                  name="pencil"
                  color={theme.colors.primary}
                  size={18}
                />
              </OpacityButton>
            </View>
          ) : null}
        </View>
        <View style={styles.documentationContainer}>
          <Subheading style={{color: theme.colors.documentation}}>
            Documentation charges
          </Subheading>

          <View
            style={[
              styles.documentationChargesContainer,
              {borderColor: theme.colors.documentation},
            ]}>
            <View
              style={[
                styles.section,
                {
                  borderRightWidth: 1,
                  borderColor: theme.colors.documentation,
                  backgroundColor: 'rgba(243, 122, 80, 0.1)',
                },
              ]}>
              <Subheading style={{fontWeight: 'bold'}}>
                ₹ {parseFloat(documentCharges?.document_charge) || 0}
              </Subheading>
              <Caption style={{fontSize: 16}}>Total amount</Caption>
            </View>
            <View
              style={[
                styles.section,
                {backgroundColor: 'rgba(243, 122, 80, 0.1)'},
              ]}>
              <Subheading style={{fontWeight: 'bold'}}>
                ₹ {parseFloat(documentCollected)}
              </Subheading>
              <Caption style={{fontSize: 16}}>Amount collected</Caption>
            </View>
          </View>
        </View>

        <View style={styles.documentationContainer}>
          <Subheading>Property Final Amount </Subheading>

          <View style={styles.amountContainer}>
            <View
              style={[
                styles.section,
                {borderRightWidth: 1, borderColor: 'rgba(222, 225, 231, 1)'},
              ]}>
              <Subheading style={{fontWeight: 'bold'}}>
                ₹{' '}
                {parseFloat(
                  propertyfinalamount?.full_basic_amount ||
                    propertyfinalamount?.basic_amount,
                ) || 0}
              </Subheading>
              <Caption style={{fontSize: 16}}>Total amount</Caption>
            </View>
            <View style={styles.section}>
              <Subheading style={{fontWeight: 'bold'}}>
                ₹ {parseFloat(propertyCollected)}
              </Subheading>
              <Caption style={{fontSize: 16}}>Amount collected</Caption>
            </View>
          </View>
        </View>

        <View style={styles.actionRow}>
          {showUpdateStatus &&
          (modulePermissions?.editor || modulePermissions?.admin) ? (
            <Button
              mode="outlined"
              style={[styles.actionButton, {borderColor: theme.colors.primary}]}
              uppercase={false}
              theme={{roundness: 7}}
              onPress={navToAddCollection}>
              Add collection
            </Button>
          ) : null}
          <Button
            mode="outlined"
            style={[styles.actionButton, {borderColor: theme.colors.primary}]}
            uppercase={false}
            onPress={toggleActivityDialog}
            theme={{roundness: 7}}>
            View activity
          </Button>
        </View>

        <View style={styles.detailCard}>
          <Subheading style={{color: theme.colors.primary}}>
            Payment Schedule
          </Subheading>

          <View style={styles.cardItemsContainer}>
            <TouchableOpacity style={styles.cardItem} onPress={navToSchedule}>
              <Text>View Schedule Details</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.detailCard}>
          <Subheading style={{color: theme.colors.primary}}>
            Payment collection
          </Subheading>

          <View style={styles.cardItemsContainer}>
            <TouchableOpacity
              style={styles.cardItem}
              onPress={() =>
                navToDetails('document', paymentCollection?.documentcharges)
              }>
              <Text style={{color: theme.colors.documentation}}>
                Documentation charges
              </Text>
              <Badge
                style={{backgroundColor: theme.colors.primary}}
                visible={paymentCollection?.documentcharges?.length}>
                {paymentCollection?.documentcharges?.length}
              </Badge>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              style={styles.cardItem}
              onPress={() =>
                navToDetails('property', paymentCollection?.propertyfinalamount)
              }>
              <Text>Property Final Amount</Text>
              <Badge
                style={{backgroundColor: theme.colors.primary}}
                visible={paymentCollection?.propertyfinalamount?.length}>
                {paymentCollection?.propertyfinalamount?.length}
              </Badge>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              style={styles.cardItem}
              onPress={() => navToDetails('gst', paymentCollection?.gst)}>
              <Text>GST Amount</Text>
              <Badge
                style={{backgroundColor: theme.colors.primary}}
                visible={paymentCollection?.gst?.length}>
                {paymentCollection?.gst?.length}
              </Badge>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    marginBottom: 20,
  },
  statusCard: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(222, 225, 231, 1)',
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    marginRight: 10,
  },
  editIcon: {
    borderRadius: 50,
  },
  documentationContainer: {
    marginTop: 10,
  },
  documentationChargesContainer: {
    marginTop: 3,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountContainer: {
    marginTop: 3,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(222, 225, 231, 1)',
  },
  section: {
    padding: 10,
    flex: 1,
  },
  actionRow: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  actionButton: {
    width: '40%',
  },
  detailCard: {
    marginTop: 20,
    backgroundColor: 'rgba(242, 244, 245, 1)',
    padding: 15,
    borderRadius: 10,
  },
  cardItemsContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  cardItem: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statusBadge: {
    width: '45%',
  },
});

export default withTheme(Account);

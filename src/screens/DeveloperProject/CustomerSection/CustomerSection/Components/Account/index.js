import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
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
import {BOOKING_STATUS_STYLES} from 'components/Molecules/UnitSelector/RenderUnit';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import useCustomerActions from 'redux/actions/customerActions';

import {getPermissions} from 'utils';
import {Tabs} from 'react-native-collapsible-tab-view';
import ActivityDialog from './Components/ActivityDialog';

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
            style={styles.updateStatus}
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

  const {accountDetails} = useSelector(s => s.customer);
  const {
    paymentSchedule,
    paymentCollection = {},
    activityLog,
    bookingCurrentStatus = 3,
  } = accountDetails;

  const {documentCharges, propertyfinalamount} = paymentSchedule || {};

  const [activityDialog, setActivityDialog] = React.useState(false);
  const [statusDialog, setStatusDialog] = React.useState(false);

  const bookingStyle = BOOKING_STATUS_STYLES[bookingCurrentStatus] || {};

  const {documentCollected, propertyCollected} = React.useMemo(() => {
    const {documentcharges = [], propertyfinalamount: property = []} =
      paymentCollection;
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

  const CollectionTypes = React.useMemo(() => {
    return [
      {
        key: 'document',
        label: 'Documentation charges',
        value: paymentCollection?.documentcharges?.length,
        color: theme.colors.documentation,
      },
      {
        key: 'property',
        label: 'Property Final Amount',
        value: paymentCollection?.propertyfinalamount?.length,
        color: theme.colors.primary,
      },
      {
        key: 'gst',
        label: 'GST Amount',
        value: paymentCollection?.gst?.length,
        color: theme.colors.primary,
      },
    ];
  }, [paymentCollection, theme]);

  const PaymentScheduleTypes = React.useMemo(() => {
    return [
      {
        key: 'document',
        label: ' Documentation charges',
        value: paymentSchedule?.documentcharges?.length,
        color: theme.colors.documentation,
      },
      {
        key: 'property',
        label: 'Property Final Amount',
        value: paymentSchedule?.propertyfinalamount?.length,
        color: theme.colors.primary,
      },
      {
        key: 'bankLoanDetail',
        label: 'Bank loan details',
        value: paymentSchedule?.bankLoanDetail?.length,
        color: theme.colors.primary,
      },
    ];
  }, [paymentSchedule, theme]);

  const toggleStatusDialog = () => setStatusDialog(v => !v);
  const toggleActivityDialog = () => setActivityDialog(v => !v);

  const updateStatus = status => {
    updateBookingStatus({
      project_id,
      unit_id: unit.unit_id,
      booking_status: status,
    }).then(() => {
      toggleStatusDialog();

      getAccountDetails({project_id, unit_id: unit.unit_id});
    });
  };

  const navToDetails = (type, data) =>
    navigation.navigate('PaymentCollections', {...route.params, type, data});

  const navToSchedule = type =>
    navigation.navigate('PaymentSchedule', {data: paymentSchedule, type});

  const rightActivitySection = () => {
    return (
      <View>
        <MaterialIcons
          onPress={toggleActivityDialog}
          name="info-outline"
          size={20}
          color="#8B959F"
        />
      </View>
    );
  };

  return (
    <Tabs.ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.containerSection}>
      <ActivityDialog
        open={activityDialog}
        handleClose={toggleActivityDialog}
        data={activityLog}
      />
      <StatusDialog
        open={statusDialog}
        status={bookingCurrentStatus}
        handleClose={toggleStatusDialog}
        updateStatus={updateStatus}
      />

      <View style={styles.documentationContainer}>
        <Subheading style={{color: theme.colors.documentation}}>
          Documentation Charges
        </Subheading>

        <View
          style={[
            styles.documentationChargesContainer,
            {borderColor: theme.colors.documentation},
          ]}>
          <View
            style={[
              styles.documentSection,
              {borderColor: theme.colors.documentation},
            ]}>
            <Subheading style={styles.allSubheading}>
              ₹ {parseFloat(documentCharges?.document_charge) || 0}
            </Subheading>
            <Caption style={styles.fontSize}>Total amount</Caption>
          </View>
          <View style={styles.documentAmountSection}>
            <Subheading style={styles.allSubheading}>
              ₹ {parseFloat(documentCollected)}
            </Subheading>
            <Caption style={styles.fontSize}>Amount collected</Caption>
          </View>
        </View>
      </View>

      <View style={styles.documentationContainer}>
        <Subheading>Property Final Amount </Subheading>

        <View style={styles.amountContainer}>
          <View style={styles.section}>
            <Subheading style={styles.allSubheading}>
              ₹{' '}
              {parseFloat(
                propertyfinalamount?.full_basic_amount ||
                  propertyfinalamount?.basic_amount,
              ) || 0}
            </Subheading>
            <Caption style={styles.fontSize}>Total amount</Caption>
          </View>
          <View style={styles.section}>
            <Subheading style={styles.allSubheading}>
              ₹ {parseFloat(propertyCollected)}
            </Subheading>
            <Caption style={styles.fontSize}>Amount collected</Caption>
          </View>
        </View>
      </View>

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
            <Text>{bookingStyle.title}</Text>
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

        <View style={styles.detailCard}>
          <View style={styles.rightIcon}>
            <Subheading style={{color: theme.colors.primary}}>
              Payment collection
            </Subheading>
            {rightActivitySection()}
          </View>

          <View style={styles.cardItemsContainer}>
            {CollectionTypes.map(item => (
              <>
                <TouchableOpacity
                  style={styles.cardItem}
                  onPress={() => navToDetails(item.key)}>
                  <View style={styles.arrowButton}>
                    <View style={styles.badgeButton}>
                      <Text style={{color: item.color}}>{item.label}</Text>
                      {item.value ? (
                        <Badge
                          style={[
                            styles.documentBadge,
                            {backgroundColor: theme.colors.primary},
                          ]}
                          visible={item.value}>
                          {item.value}
                        </Badge>
                      ) : null}
                    </View>
                    <Ionicons
                      name="ios-arrow-forward-circle"
                      size={22}
                      color={theme.colors.primary}
                    />
                  </View>
                </TouchableOpacity>
                <Divider />
              </>
            ))}
          </View>
        </View>

        <View style={styles.detailCard}>
          <View style={styles.rightIcon}>
            <Subheading style={{color: theme.colors.primary}}>
              Payment Schedule
            </Subheading>
            {rightActivitySection()}
          </View>

          <View style={styles.cardItemsContainer}>
            {PaymentScheduleTypes.map(item => (
              <>
                <TouchableOpacity
                  style={styles.cardItem}
                  onPress={() => navToSchedule(item.key)}>
                  <View style={styles.arrowButton}>
                    <View style={styles.badgeButton}>
                      <Text style={{color: item.color}}>{item.label}</Text>
                      {item.value ? (
                        <Badge
                          style={[
                            styles.documentBadge,
                            {backgroundColor: theme.colors.primary},
                          ]}
                          visible={item.value}>
                          {item.value}
                        </Badge>
                      ) : null}
                    </View>
                    <Ionicons
                      name="ios-arrow-forward-circle"
                      size={22}
                      color={theme.colors.primary}
                    />
                  </View>
                </TouchableOpacity>
                <Divider />
              </>
            ))}
          </View>
        </View>
      </View>
    </Tabs.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  containerSection: {
    flexGrow: 1,
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
    paddingHorizontal: 13,
  },
  documentationChargesContainer: {
    marginTop: 3,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
    borderRightWidth: 1,
    borderColor: 'rgba(222, 225, 231, 1)',
  },

  documentSection: {
    padding: 10,
    flex: 1,
    borderRightWidth: 1,
    backgroundColor: 'rgba(243, 122, 80, 0.1)',
  },
  documentAmountSection: {
    flex: 1,
    backgroundColor: 'rgba(243, 122, 80, 0.1)',
    padding: 10,
  },
  allSubheading: {
    fontWeight: 'bold',
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
  badgeButton: {
    flexDirection: 'row',
  },
  documentBadge: {
    marginLeft: 10,
  },

  arrowButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginRight: -10,
    alignItems: 'center',
  },
  rightIcon: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  fontSize: {
    fontSize: 16,
  },
  updateStatus: {
    marginTop: 15,
    marginHorizontal: 15,
  },
});

export default withTheme(Account);

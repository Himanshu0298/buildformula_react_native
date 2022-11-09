import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import {Caption, Divider, IconButton, FAB} from 'react-native-paper';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import {useAlert} from 'components/Atoms/Alert';
import {theme} from 'styles/theme';

const UnitHeader = props => {
  const {brokageDealDetails} = props;

  const {project_type, Tower, Floor} = brokageDealDetails?.property_info || {};

  const unitNumber = brokageDealDetails?.property_info?.['Unit number'] || '';

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerSubContainer}>
        <View style={styles.propDetailBox}>
          <Text style={styles.textSize}>Project type: </Text>
          <Text style={[styles.textSize, styles.blueText]}>{project_type}</Text>
        </View>
        <View style={styles.ContentContainer}>
          <Text style={styles.textSize}>Floor: </Text>
          <Text style={[styles.textSize, styles.blueText]}>{Floor}</Text>
        </View>
      </View>
      <View style={styles.headerSubContainer}>
        <View style={styles.propDetailBox}>
          <Text style={styles.textSize}>Tower: </Text>
          <Text style={[styles.textSize, styles.blueText]}>{Tower}</Text>
        </View>
        <View style={styles.ContentContainer}>
          <Text style={styles.textSize}>Unit number: </Text>
          <Text style={[styles.textSize, styles.blueText]}>{unitNumber}</Text>
        </View>
      </View>
    </View>
  );
};

const PaymentCard = props => {
  const {brokageDealDetails} = props;
  const {total_brokerage, paid, remaining} =
    brokageDealDetails?.brokerage_totals || {};

  return (
    <View style={styles.brokerPaymentDetails}>
      <Text style={styles.blueText}>Broker Payment</Text>
      <View style={styles.paymentContainer}>
        <View style={styles.paymentSubContainer}>
          <Text style={styles.textSize}>Total Brokerage</Text>
          <Text style={styles.commonText}>{total_brokerage}</Text>
        </View>
        <View>
          <Text style={styles.textSize}>Remaining</Text>
          <Text style={styles.commonText}>{remaining}</Text>
        </View>
        <View>
          <Text style={styles.textSize}>Paid</Text>
          <Text style={styles.commonText}>{paid}</Text>
        </View>
      </View>
    </View>
  );
};

const DetailCard = props => {
  const {navigation, item, handleDelete, brokerId, projectBookingId} = props;
  const {
    id,
    payment_mode,
    bank_branch,
    remarks,
    payment_amount,
    created,
    transaction,
    transaction_number,
  } = item;

  return (
    <View style={styles.bankDetailsBox}>
      <View style={styles.paymentContainer}>
        <View>
          <Text style={styles.textSize}>Date</Text>
          <Caption>{created}</Caption>
        </View>
        <View style={styles.ContentContainer}>
          <View style={styles.button}>
            <OpacityButton
              color={theme.colors.primary}
              opacity={0.18}
              style={styles.buttonContainer}
              onPress={() => {
                navigation.navigate('AddBrokerPaymentDetails', {
                  id,
                  brokerId,
                  projectBookingId,
                });
              }}>
              <MaterialIcons
                name="edit"
                color={theme.colors.primary}
                size={13}
              />
            </OpacityButton>
          </View>
          <View>
            <OpacityButton
              color={theme.colors.error}
              opacity={0.18}
              onPress={() => handleDelete(item)}
              style={styles.buttonSubContainer}>
              <MaterialIcons
                name="delete"
                color={theme.colors.error}
                size={13}
              />
            </OpacityButton>
          </View>
        </View>
      </View>
      <View style={styles.details}>
        <Text style={styles.textSize}>Bank Name & Branch</Text>
        <Caption>{bank_branch}</Caption>
      </View>
      <View style={styles.details}>
        <Text style={styles.textSize}>Check no. / Transaction no.</Text>
        <Caption>{transaction_number}</Caption>
      </View>
      <View style={styles.paymentContent}>
        <View style={styles.details}>
          <Text style={styles.textSize}>Payment Mode</Text>
          <Caption>{payment_mode}</Caption>
        </View>

        <View style={styles.details}>
          <Text style={styles.textSize}>Credit </Text>
          <Caption>
            {transaction === 'CR' ? `₹ ${payment_amount}` : '-'}
          </Caption>
        </View>
      </View>
      <View style={styles.paymentContent}>
        <View style={styles.details}>
          <Text style={styles.textSize}>Debit </Text>
          <Caption>
            {transaction === 'DR' ? `₹ ${payment_amount}` : '-'}
          </Caption>
        </View>
        <View style={styles.details}>
          <Text style={styles.textSize}>Balance </Text>
          <Caption>₹ {payment_amount}</Caption>
        </View>
      </View>
      <View style={styles.details}>
        <Text style={styles.textSize}>Remark </Text>
        <Caption>{remarks}</Caption>
      </View>
    </View>
  );
};

const DealsClosedDetails = props => {
  const {navigation} = props;

  const alert = useAlert();

  const {getBrokerageDealDetails, deleteBrokeragePayment} = useSalesActions();
  const {brokageDealDetails, brokerDetails} = useSelector(s => s.sales);
  const brokerId = brokerDetails?.brokerInfo?.id;

  const {dealClosedInfo} = brokerDetails;

  const {selectedProject} = useSelector(s => s.project);

  const projectId = selectedProject.id;

  const bookingId = useMemo(() => {
    return dealClosedInfo?.find(i => i.id === bookingId);
  }, [dealClosedInfo]);

  const projectBookingId = bookingId?.booking_id;

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = () =>
    getBrokerageDealDetails({
      project_id: projectId,
      broker_id: brokerId,
      project_bookings_id: projectBookingId,
    });

  const handleDelete = item => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: () => {
        deleteBrokeragePayment({
          project_id: selectedProject.id,
          broker_payments_id: item.id,
        });
        getData();
      },
    });
  };

  return (
    <View style={styles.container}>
      <ProjectHeader {...props} />
      <View style={styles.paymentContent}>
        <IconButton
          icon="keyboard-backspace"
          size={25}
          color={theme.colors.primary}
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Closed Deal Details</Text>
      </View>
      <View style={styles.mainContainer}>
        <UnitHeader brokageDealDetails={brokageDealDetails} />
        <Divider style={styles.divider} />
        <PaymentCard brokageDealDetails={brokageDealDetails} />

        <ScrollView showsVerticalScrollIndicator={false}>
          {brokageDealDetails?.broker_payments_list?.map(item => {
            return (
              <View style={styles.card}>
                <DetailCard
                  navigation={navigation}
                  handleDelete={handleDelete}
                  item={item}
                  projectBookingId={projectBookingId}
                  brokerId={brokerId}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
      <FAB
        style={[styles.fab, {backgroundColor: theme.colors.primary}]}
        large
        icon="plus"
        onPress={() =>
          navigation.navigate('AddBrokerPaymentDetails', {
            brokerId,
            projectBookingId,
          })
        }
      />
    </View>
  );
};

export default DealsClosedDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    flexGrow: 1,
    margin: 10,
  },
  propDetailBox: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  headerText: {
    fontSize: 15,
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

  divider: {
    height: 2,
  },

  commonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  paymentContainer: {
    flexDirection: 'row',
    marginVertical: 6,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brokerPaymentDetails: {
    marginVertical: 15,
  },
  paymentSubContainer: {
    marginVertical: 3,
  },
  bankDetailsBox: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#C3C3C3',
  },
  details: {
    marginVertical: 4,
  },
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 40,
  },
  paymentContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
  },

  headerContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },

  headerSubContainer: {
    width: '50%',
  },

  ContentContainer: {
    flexDirection: 'row',
  },

  backButton: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
  },

  buttonContainer: {
    borderRadius: 20,
    marginLeft: 10,
    marginBottom: 10,
  },

  buttonSubContainer: {
    borderRadius: 20,
  },
  button: {
    marginRight: 10,
  },
  card: {
    marginBottom: 10,
  },
});

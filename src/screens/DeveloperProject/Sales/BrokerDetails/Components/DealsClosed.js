import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import React, {useEffect, useMemo} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {
  Caption,
  Divider,
  Title,
  Dialog,
  Portal,
  Button,
} from 'react-native-paper';
import {theme} from 'styles/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RenderHtml from 'react-native-render-html';
import Layout from 'utils/Layout';
import RenderInput from 'components/Atoms/RenderInput';
import {useSelector} from 'react-redux';
import {Formik} from 'formik';
import useSalesActions from 'redux/actions/salesActions';

function SingleUnit(props) {
  const {sectionLeft, sectionRight} = props;

  return (
    <View style={styles.unitContainer}>
      <View style={styles.unitSubContainer}>
        <Text style={styles.unitLabel}>{sectionLeft.label}: </Text>
        <Text>{sectionLeft.value} </Text>
      </View>
      <View style={styles.unitLabelContainer}>
        <Text style={styles.unitLabel}>{sectionRight.label}: </Text>
        <Text>{sectionRight.value} </Text>
      </View>
    </View>
  );
}

const BrokerageDialog = props => {
  const {visible, hideDialog, onSubmit} = props;

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={hideDialog}
        style={styles.dialogContainer}>
        <View>
          <Text style={styles.dialogSubContainer}>Brokerage Amount</Text>
          <Formik
            enableReinitialize
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={{}}
            onSubmit={onSubmit}>
            {({values, errors, handleChange, handleBlur, handleSubmit}) => {
              return (
                <>
                  <RenderInput
                    name="brokerage"
                    label="Brokerage"
                    containerStyles={styles.inputStyles}
                    value={values.brokerage}
                    onChangeText={handleChange('brokerage')}
                    onBlur={handleBlur('brokerage')}
                    error={errors.brokerage}
                  />
                  <Dialog.Actions style={styles.buttonContainer}>
                    <Button
                      style={styles.cancelButton}
                      onPress={() => hideDialog()}>
                      Cancel
                    </Button>
                    <Button onPress={handleSubmit}>Ok</Button>
                  </Dialog.Actions>
                </>
              );
            }}
          </Formik>
        </View>
      </Dialog>
    </Portal>
  );
};

const PaymentDetails = props => {
  const {showModal, deal} = props;
  const {brokerage = 0, total_brokerage_paid = 0} = deal || {};

  return (
    <View style={styles.bottomContainer}>
      <View style={styles.bottomSubContainer}>
        <View style={styles.paymentContainer}>
          <Text>Total Brokerage</Text>
          <OpacityButton
            color={theme.colors.primary}
            opacity={0.18}
            style={styles.paymentSubContainer}
            onPress={showModal}>
            <MaterialIcons name="edit" color={theme.colors.primary} size={10} />
          </OpacityButton>
          <Text style={styles.amount}>{brokerage}</Text>
        </View>
        <View>
          <Text>Total Paid</Text>
          <View>
            <Text style={styles.amount}>{total_brokerage_paid}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const DealsClosed = props => {
  const {navigation, userData} = props;

  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);
  const showModal = () => setVisible(true);

  const {getBrokerDetails, editBrokerage} = useSalesActions();

  const {brokerDetails} = useSelector(s => s.sales);

  const {selectedProject} = useSelector(s => s.project);
  const projectId = selectedProject.id;

  const {dealClosedInfo} = brokerDetails;

  const bookingId = useMemo(() => {
    return dealClosedInfo?.find(i => i.id === bookingId);
  }, [dealClosedInfo]);

  const projectBookingId = bookingId?.booking_id;

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, userData.id]);

  const loadData = async () => {
    await getBrokerDetails({project_id: projectId, broker_id: userData.id});
  };

  const handleRemarkPress = remark => {
    navigation.navigate('Remark', {remark, userData});
  };

  const onSubmit = values => {
    editBrokerage({
      project_id: projectId,
      project_bookings_id: projectBookingId,
      broker_amount: values.brokerage,
    });
    navigation.goBack();
  };

  return (
    <>
      <BrokerageDialog
        {...props}
        visible={visible}
        hideDialog={hideDialog}
        onSubmit={onSubmit}
      />
      <ScrollView>
        {dealClosedInfo?.map(deal => {
          const remark = deal.Remark;
          const isHtml = remark?.includes('<') && remark?.includes('>');

          return (
            <View style={styles.headerContainer}>
              <View style={styles.headerSubContainer}>
                <View style={styles.headerTitleContainer}>
                  <Title>Property</Title>
                  <Caption>{deal.booking_date}</Caption>
                </View>
                <SingleUnit
                  sectionLeft={{label: 'Type', value: deal.projectType}}
                  sectionRight={{label: 'Tower', value: deal.Tower}}
                />
                <SingleUnit
                  sectionLeft={{label: 'Floor', value: deal.Floor}}
                  sectionRight={{label: 'Unit', value: deal.Unitnumber}}
                />
              </View>
              <Divider style={styles.divider} />
              <View style={styles.remarkContainer}>
                <View style={styles.inputContainer}>
                  <Text>Remark</Text>
                  <OpacityButton
                    color={theme.colors.primary}
                    opacity={0.18}
                    style={styles.editRemark}
                    onPress={() => handleRemarkPress(remark)}>
                    <MaterialIcons
                      name="edit"
                      color={theme.colors.primary}
                      size={10}
                    />
                  </OpacityButton>
                </View>
                {!isHtml ? (
                  <Text style={styles.headerSubContainer}>{remark}</Text>
                ) : (
                  <RenderHtml
                    source={{html: remark}}
                    contentWidth={Layout.window.width}
                  />
                )}
              </View>
              <Divider style={styles.divider} />

              <PaymentDetails showModal={showModal} deal={deal} />

              <Divider style={styles.divider} />

              <View style={styles.detailContainer}>
                <Button
                  direction="rtl"
                  style={styles.button}
                  mode="outlined"
                  contentStyle={styles.buttonLabel}
                  icon="chevron-right"
                  theme={{roundness: 15}}
                  onPress={() => navigation.navigate('DealsClosedDetails')}>
                  View more
                </Button>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};

export default DealsClosed;

const styles = StyleSheet.create({
  unitContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  unitSubContainer: {
    borderRightWidth: 1,
    borderRightColor: 'grey',
    flexDirection: 'row',
    paddingRight: 10,
  },

  headerContainer: {
    borderWidth: 1,
    marginTop: 20,
    borderColor: '#C3C3C3',
    margin: 10,
    borderRadius: 5,
  },

  unitLabel: {
    color: 'grey',
  },
  divider: {
    height: 2,
  },
  paymentContainer: {
    flexDirection: 'row',
  },

  unitLabelContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },

  paymentSubContainer: {
    borderRadius: 20,
    marginLeft: 10,
    marginBottom: 10,
  },

  dialogContainer: {
    borderRadius: 20,
    padding: 20,
  },
  dialogSubContainer: {
    color: '#4872f4',
    fontSize: 15,
  },

  inputContainer: {
    flexDirection: 'row',
  },

  headerSubContainer: {
    padding: 10,
  },

  buttonContainer: {
    marginTop: 10,
  },

  remarkContainer: {
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },

  bottomContainer: {
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },

  detailContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'flex-end',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  bottomSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  amount: {
    color: '#4872f4',
    fontSize: 15,
    fontWeight: 'bold',
  },
  cancelButton: {
    marginRight: 20,
  },
  button: {
    width: 130,
  },
  editRemark: {
    borderRadius: 20,
    marginLeft: 10,
    marginBottom: 10,
  },
});

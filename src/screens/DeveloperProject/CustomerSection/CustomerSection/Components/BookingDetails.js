import * as React from 'react';
import {StyleSheet, View, useWindowDimensions, ScrollView} from 'react-native';
import {
  Caption,
  Divider,
  Subheading,
  Text,
  Title,
  withTheme,
} from 'react-native-paper';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import dayjs from 'dayjs';
import {useMemo} from 'react';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RenderHtml, {RenderHTML} from 'react-native-render-html';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import ActionButtons from 'components/Atoms/ActionButtons';
import Layout from 'utils/Layout';
import {Tabs} from 'react-native-collapsible-tab-view';
import useCustomerActions from 'redux/actions/customerActions';
import {useAlert} from 'components/Atoms/Alert';
import useCustomerServices from 'services/customer';
import {theme} from 'styles/theme';

const schema = Yup.object().shape({
  email: Yup.string('Required').required('Required'),
  phone: Yup.number('Required')
    .required('Required')
    .min(10, 'Must be 10 digit'),
});

function getDocumnetCharges(bookingDetails) {
  const {
    full_payment_documentation_charges,
    installment_payment_documentation_charges,
    custom_payment_documentation_charges,
  } = bookingDetails;

  return (
    (Number(full_payment_documentation_charges) &&
      full_payment_documentation_charges) ||
    (Number(installment_payment_documentation_charges) &&
      installment_payment_documentation_charges) ||
    (Number(custom_payment_documentation_charges) &&
      custom_payment_documentation_charges)
  );
}

function RenderRow({row, style}) {
  return (
    <View style={[styles.row, style]}>
      {row.map(({label, labelStyle, value}, index) => {
        return (
          <View key={index} style={styles.cell}>
            <Text style={labelStyle}>{label}:</Text>
            <Caption style={{flexShrink: 1}}>{value}</Caption>
          </View>
        );
      })}
    </View>
  );
}

function CustomerCredLogin(props) {
  const {bookingDetails, navigation} = props;
  const alert = useAlert();

  const {customer_phone, customer_email, id} = bookingDetails;

  const projectId = useSelector(s => s.project.selectedProject.id);

  const [editLoginCred, setEditLoginCred] = React.useState(false);

  const {deleteBooking, cancelBooking} = useCustomerServices();
  // const {getBookingDetails} = useCustomerActions();

  const handleDelete = async project_bookings_id => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: () => {
        deleteBooking({project_id: projectId, project_bookings_id}).then(() => {
          navigation.goBack();
        });
      },
    });
  };

  const handleCancel = async project_bookings_id => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to Cancel?',
      confirmText: 'Yes',
      onConfirm: () => {
        cancelBooking({project_id: projectId, project_bookings_id}).then(() => {
          navigation.goBack();
        });
      },
    });
  };

  const handleCredEdit = () => setEditLoginCred(true);

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.buttonIcon}>
        <View>
          <OpacityButton
            opacity={0.1}
            onPress={() => handleDelete(id)}
            color={theme.colors.red}
            style={styles.deletButton}>
            <MaterialCommunityIcons
              color={theme.colors.red}
              name="delete"
              size={16}
              style={styles.iconStyle}
            />
            <Text>Delete</Text>
          </OpacityButton>
        </View>
        <View>
          <OpacityButton
            opacity={0.1}
            onPress={() => handleCancel(id)}
            color={theme.colors.primary}
            style={styles.editButton}>
            <MaterialCommunityIcons
              color={theme.colors.primary}
              name="tag"
              size={16}
              style={styles.iconStyle}
            />
            <Text>Cancel & Open for re-sale</Text>
          </OpacityButton>
        </View>
      </View>
      <View style={styles.heading}>
        <Subheading style={{color: theme.colors.primary}}>
          CUSTOMER LOGIN CREDENTIAL
        </Subheading>
        {!editLoginCred ? (
          <OpacityButton
            opacity={0.1}
            onPress={handleCredEdit}
            color={theme.colors.primary}
            style={styles.credEditButton}>
            <MaterialCommunityIcons
              color={theme.colors.primary}
              name="pencil"
              size={20}
              style={styles.iconStyle}
            />
          </OpacityButton>
        ) : null}
      </View>

      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{email: customer_email, phone: customer_phone}}
        validationSchema={schema}
        onSubmit={value => {
          setEditLoginCred(false);
        }}>
        {({values, errors, handleChange, handleSubmit}) => (
          <View style={styles.customerCredentialContainer}>
            <View style={styles.customerCredential}>
              <View style={styles.emailContainer}>
                <Text>Email</Text>
                {editLoginCred ? (
                  <RenderTextBox
                    name="email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    error={errors.email}
                    style={styles.renderTextBox}
                  />
                ) : (
                  <Text>{customer_email}</Text>
                )}
              </View>

              <View style={{width: '50%'}}>
                <Text>Phone</Text>
                {editLoginCred ? (
                  <RenderTextBox
                    name="phone"
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    error={errors.phone}
                  />
                ) : (
                  <Text> {`+91 ${customer_phone}`}</Text>
                )}
              </View>
            </View>
            {editLoginCred ? (
              <ActionButtons
                cancelLabel="Cancel"
                submitLabel="Save"
                onCancel={() => {
                  setEditLoginCred(false);
                }}
                onSubmit={handleSubmit}
              />
            ) : null}
          </View>
        )}
      </Formik>
    </View>
  );
}

function CustomerSection({bookingDetails}) {
  const {
    customer_first_name,
    customer_last_name,
    customer_phone,
    customer_email,
    through_broker,
  } = bookingDetails;

  return (
    <View style={styles.sectionContainer}>
      <Subheading style={{color: theme.colors.primary}}>
        CUSTOMER DETAILS
      </Subheading>
      <View style={styles.sectionBody}>
        <RenderRow
          row={[
            {label: 'First Name', value: customer_first_name},
            {label: 'Last Name', value: customer_last_name},
          ]}
        />
        <RenderRow
          row={[
            {
              label: 'Phone',
              value: customer_phone ? `+91 ${customer_phone}` : '',
            },
            {label: 'Through broker', value: _.startCase(through_broker)},
          ]}
        />
        <RenderRow row={[{label: 'Email', value: customer_email}]} />
      </View>
    </View>
  );
}

function BrokerSection({bookingDetails}) {
  const {
    broker_first_name,
    broker_last_name,
    broker_phone,
    broker_email,
    broker_remark,
  } = bookingDetails;

  return (
    <View style={styles.brokerContainer}>
      <Subheading style={{color: theme.colors.primary}}>
        BROKER DETAILS
      </Subheading>
      <View style={styles.sectionBody}>
        <RenderRow
          row={[
            {label: 'First Name', value: broker_first_name},
            {label: 'Last Name', value: broker_last_name},
          ]}
        />
        <RenderRow
          row={[
            {
              label: 'Phone',
              value: broker_phone ? `+91 ${broker_phone}` : '',
            },
            {label: 'Email', value: broker_email},
          ]}
        />
        <RenderRow row={[{label: 'Remarks', value: broker_remark}]} />
      </View>
    </View>
  );
}

function RatesSection(props) {
  const {bookingDetails, bookingAreaUnitType} = props;

  const {
    area_for_super_buildup,
    area_for_buildup,
    area_carpet_unit,
    rate_super_buildup,
    rate_for_buildup,
    rate_for_carpet,
    area_for_carpet,
    main_total_amount,
    other_charges = [],
    area_for_super_buildup__bunglow,
    area_for_buildup_bunglow,
    rate_super_buildup_bunglow,
    rate_for_buildup_bunglow,
    total_super_buildup_construction_amount,
    bookedUnit,
  } = bookingDetails;

  const otherChargePairs = React.useMemo(() => {
    if (other_charges.length > 0) {
      return new Array(Math.ceil(2))
        .fill()
        .map(() => other_charges.splice(0, 2));
    }
    return [];
  }, [other_charges]);

  const unit = bookingAreaUnitType[area_carpet_unit]?.toLowerCase();

  return (
    <View style={styles.sectionContainer}>
      <Title style={styles.bookingRateText}>Booking Rate</Title>
      <Subheading style={{color: theme.colors.primary}}>
        BASIC AMOUNT
      </Subheading>
      <View style={styles.sectionBody}>
        <Text style={styles.areaBuild}>Area</Text>
        <RenderRow
          row={[
            {
              label: 'Super Buildup',
              value: `${area_for_super_buildup} ${unit}.`,
            },
            {label: 'Buildup', value: `${area_for_buildup} ${unit}.`},
            {label: 'Carpet', value: `${area_for_carpet} ${unit}.`},
          ]}
        />
        <Text style={styles.areaBuild}>Rate</Text>
        <RenderRow
          row={[
            {
              label: 'Super Buildup',
              value: `Rs.${rate_super_buildup}`,
            },
            {label: 'Buildup', value: `Rs.${rate_for_buildup}`},
            {label: 'Carpet', value: `Rs.${rate_for_carpet}`},
          ]}
        />
        <Caption style={styles.totalBasicAmountText}>
          Total Basic Amount
        </Caption>
        <RenderRow
          row={[
            {label: 'As Super Buildup', value: `Rs.${main_total_amount}`},
            {label: 'As Buildup', value: `Rs.${main_total_amount}`},
          ]}
        />
        <RenderRow
          row={[{label: 'As Carpet', value: `Rs.${main_total_amount}`}]}
        />

        {bookedUnit.project_type === 4 ? (
          <>
            <Subheading style={styles.constructionRateText}>
              CONSTRUCTION RATE
            </Subheading>
            <RenderRow
              row={[
                {
                  label: 'Super Build-up Area',
                  value: `${area_for_super_buildup__bunglow}`,
                },
                {label: 'Build-up Area', value: `${area_for_buildup_bunglow}`},
              ]}
            />
            <RenderRow
              row={[
                {
                  label: 'Super Build-up Rate',
                  value: `${rate_super_buildup_bunglow}`,
                },
                {label: 'Build-up Rate', value: `${rate_for_buildup_bunglow}`},
              ]}
            />

            <Caption style={styles.totalConstructionText}>
              Total Construction Amount
            </Caption>
            <RenderRow
              row={[
                {
                  label: 'As Super Buildup',
                  value: `Rs.${total_super_buildup_construction_amount}`,
                },
                {
                  label: 'As Buildup',
                  value: `Rs.${total_super_buildup_construction_amount}`,
                },
              ]}
            />
          </>
        ) : null}

        {otherChargePairs.length ? (
          <>
            <Subheading style={{color: theme.colors.primary}}>
              OTHER CHARGES
            </Subheading>
            {otherChargePairs.map((pair, index) => {
              return (
                <RenderRow
                  key={index}
                  row={pair.map(({label, amount}) => ({
                    label,
                    value: `Rs.${amount}`,
                  }))}
                />
              );
            })}
          </>
        ) : null}
        <Divider />
        <RenderCharges {...props} />
        <Divider />
        <View style={styles.totalContainer}>
          <View style={styles.finalProperty}>
            <Text style={styles.finalPropertyAmountText}>
              Final Property Amount
            </Text>
            <Text style={styles.finalPropertyAmount}>
              Rs. {main_total_amount}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function RenderCharges(props) {
  const {bookingDetails} = props;
  const {total_other_charges, discount_amount} = bookingDetails;

  return (
    <View style={styles.sectionBody}>
      <RenderRow
        row={[
          {
            label: 'Total Other Charges',
            labelStyle: {color: theme.colors.documentation},
            value: `Rs.${total_other_charges}`,
          },
          {
            label: 'Discount Amount',
            labelStyle: {color: theme.colors.documentation},
            value: `Rs.${discount_amount}`,
          },
        ]}
      />
      <RenderRow
        row={[
          {
            label: 'Documentation Charges',
            labelStyle: {color: theme.colors.documentation},
            value: `Rs.${getDocumnetCharges(bookingDetails)}`,
          },
        ]}
      />
    </View>
  );
}

function RenderDocumentCharges(props) {
  const {bookingDetails, bookingPaymentTypes} = props;
  const {
    full_payment_documentation_charges_start_date,
    full_payment_documentation_charges_end_date,
    custom_payment_documentation_charges_start_date,
    custom_payment_documentation_charges_end_date,
    installment_payment_documentation_charges_start_date,
    installment_payment_documentation_charges_end_date,
    payment_type,
  } = bookingDetails;

  return (
    <View style={styles.sectionBody}>
      <RenderRow
        row={[
          {
            label: 'Payment method',
            value: `${bookingPaymentTypes[payment_type]}`,
          },
        ]}
      />
      <RenderRow
        row={[
          {
            label: 'Documentation charges',
            labelStyle: {color: theme.colors.documentation},
            value: `Rs.${getDocumnetCharges(bookingDetails)}`,
          },
        ]}
      />
      <RenderRow
        row={[
          {
            label: 'Start date',
            labelStyle: {color: theme.colors.documentation},
            value: dayjs(
              full_payment_documentation_charges_start_date ||
                custom_payment_documentation_charges_start_date ||
                installment_payment_documentation_charges_start_date,
            ).format('DD MMM YYYY'),
          },
          {
            label: 'End date',
            labelStyle: {color: theme.colors.documentation},
            value: dayjs(
              full_payment_documentation_charges_end_date ||
                custom_payment_documentation_charges_end_date ||
                installment_payment_documentation_charges_end_date,
            ).format('DD MMM YYYY'),
          },
        ]}
      />
    </View>
  );
}

function RenderFullPaymentDetails(props) {
  const {bookingDetails} = props;
  const {start_date, end_date, full_basic_amount} = bookingDetails;

  return (
    <>
      <RenderDocumentCharges {...props} />
      <View style={styles.sectionBody}>
        <RenderRow
          row={[
            {label: 'Property Final amount', value: `Rs.${full_basic_amount} `},
          ]}
        />
        <RenderRow
          row={[
            {
              label: 'Start date',
              value: dayjs(start_date).format('DD MMM YYYY'),
            },
            {label: 'End date', value: dayjs(end_date).format('DD MMM YYYY')},
          ]}
        />
      </View>
    </>
  );
}
function RenderCustomPaymentDetails(props) {
  const {bookingDetails} = props;

  const {custom_basic_amount, custom_payment = []} = bookingDetails;
  return (
    <View style={styles.sectionContainer}>
      <RenderDocumentCharges {...props} />

      <View style={styles.sectionBody}>
        <RenderRow
          row={[
            {
              label: 'Final Property Amount',
              value: `Rs.${custom_basic_amount}`,
            },
          ]}
        />
        <Divider style={styles.dividerRenderPayment} />
        {custom_payment.map(payment => {
          const {percent, amount, date, remark} = payment;
          return (
            <>
              <RenderRow
                style={styles.renderRow}
                row={[
                  {label: 'Percent', value: `${percent} %`},
                  {label: 'Amount', value: `Rs.${amount}`},
                  {label: 'Date', value: date},
                ]}
              />
              <RenderRow row={[{label: 'Remarks', value: remark}]} />
              <Divider />
            </>
          );
        })}
      </View>
    </View>
  );
}

export function RenderInstallments(props) {
  const {installments} = props;
  if (installments?.length) {
    return (
      <>
        <View style={styles.installmentRow}>
          <Caption style={{color: theme.colors.primary}}>No.</Caption>
          <Caption style={{color: theme.colors.primary}}>
            Installment Date
          </Caption>
          <Caption style={{color: theme.colors.primary}}>Amount</Caption>
        </View>
        {installments?.map((installment, index) => {
          return (
            <View key={index} style={styles.installmentRow}>
              <Caption>{installment.id}</Caption>
              <View style={styles.installmentDate}>
                <Caption>{installment.date}</Caption>
              </View>
              <View style={styles.installmentAmount}>
                <Caption>₹ {installment.amount}</Caption>
              </View>
            </View>
          );
        })}
      </>
    );
  }

  return <View />;
}

function RenderFirstBigPaymentDetails(props) {
  const {bookingDetails} = props;
  const {
    first_big_amount_percentage,
    instllment_first_amount,
    installment_start_date_all,
    installment_payment_remarks,
    installment_numbers,
    installment_start_date,
    installment_end_date,
    installment_interval_days,
    installments,
    installment_date,
    installment_amount,
  } = bookingDetails;

  const {width} = useWindowDimensions();

  const parsedInstallments = useMemo(() => {
    return installments?.map((id, index) => ({
      id,
      date: installment_date[index],
      amount: installment_amount[index],
    }));
  }, [installment_amount, installment_date, installments]);

  const source = {html: installment_payment_remarks};

  return (
    <View style={styles.sectionContainer}>
      <RenderDocumentCharges {...props} />

      <View style={styles.sectionBody}>
        <Text style={{color: theme.colors.primary}}>DOWNPAYMENT</Text>
      </View>
      <View style={styles.sectionBody}>
        <RenderRow
          row={[
            {label: 'Percent', value: `${first_big_amount_percentage} %`},
            {label: 'Amount', value: `Rs.${instllment_first_amount}`},
            {
              label: 'Date',
              value: dayjs(installment_start_date_all).format('DD MMM YYYY'),
            },
          ]}
        />

        <View style={styles.remark}>
          <Text>Remark: </Text>
          <RenderHtml contentWidth={width} source={source} />
        </View>

        <Text style={styles.installmentText}>INSTALLMENT</Text>
        <RenderRow
          row={[{label: 'No. of installments', value: installment_numbers}]}
        />
        <RenderRow
          row={[
            {
              label: 'Start date',
              value: dayjs(installment_start_date).format('DD MMM YYYY'),
            },
            {
              label: 'End date',
              value: dayjs(installment_end_date).format('DD MMM YYYY'),
            },
            {label: 'Interval', value: `${installment_interval_days} Days`},
          ]}
        />

        <RenderInstallments {...props} installments={parsedInstallments} />
      </View>
    </View>
  );
}

function PaymentSection(props) {
  const {bookingDetails, bookingBanks = []} = props;
  const {payment_type, bank, is_loan, loan_amount, payment_remark} =
    bookingDetails;

  const bankData = bookingBanks?.find(i => i.id === bank) || {};

  return (
    <View style={styles.sectionContainer}>
      <Title style={styles.paymentScheduleText}>Payment Schedule</Title>
      <View style={styles.sectionBody}>
        <RenderRow
          row={[
            {label: 'Loan taken', value: _.startCase(is_loan)},
            {
              label: 'Bank chosen',
              value: `${bankData?.title || 'NA'}`,
            },
          ]}
        />
        <RenderRow
          row={[
            {
              label: 'Loan amount',
              value: loan_amount ? `Rs.${loan_amount} ` : 'NA',
            },
          ]}
        />
        <RenderRow row={[{label: 'Remarks', value: payment_remark}]} />
      </View>
      <View style={styles.sectionBody}>
        <Divider />
        {payment_type === 1 ? <RenderFullPaymentDetails {...props} /> : null}
        {payment_type === 2 ? <RenderCustomPaymentDetails {...props} /> : null}
        {payment_type === 3 ? (
          <RenderFirstBigPaymentDetails
            {...props}
            bookingDetails={bookingDetails}
          />
        ) : null}
      </View>
    </View>
  );
}

function TermsCondition({bookingDetails}) {
  const {
    custom_payment_remark,
    full_payment_remark,
    installment_payment_remarks,
  } = bookingDetails;

  return (
    <View style={styles.termsContainer}>
      <Subheading style={{color: theme.colors.primary}}>
        Terms & Conditions
      </Subheading>
      <View style={styles.termsBody}>
        <Text>
          <RenderHTML
            source={{
              html:
                full_payment_remark ||
                custom_payment_remark ||
                installment_payment_remarks,
            }}
            contentWidth={Layout.window.width - 20}
          />
        </Text>
      </View>
    </View>
  );
}

const VerifiedOtpIcon = props => {
  const {bookingDate} = props;
  return (
    <View style={styles.otpContainer}>
      <MaterialCommunityIcons name="check-decagram" size={24} color="green" />
      <View style={styles.otpTextContainer}>
        <Text style={styles.otpText}>Verified with OTP </Text>
        <Text>{dayjs(bookingDate).format('MMMM D, YYYY h:mm A')}</Text>
      </View>
    </View>
  );
};

function BookingDetails(props) {
  const {
    bookingDetails,
    bookingAreaUnitType = {},
    bookingPaymentTypes = {},
    bookingBanks = {},
  } = useSelector(({customer}) => customer);
  const {is_verified_mobile_otp, booking_date} = bookingDetails || {};

  const {unit_id, isCustomer} = props;

  const ContainerView = isCustomer ? ScrollView : Tabs.ScrollView;

  return (
    <ContainerView
      contentContainerStyle={styles.scrollView}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <CustomerCredLogin {...props} {...{bookingDetails}} unit_id={unit_id} />
        <Divider />

        <CustomerSection {...props} {...{bookingDetails}} />
        <Divider />
        {bookingDetails.through_broker === 'yes' ? (
          <>
            <BrokerSection {...props} {...{bookingDetails}} />
            <Divider />
          </>
        ) : null}

        {bookingDetails.form_type === 'withrate' ? (
          <RatesSection {...props} {...{bookingDetails, bookingAreaUnitType}} />
        ) : null}

        <Divider />
        <PaymentSection
          {...props}
          {...{bookingDetails, bookingPaymentTypes, bookingBanks}}
        />
        <TermsCondition {...props} {...{bookingDetails}} />
        {is_verified_mobile_otp === 'yes' ? (
          <VerifiedOtpIcon bookingDate={booking_date} />
        ) : null}
      </View>
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },

  buttonIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scrollView: {
    flexGrow: 1,
  },
  sectionContainer: {
    marginVertical: 10,
    paddingHorizontal: 7,
  },
  brokerContainer: {
    marginVertical: 5,
    paddingHorizontal: 7,
  },
  sectionBody: {
    marginTop: 5,
    paddingBottom: 10,
  },
  row: {
    marginTop: 5,
    flexDirection: 'row',
    paddingRight: 15,
  },
  cell: {
    flex: 1,
    paddingHorizontal: 3,
  },
  customerCredential: {
    display: 'flex',
    flexDirection: 'row',
  },
  totalContainer: {
    marginTop: 10,
  },
  finalProperty: {
    alignSelf: 'center',
  },
  finalPropertyAmount: {
    marginTop: 5,
    marginLeft: 15,
  },
  installmentRow: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  deletButton: {
    padding: 10,
    alignItems: 'center',
  },
  editButton: {
    padding: 10,
    alignItems: 'center',
  },
  credEditButton: {
    marginTop: 10,
    alignItems: 'center',
    marginRight: 20,
  },
  iconStyle: {
    marginRight: 5,
  },
  areaBuild: {
    fontWeight: 'bold',
  },
  termsBody: {
    paddingBottom: 10,
    paddingHorizontal: 3,
  },
  installmentAmount: {
    alignItems: 'center',
  },
  installmentDate: {
    alignItems: 'center',
  },
  termsContainer: {
    paddingHorizontal: 15,
  },
  otpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  otpTextContainer: {
    marginLeft: 10,
  },
  otpText: {
    color: 'green',
  },
  installmentText: {
    color: theme.colors.primary,
    marginVertical: 5,
  },
  finalPropertyAmountText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  totalConstructionText: {
    color: theme.colors.primary,
    marginVertical: 10,
  },
  constructionRateText: {
    color: theme.colors.primary,
    marginTop: 20,
  },
  totalBasicAmountText: {
    color: theme.colors.primary,
    marginVertical: 10,
  },
  bookingRateText: {
    marginBottom: 15,
  },
  dividerRenderPayment: {
    marginVertical: 10,
  },
  renderRow: {
    marginTop: 5,
  },
  paymentScheduleText: {
    marginBottom: 15,
  },
  remark: {
    marginTop: 20,
  },
  customerCredentialContainer: {
    marginVertical: 1,
  },
  emailContainer: {
    width: '50%',
  },
  renderTextBox: {
    marginRight: 10,
  },
});

export default withTheme(BookingDetails);

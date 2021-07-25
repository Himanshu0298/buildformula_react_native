import * as React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {
  Caption,
  Divider,
  Subheading,
  Text,
  Title,
  withTheme,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import {round} from 'utils';
import dayjs from 'dayjs';
import {useMemo} from 'react';

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

function CustomerSection({bookingDetails, theme}) {
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

function BrokerSection({bookingDetails, theme}) {
  const {
    broker_first_name,
    broker_last_name,
    broker_phone,
    broker_email,
    broker_remark,
  } = bookingDetails;

  return (
    <View style={styles.sectionContainer}>
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

function RatesSection({bookingDetails, bookingAreaUnitType, theme}) {
  const {
    area_for_super_buildup,
    area_for_buildup,
    area_for_carpet,
    area_carpet_unit,
    rate_super_buildup,
    rate_for_buildup,
    rate_for_carpet,
    main_total_amount,
    other_charges = [],
    booking_rate_final_amount_input,
  } = bookingDetails;

  const otherChargePairs = React.useMemo(() => {
    if (other_charges.length > 0) {
      return new Array(Math.ceil(2))
        .fill()
        .map(item => other_charges.splice(0, 2));
    }
    return [];
  }, [other_charges]);

  const unit = bookingAreaUnitType[area_carpet_unit]?.toLowerCase();

  return (
    <View style={styles.sectionContainer}>
      <Title style={{marginBottom: 15}}>Booking Rate</Title>
      <Subheading style={{color: theme.colors.primary}}>
        BASIC AMOUNT
      </Subheading>
      <View style={styles.sectionBody}>
        <RenderRow
          row={[
            {
              label: 'Area for Super Buildup',
              value: `${area_for_super_buildup} ${unit}.`,
            },
            {label: 'Area for Buildup', value: `${area_for_buildup} ${unit}.`},
            {label: 'Area for Carpet', value: `${area_for_carpet} ${unit}.`},
          ]}
        />
        <RenderRow
          row={[
            {
              label: 'Rate for Super Buildup',
              value: `${rate_super_buildup} Rs.`,
            },
            {label: 'Rate for Buildup', value: `${rate_for_buildup} Rs.`},
            {label: 'Rate for Carpet', value: `${rate_for_carpet} Rs.`},
          ]}
        />
        <Caption style={{color: theme.colors.primary, marginVertical: 10}}>
          Total Basic Amount
        </Caption>
        <RenderRow
          row={[
            {label: 'As Super Buildup', value: `${main_total_amount} Rs.`},
            {label: 'As Buildup', value: `${main_total_amount} Rs.`},
            {label: 'As Carpet', value: `${main_total_amount} Rs.`},
          ]}
        />
        {otherChargePairs.length > 0 ? (
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
                    value: `${amount} Rs.`,
                  }))}
                />
              );
            })}
          </>
        ) : null}
        <View style={styles.totalContainer}>
          <Text style={{color: theme.colors.primary}}>
            Total amount (Basic amount + Other charges)
          </Text>
          <Text style={{marginTop: 5}}>
            {round(booking_rate_final_amount_input)} Rs.
          </Text>
        </View>
      </View>
    </View>
  );
}

function RenderFullPaymentDetails({bookingDetails, theme}) {
  const {
    main_total_amount,
    start_date,
    end_date,
    total_other_charges,
    full_other_charges_date,
    full_payment_documentation_charges,
    full_payment_documentation_charges_start_date,
    full_payment_documentation_charges_end_date,
  } = bookingDetails;

  return (
    <View style={styles.sectionContainer}>
      <Subheading style={{color: theme.colors.primary}}>FULL AMOUNT</Subheading>
      <View style={styles.sectionBody}>
        <RenderRow
          row={[
            {
              label: 'Documentation charges',
              labelStyle: {color: theme.colors.documentation},
              value: `${full_payment_documentation_charges} Rs`,
            },
          ]}
        />
        <RenderRow
          row={[
            {
              label: 'Start date',
              labelStyle: {color: theme.colors.documentation},
              value: dayjs(
                full_payment_documentation_charges_start_date,
              ).format('DD MMM YYYY'),
            },
            {
              label: 'End date',
              labelStyle: {color: theme.colors.documentation},
              value: dayjs(full_payment_documentation_charges_end_date).format(
                'DD MMM YYYY',
              ),
            },
          ]}
        />
      </View>
      <View style={styles.sectionBody}>
        <RenderRow
          row={[{label: 'Basic amount', value: `${main_total_amount} Rs.`}]}
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
        {total_other_charges ? (
          <RenderRow
            row={[
              {
                label: 'Total other charges',
                value: `${total_other_charges} Rs.`,
              },
              {
                label: 'Date',
                value: dayjs(full_other_charges_date).format('DD MMM YYYY'),
              },
            ]}
          />
        ) : null}
      </View>
    </View>
  );
}
function RenderCustomPaymentDetails({bookingDetails, theme}) {
  const {
    custom_basic_amount,
    total_other_charges,
    full_other_charges_date,
    custom_payment = [],
    custom_payment_documentation_charges,
    custom_payment_documentation_charges_start_date,
    custom_payment_documentation_charges_end_date,
  } = bookingDetails;
  return (
    <View style={styles.sectionContainer}>
      <Subheading style={{color: theme.colors.primary}}>
        CUSTOM AMOUNT
      </Subheading>
      <View style={styles.sectionBody}>
        <RenderRow
          row={[
            {
              label: 'Documentation charges',
              labelStyle: {color: theme.colors.documentation},
              value: `${custom_payment_documentation_charges} Rs`,
            },
          ]}
        />
        <RenderRow
          row={[
            {
              label: 'Start date',
              labelStyle: {color: theme.colors.documentation},
              value: dayjs(
                custom_payment_documentation_charges_start_date,
              ).format('DD MMM YYYY'),
            },
            {
              label: 'End date',
              labelStyle: {color: theme.colors.documentation},
              value: dayjs(
                custom_payment_documentation_charges_end_date,
              ).format('DD MMM YYYY'),
            },
          ]}
        />
      </View>
      <View style={styles.sectionBody}>
        <RenderRow
          row={[
            {label: 'Total basic amount', value: `${custom_basic_amount} Rs.`},
          ]}
        />
        <Divider style={{marginVertical: 10}} />
        {custom_payment.map((payment, index) => {
          const {percent, amount, date, remark} = payment;
          return (
            <>
              <RenderRow
                style={{marginTop: 5}}
                row={[
                  {label: 'Percent', value: `${percent} %`},
                  {label: 'Amount', value: `${amount} Rs.`},
                  {label: 'Date', value: date},
                ]}
              />
              <RenderRow row={[{label: 'Remarks', value: remark}]} />
              <Divider />
            </>
          );
        })}

        {total_other_charges ? (
          <RenderRow
            style={{marginTop: 15}}
            row={[
              {
                label: 'Total other charges',
                value: `${total_other_charges} Rs.`,
              },
              {
                label: 'Date',
                value: dayjs(full_other_charges_date).format('DD MMM YYYY'),
              },
            ]}
          />
        ) : null}
      </View>
    </View>
  );
}

export function RenderInstallments(props) {
  const {theme, installments} = props;

  if (installments.length) {
    return (
      <>
        <View style={styles.installmentRow}>
          <Caption style={{color: theme.colors.primary}}>No.</Caption>
          <Caption style={{color: theme.colors.primary}}>
            Installment Date
          </Caption>
          <Caption style={{color: theme.colors.primary}}>Amount</Caption>
        </View>
        {installments.map((installment, index) => {
          return (
            <View key={index} style={styles.installmentRow}>
              <Caption>{installment.id}</Caption>
              <View style={{alignItems: 'center'}}>
                <Caption>{installment.date}</Caption>
              </View>
              <View style={{alignItems: 'center'}}>
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
  const {bookingDetails, theme} = props;
  const {
    first_big_amount_percentage,
    instllment_first_amount,
    installment_start_date_all,
    installment_payment_remarks,
    installment_numbers,
    installment_start_date,
    installment_end_date,
    installment_interval_days,
    total_other_charges,
    full_other_charges_date,
    installments,
    installment_date,
    installment_amount,
    installment_payment_documentation_charges,
    installment_payment_documentation_charges_start_date,
    installment_payment_documentation_charges_end_date,
  } = bookingDetails;

  const parsedInstallments = useMemo(() => {
    return installments.map((id, index) => ({
      id,
      date: installment_date[index],
      amount: installment_amount[index],
    }));
  }, [installment_amount, installment_date, installments]);

  return (
    <View style={styles.sectionContainer}>
      <Subheading style={{color: theme.colors.primary, marginBottom: 10}}>
        DOWNPAYMENT AND INSTALLMENT
      </Subheading>

      <View style={styles.sectionBody}>
        <RenderRow
          row={[
            {
              label: 'Documentation charges',
              labelStyle: {color: theme.colors.documentation},
              value: `${installment_payment_documentation_charges} Rs`,
            },
          ]}
        />
        <RenderRow
          row={[
            {
              label: 'Start date',
              labelStyle: {color: theme.colors.documentation},
              value: dayjs(
                installment_payment_documentation_charges_start_date,
              ).format('DD MMM YYYY'),
            },
            {
              label: 'End date',
              labelStyle: {color: theme.colors.documentation},
              value: dayjs(
                installment_payment_documentation_charges_end_date,
              ).format('DD MMM YYYY'),
            },
          ]}
        />
      </View>
      <View style={styles.sectionBody}>
        <Text style={{color: theme.colors.primary}}>DOWNPAYMENT</Text>
      </View>
      <View style={styles.sectionBody}>
        <RenderRow
          row={[
            {label: 'Percent', value: `${first_big_amount_percentage} %`},
            {label: 'Amount', value: `${instllment_first_amount} Rs.`},
            {
              label: 'Date',
              value: dayjs(installment_start_date_all).format('DD MMM YYYY'),
            },
          ]}
        />
        <RenderRow
          row={[{label: 'Remarks', value: installment_payment_remarks}]}
        />

        <Text style={{color: theme.colors.primary, marginVertical: 5}}>
          INSTALLMENT
        </Text>
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

        {total_other_charges ? (
          <RenderRow
            style={{marginTop: 20}}
            row={[
              {
                label: 'Total other charges',
                value: `${total_other_charges} Rs.`,
              },
              {
                label: 'Date',
                value: dayjs(full_other_charges_date).format('DD MMM YYYY'),
              },
            ]}
          />
        ) : null}
      </View>
    </View>
  );
}

function PaymentSection(props) {
  const {bookingDetails, bookingPaymentTypes, bookingBanks} = props;
  const {
    payment_type,
    bank,
    is_loan,
    loan_amount,
    payment_remark,
  } = bookingDetails;

  return (
    <View style={styles.sectionContainer}>
      <Title style={{marginBottom: 15}}>Payment Installment</Title>
      <View style={styles.sectionBody}>
        <RenderRow
          row={[
            {
              label: 'Payment method',
              value: `${bookingPaymentTypes[payment_type]}`,
            },
            {
              label: 'Bank chosen',
              value: `${bookingBanks?.[bank]?.title || 'NA'}`,
            },
          ]}
        />
        <RenderRow
          row={[
            {label: 'Loan taken', value: _.startCase(is_loan)},
            {
              label: 'Loan amount',
              value: loan_amount ? `${loan_amount} Rs.` : 'NA',
            },
          ]}
        />
        <RenderRow row={[{label: 'Remarks', value: payment_remark}]} />
      </View>
      {payment_type === 1 ? <RenderFullPaymentDetails {...props} /> : null}
      {payment_type === 2 ? <RenderCustomPaymentDetails {...props} /> : null}
      {payment_type === 3 ? <RenderFirstBigPaymentDetails {...props} /> : null}
    </View>
  );
}

function BookingDetails(props) {
  const {
    bookingDetails,
    bookingAreaUnitType = {},
    bookingPaymentTypes = {},
    bookingBanks = {},
  } = useSelector(({customer}) => customer);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <CustomerSection {...props} {...{bookingDetails}} />
        <Divider />
        {bookingDetails.through_broker === 'yes' ? (
          <>
            <BrokerSection {...props} {...{bookingDetails}} />
            <Divider />
          </>
        ) : null}
        <RatesSection {...props} {...{bookingDetails, bookingAreaUnitType}} />
        <PaymentSection
          {...props}
          {...{bookingDetails, bookingPaymentTypes, bookingBanks}}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollView: {
    flexGrow: 1,
  },
  sectionContainer: {
    marginVertical: 10,
  },
  sectionBody: {
    marginTop: 10,
  },
  row: {
    marginTop: 5,
    flexDirection: 'row',
    paddingRight: 15,
    // alignItems: 'center',
  },
  cell: {
    flex: 1,
    paddingHorizontal: 3,
  },
  totalContainer: {
    padding: 10,
    backgroundColor: '#E5EAFA',
    borderRadius: 5,
    marginTop: 10,
  },
  installmentRow: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default withTheme(BookingDetails);

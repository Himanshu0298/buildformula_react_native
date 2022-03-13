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

function Item({label, value, style, valueStyle}) {
  return (
    <View style={[styles.listItemContainer, style]}>
      <Text>{label}</Text>
      <Caption style={valueStyle}>{value}</Caption>
    </View>
  );
}

function RenderPayment({data}) {
  const {
    name,
    payment_mode,
    basic_amount,
    full_basic_amount,
    start_date,
    end_date,
  } = data;

  return (
    <>
      <Subheading style={styles.Subheading}>Property Final Amount </Subheading>
      <View style={styles.detailCard}>
        <View style={styles.row}>
          <Item label="Payment method" value={name} style={styles.item} />
          <Item
            label="Total basic amount"
            value={`₹ ${parseFloat(basic_amount || full_basic_amount || 0)}`}
            style={styles.item}
          />
        </View>

        <View style={styles.cardItemsContainer}>
          {payment_mode === 1 ? (
            <View style={styles.row}>
              <Item
                label="Start date"
                value={dayjs(start_date).format('DD MMM YYYY')}
                style={styles.item}
              />
              <Item
                label="End date"
                value={dayjs(end_date).format('DD MMM YYYY')}
                style={styles.item}
              />
            </View>
          ) : null}
          {/* TODO: add UI for custom and downpayment types */}
        </View>
      </View>
    </>
  );
}

function RenderDocumentCharges({theme, data}) {
  const {document_charge, start_date, end_date} = data;

  return (
    <>
      <Subheading
        style={[
          styles.documentSubheading,
          {color: theme.colors.documentation},
        ]}>
        Documentation charges
      </Subheading>
      <View style={styles.chargeContainer}>
        <Item
          label="Documentation charges"
          value={`₹ ${parseFloat(document_charge || 0)}`}
        />
        {document_charge ? (
          <View style={styles.row}>
            <Item
              label="Start date"
              value={dayjs(start_date).format('DD MMM YYYY')}
              style={styles.item}
            />
            <Item
              label="End date"
              value={dayjs(end_date).format('DD MMM YYYY')}
              style={styles.item}
            />
          </View>
        ) : null}
      </View>
    </>
  );
}

function RenderLoanDetails({loanDetails}) {
  const {takeLoan, loan_amount, bank, loan_remark} = loanDetails;
  const loanTaken = takeLoan === 'yes';

  return (
    <>
      <Subheading>Bank loan details</Subheading>
      <View style={styles.chargeContainer}>
        <View style={styles.row}>
          <Item
            label="Loan taken"
            value={takeLoan}
            style={styles.item}
            valueStyle={styles.loanText}
          />
          {loanTaken ? (
            <Item
              label="Amount"
              value={`₹ ${parseFloat(loan_amount || 0)}`}
              style={styles.item}
            />
          ) : null}
        </View>

        {loanTaken ? (
          <Item label="Bank name &  branch" value={bank || 'NA'} />
        ) : null}

        {loanTaken ? <Item label="Remark" value={loan_remark || 'NA'} /> : null}
      </View>
    </>
  );
}

function PaymentSchedule(props) {
  const {navigation, route} = props;
  const {data: scheduleData, type} = route?.params || {};

  const {bankLoanDetail, documentCharges, propertyfinalamount} = scheduleData;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scheduleContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.titleContainer}>
          <Image source={backArrow} style={styles.backArrow} />
          <Subheading>Payment Schedule</Subheading>
        </TouchableOpacity>

        <View style={styles.contentContainer}>
          {type === 'bankLoanDetail' ? (
            <RenderLoanDetails {...props} loanDetails={bankLoanDetail} />
          ) : null}

          {type === 'document' ? (
            <RenderDocumentCharges {...props} data={documentCharges} />
          ) : null}
          {type === 'property' ? (
            <RenderPayment {...props} data={propertyfinalamount} />
          ) : null}
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
  Subheading: {
    marginTop: 10,
  },
  chargeContainer: {
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(222, 225, 231, 1)',
    borderRadius: 7,
  },
  listItemContainer: {
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
    paddingRight: 10,
  },
  detailCard: {
    marginTop: 10,
    backgroundColor: 'rgba(242, 244, 245, 1)',
    padding: 15,
    borderRadius: 7,
  },
  cardItemsContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 10,
    borderRadius: 7,
  },
  scheduleContainer: {
    flexGrow: 1,
  },
  item: {
    flex: 1,
  },
  loanText: {
    textTransform: 'capitalize',
  },
  documentSubheading: {
    marginTop: 10,
  },
});

export default withTheme(PaymentSchedule);

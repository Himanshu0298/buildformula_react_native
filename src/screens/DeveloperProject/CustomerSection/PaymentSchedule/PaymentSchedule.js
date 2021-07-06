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

function RenderPayment({theme, data}) {
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
      <Subheading style={{marginTop: 10}}>Property Final Amount </Subheading>
      <View style={styles.detailCard}>
        <View style={styles.row}>
          <Item label="Payment method" value={name} style={{flex: 1}} />
          <Item
            label="Total basic amount"
            value={`₹ ${parseFloat(basic_amount || full_basic_amount || 0)}`}
            style={{flex: 1}}
          />
        </View>

        <View style={styles.cardItemsContainer}>
          {payment_mode === 1 ? (
            <View style={styles.row}>
              <Item
                label="Start date"
                value={dayjs(start_date).format('DD MMM YYYY')}
                style={{flex: 1}}
              />
              <Item
                label="End date"
                value={dayjs(end_date).format('DD MMM YYYY')}
                style={{flex: 1}}
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
      <Subheading style={{color: theme.colors.documentation, marginTop: 10}}>
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
              style={{flex: 1}}
            />
            <Item
              label="End date"
              value={dayjs(end_date).format('DD MMM YYYY')}
              style={{flex: 1}}
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
            style={{flex: 1}}
            valueStyle={{textTransform: 'capitalize'}}
          />
          {loanTaken ? (
            <Item
              label="Amount"
              value={`₹ ${parseFloat(loan_amount || 0)}`}
              style={{flex: 1}}
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
  const {data: scheduleData} = route?.params || {};

  const {bankLoanDetail, documentCharges, propertyfinalamount} = scheduleData;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.titleContainer}>
          <Image source={backArrow} style={styles.backArrow} />
          <Subheading>Payment Collection</Subheading>
        </TouchableOpacity>

        <View style={styles.contentContainer}>
          <RenderLoanDetails {...props} loanDetails={bankLoanDetail} />
          <RenderDocumentCharges {...props} data={documentCharges} />
          <RenderPayment {...props} data={propertyfinalamount} />
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
});

export default withTheme(PaymentSchedule);

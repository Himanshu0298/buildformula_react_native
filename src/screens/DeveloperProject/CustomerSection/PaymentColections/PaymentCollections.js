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

const TITLE = {
  document: 'Documentation charges',
  property: 'Property Final Amount',
  gst: 'GST Amount',
};

const SUBTITLE = {
  document: 'Total document amount collected',
  property: 'Total property amount collected',
  gst: 'Total GST amount collected',
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
  const {charge, type} = props;

  return (
    <View style={styles.chargeContainer}>
      <Item label="Date" value={dayjs().format('DD MMM YYYY')} />
      {type !== 'document' ? (
        <>
          <Item label="Bank name &  branch" value={'HDFC bank,Maninagar'} />
          <Item label="Check no. /  Transection no." value={'006584'} />
        </>
      ) : null}
      <View style={styles.itemRow}>
        <Item label="Credit" value="₹ 10,00,00" />
        <Item label="Debit" value="-" />
        <Item label="Balance" value="₹ 10,00,00" />
      </View>
      <Item
        label="Remark"
        value={
          'Please call me to discuss about the project in detail at 7:00 PM tommorow'
        }
      />
    </View>
  );
});

function PaymentCollections(props) {
  const {navigation, theme, route} = props;
  const {type, data: charges = []} = route?.params || {};

  const amountCollected = React.useMemo(() => {
    return charges.reduce((sum, i) => sum + i.amount, 0);
  }, [charges]);

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
          <Text style={{color: theme.colors.documentation}}>{TITLE[type]}</Text>
          <Caption style={{marginTop: 10}}>{SUBTITLE[type]}:</Caption>
          <Caption style={{color: theme.colors.documentation}}>
            ₹ {amountCollected || 0}
          </Caption>

          {charges?.map((charge, i) => (
            <RenderCharge key={i} {...{charge, type}} />
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
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(222, 225, 231, 1)',
    borderRadius: 10,
  },
  listItemContainer: {
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
});

export default withTheme(PaymentCollections);

import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Divider,
  Subheading,
  IconButton,
  Text,
  Caption,
} from 'react-native-paper';
import {Button} from 'react-native-share';

import {theme} from 'styles/theme';
import InventoryCard from '../Component/InventoryCard';

const FILTERS = [
  {label: 'Challan Details', value: 'challan_details'},
  {label: 'Order Details', value: 'order_details'},
  {label: 'Request Details', value: 'request_details'},
];

const ChallanDetails = () => {
  return (
    <View>
      <View>
        <Caption> Delivery Date</Caption>
        <Text>6 Oct, 2022</Text>
      </View>
      <View>
        <Caption> Challan No</Caption>
        <Text>A - 33458</Text>
      </View>
      <View>
        <Caption> Driver Name</Caption>
        <Text>Himanshu Patel</Text>
      </View>
      <View>
        <Caption> Vehical No</Caption>
        <Text>GJ - 11 - HS - 4347</Text>
      </View>
      <View>
        <Caption>Created by</Caption>
        <Text>Chirag Pithadiya</Text>
        <Caption>chiragpithadiya@buildformula.com</Caption>
      </View>
    </View>
  );
};

const RequestDetail = () => {
  return (
    <View>
      <View>
        <Caption> Request Date</Caption>
        <Text>6 Oct, 2022</Text>
      </View>
      <View>
        <Caption> Request No</Caption>
        <Text>A - 33458</Text>
      </View>
      <View>
        <Caption> Proposal Name</Caption>
        <Text>Himanshu Patel</Text>
      </View>
      <View>
        <Caption> Request No</Caption>
        <Text>A - 33458</Text>
      </View>
      <View>
        <Caption>Requested by</Caption>
        <Text>Chirag Pithadiya</Text>
        <Caption>chiragpithadiya@buildformula.com</Caption>
      </View>
    </View>
  );
};

const OrderDetails = () => {
  return (
    <View>
      <View>
        <Caption> Request Date</Caption>
        <Text>6 Oct, 2022</Text>
      </View>
      <View>
        <Caption> Request No</Caption>
        <Text>A - 33458</Text>
      </View>
      <View>
        <Caption> Company Name</Caption>
        <Text>Himanshu Patel</Text>
      </View>

      <View>
        <Caption> Supplier Name</Caption>
        <Text>Himanshu Patel</Text>
      </View>
      <View>
        <Caption>Order Amount</Caption>
        <Text>33458</Text>
      </View>
      <View style={{marginTop: 15}}>
        <Caption>Requested by</Caption>
        <Text>Chirag Pithadiya</Text>
        <Caption>chiragpithadiya@buildformula.com</Caption>
      </View>
    </View>
  );
};

const DetailCard = props => {
  const {contentType} = props;
  return (
    <View>
      {contentType === 'challan_details' ? <ChallanDetails /> : null}
      {contentType === 'order_details' ? <OrderDetails /> : null}
      {contentType === 'request_details' ? <RequestDetail /> : null}
    </View>
  );
};
function FilterPanel(props) {
  const {filter, setFilter} = props;

  return (
    <View>
      <ScrollView
        horizontal
        style={styles.filterContainer}
        showsHorizontalScrollIndicator={false}>
        {FILTERS.map(i => {
          const active = filter === i.value;
          return (
            <Button
              mode="outlined"
              onPress={() => {
                setFilter(i.value);
              }}
              color={active ? 'white' : null}
              style={[
                styles.filter,
                active ? {backgroundColor: theme.colors.primary} : {},
              ]}>
              {i.label}
            </Button>
          );
        })}
      </ScrollView>
    </View>
  );
}

function SubListPreview(props) {
  const {navigation} = props;

  const [filter, setFilter] = useState('challan_details');

  return (
    <View style={styles.container}>
      <View style={styles.dataRow}>
        <IconButton
          icon="keyboard-backspace"
          size={18}
          color={theme.colors.primary}
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        />
        <Subheading style={styles.headerText}>
          OPC - 43 Grade/ unit 1
        </Subheading>
      </View>
      <InventoryCard />
      <Divider />
      <Divider />

      <FilterPanel setFilter={setFilter} filter={filter} />
      <DetailCard contentType={filter} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    margin: 10,
  },

  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    padding: 10,
    fontSize: 18,
  },
  backButton: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
  },
  filter: {
    marginHorizontal: 10,
    borderRadius: 20,
  },
  filterContainer: {
    marginTop: 10,
    marginHorizontal: 30,

    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'baseline',
  },
  filterSubContainer: {
    marginHorizontal: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SubListPreview;

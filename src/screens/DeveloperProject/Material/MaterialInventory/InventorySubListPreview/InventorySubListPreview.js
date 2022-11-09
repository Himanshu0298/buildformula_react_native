import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
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
  {label: 'Indent Details', value: 'indent_details'},
  {label: 'Order Details', value: 'order_details'},
];

const IndentDetail = () => {
  return (
    <View>
      <View>
        <Caption> Date</Caption>
        <Text>6 Oct, 2022</Text>
      </View>
      <View>
        <Caption> Indent Number</Caption>
        <Text>18</Text>
      </View>
    </View>
  );
};

const OrderDetails = () => {
  return (
    <View>
      <View>
        <Caption> Date</Caption>
        <Text>6 Oct, 2022</Text>
      </View>
      <View>
        <Caption> Company Name</Caption>
        <Text>Tata steel pvt limited</Text>
      </View>
      <View>
        <Caption> Supplier Name</Caption>
        <Text>Himanshu Patel</Text>
      </View>
    </View>
  );
};

const DetailCard = props => {
  const {contentType} = props;
  return (
    <View>
      {contentType === 'indent_details' ? <IndentDetail /> : null}
      {contentType === 'order_details' ? <OrderDetails /> : null}
    </View>
  );
};
function FilterPanel(props) {
  const {filter, setFilter} = props;

  return (
    <View style={styles.filterContainer}>
      <View style={styles.filterSubContainer}>
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
      </View>
    </View>
  );
}

function InventorySubListPreview(props) {
  const {navigation} = props;

  const [filter, setFilter] = useState('indent_details');

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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 60,
  },
});

export default InventorySubListPreview;

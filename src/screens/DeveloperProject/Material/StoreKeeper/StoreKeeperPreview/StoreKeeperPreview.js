import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';

import React from 'react';
import {
  Button,
  Caption,
  Divider,
  IconButton,
  Subheading,
  Text,
} from 'react-native-paper';
import {theme} from 'styles/theme';
import {getShadow} from 'utils';
import ActionButtons from 'components/Atoms/ActionButtons';

const MATERIAL_DATA = [
  {
    category: 'Cement',
    subCategory: 'OPC',
    unit: 'CUM or m³',
    requestedQty: '150.00',
    assignQty: '150.00',
    status: 'Approved',
  },
  {
    category: 'Cement',
    subCategory: 'OPC',
    unit: 'CUM or m³',
    requestedQty: '150.00',
    assignQty: '150.00',
    status: 'Rejected',
  },
  {
    category: 'Cement',
    subCategory: 'OPC',
    unit: 'CUM or m³',
    requestedQty: '150.00',
    assignQty: '150.00',
    status: 'Rejected',
  },
];

const ListingCard = props => {
  const {status} = props;
  return (
    <TouchableOpacity>
      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <Text style={styles.ID}>13</Text>
          {/* <Caption
              style={{
                color: PR_REQUEST_STATUS[status]?.color,
              }}>
              {PR_REQUEST_STATUS[status]?.label}
            </Caption> */}
          <Text style={styles.pending}>Pending</Text>
        </View>
        <Divider />
        <View style={styles.cardDetails}>
          <View style={styles.dataRow}>
            <Subheading>Create by:</Subheading>
            <Subheading>Ronak Vagehni</Subheading>
          </View>
          <View style={styles.cardContent}>
            <Caption>ronak@buildformula.com</Caption>
          </View>
          <View style={styles.createdOn}>
            <Text> Created on:</Text>

            <Text>3rd Sep, 2022 15:33 PM</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const RequiredVendor = () => {
  return (
    <View style={styles.vendorContainer}>
      <View>
        <Subheading> Required For Vendor</Subheading>
      </View>
      <View style={styles.vendorSubContainer}>
        <Text> Ronak Patel</Text>
        <Caption>ronak@buildformula.com</Caption>
      </View>
      <View style={styles.card}>
        <Text> Required Date</Text>
        <Caption>03 Sep, 2022 </Caption>
      </View>
      <View style={styles.card}>
        <Text> Required For(Work)</Text>
        <Caption>tower D RCC Floor 1 Estimation</Caption>
      </View>
      <View style={styles.card}>
        <Text> Remark</Text>
        <Caption>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus,
          aliquam enim vivamus dui. Quis aliquam a morbi ut iaculis cursus proin
          amet. Hendrerit odio convallis lacus, non est. Vestibulum ac
          curabitur.
        </Caption>
      </View>
    </View>
  );
};

const MaterialCard = props => {
  const {item, navigation} = props;

  const {category, subCategory, requestedQty, unit, status} = item;

  // const updateStatus = async status => {

  //   await updatePRStatus(status);
  // };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Category:</Caption>
        <Text>{category}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Sub Category:</Caption>
        <Text>{subCategory}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Unit:</Caption>
        <Text>{unit}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Requested Qty:</Caption>
        <Text>{requestedQty}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>assign Qty:</Caption>
        <Text>{requestedQty}</Text>
      </View>

      <View style={styles.dataRow}>
        <Caption style={styles.lightData}> Status:</Caption>
        <Text
          style={
            status === 'Rejected'
              ? styles.rejected
              : status === 'Approved'
              ? styles.approved
              : null
          }>
          {status}
        </Text>
      </View>

      <ActionButtons
        onSubmit={console.log('===========> approve')}
        submitLabel="Approved"
        cancelLabel="Rejected"
        onCancel={console.log('===========> Reject')}
      />
    </View>
  );
};

function StoreKeeperPreview(props) {
  const {navigation} = props;

  const navToIssue = () => navigation.navigate('IssueIndent');

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.dataRow}>
          <IconButton
            icon="keyboard-backspace"
            size={22}
            color={theme.colors.primary}
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          />
          <Subheading style={styles.headerText}>Issue Request</Subheading>
        </View>
      </View>
      <ScrollView>
        <View>
          <ListingCard />
        </View>
        <View>
          <RequiredVendor />
        </View>

        <View style={styles.textContainer}>
          <Subheading style={styles.textSubContainer}>
            Material Request
          </Subheading>
        </View>

        <View>
          {MATERIAL_DATA.map(item => {
            return <MaterialCard item={item} navigation={navigation} />;
          })}
        </View>
      </ScrollView>
      <Button
        color={theme.colors.white}
        onPress={navToIssue}
        style={styles.button}>
        Issue Order
      </Button>
    </View>
  );
}

export default StoreKeeperPreview;

const styles = StyleSheet.create({
  mainContainer: {
    margin: 20,
    flexGrow: 1,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  button: {
    backgroundColor: theme.colors.primary,
    position: 'absolute',
    zIndex: 2,
    top: '89%',
    width: '100%',
  },

  vendorSubContainer: {
    marginTop: 10,
  },
  textContainer: {
    margin: 10,
  },
  card: {
    paddingTop: 15,
  },
  headerText: {
    fontSize: 18,
  },
  textSubContainer: {
    color: 'rgba(72, 114, 244, 1)',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 50,
  },
  cardContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    ...getShadow(2),
  },

  cardDetails: {
    padding: 5,
  },
  cardHeader: {
    padding: 10,
    paddingHorizontal: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  createdOn: {
    padding: 10,
    paddingHorizontal: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },

  ID: {
    backgroundColor: '#E5EAFA',
    padding: 7,
    borderRadius: 5,
    fontSize: 10,
    color: 'rgba(72, 114, 244, 1)',
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
  },

  vendorContainer: {
    ...getShadow(2),
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    padding: 10,
  },
  lightData: {
    fontSize: 13,
  },

  pending: {
    color: '#F4AF48',
  },

  approved: {
    color: 'rgba(72, 114, 244, 1)',
  },

  rejected: {
    color: '#FF5E5E',
  },
});

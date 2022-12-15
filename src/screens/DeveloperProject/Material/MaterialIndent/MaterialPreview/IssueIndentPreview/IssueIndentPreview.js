import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';

import React, {useEffect} from 'react';
import {
  Caption,
  Divider,
  IconButton,
  Subheading,
  Text,
} from 'react-native-paper';
import {theme} from 'styles/theme';
import {getShadow} from 'utils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {useSelector} from 'react-redux';
import moment from 'moment';

const ListingCard = props => {
  const {details} = props;

  const {id, status, email, first_name, last_name, created} = details || {};

  const date = moment(created).format('llll');

  return (
    <TouchableOpacity>
      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <Text style={styles.ID}>{id}</Text>
          {/* <Caption
              style={{
                color: PR_REQUEST_STATUS[status]?.color,
              }}>
              {PR_REQUEST_STATUS[status]?.label}
            </Caption> */}
          <Text
            style={
              status === 'pending'
                ? styles.pending
                : status === 'rejected'
                ? styles.rejected
                : status === 'approved'
                ? styles.approved
                : null
            }>
            {status}
          </Text>
        </View>
        <Divider />
        <View style={styles.cardDetails}>
          <View style={styles.dataRow}>
            <Subheading>Create by:</Subheading>
            <Subheading>
              {first_name}
              {last_name}
            </Subheading>
          </View>
          <View style={styles.cardContent}>
            <Caption>{email}</Caption>
          </View>
          <View style={styles.createdOn}>
            <Text> Created on:</Text>

            <Text> {date} </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const RequiredVendor = props => {
  const {details} = props;

  const {contractor_name, contractor_email, requred_date, remark} =
    details || {};

  const date = moment(requred_date).format('D-MMM-YYYY, LT');

  return (
    <View style={styles.vendorContainer}>
      <View>
        <Subheading> Required For Vendor</Subheading>
      </View>
      <View style={styles.vendorSubContainer}>
        <Text>{contractor_name}</Text>
        <Caption>{contractor_email}</Caption>
      </View>
      <View style={styles.card}>
        <Text> Required Date</Text>
        <Caption>{date}</Caption>
      </View>
      <View style={styles.card}>
        <Text> Required For(Work)</Text>
        <Caption>tower D RCC Floor 1 Estimation</Caption>
      </View>
      <View style={styles.card}>
        <Text> Remark</Text>
        <Caption>{remark}</Caption>
      </View>
    </View>
  );
};

const MaterialCard = props => {
  const {item} = props;

  const {
    materialcategrytitle,
    materialunitstitle,
    subcategorytitle,
    quantity,
    damaged_qty,
  } = item;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Category:</Caption>
        <Text>{materialcategrytitle}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Sub Category:</Caption>
        <Text>{subcategorytitle}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Unit:</Caption>
        <Text>{materialunitstitle}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Requested Quantity:</Caption>
        <Text>{quantity}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Assign Quantity:</Caption>
        <Text>{damaged_qty}</Text>
      </View>
    </View>
  );
};

function IssueIndentPreview(props) {
  const {navigation, route} = props;

  const {id} = route?.params || {};

  const {getIndentDetails} = useMaterialManagementActions();

  const {selectedProject} = useSelector(s => s.project);
  const {indentDetails} = useSelector(s => s.materialManagement);

  const details = indentDetails?.material_indent;

  const materialData = indentDetails?.material_indent_details;

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = () => {
    getIndentDetails({
      project_id: selectedProject.id,
      material_indent_id: id,
    });
  };

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
        <View style={styles.statusContainer}>
          <OpacityButton
            color={theme.colors.primary}
            style={styles.opacity}
            opacity={0.18}
            onPress={() => {
              navigation.navigate('CreateIssueIndent');
            }}>
            <MaterialIcons name="edit" color={theme.colors.primary} size={13} />
          </OpacityButton>
        </View>
      </View>
      <ScrollView>
        <View>
          <ListingCard details={details} />
        </View>
        <View>
          <RequiredVendor details={details} />
        </View>
        {materialData?.length ? (
          <>
            <View style={styles.textContainer}>
              <Subheading style={styles.textSubContainer}>
                Material Request
              </Subheading>
            </View>

            <View>
              {materialData?.map(item => {
                return <MaterialCard item={item} navigation={navigation} />;
              })}
            </View>
          </>
        ) : null}
      </ScrollView>
    </View>
  );
}

export default IssueIndentPreview;

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

  statusContainer: {
    flexDirection: 'row',
    marginEnd: 10,
    alignSelf: 'center',
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
  opacity: {
    borderRadius: 20,
    marginLeft: 10,
    justifyContent: 'flex-end',
  },
  pending: {
    color: 'rgba(72, 114, 244, 1)',
  },
  rejected: {
    color: 'rgba(255, 93, 93, 1)',
  },
  approved: {
    color: 'rgba(7, 202, 3, 1)',
  },
});

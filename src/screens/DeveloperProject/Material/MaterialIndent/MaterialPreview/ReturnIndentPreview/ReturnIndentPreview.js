import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

import React from 'react';
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
import FileIcon from 'assets/images/file_icon.png';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';

const attachments = [
  {label: 'filename-apartment-2.pdf'},
  {label: 'filename-apartment-2.pdf'},
];

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
    status: 'Pending',
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
          <Text
            style={
              status === 'Pending'
                ? styles.pending
                : status === 'Rejected'
                ? styles.rejected
                : status === 'Approved'
                ? styles.approved
                : null
            }>
            Pending
          </Text>
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
  const {item} = props;

  const {category, subCategory, requestedQty, unit} = item;
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
        <Caption style={styles.lightData}>assign Qty:</Caption>
        <Text>{requestedQty}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Requested Qty:</Caption>
        <Text>{requestedQty}</Text>
      </View>
    </View>
  );
};

const MaterialAttachments = () => {
  return (
    <View>
      <View style={styles.attachmentContainer}>
        <View style={styles.renderFileContainer}>
          <Text style={styles.attachmentFileHeader}>Material Images</Text>
        </View>
        {attachments?.map(attachment => {
          return (
            <View key={attachment.label}>
              <View style={styles.sectionContainer}>
                <Image source={FileIcon} style={styles.fileIcon} />
                <View>
                  <Text
                    style={(styles.verticalFlex, styles.text)}
                    numberOfLines={1}>
                    {attachment.label}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

function ReturnIndentPreview(props) {
  const {navigation} = props;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.container}>
          <IconButton
            icon="keyboard-backspace"
            size={22}
            color={theme.colors.primary}
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          />
          <Subheading style={styles.headerText}>Issue Request</Subheading>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.statusContainer}>
            <OpacityButton
              color={theme.colors.primary}
              style={styles.opacity}
              opacity={0.18}
              onPress={() => {
                navigation.navigate('CreateReturnIndent');
              }}>
              <MaterialIcons
                name="edit"
                color={theme.colors.primary}
                size={13}
              />
            </OpacityButton>
          </View>
          <View>
            <OpacityButton
              color="#FF5D5D"
              opacity={0.18}
              onPress={() => {
                alert.show({
                  title: 'Alert',
                  message: 'Are you sure want to delete this?',
                  dismissable: false,
                });
              }}
              style={styles.button}>
              <MaterialIcons name="delete" color="#FF5D5D" size={13} />
            </OpacityButton>
          </View>
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
        <View>
          <MaterialAttachments />
        </View>
      </ScrollView>
    </View>
  );
}

export default ReturnIndentPreview;

const styles = StyleSheet.create({
  mainContainer: {
    margin: 20,
    flexGrow: 1,
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vendorSubContainer: {
    marginTop: 10,
  },
  card: {
    paddingTop: 15,
  },

  button: {
    borderRadius: 20,
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  headerText: {
    fontSize: 18,
  },
  textSubContainer: {
    color: 'rgba(72, 114, 244, 1)',
  },
  fileIcon: {
    width: 32,
    height: 38,
    paddingLeft: 10,
    marginLeft: 10,
    marginRight: 10,
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

  attachmentContainer: {
    padding: 10,
    backgroundColor: '#F2F4F5',
    borderRadius: 5,
    marginVertical: 7,
  },

  statusContainer: {
    flexDirection: 'row',
    marginEnd: 10,
    alignSelf: 'center',
  },

  cardDetails: {
    padding: 5,
  },
  textContainer: {
    margin: 10,
  },
  attachmentFileHeader: {
    color: '#000',
    fontSize: 15,
  },
  sectionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    display: 'flex',
    borderRadius: 5,
    marginVertical: 7,
    marginHorizontal: 7,
    flexGrow: 1,
    position: 'relative',
  },

  renderFileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verticalFlex: {
    flexDirection: 'column',
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
  text: {
    color: '#080707',
    paddingHorizontal: 10,
    fontSize: 14,
    alignItems: 'center',
    maxWidth: 170,
    flex: 1,
  },
});

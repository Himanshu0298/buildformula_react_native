import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

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
import {getPermissions, getShadow} from 'utils';
import {useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FileIcon from 'assets/images/file_icon.png';

import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import Spinner from 'react-native-loading-spinner-overlay';
import dayjs from 'dayjs';
import FileViewer from 'react-native-file-viewer';

import {useDownload} from 'components/Atoms/Download';
import ApproveButtons from '../components/ApprovalButtons';

const STORE_KEEPER_STATUS = {
  pending: {label: 'Pending', color: '#F4AF48'},
  approved: {label: 'Approved', color: '#07CA03'},
  issued: {label: 'Issued', color: '#07CA03'},
  inspected: {label: 'Inspected', color: '#4872F4'},
};

const STORE_KEEPER_DETAIL_STATUS = {
  issued: {label: 'Issued', color: '#4872F4'},
};

const STORE_KEEPER_DETAILS_STATUS = {
  approved: {label: 'Approved', color: '#4872F4'},
  rejected: {label: 'Rejected', color: '#FF5D5D'},
  pending: {label: 'Pending', color: '#F4AF48'},
};

const RenderAttachments = props => {
  const {storeKeeperDetails} = props;

  const attachments = storeKeeperDetails?.indent_details?.storekeeper_files;

  const download = useDownload();

  const onPressFile = async file_name => {
    const name = file_name.split('/').pop();

    download.link({
      name,
      link: file_name,
      showAction: false,
      onFinish: ({dir}) => {
        FileViewer.open(`file://${dir}`);
      },
    });
  };

  // TODO download file remaining

  return (
    <View>
      <View style={styles.cardContainer1}>
        <View style={styles.renderFileContainer}>
          <Text style={styles.attachmentFileHeader}>Attachments</Text>
        </View>

        {attachments?.map(attachment => {
          return (
            <TouchableOpacity onPress={onPressFile}>
              <View key={attachment.file_name}>
                <View style={styles.sectionContainer}>
                  <Image source={FileIcon} style={styles.fileIcon} />

                  <View>
                    <Text
                      style={(styles.verticalFlex, styles.text)}
                      numberOfLines={1}>
                      {attachment.file_name}
                    </Text>
                    <Text
                      style={(styles.verticalFlex, styles.text)}
                      numberOfLines={1}>
                      ( {attachment.file_size})kb
                    </Text>
                  </View>
                  <OpacityButton
                    opacity={0.0}
                    style={styles.closeButton}
                    onPress={onPressFile}>
                    <MaterialCommunityIcons
                      name="download"
                      color={theme.colors.primary}
                      size={25}
                    />
                  </OpacityButton>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const IssuedCard = props => {
  const {storeKeeperDetails} = props;

  const {authorizeddate, contractor_name, storekeeper_remark} =
    storeKeeperDetails?.indent_details?.material_indent || {};

  return (
    <View style={styles.cardContainer}>
      <View style={styles.dataRow}>
        <Subheading> Issue Time:</Subheading>
        <Text>{dayjs(authorizeddate).format('  MMM D, YYYY,hh:mm A')}</Text>
      </View>

      <View style={styles.dataRow}>
        <Subheading> Issue by:</Subheading>
        <Text style={styles.title}> {contractor_name}</Text>
      </View>
      <View style={styles.title}>
        <Subheading> Remark</Subheading>
        <Caption> {storekeeper_remark}</Caption>
      </View>
      <RenderAttachments storeKeeperDetails={storeKeeperDetails} />
    </View>
  );
};

const ListingCard = props => {
  const {storeKeeperDetails} = props;

  const indent_id = storeKeeperDetails?.indent_details?.material_indent_id;

  const {email, first_name, last_name, created, authorizedstatus} =
    storeKeeperDetails?.indent_details?.material_indent || {};

  const {label, color} = STORE_KEEPER_STATUS[authorizedstatus] || {};

  return (
    <TouchableOpacity>
      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <Text style={styles.ID}>Request ID :{indent_id}</Text>
          <View style={styles.statusContainer}>
            <Text style={[{color}, styles.status]}>{label}</Text>
          </View>
        </View>
        <Divider />
        <View style={styles.cardDetails}>
          <View style={styles.dataRow}>
            <Subheading>Create by:</Subheading>
            <Text style={styles.title}>
              {first_name}
              {last_name}
            </Text>
          </View>
          <View style={styles.cardContent}>
            <Caption>{email}</Caption>
          </View>
          <View style={styles.createdOn}>
            <Subheading> Created on:</Subheading>
            <Text>{dayjs(created).format('  MMM D, YYYY ,hh:mm A')}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const RequiredVendor = props => {
  const {storeKeeperDetails} = props;

  const {contractor_name, contractor_email, remark, requred_date, requiredfor} =
    storeKeeperDetails?.indent_details?.material_indent || {};

  return (
    <View style={styles.vendorContainer}>
      <View>
        <Subheading> Required For Vendor</Subheading>
      </View>
      <View style={styles.vendorSubContainer}>
        <Text> {contractor_name}</Text>
        <Caption>{contractor_email}</Caption>
      </View>
      <View style={styles.card}>
        <Text> Required Date</Text>
        <Caption>{requred_date} </Caption>
      </View>
      <View style={styles.card}>
        <Text> Required For(Work)</Text>
        <Caption>{requiredfor}</Caption>
      </View>
      <View style={styles.card}>
        <Text> Remark</Text>
        <Caption>{remark}</Caption>
      </View>
    </View>
  );
};

const MaterialCard = props => {
  const {item, updateStatus, authorizedstatus, modulePermission} = props;

  const {
    materialcategrytitle,
    subcategorytitle,
    damaged_qty,
    materialunitstitle,
    quantity,
    id,
    rm_status,
  } = item;

  const requestStatus = STORE_KEEPER_STATUS[authorizedstatus]?.label;
  const {label, color} = STORE_KEEPER_DETAILS_STATUS[rm_status] || {};

  return (
    <View style={styles.cardContainer}>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Category:</Caption>
        <Text style={styles.title}>{materialcategrytitle}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Sub Category:</Caption>
        <Text style={styles.title}>{subcategorytitle}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Unit:</Caption>
        <Text style={styles.title}>{materialunitstitle}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Fine Qty:</Caption>
        <Text style={styles.title}>{quantity}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Demage Qty:</Caption>
        <Text style={styles.title}>{damaged_qty}</Text>
      </View>

      {rm_status !== 'pending' ? (
        <View style={styles.dataRow}>
          <Caption style={styles.lightData}>Status:</Caption>
          <Text style={[styles.title, {color}]}>{label}</Text>
        </View>
      ) : null}
      {modulePermission?.editor || modulePermission?.admin ? (
        requestStatus === 'Pending' ? (
          rm_status === 'pending' ? (
            <ApproveButtons
              rejectLabel="Reject"
              approvedLabel="Approved"
              onReject={() => updateStatus('rejected', id)}
              onApprove={() => updateStatus('approved', id)}
            />
          ) : null
        ) : null
      ) : null}
    </View>
  );
};

function StoreKeeperPreview(props) {
  const {navigation, route} = props;
  const {id: ID} = route?.params || {};

  const {getStoreKeeperDetails, updateStoreKeeperStatus} =
    useMaterialManagementActions();

  const {storeKeeperDetails, loading} = useSelector(s => s.materialManagement);
  const {selectedProject} = useSelector(s => s.project);

  const modulePermission = getPermissions('StoreKeeper List');

  const projectId = selectedProject.id;
  const {material_indent_details} = storeKeeperDetails?.indent_details || [];

  const {authorizedstatus} =
    storeKeeperDetails?.indent_details?.material_indent || {};

  const attachments = storeKeeperDetails?.indent_details?.storekeeper_files;

  React.useEffect(() => {
    getStoreDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStoreDetails = () => {
    getStoreKeeperDetails({
      project_id: projectId,
      material_indent_id: ID,
    });
  };

  const updateStatus = async (type, id) => {
    const restData = {
      project_id: projectId,
      material_indent_details_id: id,
      type,
    };
    await updateStoreKeeperStatus(restData);
    getStoreDetails();
  };

  const navToIssue = () => navigation.navigate('IssueIndent', {ID});

  const {label, color} = STORE_KEEPER_DETAIL_STATUS[authorizedstatus] || {};

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.subContainer}>
          <IconButton
            icon="keyboard-backspace"
            size={22}
            color={theme.colors.primary}
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          />
          <Subheading style={styles.headerText}>Issue Request</Subheading>
        </View>
        <Spinner visible={loading} textContent="" />

        <View style={styles.dataRow}>
          {label === 'Issued' ? (
            <>
              <MaterialCommunityIcons
                style={styles.storeIcon}
                name="storefront-outline"
                color={theme.colors.primary}
                size={22}
              />
              <Text style={[{color}, styles.status]}>{label}</Text>
            </>
          ) : null}
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {label === 'Issued' ? (
          <IssuedCard storeKeeperDetails={storeKeeperDetails} />
        ) : null}
        <ListingCard storeKeeperDetails={storeKeeperDetails} />
        <RequiredVendor storeKeeperDetails={storeKeeperDetails} />
        {material_indent_details?.length ? (
          <>
            <View style={styles.textContainer}>
              <Subheading style={styles.textSubContainer}>
                Material Request
              </Subheading>
            </View>

            <View style={styles.materialCardContainer}>
              {material_indent_details?.map(item => {
                return (
                  <MaterialCard
                    item={item}
                    navigation={navigation}
                    updateStatus={updateStatus}
                    authorizedstatus={authorizedstatus}
                    modulePermission={modulePermission}
                  />
                );
              })}
            </View>
          </>
        ) : null}

        {attachments?.length ? (
          label === 'Issued' ? null : (
            <>
              <View style={styles.textContainer}>
                <Subheading style={styles.textSubContainer}>
                  Material Image
                </Subheading>
              </View>
              <RenderAttachments storeKeeperDetails={storeKeeperDetails} />
            </>
          )
        ) : null}
      </ScrollView>
      {label === 'Issued' ? null : (
        <Button color="white" onPress={navToIssue} style={styles.button}>
          Issue Order
        </Button>
      )}
    </View>
  );
}

export default StoreKeeperPreview;

const styles = StyleSheet.create({
  mainContainer: {
    margin: 20,
    flexGrow: 1,
    flex: 1,
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
    top: '97%',
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
    padding: 15,
    marginBottom: 20,
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

  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

  status: {
    fontSize: 16,
  },

  cardContainer1: {
    padding: 10,
    backgroundColor: '#F2F4F5',
    borderRadius: 5,
    marginVertical: 7,
  },

  renderFileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  fileIcon: {
    width: 32,
    height: 38,
    paddingLeft: 10,
  },

  verticalFlex: {
    flexDirection: 'column',
  },
  text: {
    color: '#080707',
    paddingHorizontal: 10,
    fontSize: 14,
    alignItems: 'center',
    maxWidth: 170,
    flex: 1,
  },

  closeButton: {
    marginLeft: 40,
  },
  materialCardContainer: {
    flexGrow: 1,
    marginBottom: 10,
  },
  title: {
    marginLeft: 10,
  },
  statusContainer: {
    flexDirection: 'row',
  },
  storeIcon: {
    marginRight: 10,
  },
});

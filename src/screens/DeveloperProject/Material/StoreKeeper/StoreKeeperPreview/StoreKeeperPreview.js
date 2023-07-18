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
import {getDownloadUrl, getFileName} from 'utils/download';
import {isArray} from 'lodash';
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
  const {attachments} = props;

  const download = useDownload();

  const onPressFile = async file => {
    download.link({
      name: getFileName(file),
      data: {project_id: file.project_id, file_url: file.file_url},
      showAction: false,
      onFinish: ({dir}) => {
        FileViewer.open(`file://${dir}`);
      },
    });
  };

  return (
    <View>
      <View style={styles.cardContainer1}>
        <View style={styles.renderFileContainer}>
          <Text style={styles.attachmentFileHeader}>Attachments</Text>
        </View>

        {attachments?.map(attachment => {
          return (
            <TouchableOpacity onPress={() => onPressFile(attachment)}>
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
                    onPress={() => onPressFile(attachment)}>
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

  const {authorizeddate, storekeeper_remark, first_name, last_name} =
    storeKeeperDetails?.indent_details?.material_indent || {};

  return (
    <View style={styles.cardContainer}>
      <View style={styles.dataRow}>
        <Subheading> Issue Time:</Subheading>
        <Text>{dayjs(authorizeddate).format('  MMM D, YYYY,hh:mm A')}</Text>
      </View>

      <View style={styles.dataRow}>
        <Subheading> Issue by:</Subheading>
        <Text style={styles.title}> {`${first_name} ${last_name}`}</Text>
      </View>
      <View style={styles.title}>
        <Subheading>Remark</Subheading>
        <Caption>{storekeeper_remark}</Caption>
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
          <View style={styles.newDataRow}>
            <Subheading>Create by:</Subheading>
            <View style={{marginLeft: 25}}>
              <Text>
                {first_name}
                {last_name}
              </Text>
              <Caption>({email})</Caption>
            </View>
          </View>
          <View style={styles.newDataRow}>
            <Subheading>Created on:</Subheading>
            <View style={{marginLeft: 6, marginTop: 5}}>
              <Text>{dayjs(created).format('  MMM D, YYYY ,hh:mm A')}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const RequiredVendor = props => {
  const {storeKeeperDetails, type} = props;

  const {contractor_name, contractor_email, remark, requred_date, requiredfor} =
    storeKeeperDetails?.indent_details?.material_indent || {};

  // <View style={styles.card}>
  //   <Text>Required For(Work)</Text>
  //   <Caption>{requiredfor}</Caption>
  // </View>;

  return (
    <View style={styles.vendorContainer}>
      <View style={styles.vendorSubContainer}>
        <Caption>Required For Vendor</Caption>
        <Subheading>{contractor_name}</Subheading>
        <Caption>{contractor_email}</Caption>
      </View>
      {type === 'afm' ? (
        <View style={styles.card}>
          <Caption>Required Date</Caption>
          <Text>{requred_date} </Text>
        </View>
      ) : null}

      <View style={styles.card}>
        <Caption>Remark</Caption>
        <Text>{remark}</Text>
      </View>
    </View>
  );
};

const MaterialCard = props => {
  const {item, updateStatus, modulePermission, type} = props;

  const {
    materialcategrytitle,
    subcategorytitle,
    materialunitstitle,
    quantity,
    id,
    rm_status,
    assigned_quantity,
    damaged_qty,
  } = item;

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
      {type === 'afm' ? (
        <View style={styles.dataRow}>
          <Caption style={styles.lightData}>Unit:</Caption>
          <Text style={styles.title}>{materialunitstitle}</Text>
        </View>
      ) : null}

      {type === 'afm' ? (
        <View style={styles.dataRow}>
          <Caption style={styles.lightData}>Request Qty:</Caption>
          <Text style={styles.title}>{quantity}</Text>
        </View>
      ) : null}

      {type === 'rm' ? (
        <View style={styles.dataRow}>
          <Caption style={styles.lightData}>Fine Qty:</Caption>
          <Text style={styles.title}>{quantity}</Text>
        </View>
      ) : null}

      {type === 'afm' ? (
        <View style={styles.dataRow}>
          <Caption style={styles.lightData}>Assigned Qty:</Caption>
          <Text style={styles.title}>{assigned_quantity}</Text>
        </View>
      ) : null}

      {type === 'rm' ? (
        <View style={styles.dataRow}>
          <Caption style={styles.lightData}>Damaged Qty:</Caption>
          <Text style={styles.title}>{damaged_qty}</Text>
        </View>
      ) : null}

      {rm_status !== 'pending' ? (
        <View style={styles.dataRow}>
          <Caption style={styles.lightData}>Status:</Caption>
          <Text style={[styles.title, {color}]}>{label}</Text>
        </View>
      ) : null}
      {/* {modulePermission?.editor || modulePermission?.admin ? ( */}
      {rm_status === 'pending' ? (
        type === 'rm' ? (
          <ApproveButtons
            rejectLabel="Reject"
            approvedLabel="Approved"
            onReject={() => updateStatus('rejected', id)}
            onApprove={() => updateStatus('approved', id)}
          />
        ) : null
      ) : null}
      {/* ) : null} */}
    </View>
  );
};
const IssueMaterialCard = props => {
  const {item, updateStatus, modulePermission, type} = props;

  const {
    materialcategrytitle,
    subcategorytitle,
    materialunitstitle,
    quantity,
    id,
    rm_status,
    assigned_quantity,
    damaged_qty,
  } = item;

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
      {type === 'afm' ? (
        <View style={styles.dataRow}>
          <Caption style={styles.lightData}>Unit:</Caption>
          <Text style={styles.title}>{materialunitstitle}</Text>
        </View>
      ) : null}

      {type === 'afm' ? (
        <View style={styles.dataRow}>
          <Caption style={styles.lightData}>Request Qty:</Caption>
          <Text style={styles.title}>{quantity}</Text>
        </View>
      ) : null}

      {type === 'rm' ? (
        <View style={styles.dataRow}>
          <Caption style={styles.lightData}>Fine Qty:</Caption>
          <Text style={styles.title}>{quantity}</Text>
        </View>
      ) : null}

      {type === 'afm' ? (
        <View style={styles.dataRow}>
          <Caption style={styles.lightData}>Assigned Qty:</Caption>
          <Text style={styles.title}>{assigned_quantity}</Text>
        </View>
      ) : null}

      {type === 'rm' ? (
        <View style={styles.dataRow}>
          <Caption style={styles.lightData}>Damaged Qty:</Caption>
          <Text style={styles.title}>{damaged_qty}</Text>
        </View>
      ) : null}

      {rm_status !== 'pending' ? (
        <View style={styles.dataRow}>
          <Caption style={styles.lightData}>Status:</Caption>
          <Text style={[styles.title, {color}]}>{label}</Text>
        </View>
      ) : null}
      {modulePermission?.editor || modulePermission?.admin ? (
        rm_status === 'pending' ? (
          type === 'rm' ? (
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
const RMCCard = props => {
  const {item, updateStatus} = props;

  const {
    materialcategrytitle,
    subcategorytitle,
    materialunitstitle,
    quantity,
    assigned_quantity,
  } = item;

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
        <Caption style={styles.lightData}>Request Qty:</Caption>
        <Text style={styles.title}>{quantity}</Text>
      </View>

      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Assigned Qty:</Caption>
        <Text style={styles.title}>{assigned_quantity}</Text>
      </View>
    </View>
  );
};

function StoreKeeperPreview(props) {
  const {navigation, route} = props;
  const {id: ID, type} = route?.params || {};

  const {getStoreKeeperDetails, updateStoreKeeperStatus, getStoreKeeperList} =
    useMaterialManagementActions();

  const {storeKeeperDetails, loading} = useSelector(s => s.materialManagement);
  const {selectedProject} = useSelector(s => s.project);

  const modulePermission = getPermissions('StoreKeeper List');

  const projectId = selectedProject.id;
  const {material_indent_details, rmc_list, issue_list} =
    storeKeeperDetails?.indent_details || [];

  const {authorizedstatus} =
    storeKeeperDetails?.indent_details?.material_indent || {};

  const attachments = storeKeeperDetails?.indent_details?.return_indent_files;

  React.useEffect(() => {
    getStoreDetails();
    getStoreKeeperList({project_id: selectedProject.id});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getList = async () => {
    await getStoreKeeperList({project_id: selectedProject.id});
  };

  const getStoreDetails = () => {
    getStoreKeeperDetails({
      project_id: projectId,
      material_indent_id: ID,
    });
  };

  const updateStatus = async (status, id) => {
    const restData = {
      project_id: projectId,
      material_indent_details_id: id,
      type: status,
    };
    await updateStoreKeeperStatus(restData);
    getStoreDetails();
    getList();
  };

  const navToIssue = () => navigation.navigate('IssueIndent', {ID});

  const {label, color} = STORE_KEEPER_DETAIL_STATUS[authorizedstatus] || {};

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.subContainer}>
          <IconButton
            icon="keyboard-backspace"
            size={16}
            color={theme.colors.primary}
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          />
          <Subheading style={styles.headerText}>
            {type === 'afm' ? 'Issue Request' : 'Return Request'}
          </Subheading>
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
        <RequiredVendor storeKeeperDetails={storeKeeperDetails} type={type} />
        {type === 'rm' ? (
          material_indent_details?.length ? (
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
                      type={type}
                    />
                  );
                })}
              </View>
            </>
          ) : null
        ) : null}
        {issue_list ? (
          <>
            <View style={styles.textContainer}>
              <Subheading style={styles.textSubContainer}>
                Issue Material Request
              </Subheading>
            </View>

            <View style={styles.materialCardContainer}>
              {Object.entries(issue_list)?.map(item => {
                return item
                  ?.filter(id => isArray(id))
                  ?.map(issue_request => {
                    const headerInfo = issue_request?.find(e => e);
                    return (
                      <View style={styles.cardContainer}>
                        {item.find(e => e !== issue_request.wbs_works_id) ? (
                          <>
                            <View style={styles.cardHeader}>
                              <Text variant="labelSmall">
                                {headerInfo?.requiredfor}
                              </Text>
                            </View>

                            <Divider />
                          </>
                        ) : null}
                        {issue_request?.map(single_request => {
                          return (
                            <IssueMaterialCard
                              item={single_request}
                              navigation={navigation}
                              updateStatus={updateStatus}
                              authorizedstatus={authorizedstatus}
                              modulePermission={modulePermission}
                              type={type}
                            />
                          );
                        })}
                      </View>
                    );
                  });
              })}
            </View>
            <Divider />
          </>
        ) : null}
        {rmc_list ? (
          rmc_list.length ? (
            <>
              <View style={styles.textContainer}>
                <Subheading style={styles.textSubContainer}>
                  RMC Request
                </Subheading>
              </View>

              <View style={styles.materialCardContainer}>
                {Object.entries(rmc_list)?.map(item => {
                  return item
                    ?.filter(id => {
                      return isArray(id);
                    })
                    ?.map(rmc_request => {
                      const headerInfo = rmc_request?.find(e => e);

                      const {requiredfor, grade, rmc_qty} = headerInfo;

                      return (
                        <View style={styles.cardContainer}>
                          {item.find(e => e !== rmc_request.wbs_works_id) ? (
                            <>
                              <View style={styles.cardHeader}>
                                <Text variant="labelSmall">{requiredfor}</Text>
                              </View>

                              <Divider />
                              <View style={styles.newDataRow}>
                                <View style={styles.rmcDetail}>
                                  <Caption>Grade: </Caption>
                                  <Text>{grade}</Text>
                                </View>
                                <View style={styles.rmcDetail}>
                                  <Caption>Qty: </Caption>
                                  <Text>{rmc_qty}</Text>
                                </View>
                              </View>
                              <Divider style={styles.rmcHeader} />
                            </>
                          ) : null}
                          {rmc_request?.map(single_request => {
                            return (
                              <>
                                <RMCCard
                                  item={single_request}
                                  navigation={navigation}
                                  updateStatus={updateStatus}
                                  authorizedstatus={authorizedstatus}
                                  modulePermission={modulePermission}
                                  type={type}
                                />
                                <Divider />
                              </>
                            );
                          })}
                        </View>
                      );
                    });
                })}
              </View>
            </>
          ) : null
        ) : null}
        {attachments?.length ? (
          label === 'Issued' ? null : (
            <>
              <View style={styles.textContainer}>
                <Subheading style={styles.textSubContainer}>
                  Material Image
                </Subheading>
              </View>
              <RenderAttachments
                storeKeeperDetails={storeKeeperDetails}
                attachments={attachments}
              />
            </>
          )
        ) : null}
      </ScrollView>
      {label === 'Issued' ? null : type === 'afm' ? (
        <Button color="white" onPress={navToIssue} style={styles.button}>
          Issue Order
        </Button>
      ) : null}
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
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  rmcDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    paddingVertical: 5,
  },
  newDataRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    marginBottom: 10,
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
  rmcHeader: {
    marginVertical: 10,
  },
});

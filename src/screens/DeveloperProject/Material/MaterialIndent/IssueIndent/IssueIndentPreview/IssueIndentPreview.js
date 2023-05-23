import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';

import React, {useEffect} from 'react';
import {
  Button,
  Caption,
  Dialog,
  Divider,
  IconButton,
  Portal,
  Subheading,
  Text,
} from 'react-native-paper';
import {theme} from 'styles/theme';
import {getShadow} from 'utils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {useAlert} from 'components/Atoms/Alert';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {Formik} from 'formik';
import RenderInput from 'components/Atoms/RenderInput';
import {useSnackbar} from 'components/Atoms/Snackbar';
import ActionButtons from 'components/Atoms/ActionButtons';
import {isArray, isNumber} from 'lodash';
import Spinner from 'react-native-loading-spinner-overlay';

const INDENT_STATUS = {
  pending: {label: 'Pending', color: 'rgba(72, 114, 244, 1)'},
  approved: {label: 'Approved', color: '#07CA03'},
  rejected: {label: 'Rejected', color: '#FF5D5D'},
};

const AssignQtyDialog = props => {
  const {item, visible, toggleDialog, onSubmit} = props;

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={toggleDialog}
        style={styles.dialogContainer}>
        <View>
          <Text style={styles.dialogSubContainer}>Assign Quantity</Text>
          <Formik
            enableReinitialize
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={{assigned_quantity: item?.assigned_quantity || 0}}
            onSubmit={values => onSubmit(values?.assigned_quantity)}>
            {({values, errors, handleChange, handleBlur, handleSubmit}) => {
              return (
                <>
                  <RenderInput
                    name="assigned_quantity"
                    label=""
                    containerStyles={styles.inputStyles}
                    value={values.assigned_quantity}
                    onChangeText={handleChange('assigned_quantity')}
                    onBlur={handleBlur('assigned_quantity')}
                    error={errors.assigned_quantity}
                  />
                  <Dialog.Actions style={styles.buttonContainer}>
                    <Button
                      style={styles.cancelButton}
                      onPress={() => toggleDialog()}>
                      Cancel
                    </Button>
                    <Button onPress={handleSubmit}>Ok</Button>
                  </Dialog.Actions>
                </>
              );
            }}
          </Formik>
        </View>
      </Dialog>
    </Portal>
  );
};

const ListingCard = props => {
  const {details} = props;

  const {id, status, email, first_name, last_name, created} = details || {};

  const date = moment(created).format('llll');

  const {label, color} = INDENT_STATUS[status] || {};

  return (
    <TouchableOpacity>
      <View style={styles.mainCardContainer}>
        <View style={styles.cardHeader}>
          <Text style={styles.ID}>{id}</Text>
          <Caption style={{color}}>{label}</Caption>
        </View>
        <Divider />
        <View style={styles.cardDetails}>
          <View style={styles.newDataRow}>
            <Subheading>Create by:</Subheading>
            <View style={styles.createdBy}>
              <Text>
                {first_name}
                {last_name}
              </Text>
              <Caption>({email})</Caption>
            </View>
          </View>
          <View style={styles.newDataRow}>
            <Subheading>Created on:</Subheading>
            <View style={styles.date}>
              <Text>{date}</Text>
            </View>
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
      <View style={styles.vendorSubContainer}>
        <Caption>Required For Vendor</Caption>
        <Subheading>{contractor_name}</Subheading>
        <Caption>{contractor_email}</Caption>
      </View>
      <View style={styles.card}>
        <Caption> Required Date</Caption>
        <Text>{date}</Text>
      </View>
      <View style={styles.card}>
        <Caption>Remark</Caption>
        <Text>{remark}</Text>
      </View>
    </View>
  );
};

function AssignMaterialCard(props) {
  const {item, index, showEdit, showDetail, toggleDialog, isApproved} = props;

  const {
    materialcategrytitle,
    materialunitstitle,
    subcategorytitle,
    quantity,
    available_quantity,
    estimated_quantity,
    remaining,
    assigned_quantity,
    rm_status,
  } = item;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeaderStyle}>
        <View style={styles.dataRow}>
          <Caption style={styles.lightData}>Category:</Caption>
          <Text>{materialcategrytitle}</Text>
        </View>
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
        <Caption style={styles.lightData}>Requested Qty:</Caption>
        <Text>{quantity}</Text>
      </View>

      {isApproved || showDetail ? (
        <>
          <View style={styles.dataRow}>
            <Caption style={styles.lightData}>Estimated Qty:</Caption>
            <Text>{estimated_quantity}</Text>
          </View>
          <View style={styles.dataRow}>
            <Caption style={styles.lightData}>Remaining Qty:</Caption>
            <Text>{remaining}</Text>
          </View>
          <View style={styles.dataRow}>
            <Caption style={styles.lightData}>Available Qty:</Caption>
            <Text>{available_quantity}</Text>
          </View>

          <View style={styles.dataRow}>
            <Caption style={styles.lightData}>Assign Quantity:</Caption>
            <Text>{assigned_quantity}</Text>
            {showEdit ? (
              rm_status === 'pending' ? (
                <OpacityButton
                  color={theme.colors.primary}
                  opacity={0.18}
                  style={styles.paymentSubContainer}
                  onPress={() => toggleDialog(index)}>
                  <MaterialIcons
                    name="edit"
                    color={theme.colors.primary}
                    size={10}
                  />
                </OpacityButton>
              ) : null
            ) : null}
          </View>
        </>
      ) : null}
    </View>
  );
}

const RMCCard = props => {
  const {item, isApproved, showDetail} = props;

  const {
    materialcategrytitle,
    subcategorytitle,
    quantity,
    materialunitstitle,
    available_quantity,
    remaining,
    estimated_quantity,
    grade,
    rmc_qty,
  } = item;

  return (
    <View style={styles.cardContainer}>
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
        <Caption style={styles.lightData}>Ask Qty:</Caption>
        <Text style={styles.title}>{quantity}</Text>
      </View>
      {isApproved || showDetail ? (
        <>
          <View style={styles.dataRow}>
            <Caption style={styles.lightData}>Estimated Qty:</Caption>
            <Text style={styles.title}>{estimated_quantity}</Text>
          </View>
          <View style={styles.dataRow}>
            <Caption style={styles.lightData}>Remaining Qty:</Caption>
            <Text style={styles.title}>{remaining}</Text>
          </View>
          <View style={styles.dataRow}>
            <Caption style={styles.lightData}>Available Qty:</Caption>
            <Text style={styles.title}>{available_quantity}</Text>
          </View>
        </>
      ) : null}
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Assigned Qty:</Caption>
        {isApproved || showDetail ? (
          available_quantity > quantity ? (
            <MaterialIcons
              name="check"
              color={theme.colors.success}
              size={18}
            />
          ) : (
            <MaterialIcons name="close" color={theme.colors.error} size={18} />
          )
        ) : null}
      </View>
    </View>
  );
};

function IssueIndentPreview(props) {
  const {navigation, route} = props;
  const {id: indentId} = route?.params || {};

  const alert = useAlert();
  const snackbar = useSnackbar();

  const {
    getIndentDetails,
    deleteIssue,
    getMaterialIndentList,
    updateIssueQuantity,
    updateIssueStatus,
  } = useMaterialManagementActions();

  const {selectedProject} = useSelector(s => s.project);
  const {indentDetails, loading} = useSelector(s => s.materialManagement);

  const {
    material_indent: details,
    rmc_list: rmcData,
    issue_list: materialData,
  } = indentDetails || [];
  const {status, verification_code} = details || {};

  const [selectedItemIndex, setSelectedItemIndex] = React.useState();
  const [showDetail, setShowDetail] = React.useState();
  const [materials, setMaterials] = React.useState([]);
  const [rmc, setRmc] = React.useState([]);

  useEffect(() => {
    if (materialData) setMaterials(Object.values(materialData)[0]);
  }, [materialData]);

  useEffect(() => {
    if (rmcData) setRmc(Object.values(rmcData)[0]);
  }, [rmcData]);

  useEffect(() => {
    getData();
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDetail = () => setShowDetail(v => !v);
  const toggleDialog = v => setSelectedItemIndex(v);

  const getData = async () => {
    await getIndentDetails({
      project_id: selectedProject.id,
      material_indent_id: indentId,
    });
  };

  const getList = () =>
    getMaterialIndentList({
      project_id: selectedProject.id,
    });

  const handleDelete = () => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: () => {
        deleteIssue({
          material_indent_id: indentId,
          project_id: selectedProject.id,
        });
        getList();
        navigation.goBack();
      },
    });
  };

  const navToCreate = () => {
    navigation.navigate('CreateIssueIndent', {id: indentId, indentDetails});
  };

  const handleSaveMaterialQuantity = (value, approveStatus) => {
    const quantity = materials.find(i => i.assigned_quantity === null);

    if (approveStatus === 'approved') {
      if (quantity) {
        snackbar.showMessage({
          message: 'please add assigned quantity',
          variant: 'warning',
        });
        toggleDialog();
        return;
      }
    }

    const _materials = [...materials];
    if (value > _materials[selectedItemIndex]?.available_quantity) {
      snackbar.showMessage({
        message: 'Assign Quantity can not be more then Available Quantity',
        variant: 'error',
      });
      toggleDialog();
      return;
    }

    _materials[selectedItemIndex].assigned_quantity = value;

    setMaterials(_materials);
    toggleDialog();
  };

  const UpdateDetailsStatus = async approveStatus => {
    const data = {
      project_id: selectedProject.id,
      material_indent_id: indentId,
      type: approveStatus,
    };
    await updateIssueQuantity(data);
    getData();
  };

  const updateStatus = async (approvedStatus, data) => {
    const {wbs_works_id, type} = data;

    const issueQuantityData = materials?.map(item => {
      const {id, assigned_quantity} = item;
      return {assigned_quantity, material_indent_details_id: id};
    });

    const rmcQuantityData = rmc?.map(item => {
      const {id, assigned_quantity} = item;
      return {assigned_quantity, material_indent_details_id: id};
    });

    const assigned_quantity =
      type === 'rmc' ? rmcQuantityData : issueQuantityData;

    const restData = {
      project_id: selectedProject.id,
      material_indent_id: indentId,
      approvaltype: approvedStatus,
      wbsworkid: wbs_works_id,
      indenttype: type,
      assigned_quantity: JSON.stringify(assigned_quantity),
    };

    await updateIssueStatus(restData);
    getData();
  };

  const isPending = status === 'pending';
  const isApproved = status === 'approved';

  return (
    <>
      <Spinner visible={loading || details} textContent="" />

      <AssignQtyDialog
        {...props}
        visible={isNumber(selectedItemIndex)}
        item={materials?.[selectedItemIndex]}
        toggleDialog={toggleDialog}
        onSubmit={handleSaveMaterialQuantity}
      />
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.dataRow}>
            <IconButton
              icon="keyboard-backspace"
              size={16}
              color={theme.colors.primary}
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            />
            <Subheading style={styles.headerText}>Issue Material</Subheading>
          </View>
          {verification_code ? (
            <View style={styles.statusContainer}>
              <OpacityButton
                color={theme.colors.error}
                style={styles.opacity}
                opacity={0.18}
                onPress={handleDelete}>
                <MaterialIcons
                  name="delete"
                  color={theme.colors.error}
                  size={13}
                />
              </OpacityButton>
            </View>
          ) : null}

          {isPending && !showDetail ? (
            <View style={styles.statusContainer}>
              <OpacityButton
                color={theme.colors.primary}
                style={styles.opacity}
                opacity={0.18}
                onPress={navToCreate}>
                <MaterialIcons
                  name="edit"
                  color={theme.colors.primary}
                  size={13}
                />
              </OpacityButton>
            </View>
          ) : null}
        </View>
        {isApproved ? (
          <View style={styles.verificationContainer}>
            <Subheading style={{color: theme.colors.primary}}>
              Verification Code :
            </Subheading>
            <Text style={{color: theme.colors.primary}}>
              {verification_code}
            </Text>
          </View>
        ) : null}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}>
          <ListingCard details={details} />
          <RequiredVendor details={details} />
          {materialData ? (
            <>
              <View style={styles.textContainer}>
                <Subheading style={styles.textSubContainer}>
                  Issue Material Request
                </Subheading>
              </View>

              <View style={styles.materialCardContainer}>
                {Object.entries(materialData)?.map(item => {
                  return item
                    ?.filter(workId => isArray(workId))
                    ?.map(issue_request => {
                      const headerInfo = issue_request?.find(e => e);

                      const {rm_status, wbs_works_id, type} = headerInfo;
                      const {label, color} =
                        INDENT_STATUS[headerInfo?.rm_status] || {};

                      return (
                        <View style={styles.cardContainer}>
                          {item.find(e => e !== headerInfo.requiredfor) ? (
                            <>
                              <View style={styles.cardHeader}>
                                <Text> Status:</Text>
                                <Caption style={{color}}>{label}</Caption>
                              </View>
                              <View style={styles.wbsIdContainer}>
                                <Text style={styles.idContainer}>
                                  {headerInfo.requiredfor}{' '}
                                </Text>
                              </View>
                            </>
                          ) : null}
                          {issue_request?.map((single_request, index) => {
                            return (
                              <AssignMaterialCard
                                key={single_request.id}
                                item={single_request}
                                index={index}
                                toggleDialog={toggleDialog}
                                showDetail={showDetail}
                                showEdit={isPending}
                                isApproved={isApproved}
                              />
                            );
                          })}

                          {rm_status === 'pending' ? (
                            showDetail ? (
                              <ActionButtons
                                cancelLabel="Reject"
                                submitLabel=" Approve"
                                onCancel={() =>
                                  updateStatus('rejected', {wbs_works_id, type})
                                }
                                onSubmit={() =>
                                  updateStatus('approved', {wbs_works_id, type})
                                }
                              />
                            ) : null
                          ) : null}
                        </View>
                      );
                    });
                })}
              </View>
              <Divider />
            </>
          ) : null}
          {rmcData ? (
            <>
              <View style={styles.textContainer}>
                <Subheading style={styles.textSubContainer}>
                  RMC Request
                </Subheading>
              </View>

              <View style={styles.materialCardContainer}>
                {Object.entries(rmcData)?.map(item => {
                  return item
                    ?.filter(workId => isArray(workId))
                    ?.map(rmc_request => {
                      const headerInfo = rmc_request?.find(e => e);
                      const {label, color} =
                        INDENT_STATUS[headerInfo?.rm_status] || {};

                      const {requiredfor, rm_status, wbs_works_id, type} =
                        headerInfo;

                      return (
                        <View style={styles.mainCardContainer}>
                          {item.find(e => e !== rmc_request.wbs_works_id) ? (
                            <>
                              <View style={styles.cardHeader}>
                                <Text> Status:</Text>
                                <Caption style={{color}}>{label}</Caption>
                              </View>
                              <View style={styles.wbsIdContainer}>
                                <Text style={styles.idContainer}>
                                  {requiredfor}
                                </Text>
                              </View>

                              <Divider />
                            </>
                          ) : null}
                          {rmc_request?.map(single_request => {
                            return (
                              <RMCCard
                                item={single_request}
                                navigation={navigation}
                                isApproved={isApproved}
                                showDetail={showDetail}
                                isPending={isPending}
                              />
                            );
                          })}
                          {rm_status === 'pending' ? (
                            showDetail ? (
                              <ActionButtons
                                cancelLabel="Reject"
                                submitLabel=" Approve"
                                onCancel={() => {
                                  updateStatus('rejected', {
                                    wbs_works_id,
                                    type,
                                  });
                                }}
                                onSubmit={() => {
                                  updateStatus('approved', {
                                    wbs_works_id,
                                    type,
                                  });
                                }}
                              />
                            ) : null
                          ) : null}
                        </View>
                      );
                    });
                })}
              </View>
            </>
          ) : null}
        </ScrollView>

        {!showDetail && isPending ? (
          <Button color="white" onPress={toggleDetail} style={styles.button}>
            Assign Material
          </Button>
        ) : null}
        {showDetail && isPending ? (
          <ActionButtons
            cancelLabel="Reject"
            submitLabel=" Approve"
            // submitDisabled={disableApprove}
            onCancel={() => UpdateDetailsStatus('rejected')}
            onSubmit={() => UpdateDetailsStatus('approved')}
          />
        ) : null}
      </View>
    </>
  );
}

export default IssueIndentPreview;

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
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5f5',
    borderRadius: 5,
    paddingHorizontal: 10,
    ...getShadow(2),
  },

  mainCardContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#ffff',
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
  newDataRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
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

  verificationContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },

  button: {
    backgroundColor: theme.colors.primary,
    position: 'absolute',
    top: '97%',
    width: '100%',
  },

  paymentSubContainer: {
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 10,
  },

  dialogContainer: {
    borderRadius: 20,
    padding: 20,
  },
  dialogSubContainer: {
    color: '#4872f4',
    fontSize: 15,
  },

  inputStyles: {
    marginVertical: 4,
  },
  buttonContainer: {
    marginTop: 10,
  },
  scrollView: {
    paddingBottom: 50,
  },

  cardHeaderStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rmcHeader: {
    marginVertical: 10,
  },

  wbsIdContainer: {
    marginVertical: 5,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  idContainer: {
    padding: 5,
  },
  createdBy: {
    marginLeft: 25,
  },
  date: {
    marginLeft: 15,
    marginTop: 5,
  },
});

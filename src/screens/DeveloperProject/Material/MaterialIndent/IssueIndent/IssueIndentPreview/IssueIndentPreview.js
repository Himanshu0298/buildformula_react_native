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
import {isNumber, pick} from 'lodash';
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
      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <Text style={styles.ID}>{id}</Text>
          <Caption style={{color}}>{label}</Caption>
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

  const {
    contractor_name,
    contractor_email,
    requred_date,
    remark,
    wbs_work_path,
  } = details || {};

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
        <Caption>{wbs_work_path}</Caption>
      </View>
      <View style={styles.card}>
        <Text> Remark</Text>
        <Caption>{remark}</Caption>
      </View>
    </View>
  );
};

function AssignMaterialCard(props) {
  const {item, index, showEdit, showDetail, toggleDialog} = props;

  const {
    materialcategrytitle,
    materialunitstitle,
    subcategorytitle,
    quantity,
    available_quantity,
    estimated_quantity,
    remaining,
    assigned_quantity,
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
        <Caption style={styles.lightData}>Requested Qty:</Caption>
        <Text>{quantity}</Text>
      </View>

      {showDetail ? (
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
            ) : null}
          </View>
        </>
      ) : null}
    </View>
  );
}

function IssueIndentPreview(props) {
  const {navigation, route} = props;
  const {id, type} = route?.params || {};

  const alert = useAlert();
  const snackbar = useSnackbar();

  const {
    getIndentDetails,
    deleteIssue,
    getMaterialIndentList,
    updateIssueQuantity,
  } = useMaterialManagementActions();

  const {selectedProject} = useSelector(s => s.project);
  const {indentDetails, loading} = useSelector(s => s.materialManagement);

  const details = indentDetails?.material_indent;
  const {status, verification_code} = details || {};
  const materialData = indentDetails?.material_indent_details;

  const [selectedItemIndex, setSelectedItemIndex] = React.useState();
  const [showDetail, setShowDetail] = React.useState();
  const [materials, setMaterials] = React.useState(materialData);

  useEffect(() => {
    if (materialData?.length) setMaterials(materialData);
  }, [materialData]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const disableApprove = React.useMemo(() => {
    return Boolean(
      materials?.filter(i => !isNumber(i.assigned_quantity))?.length,
    );
  }, [materials]);

  const toggleDetail = () => setShowDetail(v => !v);
  const toggleDialog = v => setSelectedItemIndex(v);

  const getData = () => {
    getIndentDetails({
      project_id: selectedProject.id,
      material_indent_id: id,
    });
  };

  const getList = () => {
    getMaterialIndentList({
      project_id: selectedProject.id,
    });
  };

  const handleDelete = () => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: () => {
        deleteIssue({
          material_indent_id: id,
          project_id: selectedProject.id,
        });
        getList();
        navigation.goBack();
      },
    });
  };

  const navToCreate = () => {
    navigation.navigate('CreateIssueIndent', {id, indentDetails});
  };

  const handleSaveMaterialQuantity = value => {
    const _materials = [...materials];

    if (value > _materials[selectedItemIndex]?.available_quantity) {
      snackbar.showMessage({
        message: 'Assign Quantity can not be more then Available Quantity',
        variant: 'error',
      });
      return;
    }

    _materials[selectedItemIndex].assigned_quantity = value;
    setMaterials(_materials);
    toggleDialog();
  };

  const updateStatus = async approveStatus => {
    const formData = new FormData();

    const quantityData = materials.map(item => {
      const keys = ['material_indent_id', 'assigned_quantity'];
      return {...pick(item, keys), material_indent_details_id: item.id};
    });

    formData.append('project_id', selectedProject.id);
    formData.append('material_indent_id', id);
    formData.append('type', approveStatus);
    formData.append('assigned_quantity', JSON.stringify(quantityData));

    await updateIssueQuantity(formData);
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
        item={materials[selectedItemIndex]}
        toggleDialog={toggleDialog}
        onSubmit={handleSaveMaterialQuantity}
      />
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
          {materialData?.length ? (
            <>
              <View style={styles.textContainer}>
                <Subheading style={styles.textSubContainer}>
                  Material Request
                </Subheading>
              </View>

              {materials?.map((item, index) => {
                return (
                  <AssignMaterialCard
                    item={item}
                    index={index}
                    toggleDialog={toggleDialog}
                    showDetail={showDetail}
                    showEdit={isPending}
                  />
                );
              })}
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
            submitDisabled={disableApprove}
            onCancel={() => updateStatus('rejected')}
            onSubmit={() => updateStatus('approved')}
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
});

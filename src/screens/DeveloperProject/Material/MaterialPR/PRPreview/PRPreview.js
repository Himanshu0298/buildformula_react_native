import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {IconButton, Caption, Subheading, Text} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import ActionButtons from 'components/Atoms/ActionButtons';
import {useAlert} from 'components/Atoms/Alert';
import {useSelector} from 'react-redux';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {ScrollView} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import {getPermissions, getShadow} from 'utils';
import {isNumber} from 'lodash';
import {AddMaterialDialog} from '../AddMaterialList/AddMaterialList';

function RenderHeaderBar(props) {
  const {goBack, navToEdit, handleDelete, PRDetails} = props;

  const showStatus = PRDetails?.details?.status;
  return (
    <View style={styles.headerContainer}>
      <View style={styles.container}>
        <IconButton
          icon="keyboard-backspace"
          size={16}
          color="#4872f4"
          style={styles.backIcon}
          onPress={() => goBack()}
        />
        <Subheading style={styles.headerText}>PR Preview</Subheading>
      </View>
      <View style={styles.headerSubContainer}>
        {showStatus === 1 ? (
          <View style={styles.editIconContainer}>
            <OpacityButton
              color="#4872f4"
              opacity={0.18}
              style={styles.editIcon}
              onPress={navToEdit}>
              <MaterialIcons name="edit" color="#4872f4" size={13} />
            </OpacityButton>
          </View>
        ) : null}
        <View>
          <OpacityButton
            color="#FF5D5D"
            opacity={0.18}
            onPress={handleDelete}
            style={styles.deleteIcon}>
            <MaterialIcons name="delete" color="#FF5D5D" size={13} />
          </OpacityButton>
        </View>
      </View>
    </View>
  );
}

function RenderPRHeaderCard(props) {
  const {PRDetails} = props;
  const {details, requiredData} = PRDetails;
  const {
    id,
    subject,
    contractor_name,
    remarks,
    first_name,
    last_name,
    created,
    status,
  } = details || {};

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.dataRow}>
          <Caption style={styles.lightData}>PR ID:</Caption>
          <Text>{id}</Text>
        </View>
        {status === 3 ? (
          <View style={styles.statusContainer}>
            <MaterialIcons name="cancel" size={18} color="#FF5D5D" />
            <Text style={styles.rejectedStatus}>PR Rejected</Text>
          </View>
        ) : status === 2 ? (
          <View style={styles.checkIcon}>
            <MaterialIcons name="check-circle" size={18} color="#07CA03" />
            <Text style={styles.approvedStatus}>PR Approved</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Subject:</Caption>
        <Text>{subject}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Required Vendor:</Caption>
        <Text>{contractor_name}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Required For:</Caption>
        <Text style={styles.text}>{requiredData}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Remark:</Caption>
        <Text style={styles.text}>{remarks}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Creator Name:</Caption>
        <Text>{`${first_name} ${last_name}`}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Created on:</Caption>
        <Text>{created}</Text>
      </View>
    </>
  );
}

function RenderMaterialCard(props) {
  const {item, handleDelete, handleEdit, index, showStatus} = props;

  const {
    materialcategrytitle,
    subcategorytitle,
    materialunitstitle,
    created,
    material_quantity,
  } = item;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.dataRow}>
            <Caption style={styles.lightData}>Category:</Caption>
            <Text>{materialcategrytitle}</Text>
          </View>
        </View>

        {showStatus === 1 ? (
          <View style={styles.headerSubContainer}>
            <View style={styles.editIconContainer}>
              <OpacityButton
                color="#4872f4"
                opacity={0.18}
                style={styles.editIcon}
                onPress={() => handleEdit(index)}>
                <MaterialIcons name="edit" color="#4872f4" size={13} />
              </OpacityButton>
            </View>

            <View>
              <OpacityButton
                color="#FF5D5D"
                opacity={0.18}
                onPress={() => handleDelete(item)}
                style={styles.deleteIcon}>
                <MaterialIcons name="delete" color="#FF5D5D" size={13} />
              </OpacityButton>
            </View>
          </View>
        ) : null}
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
        <Caption style={styles.lightData}>Required date:</Caption>
        <Text>{created}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Quantity:</Caption>
        <Text>{material_quantity}</Text>
      </View>
    </View>
  );
}

const PRPreview = props => {
  const {navigation, route} = props;
  const {id} = route?.params || {};

  const alert = useAlert();

  const {
    getPRMaterialDetails,
    deleteMaterialPR,
    updatePRStatus,
    getMaterialPR,
    deleteMaterialPRItem,
    updatePR,
  } = useMaterialManagementActions();

  const {selectedProject} = useSelector(s => s.project);
  const {PRDetails, loading} = useSelector(s => s.materialManagement);
  const projectId = selectedProject.id;

  const {materialItems} = PRDetails || {};

  const showStatus = PRDetails?.details?.status;

  const {
    praposal_contractor_id: contractor_id,
    required_for,
    subject,
    remarks,
  } = PRDetails.details || {};

  const [selectedMaterialIndex, setSelectedMaterialIndex] = React.useState();

  useEffect(() => {
    getPRDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBack = () => navigation.goBack();
  const modulePermission = getPermissions('PR List');

  const getPRDetails = () => {
    getPRMaterialDetails({project_id: projectId, purchase_request_id: id});
  };

  const getList = () => {
    getMaterialPR({project_id: selectedProject.id});
  };

  const navToEdit = () => navigation.navigate('CreatePR', {id});

  const toggleAddDialog = v =>
    setSelectedMaterialIndex(isNumber(v) ? v : undefined);

  const updateStatus = async pr_status => {
    const restData = {
      project_id: projectId,
      purchase_request_id: id,
      pr_status,
    };
    await updatePRStatus(restData);
    getPRDetails();
  };

  const handleDelete = () => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete the PR?',
      confirmText: 'Delete',
      onConfirm: async () => {
        await deleteMaterialPR({
          purchase_request_id: id,
          project_id: selectedProject.id,
        });
        getList();
        navigation.goBack();
      },
    });
  };

  const handleRemove = item => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: async () => {
        const deleteData = {
          purchase_request_id: id,
          material_purchase_request_items_id: item.id,
          project_id: projectId,
        };
        await deleteMaterialPRItem(deleteData);
        getPRDetails();
      },
    });
  };

  const handleSave = async values => {
    toggleAddDialog();
    const materialData = [...materialItems];
    materialData[selectedMaterialIndex] = values;
    const restData = {
      project_id: projectId,
      purchase_request_id: id,
      material_data: materialData,
      contractor_id,
      required_for,
      subject,
      remarks,
    };
    await updatePR(restData);
    getPRDetails();
  };

  return (
    <View style={styles.mainContainer}>
      <AddMaterialDialog
        {...props}
        visible={isNumber(selectedMaterialIndex)}
        handleClose={toggleAddDialog}
        material={materialItems?.[selectedMaterialIndex]}
        id={id}
        handleSave={handleSave}
      />
      <Spinner visible={loading} textContent="" />
      <ScrollView>
        <RenderHeaderBar
          goBack={goBack}
          navToEdit={navToEdit}
          handleDelete={handleDelete}
          PRDetails={PRDetails}
        />

        <View style={styles.bodyContent}>
          <RenderPRHeaderCard {...props} PRDetails={PRDetails} />
          {materialItems?.map((item, index) => {
            return (
              <View style={styles.cardSubContainer}>
                <RenderMaterialCard
                  {...props}
                  item={item}
                  index={index}
                  showStatus={showStatus}
                  navigation={navigation}
                  handleDelete={handleRemove}
                  handleEdit={toggleAddDialog}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
      {modulePermission?.editor || modulePermission?.admin ? (
        PRDetails?.details?.status === 1 ? (
          <ActionButtons
            cancelLabel=" Reject"
            submitLabel="Approve"
            onCancel={() => updateStatus('rejected')}
            onSubmit={() => updateStatus('approved')}
          />
        ) : null
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    margin: 10,
    flexGrow: 1,
    flex: 1,
  },

  headerText: {
    fontSize: 18,
  },
  lightData: {
    fontSize: 13,
    marginRight: 5,
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 0.5,
  },

  cardContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    ...getShadow(2),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  rejectedStatus: {
    color: '#FF5D5D',
    marginLeft: 5,
  },
  checkIcon: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  approvedStatus: {
    color: '#07CA03',
    marginLeft: 5,
  },
  backIcon: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
  },

  headerSubContainer: {
    flexDirection: 'row',
    marginEnd: 10,
    alignSelf: 'center',
  },
  deleteIcon: {
    borderRadius: 20,
  },
  editIcon: {
    borderRadius: 20,
    marginLeft: 15,
  },
  editIconContainer: {
    marginRight: 15,
  },
  text: {
    flexShrink: 1,
  },
  cardSubContainer: {
    marginTop: 10,
  },

  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PRPreview;

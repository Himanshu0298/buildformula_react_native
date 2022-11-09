import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {IconButton, Caption, Subheading} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import ActionButtons from 'components/Atoms/ActionButtons';
import {useAlert} from 'components/Atoms/Alert';
import {useSelector} from 'react-redux';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {ScrollView} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import {getPermissions, getShadow} from 'utils';

function RenderHeaderBar(props) {
  const {goBack, navToEdit, showStatus, handleDelete} = props;
  return (
    <View style={styles.headerContainer}>
      <View style={styles.container}>
        <IconButton
          icon="keyboard-backspace"
          size={22}
          color="#4872f4"
          style={styles.backIcon}
          onPress={() => goBack()}
        />
        <Subheading style={styles.headerText}>PR Preview</Subheading>
      </View>
      <View style={styles.headerSubContainer}>
        {showStatus == null ? (
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
  const {item} = props;
  const {
    materialcategrytitle,
    subcategorytitle,
    materialunitstitle,
    created,
    material_quantity,
  } = item;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
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
    getPRMaterialOrderList,
  } = useMaterialManagementActions();

  const {selectedProject} = useSelector(s => s.project);
  const {PRDetails, loading} = useSelector(s => s.materialManagement);
  const projectId = selectedProject.id;

  useEffect(() => {
    getPRDetails();
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBack = () => navigation.goBack();
  const modulePermission = getPermissions('PR List');

  const getPRDetails = () => {
    getPRMaterialDetails({project_id: projectId, purchase_request_id: id});
  };
  const getData = () =>
    getPRMaterialOrderList({project_id: selectedProject.id});

  const navToEdit = () => navigation.navigate('CreatePR', {id});

  const updateStatus = async pr_status => {
    const restData = {
      project_id: projectId,
      purchase_request_id: id,
      pr_status,
    };
    await updatePRStatus(restData);
    getPRDetails();
  };

  const handleDelete = i => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: () => {
        deleteMaterialPR({
          purchase_request_id: id,
          project_id: selectedProject.id,
        });
        getData();
        navigation.goBack();
      },
    });
  };

  return (
    <View style={styles.mainContainer}>
      <Spinner visible={loading} textContent="" />
      <ScrollView>
        <RenderHeaderBar
          goBack={goBack}
          navToEdit={navToEdit}
          handleDelete={handleDelete}
        />

        <View style={styles.bodyContent}>
          <RenderPRHeaderCard {...props} PRDetails={PRDetails} />
          {PRDetails?.materialItems?.map(item => {
            return (
              <View style={styles.cardSubContainer}>
                <RenderMaterialCard {...props} item={item} />
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
  // materialListContainer: {
  //   marginTop: 10,
  //   height: dynamicHeight,
  // },
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
  // subContainer: {
  //   margin: 10,
  // },
});

export default PRPreview;

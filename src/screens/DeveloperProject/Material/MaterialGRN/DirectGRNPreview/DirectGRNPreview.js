import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import {Caption, Subheading} from 'react-native-paper';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAlert} from 'components/Atoms/Alert';
import FileIcon from 'assets/images/file_icon.png';
import ActionButtons from 'components/Atoms/ActionButtons';
import {useSelector} from 'react-redux';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {getPermissions, getShadow} from 'utils';
import {getFileName} from 'utils/constant';
import Header from '../../CommonComponents/Header';
import VehicleInfo from '../../DeliveryDetails/Components/VehicleInfo';
import DirectMaterialInfo from '../Components/DirectMaterialInfo';

const HeaderDetails = props => {
  const {challanInfo} = props;

  const {challan_number, delivery_date, company_name, supplier_name} =
    challanInfo || {};

  return (
    <>
      <View style={styles.row}>
        <View>
          <Caption>Challan No.</Caption>
          <Text>{challan_number}</Text>
        </View>
        <View>
          <Caption>Delivery Date</Caption>
          <Text>{delivery_date}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View>
          <Caption>Company Name</Caption>
          <Text>{company_name}</Text>
        </View>
        <View>
          <Caption>Supplier Name</Caption>
          <Text>{supplier_name}</Text>
        </View>
      </View>
    </>
  );
};

const Attachments = props => {
  const {damageImage = []} = props;

  const onPressFile = async challan_image => {
    const name = challan_image.split('/').pop();
  };

  return (
    <>
      <Subheading style={styles.challanHeading}>Challan Images</Subheading>
      <View style={styles.container}>
        <Text style={styles.attachmentsText}>Attachments</Text>

        {damageImage?.map((file, index) => {
          return (
            <TouchableOpacity
              style={styles.sectionContainer}
              onPress={() => onPressFile(file.challan_image)}>
              <Image source={FileIcon} style={styles.fileIcon} />
              <View>
                <Text
                  style={[styles.verticalFlex, styles.text]}
                  numberOfLines={2}>
                  {getFileName(file.image_url)}
                  {index + 1}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

const DirectGRNPreview = props => {
  const {route, navigation} = props;

  const {id} = route?.params || {};

  const {
    getDirectMaterialGRNDetails,
    deleteDirectMaterialGRN,
    getDirectMaterialGRNList,
    updateDirectGRNStatus,
  } = useMaterialManagementActions();

  const {selectedProject} = useSelector(s => s.project);
  const {directGRNDetails} = useSelector(s => s.materialManagement);
  const modulePermission = getPermissions('DirectGRNPreview');

  const {challan_status} = directGRNDetails?.challanInfo || {};

  const materialItem = directGRNDetails?.material_request_items;

  const {challanInfo} = directGRNDetails;

  const vehicleImage = directGRNDetails?.challan_material_damage_image;
  const invoiceImages = directGRNDetails?.challan_material_invoice_image;

  useEffect(() => {
    getLoadData();
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLoadData = () => {
    getDirectMaterialGRNDetails({
      project_id: selectedProject.id,
      grn_id: id,
    });
  };

  const getData = () => {
    getDirectMaterialGRNList({
      project_id: selectedProject.id,
    });
  };

  const updateStatus = async status => {
    const restData = {
      project_id: selectedProject.id,
      challan_id: id,
      status,
    };
    await updateDirectGRNStatus(restData);
    getLoadData();
  };

  const handleDelete = i => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: () => {
        deleteDirectMaterialGRN({
          challan_id: id,
          project_id: selectedProject.id,
        });
        getData();
        navigation.goBack();
      },
    });
  };

  const alert = useAlert();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Header title="GRN Preview" {...props} />
        {challan_status === 'rejected' ? (
          <View style={styles.statusContainer}>
            <MaterialIcons name="cancel" size={18} color="#FF5D5D" />
            <Text style={styles.rejectedStatus}>Rejected GRN</Text>
          </View>
        ) : challan_status === 'approved' ? (
          <View style={styles.checkIcon}>
            <MaterialIcons name="check-circle" size={18} color="#07CA03" />
            <Text style={styles.approvedStatus}>Approved GRN</Text>
          </View>
        ) : null}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.subheadingContainer}>
          <View style={{marginVertical: 10}}>
            <Subheading>Challan Info</Subheading>
          </View>
          <View style={styles.btnContainer}>
            <OpacityButton
              color="#4872f4"
              opacity={0.18}
              style={styles.btnRadius}
              onPress={() => alert.show('edit')}>
              <MaterialIcons name="edit" color="#4872f4" size={17} />
            </OpacityButton>
            <OpacityButton
              color="#FF5D5D"
              opacity={0.18}
              onPress={handleDelete}
              style={styles.btnRadius}>
              <MaterialIcons name="delete" color="#FF5D5D" size={17} />
            </OpacityButton>
          </View>
        </View>
        <View style={styles.detailContainer}>
          <HeaderDetails challanInfo={challanInfo} />
          {vehicleImage?.length ? (
            <Attachments damageImage={vehicleImage} />
          ) : null}
        </View>
        {materialItem?.length ? (
          <DirectMaterialInfo materialInfo={directGRNDetails} />
        ) : null}
        <VehicleInfo
          vehicleInfo={challanInfo}
          vehicleAttachments={vehicleImage}
          invoiceImages={invoiceImages}
        />
      </ScrollView>
      {modulePermission?.editor || modulePermission?.admin ? (
        challan_status === 'pending' ? (
          <ActionButtons
            cancelLabel="Reject"
            submitLabel="Approve"
            onCancel={() => updateStatus('rejected')}
            onSubmit={() => updateStatus('approved')}
          />
        ) : null
      ) : null}
    </View>
  );
};

export default DirectGRNPreview;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    flex: 1,
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subheadingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },

  detailContainer: {
    borderRadius: 10,
    backgroundColor: '#F2F4F5',
    ...getShadow(3),
    padding: 10,
  },
  btnContainer: {
    flexDirection: 'row',
  },
  btnRadius: {
    borderRadius: 20,
    marginHorizontal: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginTop: 10,
  },
  text: {
    marginLeft: 5,
  },
  container: {
    padding: 10,
    backgroundColor: '#F2F4F5',
    borderRadius: 5,
    margin: 10,
  },
  sectionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    display: 'flex',
    borderRadius: 5,
    marginVertical: 5,
  },
  fileIcon: {
    width: 32,
    height: 38,
    paddingLeft: 10,
    marginLeft: 10,
  },
  challanHeading: {
    padding: 10,
    marginTop: 10,
    paddingBottom: 0,
  },
  attachmentsText: {
    fontSize: 15,
    paddingBottom: 10,
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
});

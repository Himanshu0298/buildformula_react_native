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
import {getPermissions, getShadow} from 'utils';
import {getFileName} from 'utils/constant';
import FileViewer from 'react-native-file-viewer';
import {useDownload} from 'components/Atoms/Download';
import {theme} from 'styles/theme';
import dayjs from 'dayjs';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {getDownloadUrl} from 'utils/download';
import Header from '../../CommonComponents/Header';

import VehicleInfo from '../../DeliveryDetails/Components/VehicleInfo';
import DirectMaterialInfo from '../Components/DirectMaterialInfo';

const HeaderDetails = props => {
  const {challanInfo} = props;

  const {challan_number, delivery_date, company_name, supplier} =
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

          <Text>{dayjs(delivery_date).format('MMM D, YYYY , hh:mm a')}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View>
          <Caption>Company Name</Caption>
          <Text>{company_name}</Text>
        </View>
        <View>
          <Caption>Supplier Name</Caption>
          <Text>{supplier}</Text>
        </View>
      </View>
    </>
  );
};

const Attachments = props => {
  const {damageImage = []} = props;

  const download = useDownload();

  const onPressFile = async file => {
    const fileUrl = getDownloadUrl(file);
    const name = getFileName(file);

    download.link({
      name,
      link: fileUrl,
      showAction: false,
      onFinish: ({dir}) => {
        FileViewer.open(`file://${dir}`);
      },
    });
  };
  return (
    <>
      <Caption style={styles.challanHeading}>Challan Images</Caption>
      <View style={styles.container}>
        <Text style={styles.attachmentsText}>Attachments</Text>

        {damageImage?.map((file, index) => {
          return (
            <TouchableOpacity
              style={styles.sectionContainer}
              onPress={() => onPressFile(file.image_type)}>
              <Image source={FileIcon} style={styles.fileIcon} />
              <View>
                <Text
                  style={[styles.verticalFlex, styles.text]}
                  numberOfLines={2}>
                  {getFileName(file?.image_type)}
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

  const alert = useAlert();

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

  const handleDelete = () => {
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

  const navToEdit = () => {
    navigation.navigate('AddDirectGRN', {id});
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Header title="GRN Preview" {...props} />
        {challan_status === 'rejected' ? (
          <View style={styles.statusContainer}>
            <MaterialIcons name="cancel" size={18} color={theme.colors.error} />
            <Text style={styles.rejectedStatus}>Rejected GRN</Text>
          </View>
        ) : challan_status === 'approved' ? (
          <View style={styles.checkIcon}>
            <MaterialIcons
              name="check-circle"
              size={18}
              color={theme.colors.success}
            />
            <Text style={styles.approvedStatus}>Approved GRN</Text>
          </View>
        ) : null}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.subheadingContainer}>
          <View style={styles.challanHeader}>
            <Subheading>Challan Info</Subheading>
          </View>
          <View style={styles.btnContainer}>
            {challan_status === 'pending' ? (
              <OpacityButton
                color={theme.colors.primary}
                opacity={0.18}
                style={styles.btnRadius}
                onPress={navToEdit}>
                <MaterialIcons
                  name="edit"
                  color={theme.colors.primary}
                  size={15}
                />
              </OpacityButton>
            ) : null}

            <OpacityButton
              color={theme.colors.error}
              opacity={0.18}
              onPress={handleDelete}
              style={styles.btnRadius}>
              <MaterialIcons name="delete" color={theme.colors.red} size={15} />
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
    ...getShadow(3),
    borderRadius: 5,
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
    paddingBottom: 5,
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
  challanHeader: {
    marginVertical: 10,
  },
});

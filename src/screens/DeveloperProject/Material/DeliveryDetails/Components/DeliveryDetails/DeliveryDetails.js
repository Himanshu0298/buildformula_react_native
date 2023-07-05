import * as React from 'react';
import {Subheading, Text, withTheme} from 'react-native-paper';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import FileIcon from 'assets/images/file_icon.png';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import ReactNativeBlobUtil from 'react-native-blob-util';
import MaterialInfo from '../MaterialInfo';
import VehicleInfo from '../VehicleInfo';
import Header from '../../../CommonComponents/Header';

const Attachments = props => {
  const {challanImages = []} = props;

  const downloadFile = image => {
    const imgUrl = image.challan_image;
    const newImgUri = imgUrl.lastIndexOf('/');
    const imageName = imgUrl.substring(newImgUri);
    const {dirs} = ReactNativeBlobUtil.fs;
    const path =
      Platform.OS === 'ios'
        ? dirs.DocumentDir + imageName
        : dirs.DownloadDir + imageName;
    ReactNativeBlobUtil.config({
      fileCache: true,
      appendExt: 'jpeg',
      indicator: true,
      IOSBackgroundTask: true,
      path,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path,
        description: 'Image',
      },
    })
      .fetch('GET', imgUrl)
      .then(res => {
        if (Platform.OS === 'ios') {
          ReactNativeBlobUtil.ios.previewDocument(path);
          // eslint-disable-next-line no-console
          console.log(res, 'end downloaded');
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.attachmentsText}>Attachments</Text>
      {challanImages?.length
        ? challanImages?.map((file, index) => {
            return (
              <TouchableOpacity
                style={styles.sectionContainer}
                onPress={() => downloadFile(file)}>
                <Image source={FileIcon} style={styles.fileIcon} />
                <View>
                  <Text
                    style={[styles.verticalFlex, styles.text]}
                    numberOfLines={2}>
                    Challan Image {index + 1}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        : null}
    </View>
  );
};

const DeliverDetails = props => {
  const {route} = props;
  const {item, orderNumber} = route?.params || {};

  const {challan_number: challanNumber, id: deliveryChallanId} = item;

  const {getMaterialChallanDetails} = useMaterialManagementActions();

  const {selectedProject} = useSelector(s => s.project);
  const {materialChallanDetails, loading} = useSelector(
    s => s.materialManagement,
  );
  const {
    challan_images = [],
    challan_info,
    materila_info,
    vehicle_images,
  } = materialChallanDetails || {};

  React.useEffect(() => {
    getMaterialChallanDetails({
      project_id: selectedProject.id,
      material_order_no: orderNumber,
      material_delivery_challan_id: deliveryChallanId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.mainContainer}>
      <Header title={`Challan No. : ${challanNumber}`} {...props} />

      <Spinner visible={loading} textContent="" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* {challan_images?.length ? (
          <View>
            <Subheading style={styles.challanHeading}>
              Challan Images
            </Subheading>
            <Attachments challanImages={challan_images} />
          </View>
        ) : null} */}
        <View>
          {challan_images?.length ? (
            <>
              <View style={styles.headerWrap}>
                <Subheading style={styles.challanHeading}>
                  Challan Images
                </Subheading>
              </View>
              <Attachments challanImages={challan_images} />
            </>
          ) : null}
        </View>
        <MaterialInfo materialInfo={materila_info} />
        <VehicleInfo
          vehicleInfo={challan_info}
          vehicleAttachments={vehicle_images}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginLeft: 5,
  },
  container: {
    padding: 10,
    backgroundColor: '#F2F4F5',
    borderRadius: 5,
    margin: 10,
  },
  mainContainer: {
    paddingHorizontal: 10,
    flex: 1,
  },
  sectionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    display: 'flex',
    borderRadius: 5,
  },
  fileIcon: {
    width: 32,
    height: 38,
    paddingLeft: 10,
    marginLeft: 10,
  },
  challanHeading: {
    padding: 10,
  },
  attachmentsText: {
    fontSize: 15,
    paddingBottom: 10,
  },
  headerWrap: {
    flexDirection: 'row',
  },
});

export default withTheme(DeliverDetails);

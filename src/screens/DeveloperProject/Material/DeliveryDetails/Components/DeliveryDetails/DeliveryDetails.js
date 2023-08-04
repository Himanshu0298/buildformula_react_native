import * as React from 'react';
import {Subheading, Text, withTheme} from 'react-native-paper';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import FileViewer from 'react-native-file-viewer';
import FileIcon from 'assets/images/file_icon.png';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';

import {useDownload} from 'components/Atoms/Download';
import {getFileName} from 'utils/constant';
import MaterialInfo from '../MaterialInfo';
import VehicleInfo from '../VehicleInfo';
import Header from '../../../CommonComponents/Header';

const Attachments = props => {
  const {challanImages = [], projectId} = props;

  const download = useDownload();

  const onPressFile = async fileUrl => {
    download.link({
      name: getFileName(fileUrl.challan_image),

      data: {project_id: projectId, file_url: fileUrl.challan_image},
      showAction: false,
      onFinish: ({dir}) => {
        FileViewer.open(`file://${dir}`);
      },
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
                onPress={() => onPressFile(file)}>
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

  const {
    challan_number: challanNumber,
    id: deliveryChallanId,
    delivery_date,
  } = item;

  const {getMaterialChallanDetails} = useMaterialManagementActions();

  const {selectedProject} = useSelector(s => s.project);
  const {materialChallanDetails, loading} = useSelector(
    s => s.materialManagement,
  );

  const projectId = selectedProject.id;
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
      <Subheading style={{marginVertical: 5, marginLeft: 10}}>
        Delivery Date: {delivery_date}
      </Subheading>
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
              <Attachments
                challanImages={challan_images}
                projectId={projectId}
              />
            </>
          ) : null}
        </View>
        <MaterialInfo materialInfo={materila_info} projectId={projectId} />
        <VehicleInfo
          vehicleInfo={challan_info}
          vehicleAttachments={vehicle_images}
          projectId={projectId}
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

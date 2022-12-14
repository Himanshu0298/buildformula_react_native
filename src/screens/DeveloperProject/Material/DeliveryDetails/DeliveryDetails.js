import * as React from 'react';
import {IconButton, Subheading, Text, withTheme} from 'react-native-paper';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FileIcon from 'assets/images/file_icon.png';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {useSelector} from 'react-redux';
import NoResult from 'components/Atoms/NoResult';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDownload} from 'components/Atoms/Download';
import FileViewer from 'react-native-file-viewer';
import MaterialInfo from './Components/MaterialInfo';
import VehicleInfo from './Components/VehicleInfo';

const Attachments = props => {
  const {challanImages = []} = props;

  const download = useDownload();

  const onPressFile = async fileUrl => {
    const name = fileUrl.split('/').pop();

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
    <View style={styles.container}>
      <Text style={styles.attachmentsText}>Attachments</Text>
      {challanImages?.length ? (
        challanImages?.map((file, index) => {
          return (
            <TouchableOpacity
              style={styles.sectionContainer}
              onPress={() => onPressFile(file.challan_image)}>
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
      ) : (
        <NoResult />
      )}
    </View>
  );
};

const DeliverDetails = props => {
  const {route, navigation} = props;
  const {item, orderNumber} = route?.params || {};
  const {id: challanId, challan_number: challanNumber} = item;

  const {getMaterialChallanDetails} = useMaterialManagementActions();

  const {selectedProject} = useSelector(s => s.project);
  const {materialChallanDetails, loading} = useSelector(
    s => s.materialManagement,
  );
  const {challan_images, challan_info, materila_info, vehicle_images} =
    materialChallanDetails || {};

  React.useEffect(() => {
    getMaterialChallanDetails({
      project_id: selectedProject.id,
      material_order_no: orderNumber,
      material_delivery_challan_id: challanId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.mainContainer}>
      <Spinner visible={loading} textContent="" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.headerWrap}>
            <View style={styles.BackBTNContainer}>
              <OpacityButton
                opacity={0.18}
                style={styles.button}
                onPress={() => navigation.goBack()}>
                <MaterialCommunityIcons name="arrow-left" size={18} />
              </OpacityButton>
            </View>
            <Subheading style={styles.challanHeading}>
              Challan Images
            </Subheading>
          </View>
          <Attachments challanImages={challan_images} />
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
  button: {
    marginRight: 3,
    borderRadius: 20,
  },
  headerWrap: {
    flexDirection: 'row',
  },
  BackBTNContainer: {
    alignSelf: 'center',
  },
});

export default withTheme(DeliverDetails);

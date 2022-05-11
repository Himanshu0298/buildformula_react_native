import * as React from 'react';
import {Subheading, Text, withTheme} from 'react-native-paper';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import FileIcon from 'assets/images/file_icon.png';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {useSelector} from 'react-redux';
import NoResult from 'components/Atoms/NoResult';
import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../CommonComponents/Header';
import MaterialInfo from './Components/MaterialInfo';
import VehicleInfo from './Components/VehicleInfo';

const Attachments = props => {
  const {challanImages = []} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.attachmentsText}>Attachments</Text>
      {challanImages?.length ? (
        challanImages?.map((item, index) => {
          return (
            <TouchableOpacity
              style={styles.sectionContainer}
              // onPress={() => onPressFile(file)}
            >
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
  const {route} = props;
  const {item, orderNumber} = route?.params || {};
  const {id: challanId, challan_number: challanNumber} = item;

  const {getMaterialChallanDetails} = useMaterialManagementActions();

  const {selectedProject} = useSelector(s => s.project);
  const {materialChallanDetails, loading} = useSelector(
    s => s.materialManagement,
  );
  const {challan_images, challan_info, materila_info} =
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
      <Header title={`Challan No: ${challanNumber}`} {...props} />
      <Spinner visible={loading} textContent="" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Subheading style={styles.challanHeading}>Challan Images</Subheading>
          <Attachments challanImages={challan_images} />
        </View>
        <MaterialInfo materialInfo={materila_info} />
        <VehicleInfo vehicleInfo={challan_info} />
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
});

export default withTheme(DeliverDetails);

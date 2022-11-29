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
import NoResult from 'components/Atoms/NoResult';
import FileIcon from 'assets/images/file_icon.png';
import Spinner from 'react-native-loading-spinner-overlay';
import ActionButtons from 'components/Atoms/ActionButtons';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {useSelector} from 'react-redux';
import Header from '../../CommonComponents/Header';
import MaterialInfo from '../../DeliveryDetails/Components/MaterialInfo';
import VehicleInfo from '../../DeliveryDetails/Components/VehicleInfo';

const HeaderDetails = props => {
  const {directGRNDetails} = props;

  return (
    <>
      <View style={styles.row}>
        <View>
          <Caption>Challan No.</Caption>
          <Text>MM-01-MM-5151</Text>
        </View>
        <View>
          <Caption>Delivery Date</Caption>
          <Text>12 Jun, 2022</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View>
          <Caption>Company Name</Caption>
          <Text>Jai Shree Ram</Text>
        </View>
        <View>
          <Caption>Supplier Name</Caption>
          <Text>Hiren Jaisurwal</Text>
        </View>
      </View>
    </>
  );
};

const Attachments = props => {
  const {challanImages = []} = props;

  const onPressFile = async fileUrl => {
    const name = fileUrl.split('/').pop();
  };

  return (
    <>
      <Subheading style={styles.challanHeading}>Challan Images</Subheading>
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
    </>
  );
};

const challan_image = props => {
  return (
    <View style={styles.mainContainer}>
      <Header title="Challan No: 123" {...props} />
      {/* <Spinner visible={loading} textContent="" /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Subheading style={styles.challanHeading}>Challan Images</Subheading>
          <Attachments />
        </View>
      </ScrollView>
    </View>
  );
};

const DirectGRNPreview = props => {
  const {route, navigation} = props;

  const {id} = route?.params || {};

  const {getDirectMaterialGRNDetails} = useMaterialManagementActions();

  const {selectedProject} = useSelector(s => s.project);
  const {directGRNDetails} = useSelector(s => s.materialManagement);

  console.log('===========>challan info ', directGRNDetails.challan_info);

  console.log('===========>directGRNDetails ', directGRNDetails);

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCategories = () => {
    getDirectMaterialGRNDetails({
      project_id: selectedProject.id,
      grn_id: id,
    });
  };

  const alert = useAlert();
  return (
    <View style={styles.mainContainer}>
      <Header title="GRN Preview" {...props} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.subheadingContainer}>
          <Subheading>Challan Info</Subheading>
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
              onPress={() => {
                alert.show({
                  title: 'Alert',
                  message: 'Are you sure want to delete this?',
                  dismissable: false,
                });
              }}
              style={styles.btnRadius}>
              <MaterialIcons name="delete" color="#FF5D5D" size={17} />
            </OpacityButton>
          </View>
        </View>
        <HeaderDetails directGRNDetails={directGRNDetails} />
        <Attachments />
        <MaterialInfo />
        <VehicleInfo />
      </ScrollView>
      <ActionButtons
        cancelLabel="Reject"
        submitLabel="Approve"
        onCancel={() => alert.show({title: 'Reject', message: 'Reject'})}
        onSubmit={() => alert.show({title: 'Approve', message: 'Approved'})}
      />
    </View>
  );
};

export default DirectGRNPreview;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    flex: 1,
  },
  subheadingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
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
});

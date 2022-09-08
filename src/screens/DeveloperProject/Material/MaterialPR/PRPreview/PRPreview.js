import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import {IconButton, Caption} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import ActionButtons from 'components/Atoms/ActionButtons';
import {useAlert} from 'components/Atoms/Alert';
import {useSelector} from 'react-redux';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {ScrollView} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';

const {height} = Dimensions.get('window');

const dynamicHeight = height - 245;

const PRPreview = props => {
  const {navigation, route} = props;
  const {purchase_request_id, prStatus} = route?.params || {};
  const alert = useAlert();

  const {selectedProject} = useSelector(s => s.project);
  const project_id = selectedProject.id;

  const {getMaterialPRDetails} = useMaterialManagementActions();

  const {prDetails, loading} = useSelector(s => s.materialManagement);

  const {
    record_data = {},
    material_request_items = {},
    required_for_data = [],
  } = prDetails[0] || {};

  useEffect(() => {
    getMaterialPRDetails({project_id, purchase_request_id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [status, setStatus] = useState();

  const materialIndex = Object.keys(material_request_items);

  const prHeader = () => (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={styles.dataRow}>
          <Caption style={styles.lightData}>PR ID:</Caption>
          <Text>{record_data.id}</Text>
        </View>
        {status === 'PR Rejected' ? (
          <View style={{alignSelf: 'center', flexDirection: 'row'}}>
            <MaterialIcons name="cancel" size={18} color="#FF5D5D" />
            <Text
              style={{
                color: '#FF5D5D',
                marginLeft: 5,
              }}>
              PR Rejected
            </Text>
          </View>
        ) : status === 'PR Approved' ? (
          <View style={{alignSelf: 'center', flexDirection: 'row'}}>
            <MaterialIcons name="check-circle" size={18} color="#07CA03" />
            <Text
              style={{
                color: '#07CA03',
                marginLeft: 5,
              }}>
              PR Approved
            </Text>
          </View>
        ) : null}
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Subject:</Caption>
        <Text>{record_data.subject}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Required Vendor:</Caption>
        <Text>{record_data.contractor_name}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Required For:</Caption>
        <Text style={{flexShrink: 1}}>{required_for_data}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Remark:</Caption>
        <Text style={{flexShrink: 1}}>{record_data.remarks}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Creater Name:</Caption>
        <Text>{`${record_data.first_name} ${record_data.last_name}`}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Created on:</Caption>
        <Text>{record_data.created}</Text>
      </View>
    </>
  );

  const prMaterial = item => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <View style={styles.dataRow}>
            <Caption style={styles.lightData}>Category:</Caption>
            <Text>{item.materialcategrytitle}</Text>
          </View>
        </View>
        <View style={styles.dataRow}>
          <Caption style={styles.lightData}>Sub Category:</Caption>
          <Text>{item.subcategorytitle}</Text>
        </View>
        <View style={styles.dataRow}>
          <Caption style={styles.lightData}>Unit:</Caption>
          <Text>{item.materialunitstitle}</Text>
        </View>
        <View style={styles.dataRow}>
          <Caption style={styles.lightData}>Required date:</Caption>
          <Text>{item.created}</Text>
        </View>
        <View style={styles.dataRow}>
          <Caption style={styles.lightData}>Quantity:</Caption>
          <Text>{item.material_quantity}</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <ProjectHeader {...props} />
      <Spinner visible={loading} textContent="" />
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <IconButton
              icon="keyboard-backspace"
              size={22}
              color="#4872f4"
              style={{backgroundColor: 'rgba(72, 114, 244, 0.1)'}}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerText}>PR Preview</Text>
          </View>
          <View
            style={{flexDirection: 'row', marginEnd: 10, alignSelf: 'center'}}>
            {prStatus === 1 ? (
              <View style={{marginRight: 15}}>
                <OpacityButton
                  color="#4872f4"
                  opacity={0.18}
                  style={{borderRadius: 20, marginLeft: 15}}
                  onPress={() => {
                    navigation.navigate('CreatePR');
                  }}>
                  <MaterialIcons name="edit" color="#4872f4" size={13} />
                </OpacityButton>
              </View>
            ) : null}
            <View>
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
                style={{borderRadius: 20}}>
                <MaterialIcons name="delete" color="#FF5D5D" size={13} />
              </OpacityButton>
            </View>
          </View>
        </View>
        <View style={styles.bodyContent}>
          <ScrollView
            style={styles.materialListContainer}
            showsVerticalScrollIndicator={false}>
            {prHeader()}
            {materialIndex.map(key => {
              const subCat = material_request_items[key];
              return (
                <>
                  {subCat.map(item => {
                    return prMaterial(item);
                  })}
                </>
              );
            })}
          </ScrollView>
          {status == null ? (
            <ActionButtons
              cancelLabel="Reject"
              submitLabel="Approve"
              onCancel={() => setStatus('PR Rejected')}
              onSubmit={() => setStatus('PR Approved')}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default PRPreview;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 21,
    fontWeight: '400',
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
  materialListContainer: {
    marginTop: 10,
    height: dynamicHeight,
  },
  cardContainer: {
    marginVertical: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

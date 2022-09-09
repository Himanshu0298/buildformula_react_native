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
import {getShadow} from 'utils';

const {height} = Dimensions.get('window');

const dynamicHeight = height - 245;

function RenderHeaderBar(props) {
  console.log(
    '🚀 ~ file: PRPreview.js ~ line 20 ~ RenderHeaderBar ~ props',
    props,
  );
  const alert = useAlert();
  const {goBack, NavigatetoCreatePR, status} = props;
  return (
    <View style={styles.headerContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <IconButton
          icon="keyboard-backspace"
          size={22}
          color="#4872f4"
          style={{backgroundColor: 'rgba(72, 114, 244, 0.1)'}}
          onPress={() => goBack()}
        />
        <Text style={styles.headerText}>PR Preview</Text>
      </View>
      <View style={{flexDirection: 'row', marginEnd: 10, alignSelf: 'center'}}>
        {status == null ? (
          <View style={{marginRight: 15}}>
            <OpacityButton
              color="#4872f4"
              opacity={0.18}
              style={{borderRadius: 20, marginLeft: 15}}
              onPress={NavigatetoCreatePR}>
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
  );
}

function RenderPRHeaderCard(props) {
  const {
    id,
    subject,
    contractor_name,
    required_for_data,
    remarks,
    first_name,
    last_name,
    created,
    status,
  } = props;
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={styles.dataRow}>
          <Caption style={styles.lightData}>PR ID:</Caption>
          <Text>{id}</Text>
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
        <Text>{subject}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Required Vendor:</Caption>
        <Text>{contractor_name}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Required For:</Caption>
        <Text style={{flexShrink: 1}}>{required_for_data}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Remark:</Caption>
        <Text style={{flexShrink: 1}}>{remarks}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Creater Name:</Caption>
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
  const {
    materialcategrytitle,
    subcategorytitle,
    materialunitstitle,
    created,
    material_quantity,
  } = props;
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
  const goBack = () => {
    navigation.goBack();
  };

  const NavigatetoCreatePR = () => {
    navigation.navigate('CreatePR');
  };

  const {purchase_request_id} = route?.params || {};

  const {selectedProject} = useSelector(s => s.project);
  const {prDetails, loading} = useSelector(s => s.materialManagement);
  const project_id = selectedProject.id;

  const {getMaterialPRDetails} = useMaterialManagementActions();

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

  return (
    <View>
      <ProjectHeader {...props} />
      <Spinner visible={loading} textContent="" />
      <View style={styles.mainContainer}>
        <RenderHeaderBar
          goBack={goBack}
          NavigatetoCreatePR={NavigatetoCreatePR}
          {...status}
        />
        <View style={styles.bodyContent}>
          <ScrollView
            style={styles.materialListContainer}
            showsVerticalScrollIndicator={false}>
            <RenderPRHeaderCard
              {...record_data}
              {...required_for_data}
              {...status}
            />
            {materialIndex.map(key => {
              const subCat = material_request_items[key];
              return (
                <>
                  {subCat.map(item => {
                    return <RenderMaterialCard {...item} />;
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
    ...getShadow(2),
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

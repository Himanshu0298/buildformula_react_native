import {StyleSheet, View, SafeAreaView, Dimensions} from 'react-native';
import React from 'react';
import {Caption, Text} from 'react-native-paper';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAlert} from 'components/Atoms/Alert';
import {
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import ActionButtons from 'components/Atoms/ActionButtons';
import {getShadow} from 'utils';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {useSelector} from 'react-redux';
import NoResult from 'components/Atoms/NoResult';

function CardListing(props) {
  const {navigation, item} = props;

  const {
    materialcategrytitle,
    subcategorytitle,
    materialunitstitle,
    material_dates,
    material_quantity,
  } = item;
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View style={styles.dataRow}>
          <Caption style={styles.lightData}>Category:</Caption>
          <Text>{materialcategrytitle}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.editButton}>
            <OpacityButton
              color="#4872f4"
              opacity={0.18}
              style={styles.OpacityButton}
              onPress={() => {
                navigation.navigate('CreatePRMaterial');
              }}>
              <MaterialIcons name="edit" color="#4872f4" size={13} />
            </OpacityButton>
          </View>
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
              style={styles.deleteButton}>
              <MaterialIcons name="delete" color="#FF5D5D" size={13} />
            </OpacityButton>
          </View>
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
        <Text>{material_dates}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Quantity:</Caption>
        <Text>{material_quantity}</Text>
      </View>
    </View>
  );
}

const {height} = Dimensions.get('window');

const dynamicHeight = height - 250;

const AddMaterialList = props => {
  const {navigation, route} = props;
  const {id} = route?.params || {};

  const {getPRMaterialDetails} = useMaterialManagementActions();

  const {materialRequestItems, loadData} = useSelector(
    s => s.materialManagement,
  );
  const {selectedProject} = useSelector(s => s.project);

  React.useEffect(() => {
    getPRMaterialDetails({
      project_id: selectedProject.id,
      purchase_request_id: id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const reloadOrders = () => {
    getPRMaterialDetails({project_id: selectedProject.id});
  };

  const renderEmpty = () => <NoResult />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Add Material</Text>
        </View>
        <View style={styles.bodyContent}>
          <TouchableOpacity
            style={styles.btnAddMore}
            onPress={() => navigation.navigate('CreatePRMaterial')}>
            <MaterialIcons name="add" color="#4872f4" size={17} />
            <Text style={styles.add}>Add Material</Text>
          </TouchableOpacity>
          <FlatList
            data={materialRequestItems}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={reloadOrders} />
            }
            ListEmptyComponent={renderEmpty}
            renderItem={({item}) => {
              return <CardListing {...props} item={item} />;
            }}
          />
        </View>

        <View>
          <ActionButtons
            cancelLabel="Previous"
            submitLabel="Save"
            onCancel={navigation.goBack}
            onSubmit={() => navigation.navigate('PRPreview')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddMaterialList;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    margin: 10,
  },
  mainContainer: {
    margin: 10,
  },
  headerText: {
    fontSize: 18,
  },

  editButton: {
    marginRight: 10,
  },

  deleteButton: {
    borderRadius: 20,
  },

  bodyContent: {
    marginVertical: 10,
    height: dynamicHeight,
  },
  cardContainer: {
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 12,
    ...getShadow(2),
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lightData: {
    fontSize: 13,
  },
  btnAddMore: {
    borderWidth: 0.4,
    borderColor: 'rgba(72, 114, 244, 1)',
    color: 'blue',
    padding: 19,
    marginTop: 15,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  OpacityButton: {
    borderRadius: 20,
    marginLeft: 10,
  },
  add: {
    color: '#4872f4',
  },
});

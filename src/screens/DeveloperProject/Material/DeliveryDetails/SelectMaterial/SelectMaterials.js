import ActionButtons from 'components/Atoms/ActionButtons';
import CustomCheckbox from 'components/Atoms/CustomCheckbox';
import NoResult from 'components/Atoms/NoResult';
import {useSnackbar} from 'components/Atoms/Snackbar';
import React, {useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Subheading, withTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {theme} from 'styles/theme';

const HeaderTitle = () => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titles}>Catergory</Text>
      <Text style={styles.titles}>Sub Category</Text>
      <Text style={styles.titles}>{'    '}Unit</Text>
    </View>
  );
};

const MaterialData = props => {
  const {item, selectedMaterial, materialHandle} = props;

  return (
    <View style={styles.valuesContainer}>
      <CustomCheckbox
        {...props}
        checked={selectedMaterial.includes(item.id)}
        onChange={() => materialHandle(item.id)}
      />
      <Text style={styles.values}>{item.category_title}</Text>
      <Text style={styles.values}>{item.subcategory_title}</Text>
      <Text style={styles.values}>{item.unit_title}</Text>
    </View>
  );
};

function SelectMaterials(props) {
  const {navigation, route} = props;
  const {materialId} = route?.params || {};

  const snackbar = useSnackbar();
  const {getSelectMaterialChallan} = useMaterialManagementActions();

  const {selectedMaterialChallan, loading} = useSelector(
    s => s.materialManagement,
  );

  const {selectedProject} = useSelector(s => s.project);

  const [selectedMaterial, setSelectedMaterial] = useState([]);

  React.useEffect(() => {
    getSelectMaterialChallan({
      project_id: selectedProject.id,
      material_request_id: materialId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const materialHandle = id => {
    const _selectedMaterial = [...selectedMaterial];
    const index = selectedMaterial.indexOf(id);

    if (index === -1) {
      _selectedMaterial.push(id);
    } else {
      _selectedMaterial.splice(index, 1);
    }
    setSelectedMaterial(_selectedMaterial);
  };

  const navToStepThree = () => {
    if (!selectedMaterial.length) {
      snackbar.showMessage({
        message: 'Please select material to proceed',
        variant: 'warning',
      });

      return;
    }
    navigation.navigate('AddMaterialInfo', {
      selectedMaterial,
      ...route.params,
    });
  };

  const reloadOrders = () => {
    getSelectMaterialChallan({
      project_id: selectedProject.id,
      material_request_id: materialId,
    });
  };

  const renderEmpty = () => <NoResult />;

  return (
    <View style={styles.actionContainer}>
      <Subheading style={styles.subHeading}>
        Select materials which is right now
      </Subheading>
      <HeaderTitle />
      <Spinner visible={loading} textContent="" />
      <FlatList
        data={selectedMaterialChallan}
        extraData={selectedMaterialChallan}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={reloadOrders} />
        }
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        ListEmptyComponent={renderEmpty}
        renderItem={({item}) => {
          return (
            <MaterialData
              {...props}
              item={item}
              selectedMaterial={selectedMaterial}
              materialHandle={materialHandle}
            />
          );
        }}
      />
      <ActionButtons
        style={styles.actionButton}
        onSubmit={navToStepThree}
        submitLabel="Select"
        onCancel={navigation.goBack}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    marginTop: 25,
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 32,
    marginTop: 10,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  titles: {
    flex: 1,
    color: theme.colors.primary,
    marginLeft: 15,
  },
  valuesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },
  values: {
    flex: 1,
    marginLeft: 15,
  },
  subHeading: {
    marginLeft: 20,
  },
  actionButton: {
    marginRight: 10,
  },
});

export default withTheme(SelectMaterials);

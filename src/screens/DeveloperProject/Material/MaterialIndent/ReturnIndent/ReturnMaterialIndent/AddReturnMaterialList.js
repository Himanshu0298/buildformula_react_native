import {StyleSheet, View, SafeAreaView, Modal, ScrollView} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {Button, Caption, Subheading, Text} from 'react-native-paper';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAlert} from 'components/Atoms/Alert';
import ActionButtons from 'components/Atoms/ActionButtons';
import {getShadow} from 'utils';
import {useSelector} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import {theme} from 'styles/theme';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';

function AddMaterialDialog(props) {
  const {formikProps, handleClose, edit} = props;

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = formikProps;

  const {materialCategories, materialSubCategories} = useSelector(
    s => s.materialManagement,
  );

  const categoryOptions = useMemo(() => {
    return materialCategories?.map(i => ({
      label: `${i.title}`,
      value: i.id,
    }));
  }, [materialCategories]);

  const subCategoryOptions = useMemo(() => {
    return materialSubCategories
      ?.filter(i => i.category_id === values.material_category_id)
      ?.map(i => ({label: `${i.title}`, value: i.id}));
  }, [materialSubCategories, values.material_category_id]);

  const handleSubMaterialChange = value => {
    setFieldValue('material_sub_category_id', value);
    const unitId = materialSubCategories.find(i => i.id === value)?.unit_id;
    if (unitId) {
      setFieldValue('material_units_id', unitId);
    }
  };

  return (
    <Modal {...props} onBackdropPress={handleClose}>
      <SafeAreaProvider>
        <SafeAreaView edges={['top']} style={{flexGrow: 1}}>
          <View style={styles.formContainer}>
            <View style={styles.formSubContainer}>
              <Subheading>{edit ? 'Edit Material' : 'Add Material'}</Subheading>

              <RenderSelect
                name="material_category_id"
                label="Category"
                options={categoryOptions}
                value={values.material_category_id}
                containerStyles={styles.inputStyles}
                onBlur={handleBlur('material_category_id')}
                onSelect={value => {
                  setFieldValue('material_category_id', value);
                }}
              />

              <RenderSelect
                name="material_sub_category_id"
                label="Sub Category"
                options={subCategoryOptions}
                value={values.material_sub_category_id}
                containerStyles={styles.inputStyles}
                onBlur={handleBlur('material_sub_category_id')}
                onSelect={handleSubMaterialChange}
              />

              <RenderInput
                name="quantity"
                label=" Fine Qty"
                containerStyles={styles.inputStyles}
                maxLength={10}
                value={values.quantity}
                onChangeText={handleChange('quantity')}
                onBlur={handleBlur('quantity')}
                autoCapitalize="none"
                returnKeyType="next"
                error={errors.quantity}
              />
              <RenderInput
                name="damaged_qty"
                label="Damaged Qty"
                containerStyles={styles.inputStyles}
                maxLength={10}
                value={values.damaged_qty}
                onChangeText={handleChange('damaged_qty')}
                onBlur={handleBlur('damaged_qty')}
                autoCapitalize="none"
                returnKeyType="next"
                error={errors.damaged_qty}
              />
            </View>
            <ActionButtons
              cancelLabel="Cancel"
              submitLabel={edit ? ' Update' : 'Save'}
              onCancel={handleClose}
              onSubmit={handleSubmit}
            />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
}

function MaterialList(props) {
  const {item, handleDelete, toggleEditDialog, index} = props;

  const {damaged_qty, materialcategrytitle, subcategorytitle, quantity} = item;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View style={styles.dataRow}>
          <Caption style={styles.lightData}>Category:</Caption>
          <Text>{materialcategrytitle}</Text>
        </View>
        <View style={styles.subContainer}>
          <View style={styles.buttonContainer}>
            <OpacityButton
              color={theme.colors.primary}
              opacity={0.18}
              style={styles.opacity}
              onPress={() => toggleEditDialog(item)}>
              <MaterialIcons
                name="edit"
                color={theme.colors.primary}
                size={13}
              />
            </OpacityButton>
          </View>
          <View>
            <OpacityButton
              color={theme.colors.error}
              opacity={0.18}
              onPress={() => handleDelete(index)}
              style={styles.deleteButton}>
              <MaterialIcons
                name="delete"
                color={theme.colors.error}
                size={13}
              />
            </OpacityButton>
          </View>
        </View>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Sub Category:</Caption>
        <Text>{subcategorytitle}</Text>
      </View>

      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Fine Quantity:</Caption>
        <Text>{quantity}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Damage:</Caption>
        <Text>{damaged_qty}</Text>
      </View>
    </View>
  );
}

function AddReturnMaterialList(props) {
  const {navigation, route} = props;

  const {id, edit} = route?.params || {};

  const alert = useAlert();

  const [addDialog, setAddDialog] = React.useState(false);
  const [selectedMaterial, setSelectedMaterial] = React.useState();

  const [materials, setMaterials] = React.useState(materialsList || []);

  const {addReturnMaterial, getIndentDetails, getPRMaterialCategories} =
    useMaterialManagementActions();

  const {selectedProject} = useSelector(s => s.project);
  const projectId = selectedProject.id;

  const {indentDetails} = useSelector(s => s.materialManagement);

  const materialsList = indentDetails?.material_indent_details;

  useEffect(() => {
    getPRMaterialCategories({project_id: projectId});
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDetails = () =>
    getIndentDetails({
      project_id: selectedProject.id,
      material_indent_id: id,
    });

  const initialValues = useMemo(() => {
    if (selectedMaterial) {
      const {
        material_category_id,
        material_sub_category_id,
        quantity,
        damaged_qty,
      } = selectedMaterial;

      return {
        material_category_id,
        material_sub_category_id,
        quantity,
        damaged_qty,
      };
    }
    return {};
  }, [selectedMaterial]);

  const handleSave = async values => {
    const restData = {
      project_id: projectId,
      material_indent_id: id,
      material_category_id: values.material_category_id,
      material_sub_category_id: values.material_sub_category_id,
      damaged_qty: values.damaged_qty,
      quantity: values.quantity,
    };
    await addReturnMaterial(restData);
    getDetails();
    toggleAddDialog();
  };

  const editDialog = item => {
    setSelectedMaterial(item);
    toggleAddDialog();
  };

  const toggleAddDialog = () => setAddDialog(v => !v);

  const navToPreview = () => navigation.navigate('AddAttachments', {id, edit});

  const handleDelete = index => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: () => {
        const _materials = [...materials];
        _materials?.splice(index, 1);
        setMaterials(_materials);
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.bodyContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            {edit ? 'Edit Material' : 'Add Material'}
          </Text>
        </View>
        <View style={styles.button}>
          <Button
            icon="plus"
            mode="outlined"
            onPress={toggleAddDialog}
            contentStyle={styles.addButton}>
            Add Material
          </Button>
        </View>

        <View style={styles.listContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {materialsList?.map((item, index) => {
              return (
                <MaterialList
                  key={item.id.toString()}
                  item={item}
                  index={index}
                  toggleEditDialog={editDialog}
                  handleDelete={handleDelete}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
      <ActionButtons
        cancelLabel="Previous"
        submitLabel={edit ? 'Update' : 'Next'}
        onCancel={navigation.goBack}
        onSubmit={navToPreview}
      />

      {addDialog ? (
        <Formik
          enableReinitialize
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={initialValues}
          onSubmit={handleSave}>
          {formikProps => (
            <AddMaterialDialog
              visible={addDialog}
              handleClose={toggleAddDialog}
              formikProps={formikProps}
              edit={edit}
            />
          )}
        </Formik>
      ) : null}
    </View>
  );
}

export default AddReturnMaterialList;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    margin: 10,
  },
  headerText: {
    fontSize: 18,
  },
  deleteButton: {
    borderRadius: 20,
  },
  bodyContent: {
    flexGrow: 1,
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lightData: {
    fontSize: 13,
  },

  subContainer: {
    flexDirection: 'row',
  },

  opacity: {
    borderRadius: 20,
    marginLeft: 10,
  },
  buttonContainer: {
    marginRight: 10,
  },

  formContainer: {
    flexGrow: 1,
    margin: 10,
  },
  formSubContainer: {
    flexGrow: 1,
  },

  inputStyles: {
    marginVertical: 8,
  },
  addButton: {
    paddingVertical: 10,
    borderColor: '#4872f4',
  },
  headerContainer: {margin: 10},

  button: {
    marginVertical: 10,
  },

  listContainer: {
    flexGrow: 1,
    flex: 1,
  },
});

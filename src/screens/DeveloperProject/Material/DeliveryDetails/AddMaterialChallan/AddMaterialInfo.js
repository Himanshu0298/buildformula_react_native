import React, {useMemo} from 'react';
import {Formik} from 'formik';
import {Divider, Subheading, withTheme} from 'react-native-paper';
import {Image, StyleSheet, Text, View} from 'react-native';
import * as Yup from 'yup';
import RenderInput, {RenderError} from 'components/Atoms/RenderInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {theme} from 'styles/theme';
import FileIcon from 'assets/images/file_icon.png';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useImagePicker} from 'hooks';
import {useSelector} from 'react-redux';
import ActionButtons from 'components/Atoms/ActionButtons';
import Header from '../../CommonComponents/Header';
import Pagination from '../../CommonComponents/Pagination';

const schema = Yup.object().shape({
  materials: Yup.array().of(
    Yup.object().shape({
      quantity: Yup.number('Required').required('Required'),
      damaged: Yup.number('Required').required('Required'),
    }),
  ),
  materialAttachments: Yup.mixed().required('File is required'),
  damageAttachments: Yup.mixed().required('File is required'),
});

const RenderDamageAttachments = props => {
  const {attachments, handleDelete} = props;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.renderFileContainer}>
        <Text style={styles.attachmentFileHeader}>Attachments</Text>
      </View>
      {attachments?.map((attachment, i) => {
        return (
          <View key={attachment.name}>
            <View style={styles.sectionContainer}>
              <Image source={FileIcon} style={styles.fileIcon} />
              <View>
                <Text
                  style={(styles.verticalFlex, styles.text)}
                  numberOfLines={1}>
                  {attachment.name}
                </Text>
              </View>
            </View>
            <OpacityButton
              opacity={0.1}
              color={theme.colors.error}
              style={styles.closeButton}
              onPress={() => handleDelete(i)}>
              <MaterialIcon name="close" color={theme.colors.error} size={17} />
            </OpacityButton>
          </View>
        );
      })}
    </View>
  );
};

const RenderAttachments = props => {
  const {attachments, handleDelete} = props;

  return (
    <View>
      <View style={styles.cardContainer}>
        <View style={styles.renderFileContainer}>
          <Text style={styles.attachmentFileHeader}>Attachments</Text>
        </View>
        {attachments?.map((attachment, i) => {
          return (
            <View key={attachment.name}>
              <View style={styles.sectionContainer}>
                <Image source={FileIcon} style={styles.fileIcon} />
                <View>
                  <Text
                    style={(styles.verticalFlex, styles.text)}
                    numberOfLines={1}>
                    {attachment.name}
                  </Text>
                </View>
              </View>
              <OpacityButton
                opacity={0.1}
                color={theme.colors.error}
                style={styles.closeButton}
                onPress={() => handleDelete(i)}>
                <MaterialIcon
                  name="close"
                  color={theme.colors.error}
                  size={17}
                />
              </OpacityButton>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const MaterialDetailsForm = props => {
  const {formikProps, selectedMaterialChallan, item, index} = props;
  const {values, errors: allErrors, setFieldValue} = formikProps;

  const errors = allErrors?.materials?.[index] || {};

  const {id, quantity, damaged} = item;

  const materialData = useMemo(() => {
    return selectedMaterialChallan?.find(i => i.id === id);
  }, [id, selectedMaterialChallan]);

  const updateMaterialItem = (key, value) => {
    const _item = {...item};

    _item[key] = value;

    const _updatedMaterials = [...values.materials];
    _updatedMaterials[index] = _item;

    setFieldValue('materials', _updatedMaterials);
  };

  return (
    <View>
      <Subheading style={{color: theme.colors.primary}}>Category</Subheading>
      <View style={styles.subHeadingText}>
        <Text>{materialData.category_title}</Text>
        <MaterialIcon name="label" size={20} />
        <Text>{` ${materialData.subcategory_title}  ${materialData.unit_title}`}</Text>
      </View>

      <View style={styles.categoryDetailsContainer}>
        <View style={styles.renderInputContainer}>
          <RenderInput
            name="quantity"
            label="Quantity"
            containerStyles={styles.input}
            value={quantity}
            onChangeText={v => updateMaterialItem('quantity', v)}
            error={errors.quantity}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.renderInputContainer}>
          <RenderInput
            name="damaged"
            label="Damage Q."
            containerStyles={styles.input}
            value={damaged}
            onChangeText={v => updateMaterialItem('damaged', v)}
            error={errors.damaged}
            keyboardType="numeric"
          />
        </View>
      </View>
      <Divider />
    </View>
  );
};

function MaterialForm(props) {
  const {formikProps, selectedMaterialChallan, navigation} = props;
  const {values, errors, setFieldValue, handleSubmit} = formikProps;

  const {openImagePicker} = useImagePicker();

  const handleUpload = () => {
    openImagePicker({
      type: 'file',
      onChoose: file => {
        if (file.uri) {
          const attachments = values.materialAttachments || [];
          attachments.push(file);
          setFieldValue('materialAttachments', attachments);
        }
      },
    });
  };

  const handleUploadDamage = () => {
    openImagePicker({
      type: 'file',
      onChoose: file => {
        if (file.uri) {
          const attachments = values.damageAttachments || [];
          attachments.push(file);
          setFieldValue('damageAttachments', attachments);
        }
      },
    });
  };

  const handleDelete = i => {
    values.materialAttachments.splice(i, 1);
    setFieldValue('materialAttachments', values.materialAttachments);
  };

  const handleDeleteDamage = i => {
    values.damageAttachments.splice(i, 1);
    setFieldValue('damageAttachments', values.damageAttachments);
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Header title="Material Info" {...props} />
        <Pagination title="Page 2 of 3" />
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        {values.materials.map((item, index) => {
          return (
            <MaterialDetailsForm
              {...props}
              item={item}
              key={item.id}
              index={index}
              selectedMaterialChallan={selectedMaterialChallan}
            />
          );
        })}

        <View style={styles.attachmentContainer}>
          <View>
            <Text style={styles.attachmentHeading}>Attachment</Text>
            <OpacityButton
              onPress={handleUpload}
              opacity={0.1}
              style={styles.uploadButton}
              color="#fff">
              <Text style={{color: theme.colors.primary}}>Upload File</Text>
            </OpacityButton>
            <RenderError error={errors.materialAttachments} />
            {values.materialAttachments?.length ? (
              <RenderAttachments
                attachments={values.materialAttachments}
                handleDelete={i => handleDelete(i)}
              />
            ) : null}
            <Text style={styles.damageAttachment}>Attachment</Text>
            <OpacityButton
              onPress={handleUploadDamage}
              opacity={0.1}
              style={styles.uploadButton}
              color="#fff">
              <Text style={{color: theme.colors.red}}>Upload File</Text>
            </OpacityButton>
            <RenderError error={errors.damageAttachments} />

            {values.damageAttachments?.length ? (
              <RenderDamageAttachments
                attachments={values.damageAttachments}
                handleDelete={i => handleDeleteDamage(i)}
              />
            ) : null}
          </View>
          <ActionButtons
            onSubmit={handleSubmit}
            submitLabel="Next"
            onCancel={() => navigation.goBack()}
          />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}

const AddMaterialInfo = props => {
  const {navigation, route} = props;
  const {selectedMaterial} = route?.params || {};
  const {selectedMaterialChallan} = useSelector(s => s.materialManagement);

  const navToStepFour = values => {
    navigation.navigate('AddVehicleInfo', {
      ...values,
      ...route?.params,
    });
  };

  const initialValues = useMemo(() => {
    return {
      materials: selectedMaterial.map(i => ({
        id: i,
        quantity: '',
        damaged: '',
      })),
    };
  }, [selectedMaterial]);

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={initialValues}
      validationSchema={schema}
      enableReinitialize
      onSubmit={navToStepFour}>
      {formikProps => (
        <MaterialForm
          {...{formikProps}}
          {...props}
          selectedMaterial={selectedMaterial}
          selectedMaterialChallan={selectedMaterialChallan}
        />
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
  },
  headerContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  uploadButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.primary,
    padding: 10,
    marginVertical: 10,
  },
  attachmentHeading: {
    color: theme.colors.primary,
    marginTop: 10,
  },
  damageAttachment: {
    color: theme.colors.red,
    marginTop: 10,
  },
  cardContainer: {
    padding: 10,
    backgroundColor: '#F2F4F5',
    borderRadius: 5,
    marginVertical: 7,
  },
  fileIcon: {
    width: 32,
    height: 38,
    paddingLeft: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  closeButton: {
    borderRadius: 50,
    alignSelf: 'flex-end',
    position: 'absolute',
  },
  attachmentFileHeader: {
    color: '#000',
    fontSize: 15,
  },

  sectionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    display: 'flex',
    borderRadius: 5,
    marginVertical: 7,
    marginHorizontal: 7,
    flexGrow: 1,
    position: 'relative',
  },

  renderFileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verticalFlex: {
    flexDirection: 'column',
  },
  text: {
    color: '#080707',
    paddingHorizontal: 10,
    fontSize: 14,
    alignItems: 'center',
    maxWidth: 170,
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 15,
  },
  attachmentContainer: {
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  subHeadingText: {
    flexDirection: 'row',
    marginTop: 5,
  },
  categoryDetailsContainer: {
    flexDirection: 'row',
    marginHorizontal: -10,
    paddingBottom: 5,
  },
  renderInputContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default withTheme(AddMaterialInfo);

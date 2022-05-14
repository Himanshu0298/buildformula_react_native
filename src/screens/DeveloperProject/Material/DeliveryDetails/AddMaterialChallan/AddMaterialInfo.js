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
import Header from '../../CommonComponents/Header';
import ActionButtons from '../AddChallan/Components/ActionButtons';
import Pagination from '../../CommonComponents/Pagination';

const schema = Yup.object().shape({
  quantity: Yup.number('Required').required('Required'),
  damage: Yup.number('Required').required('Required'),
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
          <View>
            <OpacityButton
              opacity={0.1}
              color={theme.colors.error}
              style={styles.closeButton}
              onPress={() => handleDelete(i)}>
              <MaterialIcon name="close" color={theme.colors.error} size={17} />
            </OpacityButton>
            <View style={styles.sectionContainer}>
              <Image source={FileIcon} style={styles.fileIcon} />
              <View>
                <Text
                  style={(styles.verticalFlex, styles.text)}
                  numberOfLines={2}>
                  image.jpeg
                </Text>
              </View>
            </View>
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
            <View>
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
              <View style={styles.sectionContainer}>
                <Image source={FileIcon} style={styles.fileIcon} />
                <View>
                  <Text
                    style={(styles.verticalFlex, styles.text)}
                    numberOfLines={2}>
                    image.jpeg
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const MaterialDetailsForm = props => {
  const {formikProps, item} = props;
  const {category_title, subcategory_title, unit_title} = item;
  console.log('-------->item142', item);

  const {values, errors, handleChange, handleBlur} = formikProps;

  return (
    <View>
      <Subheading style={{color: theme.colors.primary}}>Category</Subheading>
      <View style={styles.subHeadingText}>
        <Text>{category_title}</Text>
        <MaterialIcon name="label" size={20} />
        <Text>{` ${subcategory_title}  ${unit_title}`}</Text>
      </View>

      <View style={styles.categoryDetailsContainer}>
        <View style={styles.renderInputContainer}>
          <RenderInput
            name="quantity"
            label="Quantity"
            numberOfLines={3}
            containerStyles={styles.input}
            value={values.quantity}
            onChangeText={handleChange('quantity')}
            onBlur={handleBlur('quantity')}
            error={errors.quantity}
          />
        </View>
        <View style={styles.renderInputContainer}>
          <RenderInput
            name="damage"
            label="Damage Q."
            numberOfLines={3}
            containerStyles={styles.input}
            value={values.damage}
            onChangeText={handleChange('damage')}
            onBlur={handleBlur('damage')}
            error={errors.damage}
          />
        </View>
      </View>
      <Divider />
    </View>
  );
};

function MaterialForm(props) {
  const {formikProps, materialCategory} = props;
  const {values, errors, setFieldValue, handleSubmit} = formikProps;
  console.log('-------->materialCategory123', materialCategory);

  const {openFilePicker} = useImagePicker();

  const handleUpload = () => {
    openFilePicker({
      type: 'file',
      onChoose: file => {
        const attachments = values.materialAttachments || [];
        attachments.push(file);
        setFieldValue('materialAttachments', attachments);
      },
    });
  };
  const handleUploadDamage = () => {
    openFilePicker({
      type: 'file',
      onChoose: file => {
        const attachments = values.damageAttachments || [];
        attachments.push(file);
        setFieldValue('damageAttachments', attachments);
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
        <Pagination />
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.dialogContent}>
          <MaterialDetailsForm item={materialCategory} {...props} />

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
          </View>
          {values.materialAttachments?.length ? (
            <RenderAttachments
              attachments={values.materialAttachments}
              handleDelete={i => handleDelete(i)}
            />
          ) : null}
          <View>
            <Text style={styles.damageAttachment}>Attachment</Text>
            <OpacityButton
              onPress={handleUploadDamage}
              opacity={0.1}
              style={styles.uploadButton}
              color="#fff">
              <Text style={{color: theme.colors.red}}>Upload File</Text>
            </OpacityButton>
            <RenderError error={errors.damageAttachments} />
          </View>

          {values.damageAttachments?.length ? (
            <RenderDamageAttachments
              attachments={values.damageAttachments}
              handleDelete={i => handleDeleteDamage(i)}
            />
          ) : null}
        </View>
        <ActionButtons onPress={handleSubmit} />
      </KeyboardAwareScrollView>
    </>
  );
}

const AddMaterialInfo = props => {
  const {navigation, route} = props;
  const {materialId} = route?.params || {};
  const {selectedMaterialChallan} = useSelector(s => s.materialManagement);

  const materialCategory = useMemo(() => {
    return selectedMaterialChallan?.find(
      i => i.material_request_id === materialId,
    );
  }, [materialId, selectedMaterialChallan]);

  const navToStepFour = values => {
    navigation.navigate('AddVehicleInfo', {...values, ...route?.params});
  };

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{}}
      validationSchema={schema}
      onSubmit={navToStepFour}>
      {formikProps => (
        <MaterialForm
          {...{formikProps}}
          {...props}
          materialCategory={materialCategory}
        />
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  dialogContent: {
    paddingHorizontal: 15,
    flexGrow: 1,
  },
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
    paddingHorizontal: 5,
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

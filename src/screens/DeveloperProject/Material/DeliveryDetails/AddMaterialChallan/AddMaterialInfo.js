import * as React from 'react';
import {Formik} from 'formik';
import {Divider, Subheading, withTheme} from 'react-native-paper';
import {Image, StyleSheet, Text, View} from 'react-native';
import * as Yup from 'yup';
import RenderInput from 'components/Atoms/RenderInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {theme} from 'styles/theme';
import FileIcon from 'assets/images/file_icon.png';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useImagePicker} from 'hooks';
import Header from '../../CommonComponents/Header';
import ActionButtons from '../AddChallan/Components/ActionButtons';
import Pagination from '../../CommonComponents/Pagination';

const Data = ['', ''];

const schema = Yup.object().shape({
  quantity: Yup.number('Required').required('Required'),
  damage: Yup.number('Required').required('Required'),
});

const RenderAttachments = props => {
  const {attachments, handleDelete} = props;

  return (
    <View>
      <View style={styles.cardContainer}>
        <View style={styles.renderFileContainer}>
          <Text style={styles.attachmentFileHeader}>Attachments</Text>
          <OpacityButton
            opacity={0.1}
            color={theme.colors.error}
            style={styles.closeButton}
            onPress={handleDelete}>
            <MaterialIcon name="close" color={theme.colors.error} size={17} />
          </OpacityButton>
        </View>
        {attachments?.map(attachment => {
          return (
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
          );
        })}
      </View>
    </View>
  );
};

const MaterialDetailsForm = props => {
  const {formikProps} = props;

  const {values, errors, handleChange, handleBlur} = formikProps;

  return (
    <View>
      <Subheading style={{color: theme.colors.primary}}>Category</Subheading>
      <View style={styles.subHeadingText}>
        <Text>Brick-1 </Text>
        <MaterialIcon name="label" size={20} />
        <Text> Bricks-2, Nos</Text>
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
  const {formikProps, navigation} = props;
  const {values, setFieldValue} = formikProps;

  const {openFilePicker} = useImagePicker();

  const handleUpload = () => {
    openFilePicker({
      type: 'file',
      onChoose: file => {
        setFieldValue('attachments', file);
      },
    });
  };

  const handleDelete = () => {
    console.log('-------->inside delete');
    setFieldValue('attachments', []);
  };

  const navToStepFour = () => {
    navigation.navigate('AddVehicleInfo');
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
          {Data.map(item => {
            return <MaterialDetailsForm item={item} {...props} />;
          })}

          <View>
            <Text style={styles.attachmentHeading}>Attachment</Text>
            <OpacityButton
              onPress={handleUpload}
              opacity={0.1}
              style={styles.uploadButton}
              color="#fff">
              <Text style={{color: theme.colors.primary}}>Upload File</Text>
            </OpacityButton>
          </View>

          <RenderAttachments
            attachments={[values.attachments]}
            handleDelete={i => handleDelete(i)}
          />
          <ActionButtons onPress={navToStepFour} />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}

const AddMaterialInfo = props => {
  const {handleSubmit} = props;

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{}}
      validationSchema={schema}
      onSubmit={handleSubmit}>
      {formikProps => <MaterialForm {...{formikProps}} {...props} />}
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

import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import ActionButtons from 'components/Atoms/ActionButtons';
import {Caption} from 'react-native-paper';
import {RenderError} from 'components/Atoms/RenderInput';
import {theme} from 'styles/theme';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import FileIcon from 'assets/images/file_icon.png';
import {getShadow} from 'utils';
import {useImagePicker} from 'hooks';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Yup from 'yup';
import {Formik} from 'formik';
import Header from '../../CommonComponents/Header';
import Pagination from '../../CommonComponents/Pagination';

const schema = Yup.object().shape({
  challan: Yup.number('Required').required('Required'),
  attachments: Yup.mixed().required('File is required'),
});

const RenderAttachments = props => {
  const {attachments, handleDelete} = props;

  return (
    <View>
      <View style={styles.cardContainer}>
        <View style={styles.renderFileContainer}>
          <Text style={styles.attachmentFileHeader}>Attachments</Text>
        </View>
        {attachments?.map((attachment, index) => {
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
                onPress={() => handleDelete(index)}>
                <MaterialIcons
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

function UploadForm(props) {
  const {formikProps} = props;
  const {values, errors, setFieldValue} = formikProps;

  const {openImagePicker} = useImagePicker();

  const handleUpload = () => {
    openImagePicker({
      type: 'file',
      onChoose: file => {
        const attachments = values.attachments || [];
        attachments.push(file);
        setFieldValue('attachments', attachments);
      },
    });
  };

  const handleDelete = i => {
    values.attachments.splice(i, 1);
    setFieldValue('attachments', values.attachments);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.dialogContent}>
        <View>
          <View>
            <Text style={{color: theme.colors.primary}}>
              Upload Material Image
            </Text>
            <OpacityButton
              onPress={handleUpload}
              opacity={0.1}
              style={styles.uploadButton}
              color="#fff">
              <Text style={{color: theme.colors.primary}}>Upload File</Text>
            </OpacityButton>
            <RenderError error={errors.attachments} />
          </View>
          {values.attachments?.length ? (
            <RenderAttachments
              attachments={values.attachments}
              handleDelete={i => handleDelete(i)}
            />
          ) : null}
        </View>
      </View>
      <View style={styles.dialogContent}>
        <View>
          <View>
            <Text style={{color: theme.colors.red}}>
              Upload Damage Material Image
            </Text>
            <OpacityButton
              onPress={handleUpload}
              opacity={0.1}
              style={styles.uploadButton}
              color="#fff">
              <Text style={{color: theme.colors.red}}>Upload File</Text>
            </OpacityButton>
            <RenderError error={errors.attachments} />
          </View>
          {values.attachments?.length ? (
            <RenderAttachments
              attachments={values.attachments}
              handleDelete={i => handleDelete(i)}
            />
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
}

const RenderCard = props => {
  const {navigation} = props;
  return (
    <View style={styles.materialContainer}>
      <View style={styles.cardHeader}>
        <View style={styles.row}>
          <Caption>Category: </Caption>
          <Text>Cement</Text>
        </View>
        <View style={styles.btnContainer}>
          <OpacityButton
            color="#4872f4"
            opacity={0.18}
            style={styles.btnRadius}
            onPress={() => navigation.navigate('AddMaterial')}>
            <MaterialIcons name="edit" color="#4872f4" size={17} />
          </OpacityButton>
          <OpacityButton
            color="#FF5D5D"
            opacity={0.18}
            onPress={() => {
              console.log('Pressed');
            }}
            style={styles.btnRadius}>
            <MaterialIcons name="delete" color="#FF5D5D" size={17} />
          </OpacityButton>
        </View>
      </View>
      <View style={styles.row}>
        <Caption>Category: </Caption>
        <Text>Cement</Text>
      </View>
      <View style={styles.row}>
        <Caption>Sub Category: </Caption>
        <Text>OPC</Text>
      </View>
      <View style={styles.row}>
        <Caption>Unit: </Caption>
        <Text>CUM or m3</Text>
      </View>
      <View style={styles.row}>
        <Caption>List of Makes: </Caption>
        <Text style={styles.companyName}>Company Name</Text>
      </View>
      <View style={styles.row}>
        <Caption>Fine Qty: </Caption>
        <Text>150</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.damage}>Damage Qty: 40</Text>
      </View>
      <View style={styles.row}>
        <Caption>Missing Qty: </Caption>
        <Text>10</Text>
      </View>
    </View>
  );
};

const GRNMaterial = props => {
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Header title="Material Info" {...props} />
        <Pagination title="Page 2 of 3" />
      </View>
      <ScrollView style={styles.bodyContainer}>
        <RenderCard navigation={navigation} />
        <OpacityButton
          onPress={() => navigation.navigate('AddMaterial')}
          opacity={0.1}
          style={styles.uploadButton}
          color="#fff">
          <MaterialIcons name="add" color="#4872f4" size={17} />
          <Text style={{color: theme.colors.primary}}>Add Material</Text>
        </OpacityButton>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{attachments: []}}
          validationSchema={schema}
          onSubmit={() => console.log('test')}>
          {formikProps => <UploadForm {...{formikProps}} {...props} />}
        </Formik>
      </ScrollView>
      <ActionButtons
        onSubmit={() => navigation.navigate('VehicleInfo')}
        submitLabel="Next"
        cancelLabel="Previous"
        onCancel={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
};

export default GRNMaterial;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  bodyContainer: {
    padding: 10,
    flex: 1,
  },
  headerContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fileIcon: {
    width: 32,
    height: 38,
    paddingLeft: 10,
    marginLeft: 10,
    marginRight: 10,
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
  materialContainer: {
    ...getShadow(2),
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  renderFileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  btnContainer: {
    flexDirection: 'row',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnRadius: {
    borderRadius: 20,
    marginHorizontal: 6,
  },
  companyName: {
    backgroundColor: theme.colors.primary,
    color: '#fff',
    padding: 2,
  },
  damage: {
    color: theme.colors.red,
  },
  uploadButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.primary,
    padding: 10,
    marginVertical: 10,
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
  dialogContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  cardContainer: {
    padding: 10,
    backgroundColor: '#F2F4F5',
    borderRadius: 5,
    marginVertical: 7,
  },
});

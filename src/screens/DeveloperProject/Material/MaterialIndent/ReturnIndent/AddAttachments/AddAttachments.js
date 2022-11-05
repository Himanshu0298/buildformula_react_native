import {Image, StyleSheet, View} from 'react-native';
import React from 'react';

import {RenderError} from 'components/Atoms/RenderInput';

import {Text} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FileIcon from 'assets/images/file_icon.png';

import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {theme} from 'styles/theme';
import {useImagePicker} from 'hooks';
import ActionButtons from 'components/Atoms/ActionButtons';
import {Formik} from 'formik';

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

function AttachmentsForm(props) {
  const {formikProps} = props;
  const {values, setFieldValue, errors, handleSubmit} = formikProps;

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

  const {navigation} = props;
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Return Request</Text>
        </View>
        <View>
          <View style={{marginTop: 20}}>
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
      <ActionButtons
        onSubmit={handleSubmit}
        submitLabel="Next"
        onCancel={() => navigation.goBack()}
      />
    </View>
  );
}

const AddAttachments = props => {
  const {route, navigation} = props;

  const navToPreview = values => {
    navigation.navigate('ReturnIndentPreview', {...values, ...route.params});
  };

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{attachments: []}}
      // validationSchema={schema}
      onSubmit={navToPreview}>
      {formikProps => <AttachmentsForm {...{formikProps}} {...props} />}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flex: 1,
    margin: 20,
  },
  subContainer: {
    flexGrow: 1,
  },
  headerText: {
    fontSize: 18,
  },
  headerContainer: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  uploadButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.primary,
    padding: 20,
    marginVertical: 20,
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
    marginTop: 20,
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
});

export default AddAttachments;

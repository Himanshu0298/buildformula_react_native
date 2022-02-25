import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {
  Text,
  Button,
  Caption,
  IconButton,
  Subheading,
  Divider,
} from 'react-native-paper';
import RenderInput from 'components/Atoms/RenderInput';
import {Formik} from 'formik';
import useImagePicker from 'utils/useImagePicker';
import dayjs from 'dayjs';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import {cloneDeep, uniqBy} from 'lodash';
import fileIcon from 'assets/images/file_icon.png';
import {theme} from 'styles/theme';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
});

function renderData(label, value) {
  return (
    <View style={styles.row}>
      <Text>{label}: </Text>
      <Text style={{color: theme.colors.primary}}>{value}</Text>
    </View>
  );
}

function RenderCustomerBox() {
  return (
    <View style={styles.customerContainer}>
      {renderData('Customer name', 'Apartment')}
      <View style={[styles.row, {paddingTop: 10}]}>
        {renderData('Mobile', 876455008)}
        {renderData('Unit', '1204')}
      </View>
      <Divider style={{marginVertical: 10, borderWidth: 0.2}} />
      <View style={[styles.row, {justifyContent: 'space-between'}]}>
        <Text style={{color: '#5E6D7C'}}>
          Date: {dayjs().format('DD-MM-YYYY')}
        </Text>
        <Text style={{color: '#5E6D7C'}}>
          Time: {dayjs().format('HH:mm A')}
        </Text>
      </View>
    </View>
  );
}

function RenderFiles({files = [], submitted, onRemove}) {
  return (
    <View style={styles.filesContainer}>
      {files.map((file, index) => {
        return (
          <View
            key={index}
            style={
              submitted ? styles.submittedFileContainer : styles.fileContainer
            }>
            <Image source={fileIcon} style={styles.fileIcon} />
            <View style={styles.fileDescription}>
              <View style={{flex: 1}}>
                <Text numberOfLines={1} style={{flexShrink: 1}}>
                  {file?.name}
                </Text>
                <Caption>
                  Uploaded on {dayjs().format('H:mm DD MMM YYYY')}
                </Caption>
              </View>
              {!submitted ? (
                <View style={styles.deleteIcon}>
                  <IconButton
                    icon="delete"
                    size={16}
                    color={theme.colors.red}
                    onPress={() => onRemove(index)}
                  />
                </View>
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
}

function CustomerForm(props) {
  const {navigation, onSubmit} = props;
  const {t} = useTranslation();

  const {openFilePicker} = useImagePicker();

  const titleRef = React.useRef();
  const descriptionRef = React.useRef();

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{}}
      validationSchema={schema}
      onSubmit={async values => onSubmit(values)}>
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => (
        <View style={styles.formContainer}>
          <RenderInput
            name="title"
            label={t('label_title')}
            ref={titleRef}
            containerStyles={styles.input}
            value={values.title}
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            onSubmitEditing={() => descriptionRef?.current?.focus()}
            error={errors.title}
          />
          <RenderTextBox
            name="description"
            label={t('label_modification_description')}
            ref={descriptionRef}
            numberOfLines={5}
            minHeight={120}
            containerStyles={styles.input}
            value={values.description}
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            error={errors.description}
          />
          <RenderFiles
            files={values.files}
            onRemove={index => {
              const {files} = cloneDeep(values);
              files.splice(index, 1);
              setFieldValue('files', files);
            }}
          />
          <TouchableOpacity
            style={styles.attachFilesBox}
            onPress={() =>
              openFilePicker({
                type: 'file',
                multiple: true,
                onChoose: v => {
                  const files = [...(values.files || []), ...v];
                  const filteredFiles = uniqBy(files, e => e.name);
                  setFieldValue('files', filteredFiles);
                },
              })
            }>
            <Text>Click here to attach files</Text>
          </TouchableOpacity>

          <View style={styles.actionContainer}>
            <Button
              style={{width: '40%'}}
              contentStyle={{padding: 1}}
              theme={{roundness: 10}}
              onPress={navigation.goBack}>
              Cancel
            </Button>
            <Button
              style={{width: '40%'}}
              mode="contained"
              contentStyle={{padding: 1}}
              theme={{roundness: 10}}
              onPress={handleSubmit}>
              Save
            </Button>
          </View>
        </View>
      )}
    </Formik>
  );
}

function CustomerDetails(props) {
  const {submitted} = props;

  return (
    <View style={styles.detailContainer}>
      <View style={styles.contentContainer}>
        <Text>Request title</Text>
        <Caption style={{marginTop: 5}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </Caption>
      </View>

      <RenderFiles files={[{}, {}]} submitted={submitted} />
    </View>
  );
}

function CustomerSection(props) {
  const {params, submitted, navigation} = props;

  return (
    <View style={styles.sectionContainer}>
      <Subheading style={styles.headline}>1. Modify Request</Subheading>
      <RenderCustomerBox />
      {submitted ? <CustomerDetails {...props} /> : <CustomerForm {...props} />}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {},
  headline: {
    fontSize: 18,
    color: theme.colors.primary,
  },
  customerContainer: {
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    backgroundColor: '#F2F4F5',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  formContainer: {},
  input: {
    paddingVertical: 7,
  },
  attachFilesBox: {
    marginTop: 15,
    borderWidth: 2,
    borderColor: 'rgba(4, 29, 54, 0.1)',
    borderStyle: 'dashed',
    marginVertical: 7,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1,
  },
  actionContainer: {
    marginTop: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-around',
  },
  filesContainer: {
    marginTop: 10,
  },
  submittedFileContainer: {
    marginVertical: 3,
    backgroundColor: '#F2F4F5',
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileContainer: {
    borderWidth: 2,
    marginVertical: 3,
    borderColor: 'rgba(4, 29, 54, 0.1)',
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileIcon: {
    height: 45,
    width: 35,
  },
  fileDescription: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    flex: 1,
  },
  deleteIcon: {
    marginTop: -7,
    marginRight: -7,
  },
  detailContainer: {
    marginVertical: 10,
  },
  contentContainer: {
    backgroundColor: '#F2F4F5',
    borderRadius: 8,
    padding: 10,
  },
});

export default CustomerSection;

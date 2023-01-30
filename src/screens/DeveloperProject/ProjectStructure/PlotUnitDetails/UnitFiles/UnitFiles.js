import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import {Button, FAB, IconButton, Text, Title} from 'react-native-paper';
import {theme} from 'styles/theme';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import _ from 'lodash';

import PdfIcon from 'assets/images/pdf_icon.png';
import {getDownloadUrl, getFileName} from 'utils/download';
import FileViewer from 'react-native-file-viewer';

import {useDownload} from 'components/Atoms/Download';
import {getShadow} from 'utils';
import {useImagePicker} from 'hooks';
import {Formik} from 'formik';
import RenderInput from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';

const SNAP_POINTS = [0, '40%'];

const DATA = [
  {
    name: 'Project Schedule For Dharti...',
    date: '10 June 2020',
    type: 'Banner',
  },
  {
    name: 'Project Schedule For Dharti...',
    date: '10 June 2020',
    type: 'Banner',
  },
  {
    name: 'Project Schedule For Dharti...',
    date: '10 June 2020',
    type: 'Banner',
  },
  {
    name: 'Project Schedule For Dharti...',
    date: '10 June 2020',
    type: 'Banner',
  },
];

const options = [];

function RenderForm(props) {
  const {formikProps} = props;

  const {values, errors, handleChange, handleBlur, setFieldValue} = formikProps;

  return (
    <View style={{flexGrow: 1}}>
      <RenderInput
        name="file_name"
        label="File Name"
        containerStyles={styles.inputStyles}
        value={values.file_name}
        onChangeText={handleChange('file_name')}
        onBlur={handleBlur('file_name')}
        autoCapitalize="none"
        returnKeyType="file_name"
        error={errors.name}
      />
      <RenderSelect
        name="file_category"
        label="File Category"
        value={values?.file_category}
        options={options}
        containerStyles={styles.inputStyles}
        onBlur={handleBlur('file_category')}
        onSelect={value => {
          setFieldValue('file_category', value);
        }}
      />

      <Button
        style={styles.button}
        theme={{roundness: 10}}
        mode="contained"
        onPress={() => console.log('===========> ')}>
        Add
      </Button>
    </View>
  );
}

function RenderFile(props) {
  const {file, onPressFile} = props;

  const {name, date, type} = file;

  return (
    <View style={styles.recentFiles}>
      <TouchableOpacity
        style={styles.sectionContainer}
        onPress={() => onPressFile(file)}>
        <Image source={PdfIcon} style={styles.fileIcon} />
        <View>
          <Text style={(styles.verticalFlex, styles.text)} numberOfLines={2}>
            {name}
          </Text>
          <View style={styles.type}>
            <Text style={styles.date}>{type}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>
              {/* {dayjs(created).format('DD MMM YYYY')} */}
              {date}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <View>
        <IconButton
          icon="dots-vertical"
          onPress={() => console.log('===========> ')}
        />
      </View>
    </View>
  );
}

function AddAttachments(props) {
  const {dialog, onClose, formikProps} = props;

  const {values, setFieldValue} = formikProps;

  const bottomSheetRef = useRef();
  const fall = new Animated.Value(1);

  useEffect(() => {
    if (dialog) {
      bottomSheetRef?.current?.snapTo(1);
    } else {
      bottomSheetRef?.current?.snapTo(0);
    }
  }, [dialog]);

  const {openImagePicker} = useImagePicker();

  const handleUpload = () => {
    openImagePicker({
      type: 'file',
      onChoose: file => {
        if (file.uri) {
          const attachments = values.attachments || [];
          attachments.push(file);
          setFieldValue('attachments', attachments);
        }
      },
    });
  };

  return (
    <>
      {dialog ? (
        <Animated.View
          style={[
            styles.backdrop,
            {opacity: Animated.sub(1, Animated.multiply(fall, 0.9))},
          ]}
        />
      ) : null}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={SNAP_POINTS}
        initialSnap={0}
        borderRadius={30}
        callbackNode={fall}
        renderHeader={() => <View />}
        renderContent={() => (
          <View style={styles.sheetContentContainer}>
            <View style={styles.closeContainer}>
              <IconButton
                icon="close-circle"
                size={25}
                onPress={onClose}
                color="grey"
              />
            </View>
            <Title>Upload</Title>
            <TouchableOpacity opacity={0.5} onPress={handleUpload}>
              <View style={styles.uploadFileContainer}>
                <Text style={{color: theme.colors.primary}}> Choose file</Text>
              </View>
            </TouchableOpacity>
            <RenderForm formikProps={formikProps} />
          </View>
        )}
      />
    </>
  );
}

function UnitFiles(props) {
  const {navigation} = props;

  const download = useDownload();

  const [dialog, setDialog] = useState();

  const onPressFile = async file => {
    const fileUrl = getDownloadUrl(file);
    const name = getFileName(file);

    download.link({
      name,
      link: fileUrl,
      showAction: false,
      onFinish: ({dir}) => {
        FileViewer.open(`file://${dir}`);
      },
    });
  };

  const toggleAddFile = () => setDialog(v => !v);

  const onClose = () => toggleAddFile();

  const handleSave = () => {
    console.log('===========> ');
  };

  return (
    <>
      {dialog ? (
        <Formik
          enableReinitialize
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{}}
          onSubmit={handleSave}>
          {formikProps => (
            <AddAttachments
              {...props}
              dialog={dialog}
              toggleDialog={toggleAddFile}
              onClose={onClose}
              formikProps={formikProps}
            />
          )}
        </Formik>
      ) : null}

      <View style={styles.mainContainer}>
        <View style={styles.headerWrapper}>
          <IconButton
            icon="keyboard-backspace"
            size={18}
            color="#4872f4"
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          />
          <Title>Files/ Attachments</Title>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.fileContainer}>
            {DATA.map((file, index) => {
              return (
                <RenderFile
                  file={file}
                  key={index?.toString()}
                  onPressFile={onPressFile}
                />
              );
            })}
          </View>
        </ScrollView>
        <FAB
          style={[styles.fab, {backgroundColor: theme.colors.primary}]}
          icon="plus"
          onPress={toggleAddFile}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileIcon: {
    width: 32,
    height: 38,
    paddingLeft: 10,
    marginLeft: 10,
    marginBottom: 10,
  },

  mainContainer: {
    margin: 10,
    flex: 1,
  },
  backIcon: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    marginRight: 11,
  },

  scrollView: {
    marginBottom: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 10,
  },

  text: {
    color: '#080707',
    paddingHorizontal: 10,
    fontSize: 14,
    alignItems: 'center',
  },
  date: {
    color: '#080707',
  },
  recentFiles: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFFFF',
    ...getShadow(3),
    padding: 10,
    borderRadius: 10,
  },
  sectionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  fileContainer: {
    marginVertical: 30,
  },
  type: {
    marginLeft: 10,
  },
  dateContainer: {
    marginLeft: 8,
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sheetContentContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 15,
    paddingBottom: 20,
    flexGrow: 1,
    height: '100%',
    ...getShadow(2),
  },
  closeContainer: {
    alignItems: 'flex-end',
  },

  uploadFileContainer: {
    margin: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    padding: 10,
  },

  inputStyles: {
    marginVertical: 8,
  },
});

export default UnitFiles;

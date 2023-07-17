import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import {FAB, IconButton, Menu, Text, Title} from 'react-native-paper';
import {theme} from 'styles/theme';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import PdfIcon from 'assets/images/pdf_icon.png';
import {getDownloadUrl, getFileName} from 'utils/download';
import FileViewer from 'react-native-file-viewer';
import Share from 'react-native-share';

import {useDownload} from 'components/Atoms/Download';
import {getShadow} from 'utils';

import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import dayjs from 'dayjs';
import {useAlert} from 'components/Atoms/Alert';

function RenderFile(props) {
  const {file, onPressFile, handleDelete, handleShare} = props;

  const {file_name, created_at, title, id} = file;

  const [visible, setVisible] = React.useState(false);

  const toggleMenu = () => setVisible(v => !v);

  const onDelete = () => {
    handleDelete(id);
    toggleMenu();
  };

  const onShare = () => {
    handleShare(file);
    toggleMenu();
  };

  return (
    <View style={styles.recentFiles}>
      <TouchableOpacity
        style={styles.sectionContainer}
        onPress={() => onPressFile(file)}>
        <Image source={PdfIcon} style={styles.fileIcon} />
        <View>
          <Text
            style={(styles.verticalFlex, styles.textContainer)}
            numberOfLines={3}>
            {file_name}
          </Text>
          <View style={styles.type}>
            <Text style={styles.date}>{title}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>
              {dayjs(created_at).format('DD MMM YYYY')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Menu
        visible={visible}
        onDismiss={() => toggleMenu()}
        anchor={
          <TouchableOpacity style={styles.editIcon} onPress={toggleMenu}>
            <MaterialIcon name="dots-vertical" size={18} />
          </TouchableOpacity>
        }>
        <Menu.Item onPress={onDelete} title="Delete" />
        <Menu.Item onPress={onShare} title="Share" />
      </Menu>
    </View>
  );
}

function ProjectFiles(props) {
  const {navigation, route} = props;
  const {projectId} = route?.params || {};

  const download = useDownload();
  const alert = useAlert();

  const [sharing, setSharing] = useState(false);

  const {getProjectDetails, deleteProjectFile, getProjectMasterList} =
    useProjectStructureActions();

  const {selectedProject} = useSelector(s => s.project);
  const {projectDetails, loading} = useSelector(s => s.projectStructure);

  const {attachment_file} = projectDetails || {};

  React.useEffect(() => {
    getData();
    getProjectMasterList({project_id: selectedProject.id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    await getProjectDetails({project_id: selectedProject.id, id: projectId});
  };

  const onPressFile = async file => {
    const fileUrl = getDownloadUrl({file, common: true});
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
  const toggleSharing = () => setSharing(v => !v);

  const handleShare = async file => {
    try {
      toggleSharing();
      const fileUrl = getDownloadUrl(file);
      const name = getFileName(file);

      return download.link({
        name,
        link: fileUrl,
        showAction: false,
        base64: true,
        onFinish: ({base64}) => {
          const options = {
            title: 'Share',
            message: `Share ${file.file_name} :`,
            url: base64,
          };
          toggleSharing();

          return Share.open(options);
        },
      });
    } catch (error) {
      console.log('-----> error', error);
      return error;
    }
  };

  const handleDelete = async attachment_id => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: async () => {
        await deleteProjectFile({
          project_id: selectedProject.id,
          id: projectId,
          attachment_id,
        });
        getData();
      },
    });
  };

  const navToAdd = () => {
    navigation.navigate('AddProjectFiles', {projectId});
  };
  return (
    <View style={styles.mainContainer}>
      <Spinner visible={loading} textContent="" />
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
          {attachment_file?.map((file, index) => {
            return (
              <RenderFile
                file={file}
                key={index?.toString()}
                onPressFile={onPressFile}
                handleDelete={handleDelete}
                handleShare={handleShare}
              />
            );
          })}
        </View>
      </ScrollView>
      <FAB
        style={[styles.fab, {backgroundColor: theme.colors.primary}]}
        icon="plus"
        onPress={navToAdd}
      />
    </View>
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

  date: {
    color: '#080707',
  },
  recentFiles: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    ...getShadow(3),
    padding: 10,
    // borderRadius: 10,
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
  verticalFlex: {
    flexDirection: 'column',
  },
  textContainer: {
    flexGrow: 1,
    flex: 1,
    marginLeft: 10,
  },
});

export default ProjectFiles;

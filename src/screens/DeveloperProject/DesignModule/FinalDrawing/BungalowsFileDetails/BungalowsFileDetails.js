import React, {useEffect, useMemo, useRef} from 'react';
import {
  FlatList,
  RefreshControl,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

import {
  Caption,
  Divider,
  FAB,
  IconButton,
  Menu,
  Subheading,
  Text,
  Title,
} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import _ from 'lodash';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import dayjs from 'dayjs';
import {useSelector} from 'react-redux';
import {Image} from 'react-native-svg';
import FileViewer from 'react-native-file-viewer';
import Spinner from 'react-native-loading-spinner-overlay';
import {theme} from 'styles/theme';

import {useSnackbar} from 'components/Atoms/Snackbar';
import useDesignModuleActions from 'redux/actions/designModuleActions';
import NoResult from 'components/Atoms/NoResult';
import {useDownload} from 'components/Atoms/Download';
import FileIcon from 'assets/images/file_icon.png';
import {getFileExtension} from 'utils/download';
import {getShadow} from 'utils';
import {RenderTowerBox} from 'components/Molecules/TowerSelector';
import {useImagePicker} from 'hooks';
import MenuDialog from '../Components/MenuDialog';
import VersionDialog from '../Components/VersionDialog';

const SNAP_POINTS = [0, '70%'];

const ACTIVITY_LABEL = {
  new_version: 'Uploaded new version',
  add: 'File Added',
  downloaded: 'Downloaded file',
  rename: 'Renamed File',
  delete: 'Deleted File',
};
const ACTIVITY_ICONS = {
  new_version: <MaterialIcons name="file-copy" size={20} />,
  rename: <MaterialCommunityIcons name="pencil" size={20} />,
  share: <MaterialIcons name="share" size={20} />,
  delete: <MaterialIcons name="delete" size={20} />,
  add: <Feather name="upload" size={20} />,
  downloaded: (
    <MaterialCommunityIcons name="cloud-download-outline" size={20} />
  ),
};

function getFileName(string) {
  if (string.includes('/')) {
    const splits = string.split('/');
    return splits[splits.length - 1];
  }

  return string;
}

function RenderFile(props) {
  const {item} = props;

  const {title, created} = item;

  const download = useDownload();
  const [versionMenu, setVersionMenu] = React.useState(false);

  const toggleVersionMenu = () => setVersionMenu(v => !v);

  const onPressFile = async file => {
    download.link({
      name: getFileName(file.file_url),
      data: {project_id: file.project_id, file_url: file.file_url},
      showAction: false,
      onFinish: ({dir}) => {
        FileViewer.open(`file://${dir}`);
      },
    });
    toggleVersionMenu();
  };

  return (
    <View style={styles.recentFiles}>
      <TouchableOpacity
        style={styles.sectionContainer}
        onPress={() => onPressFile(item)}>
        <Image source={FileIcon} style={styles.fileIcon} />
        <View>
          <Text style={(styles.verticalFlex, styles.text)} numberOfLines={2}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.sectionContainer}>
        <View>
          <Text style={styles.date}>
            {dayjs(created).format('DD MMM YYYY')}
          </Text>
        </View>
        <View>
          <Menu
            visible={versionMenu}
            onDismiss={toggleVersionMenu}
            anchor={
              <IconButton icon="dots-vertical" onPress={toggleVersionMenu} />
            }>
            <Menu.Item
              icon="download"
              onPress={() => onPressFile(item)}
              title="Download"
            />
          </Menu>
        </View>
      </View>
    </View>
  );
}

function RenderActivity({item}) {
  const {user_full_name, log_type, created, log_text} = item;

  return (
    <View style={styles.activityContainer}>
      <View style={styles.iconContainer}>{ACTIVITY_ICONS?.[log_type]}</View>
      <View style={styles.activityBody}>
        <View style={styles.activityUser}>
          <Text>{user_full_name}</Text>
          <Caption>{dayjs(created).fromNow()}</Caption>
        </View>

        <Caption>{ACTIVITY_LABEL?.[log_type] || log_type}</Caption>
        <Caption style={styles.fileName}>{getFileName(log_text)}</Caption>
      </View>
    </View>
  );
}
function ActivityModal(props) {
  const activities = useMemo(() => [], []);

  const processedActivities = useMemo(() => {
    const sectionedData = [];
    activities?.map(i => {
      const key = dayjs(i.created).format('YYYY-MM-DD');

      sectionedData[key] = sectionedData[key] || {};
      sectionedData[key].title = key;
      sectionedData[key].data = sectionedData[key].data || [];
      sectionedData[key].data.push(i);

      return i;
    });

    return Object.values(sectionedData);
  }, [activities]);

  const renderSeparator = () => <Divider />;
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text>No Activities found</Text>
    </View>
  );

  return (
    <View style={styles.activitiesContainer}>
      <Subheading style={{color: theme.colors.primary}}>Activity</Subheading>

      <SectionList
        sections={processedActivities}
        extraData={processedActivities}
        showsVerticalScrollIndicator={false}
        keyExtractor={i => i.id}
        ItemSeparatorComponent={renderSeparator}
        contentContainerStyle={styles.activityScrollContainer}
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={renderEmpty}
        renderItem={params => <RenderActivity {...params} />}
        renderSectionHeader={({section: {title}}) => (
          <Caption>{dayjs(title).format('DD MMM')}</Caption>
        )}
      />
    </View>
  );
}

function RenderMenuModal(props) {
  const {menuId, modelContentType, toggleMenu, setModalContentType} = props;

  const bottomSheetRef = useRef();
  const fall = new Animated.Value(1);
  const open = _.isFinite(menuId);

  useEffect(() => {
    if (open) {
      bottomSheetRef?.current?.snapTo(1);
    } else {
      bottomSheetRef?.current?.snapTo(0);
    }
  }, [open]);

  const onClose = () => {
    if (['parentActivity', 'menu'].includes(modelContentType)) {
      toggleMenu();
    } else {
      setModalContentType('menu');
    }
  };

  return (
    <>
      {open ? (
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
        onCloseEnd={toggleMenu}
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
            {modelContentType === 'menu' ? <MenuDialog {...props} /> : null}
            {modelContentType === 'parentActivity' ? (
              <ActivityModal {...props} />
            ) : null}
            {modelContentType === 'activity' ? (
              <ActivityModal {...props} />
            ) : null}
            {modelContentType === 'version' ? (
              <VersionDialog {...props} />
            ) : null}
          </View>
        )}
      />
    </>
  );
}

function BungalowsFileDetails(props) {
  const {navigation, route} = props;

  const {
    folderId,
    tower_id: bungalowId,
    structureLabel,
    towerLabel,
  } = route?.params || {};

  const towerId = 1;
  const snackbar = useSnackbar();
  const {openFilePicker} = useImagePicker();

  const {uploadFDBungalowsFile, getFDBungalows} = useDesignModuleActions();

  const [menuId, setMenuId] = React.useState();
  const [modelContentType, setModalContentType] = React.useState('menu');
  const [modalContent, setModalContent] = React.useState({});
  const [DialogType, setDialogType] = React.useState();

  const toggleMenu = folderIndex => setMenuId(folderIndex);
  const toggleDialog = v => setDialogType(v);

  const {fdBungalowsList, loading} = useSelector(s => s.designModule);

  const {selectedProject} = useSelector(s => s.project);
  const project_id = selectedProject.id;

  const bungalowFiles = fdBungalowsList?.data?.final_drawing_bunglow_files;

  React.useEffect(() => {
    loadFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const loadFiles = () => {
    getFDBungalows({
      project_id,
      folder_id: folderId,
      bunglow_plot_id: bungalowId,
    });
  };

  const onChoose = v => {
    handleFileUpload(v);
  };

  const handleFileUpload = async file => {
    const {name} = file;
    const extension = getFileExtension(file.name);
    file.name = `${name}.${extension}`;

    const formData = new FormData();

    formData.append('folder_id', folderId);
    formData.append('attachmentFile', file);
    formData.append('project_id', project_id);
    formData.append('bunglow_plot_id', bungalowId);

    await uploadFDBungalowsFile(formData);
    toggleDialog();
    snackbar.showMessage({
      message: 'File Uploaded Successfully!',
      variant: 'success',
    });
    loadFiles();
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.titleContainer}
          onPress={navigation.goBack}>
          <IconButton icon="keyboard-backspace" />
        </TouchableOpacity>
        <Title>Bungalow </Title>
      </View>
      <View style={styles.towerContainer}>
        <RenderTowerBox
          towerId={towerId}
          label={towerLabel}
          active
          towerType={structureLabel}
        />
      </View>

      <View style={{margin: 10}}>
        <Text style={{color: theme.colors.primary}}>
          {towerLabel} Bungalow File Document
        </Text>
      </View>

      <FlatList
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={loadFiles} />
        }
        data={bungalowFiles}
        extraData={bungalowFiles}
        keyExtractor={i => i.id}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={<NoResult title="No Data found!" />}
        renderItem={({item, index}) => (
          <RenderFile
            {...props}
            {...{
              item,
              index,
              menuId,
              toggleMenu,
              setModalContentType,
            }}
          />
        )}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => openFilePicker({type: 'file', onChoose})}
        medium
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },

  header: {
    display: 'flex',
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
  text: {
    color: '#080707',
    paddingHorizontal: 10,
    fontSize: 14,
    alignItems: 'center',
    maxWidth: 170,
  },
  date: {
    color: '#080707',
  },
  sectionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  recentFiles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  verticalFlex: {
    flexDirection: 'column',
  },
  fab: {
    position: 'absolute',
    right: 25,
    bottom: 30,
    zIndex: 2,
    backgroundColor: theme.colors.primary,
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

  activityContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5,
  },
  activityBody: {
    flexGrow: 1,
    flex: 1,
  },
  activitiesContainer: {
    flexGrow: 1,
  },
  iconContainer: {
    paddingHorizontal: 10,
  },
  activityScrollContainer: {
    paddingBottom: 100,
    marginTop: 10,
    flexGrow: 1,
  },
  fileName: {
    lineHeight: 12,
    marginRight: 20,
  },
  activityUser: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BungalowsFileDetails;

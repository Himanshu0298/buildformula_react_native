import React, {useRef, useEffect, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  SectionList,
} from 'react-native';
import {
  Caption,
  Divider,
  FAB,
  IconButton,
  Subheading,
  Text,
} from 'react-native-paper';
import dayjs from 'dayjs';
import {useSelector} from 'react-redux';
import Animated from 'react-native-reanimated';
import _ from 'lodash';
import BottomSheet from 'reanimated-bottom-sheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Spinner from 'react-native-loading-spinner-overlay';
import FileViewer from 'react-native-file-viewer';
import {getShadow} from 'utils';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {useDownload} from 'components/Atoms/Download';
import {useImagePicker} from 'hooks';
import {theme} from 'styles/theme';
import {getDownloadUrl} from 'utils/download';
import NoResult from 'components/Atoms/NoResult';
import FileIcon from 'assets/images/file_icon.png';
import MenuDialog from './MenuDialog';

import VersionDialog from './VersionDialog';
import SelectTower from './SelectTower';
import RenameDialogue from './RenameDialog';
import DeleteDialog from './DeleteDialog';

const SNAP_POINTS = [0, '70%'];

function RenderFile(props) {
  const {index, item, toggleMenu, setModalContentType, setModalContent} = props;

  const {title, created} = item;

  const download = useDownload();

  const onPressFile = async file => {
    download.link({
      name: getFileName(file.title),
      data: {project_id: file.project_id, file_url: file.url},
      showAction: false,
      onFinish: ({dir}) => {
        FileViewer.open(`file://${dir}`);
      },
    });
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
          <IconButton
            icon="dots-vertical"
            onPress={() => {
              toggleMenu(index);
              setModalContentType('menu');
              setModalContent(item);
            }}
          />
        </View>
      </View>
    </View>
  );
}

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
  const {activities = []} = useSelector(s => s.designModule);

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
            {/* {modelContentType === 'parentActivity' ? (
              <ActivityModal {...props} />
            ) : null}
            {modelContentType === 'activity' ? (
              <ActivityModal {...props} />
            ) : null}
            {modelContentType === 'version' ? (
              <VersionDialog {...props} />
            ) : null} */}
          </View>
        )}
      />
    </>
  );
}

function FDFiles(props) {
  const {navigation} = props;

  const {
    data,
    towerList,
    onSelectStructure,
    menuId,
    toggleMenu,
    setModalContentType,
    setModalContent,
    onPressFile,
    modelContentType,
    modalContent,
    toggleDialog,
    versionDataHandler,
    activityDataHandler,
    toggleShareDialog,
    handleNewVersionUpload,
    handleDeleteVersion,
    DialogType,
    renameFileHandler,
    deleteFileHandler,
    versionData,
  } = props;

  const structureLabel = 'tower';

  return (
    <View style={styles.container}>
      <Spinner textContent="" />

      <View style={styles.header}>
        <OpacityButton
          opacity={0.18}
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={18} />
        </OpacityButton>
        <Subheading style={styles.Subheading}>Tower</Subheading>
      </View>

      <RenderMenuModal
        {...props}
        {...{
          menuId,
          modelContentType,
          modalContent,
          versionData,
          toggleMenu,
          setModalContentType,
          toggleDialog,
          versionDataHandler,
          activityDataHandler,
          toggleShareDialog,
          handleNewVersionUpload,
          handleDeleteVersion,
        }}
      />

      <RenameDialogue
        visible={DialogType === 'renameFile'}
        toggleDialogue={toggleDialog}
        dialogueContent={modalContent}
        renameFolderHandler={renameFileHandler}
      />
      <DeleteDialog
        visible={DialogType === 'deleteFileFolder'}
        toggleDialogue={toggleDialog}
        dialogueContent={modalContent}
        deleteFileHandler={deleteFileHandler}
      />

      <SelectTower
        navigation={navigation}
        structureLabel={structureLabel}
        onSelectStructure={onSelectStructure}
        towerList={towerList}
      />

      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={console.log('===========> ')}
          />
        }
        data={data}
        extraData={data}
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
              setModalContent,
              onPressFile,
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  Subheading: {
    fontSize: 20,
    color: '#080707',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
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
  },
  verticalFlex: {
    flexDirection: 'column',
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
    paddingBottom: 80,
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
  button: {
    marginRight: 10,
    borderRadius: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
});

export default FDFiles;

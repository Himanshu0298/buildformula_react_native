import {useImagePicker} from 'hooks';
import React, {useEffect, useMemo, useRef} from 'react';
import {SectionList, StyleSheet, View} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

import {
  Caption,
  Divider,
  FAB,
  IconButton,
  Subheading,
  Text,
  Title,
} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import {theme} from 'styles/theme';
import _ from 'lodash';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import dayjs from 'dayjs';
import {useSnackbar} from 'components/Atoms/Snackbar';
import SelectTower from '../Components/SelectTower';
import MenuDialog from '../Components/MenuDialog';
import VersionDialog from '../Components/VersionDialog';
import RenameDialogue from '../Components/RenameDialog';
import DeleteDialog from '../Components/DeleteDialog';

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

function BungalowsList(props) {
  const {navigation} = props;

  const structureLabel = 'Bungalows';
  const snackbar = useSnackbar();

  const {openImagePicker} = useImagePicker();

  const [menuId, setMenuId] = React.useState();
  const [modelContentType, setModalContentType] = React.useState('menu');
  const [modalContent, setModalContent] = React.useState({});
  const [shareDialog, setShareDialog] = React.useState(false);
  const [DialogType, setDialogType] = React.useState();

  const toggleMenu = folderIndex => setMenuId(folderIndex);
  const toggleDialog = v => setDialogType(v);
  const toggleShareDialog = () => setShareDialog(v => !v);

  const renameFileHandler = async () => {
    console.log('===========> ');
    toggleDialog();
  };

  const deleteFileHandler = async () => {
    toggleDialog();
    snackbar.showMessage({
      message: 'File Deleted!',
      variant: 'success',
    });
  };

  const versionDataHandler = async () => {
    setModalContentType('version');
  };

  const activityDataHandler = () => {
    setModalContentType('activity');
  };

  const onChoose = v => {
    handleFileUpload(v);
  };

  const handleFileUpload = () => {
    console.log('===========> ');
  };

  const handleNewVersionUpload = () => {
    openImagePicker({
      type: 'file',
      onChoose: async v => {
        console.log('===========> ');
      },
    });
  };

  const handleDeleteVersion = async () => {
    setModalContentType('version');
    console.log('===========> ');
  };

  const onSelectStructure = () => {
    navigation.navigate('BungalowsFileDetails');
  };

  return (
    <>
      {menuId ? (
        <RenderMenuModal
          {...props}
          {...{
            menuId,
            modelContentType,
            modalContent,
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
      ) : null}
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
      <View styles={styles.container}>
        <View style={styles.headerWrapper}>
          <IconButton
            icon="keyboard-backspace"
            size={20}
            color="#4872f4"
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          />
          <Title> Bungalows</Title>
        </View>
        <SelectTower
          structureLabel={structureLabel}
          navigation={navigation}
          onSelectStructure={onSelectStructure}
        />
      </View>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => openImagePicker({type: 'file', onChoose})}
        medium
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  fab: {
    position: 'absolute',
    right: 25,
    bottom: 30,
    zIndex: 2,
    backgroundColor: theme.colors.primary,
  },
});
export default BungalowsList;

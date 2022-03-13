import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {IconButton, Subheading, Text} from 'react-native-paper';
import FolderIcon from 'assets/images/folder_icon.png';
import {useSelector} from 'react-redux';
import NoResult from 'components/Atoms/NoResult';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import {theme} from 'styles/theme';

function RenderFolder(props) {
  const {
    folder,
    toggleMenu,
    navigation,
    setModalContentType,
    folderIndex,
    setModalContent,
  } = props;
  const {folder_name} = folder;

  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity
        style={{flexGrow: 1}}
        onPress={() => {
          navigation.push('Files', {folder_name, index_of: folder.id});
        }}>
        <View style={styles.sectionContainer}>
          <Image source={FolderIcon} style={styles.PdfIcon} />
          <View>
            <Text numberOfLines={2} style={styles.text}>
              {folder_name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <IconButton
        icon="dots-vertical"
        onPress={() => {
          toggleMenu(folderIndex);
          setModalContentType('menu');
          setModalContent(folder);
        }}
      />
    </View>
  );
}

const ListViewControl = () => {
  return (
    <View style={styles.headerActionContainer}>
      <TouchableOpacity>
        <Foundation
          name="list-bullet"
          size={20}
          color="black"
          style={styles.headerIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Fontisto name="nav-icon-grid" size={20} color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

function FolderSection(props) {
  const {route, menuId, toggleMenu, setModalContentType, setModalContent} =
    props;

  const {index_of: folderDepth = 0} = route?.params || {};

  const {folders} = useSelector(s => s.files);

  const filteredFolders = folders?.[folderDepth] || [];

  return (
    <View style={styles.container}>
      <View style={styles.gridView}>
        <Subheading style={styles.Subheading}>Rough Drawing</Subheading>
      </View>
      {filteredFolders?.length === 0 ? (
        <NoResult title="No Folders Found" />
      ) : null}
      <View>
        {filteredFolders?.map((folder, index) => (
          <RenderFolder
            {...props}
            folder={folder}
            key={index}
            menuId={menuId}
            toggleMenu={toggleMenu}
            setModalContentType={setModalContentType}
            folderDepth={folderDepth}
            folderIndex={filteredFolders.indexOf(folder)}
            setModalContent={setModalContent}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  gridView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerActionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 20,
  },
  headerIcon: {
    marginHorizontal: 10,
  },
  Subheading: {
    fontSize: 20,
    color: '#080707',
    paddingHorizontal: 5,
    paddingVertical: 15,
  },
  PdfIcon: {
    width: 38,
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
  sectionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default FolderSection;

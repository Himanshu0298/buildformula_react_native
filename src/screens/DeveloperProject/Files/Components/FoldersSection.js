import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {IconButton, Subheading, Text} from 'react-native-paper';
import FolderIcon from 'assets/images/folder_icon.png';
import {useSelector} from 'react-redux';
import NoResult from 'components/Atoms/NoResult';

function RenderFolder(props) {
  const {
    folder,
    toggleMenu,
    setModalContentType,
    folderIndex,
    setModalContent,
    navToFiles,
  } = props;
  const {folder_name} = folder;

  const handleNav = () => navToFiles({folder_name, index_of: folder.id});

  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity style={styles.folderContainer} onPress={handleNav}>
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

function FolderSection(props) {
  const {route, menuId, toggleMenu, setModalContentType, setModalContent} =
    props;

  const {index_of: folderDepth = 0} = route?.params || {};

  const {folders} = useSelector(s => s.files);

  const filteredFolders = folders?.[folderDepth] || [];

  return (
    <View style={styles.container}>
      <Subheading style={styles.Subheading}>Folders</Subheading>
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
  Subheading: {
    fontSize: 20,
    color: '#080707',
    alignItems: 'center',
    paddingHorizontal: 10,
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
  folderContainer: {
    flexGrow: 1,
  },
});

export default FolderSection;

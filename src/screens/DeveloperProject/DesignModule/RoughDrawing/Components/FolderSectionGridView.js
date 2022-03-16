import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text} from 'react-native-paper';
import FolderIcon from 'assets/images/folder_icon.png';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
    <View style={styles.folderContainer}>
      <View style={styles.folderIconContainer}>
        <Image source={FolderIcon} style={styles.PdfIcon} />
        <OpacityButton
          opacity={0.01}
          onPress={() => {
            toggleMenu(folderIndex);
            setModalContentType('menu');
            setModalContent(folder);
          }}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={20}
            color="black"
          />
        </OpacityButton>
      </View>
      <View>
        <Text numberOfLines={2} style={styles.text}>
          {folder_name}
        </Text>
      </View>
    </View>
  );
}

const FolderSectionGridView = props => {
  const {route, menuId, toggleMenu, setModalContentType, setModalContent} =
    props;

  const {index_of: folderDepth = 0} = route?.params || {};

  const {folders} = useSelector(s => s.files);

  const filteredFolders = folders?.[folderDepth] || [];

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredFolders}
        extraData={filteredFolders}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyExtractor={index => index.toString()}
        renderItem={({item, index}) => (
          <RenderFolder
            {...props}
            folder={item}
            key={index}
            menuId={menuId}
            toggleMenu={toggleMenu}
            setModalContentType={setModalContentType}
            folderDepth={folderDepth}
            folderIndex={filteredFolders.indexOf(item)}
            setModalContent={setModalContent}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  folderContainer: {
    flex: 1,
  },
  PdfIcon: {
    width: 48,
    height: 48,
    paddingLeft: 10,
    marginBottom: 10,
  },

  folderIconContainer: {
    flexDirection: 'row',
    margin: 5,
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  text: {
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
});

export default FolderSectionGridView;

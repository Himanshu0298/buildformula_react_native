import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FolderIcon from 'assets/images/folder_icon.png';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';

function RenderFolder(props) {
  const {
    folder,
    toggleMenu,
    navigation,
    setModalContentType,
    folderIndex,
    setModalContent,
  } = props;
  const {title} = folder;

  return (
    <View style={styles.folderContainer}>
      <View style={styles.folderIconContainer}>
        <TouchableOpacity
          style={styles.pdfIconContainer}
          onPress={() => {
            navigation.navigate('RoughDrawingFiles', {
              ...props,
              title,
              folderId: folder.id,
            });
          }}>
          <Image source={FolderIcon} style={styles.PdfIcon} />
        </TouchableOpacity>
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
        <Text numberOfLines={1} style={styles.text}>
          {title}
        </Text>
      </View>
    </View>
  );
}

const FolderSectionGridView = props => {
  const {menuId, folders, toggleMenu, setModalContentType, setModalContent} =
    props;
  const {data} = folders;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        extraData={data}
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
            folderIndex={data.indexOf(item)}
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
  pdfIconContainer: {
    marginRight: 5,
  },
});

export default FolderSectionGridView;

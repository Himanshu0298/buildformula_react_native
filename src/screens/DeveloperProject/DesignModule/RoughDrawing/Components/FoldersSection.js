import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import FolderIcon from 'assets/images/folder_icon.png';
import NoResult from 'components/Atoms/NoResult';

function RenderFolder(props) {
  const {
    item,
    index,
    setModalContentType,
    toggleMenu,
    navigation,
    setModalContent,
  } = props;
  const {title} = item;

  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity
        style={{flexGrow: 1}}
        onPress={() => {
          navigation.navigate('RDFileSection', {title, folderId: item.id});
        }}>
        <View style={styles.sectionContainer}>
          <Image source={FolderIcon} style={styles.PdfIcon} />
          <View>
            <Text numberOfLines={2} style={styles.text}>
              {title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <IconButton
        icon="dots-vertical"
        onPress={() => {
          toggleMenu(index);
          setModalContentType('menu');
          setModalContent(item);
        }}
      />
    </View>
  );
}

function FolderSection(props) {
  const {folders, menuId, toggleMenu, setModalContentType, setModalContent} =
    props;
  const {data} = folders || {};

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={data}
          extraData={data}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={styles.contentContainerStyle}
          ListEmptyComponent={<NoResult title="No Data found!" />}
          renderItem={({item, index}) => (
            <RenderFolder
              {...props}
              {...{
                item,
                index,
                menuId,
                toggleMenu,
                setModalContentType,
                setModalContent,
              }}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    paddingBottom: 5,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
});

export default FolderSection;

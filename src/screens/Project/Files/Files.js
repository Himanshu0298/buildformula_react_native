import React from 'react';
import {StyleSheet, View, StatusBar, Image, Alert} from 'react-native';
import {secondaryTheme, theme} from 'styles/theme';
import {
  Button,
  IconButton,
  Subheading,
  TextInput,
  withTheme,
  Text,
  Caption,
  Portal,
  Dialog,
  Menu,
  Divider,
  FAB,
} from 'react-native-paper';
import PdfIcon from 'assets/images/pdf_icon.png';
import FolderIcon from 'assets/images/folder_icon.png';

import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import dayjs from 'dayjs';

function RecentFile({file, toggleMenu, menuId}) {
  const {file_name, date} = file;

  return (
    <View style={styles.recentFiles}>
      <View style={styles.sectionContainer}>
        <Image source={PdfIcon} style={styles.PdfIcon} />
        <View>
          <Text numberOfLines={1} style={styles.text}>
            {file_name}
          </Text>
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <View>
          <Text style={styles.date}>{dayjs(date).format('DD MMM YYYY')}</Text>
        </View>
        <View>
          <Menu
            visible={menuId === file_name}
            onDismiss={toggleMenu}
            anchor={
              <IconButton
                icon="dots-vertical"
                onPress={() => toggleMenu(file_name)}
                theme={secondaryTheme}
              />
            }>
            <Menu.Item
              theme={secondaryTheme}
              onPress={() => {}}
              title="Share"
              icon="share-variant"
            />
            <Divider />
            <Menu.Item
              theme={secondaryTheme}
              onPress={() => {}}
              title="Download"
              icon="download-outline"
            />
            <Divider />
            <Menu.Item
              theme={secondaryTheme}
              onPress={() => {}}
              title="Rename"
              icon="pencil"
            />
            <Divider />
            <Menu.Item
              theme={secondaryTheme}
              onPress={() => {}}
              title="Print"
              icon="printer"
            />
          </Menu>
        </View>
      </View>
    </View>
  );
}

function RenderFolder({folder, toggleMenu, menuId}) {
  const {folder_name} = folder;
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionContainer}>
        <Image source={FolderIcon} style={styles.PdfIcon} />
        <View>
          <Text numberOfLines={1} style={styles.text}>
            {folder_name}
          </Text>
        </View>
      </View>
      <View>
        <Menu
          visible={menuId === folder_name}
          onDismiss={toggleMenu}
          anchor={
            <IconButton
              icon="dots-vertical"
              onPress={() => toggleMenu(folder_name)}
              theme={secondaryTheme}
            />
          }>
          <Menu.Item
            theme={secondaryTheme}
            onPress={() => {}}
            title="Share"
            icon="share-variant"
          />
          <Divider />
          <Menu.Item
            theme={secondaryTheme}
            onPress={() => {}}
            title="Delete"
            icon="download-outline"
          />
          <Divider />
          <Menu.Item
            theme={secondaryTheme}
            onPress={() => {}}
            title="Rename"
            icon="pencil"
          />
        </Menu>
      </View>
    </View>
  );
}

function RenderFile({file, toggleMenu, menuId}) {
  const {file_name, date} = file;

  return (
    <View style={styles.recentFiles}>
      <View style={styles.sectionContainer}>
        <Image source={PdfIcon} style={styles.PdfIcon} />
        <View>
          <Text numberOfLines={1} style={styles.text}>
            {file_name}
          </Text>
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <View>
          <Text style={styles.date}>{dayjs(date).format('DD MMM YYYY')}</Text>
        </View>
        <View>
          <Menu
            visible={menuId === file_name}
            onDismiss={toggleMenu}
            anchor={
              <IconButton
                icon="dots-vertical"
                onPress={() => toggleMenu(file_name)}
                theme={secondaryTheme}
              />
            }>
            <Menu.Item
              theme={secondaryTheme}
              onPress={() => {}}
              title="Share"
              icon="share-variant"
            />
            <Divider />
            <Menu.Item
              theme={secondaryTheme}
              onPress={() => {}}
              title="Download"
              icon="download-outline"
            />
            <Divider />
            <Menu.Item
              theme={secondaryTheme}
              onPress={() => {}}
              title="Rename"
              icon="pencil"
            />
            <Divider />
            <Menu.Item
              theme={secondaryTheme}
              onPress={() => {}}
              title="Print"
              icon="printer"
            />
          </Menu>
        </View>
      </View>
    </View>
  );
}

export default function Files(props) {
  const files = [
    {file_name: 'firstfile', date: new Date()},
    {file_name: 'secondfile', date: new Date()},
    {file_name: 'thirdfile', date: new Date()},
    {file_name: 'fourthfile', date: new Date()},
    {file_name: 'Sixthfile', date: new Date()},
    {file_name: 'Seventfile', date: new Date()},
  ];
  const folders = [
    {folder_name: 'firstFolder'},
    {folder_name: 'SecondFolder'},
    {folder_name: 'thirdFolder'},
    {folder_name: 'fourthFolder'},
  ];

  const [menuId, setMenuId] = React.useState(false);
  const toggleMenu = (currentMenuId) => setMenuId(currentMenuId);
  const [state, setState] = React.useState({open: false});
  const onStateChange = ({open}) => setState({open});
  const {open} = state;

  return (
    <View style={styles.container}>
      <Subheading style={styles.Subheading}>Recent Files</Subheading>
      <ScrollView style={styles.scrollView}>
        <View>
          {files.map((file, index) => (
            <RecentFile
              file={file}
              key={index}
              menuId={menuId}
              toggleMenu={toggleMenu}
            />
          ))}
        </View>
      </ScrollView>
      <Subheading style={styles.Subheading}>Folders</Subheading>
      <ScrollView style={styles.scrollView}>
        <View>
          {folders.map((folder, index) => (
            <RenderFolder
              folder={folder}
              key={index}
              menuId={menuId}
              toggleMenu={toggleMenu}
            />
          ))}
        </View>
      </ScrollView>
      <Subheading style={styles.Subheading}>Files</Subheading>
      <ScrollView style={styles.scrollView}>
        <View>
          {files.map((file, index) => (
            <RenderFile
              file={file}
              key={index}
              menuId={menuId}
              toggleMenu={toggleMenu}
            />
          ))}
        </View>
      </ScrollView>
      {/* <FAB.Group
        open={selectDialog}
        style={styles.fab}
        fabStyle={{
          backgroundColor: selectDialog ? '#fff' : theme.colors.primary,
        }}
        icon={selectDialog ? 'window-close' : 'plus'}
        small
        theme={secondaryTheme}
        onPress={toggleSelectDialog}
        onStateChange={onStateChange}
        actions={[
          {
            icon: 'account-question-outline',
            label: 'New visitor',
            onPress: () => navigation.navigate('AddVisitor'),
          },
          {
            icon: 'arrow-up',
            label: 'Follow up',
            onPress: () => navigation.navigate('AddFollowUp'),
          },
        ]}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    marginHorizontal: 1,
    margin: 2,
  },
  Subheading: {
    fontSize: 24,
    color: '#080707',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  PdfIcon: {
    width: 36,
    height: 36,
    paddingLeft: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  text: {
    color: '#080707',
    paddingLeft: 10,
    fontSize: 14,
    alignItems: 'center',
  },
  date: {
    color: '#080707',
  },
  sectionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recentFiles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 20,
    bottom: 20,
  },
});

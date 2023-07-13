import * as React from 'react';
import {View, StyleSheet} from 'react-native';

import {Divider, IconButton, Menu} from 'react-native-paper';

function MenuDialog(props) {
  const {handleDelete, onUpdate, onShare, item} = props;

  const [versionMenu, setVersionMenu] = React.useState();

  const toggleVersionMenu = () => setVersionMenu(v => !v);

  return (
    <Menu
      visible={versionMenu}
      contentStyle={styles.toggleDotIcon}
      onDismiss={toggleVersionMenu}
      anchor={<IconButton icon="dots-vertical" onPress={toggleVersionMenu} />}>
      <Menu.Item
        onPress={() => {
          toggleVersionMenu();
          onShare();
        }}
        title="Share"
      />
      <Divider />
      <Menu.Item
        onPress={() => {
          toggleVersionMenu();
          onUpdate();
        }}
        title="Rename"
      />
      <Divider />
      <Menu.Item
        onPress={() => {
          toggleVersionMenu();
          handleDelete(item?.id);
        }}
        title="Delete"
      />
      <Divider />
    </Menu>
  );
}

export default MenuDialog;

const styles = StyleSheet.create({
  toggleDotIcon: {
    borderRadius: 15,
  },
});

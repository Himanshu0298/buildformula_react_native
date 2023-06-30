import * as React from 'react';
import {StyleSheet} from 'react-native';

import {Divider, IconButton, Menu} from 'react-native-paper';

function MenuDialog(props) {
  const {onDelete, onUpdate, onUpdateStatus} = props;

  const [versionMenu, setVersionMenu] = React.useState(false);

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
          onUpdate();
        }}
        title="Edit "
      />
      <Divider />
      <Menu.Item
        onPress={() => {
          toggleVersionMenu();
          onDelete();
        }}
        title="Delete"
      />
      {/* <Divider />
      <Menu.Item
        onPress={() => {
          toggleVersionMenu();
          onUpdateStatus();
        }}
        title="update Status"
      /> */}
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

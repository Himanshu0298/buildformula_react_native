import * as React from 'react';
import {StyleSheet} from 'react-native';

import {Divider, IconButton, Menu} from 'react-native-paper';

function MenuDialog(props) {
  const {onDelete, onUpdate, onUpdateStatus} = props;

  const [open, setOpen] = React.useState(false);

  const toggleMenu = () => setOpen(v => !v);

  return (
    <Menu
      visible={open}
      contentStyle={styles.toggleDotIcon}
      onDismiss={toggleMenu}
      anchor={<IconButton icon="dots-vertical" onPress={toggleMenu} />}>
      <Menu.Item
        onPress={() => {
          toggleMenu();
          onUpdate();
        }}
        title="Edit "
      />
      <Divider />
      <Menu.Item
        onPress={() => {
          toggleMenu();
          onDelete();
        }}
        title="Delete"
      />
      <Divider />
      <Menu.Item
        onPress={() => {
          toggleMenu();
          onUpdateStatus();
        }}
        title="Update Status"
      />
    </Menu>
  );
}

export default MenuDialog;

const styles = StyleSheet.create({
  toggleDotIcon: {
    borderRadius: 15,
  },
});

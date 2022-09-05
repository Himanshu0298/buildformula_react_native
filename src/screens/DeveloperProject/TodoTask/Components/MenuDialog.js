import * as React from 'react';
import {View, StyleSheet} from 'react-native';

import {Divider, IconButton, Menu} from 'react-native-paper';

function TaskMenu(props) {
  const {onDelete, onUpdate, onShare, navigation} = props;

  const [versionMenu, setVersionMenu] = React.useState(false);
  const toggleVersionMenu = () => setVersionMenu(v => !v);

  const navToShare = () => navigation.navigate('ShareTask');

  return (
    <View>
      <Menu
        visible={versionMenu}
        contentStyle={styles.toggleDotIcon}
        onDismiss={toggleVersionMenu}
        anchor={
          <IconButton icon="dots-vertical" onPress={toggleVersionMenu} />
        }>
        <Menu.Item onPress={onShare} title="Share" />
        <Divider />
        <Menu.Item onPress={onUpdate} title="Rename" />
        <Divider />
        <Menu.Item onPress={onDelete} title="Delete" />
        <Divider />
      </Menu>
    </View>
  );
}

export default TaskMenu;

const styles = StyleSheet.create({
  toggleDotIcon: {
    borderRadius: 15,
  },
});

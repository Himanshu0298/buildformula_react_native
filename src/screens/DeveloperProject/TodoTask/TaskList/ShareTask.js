import CustomCheckbox from 'components/Atoms/CustomCheckbox';
import CustomDialog from 'components/Atoms/CustomDialog';
import {RenderError} from 'components/Atoms/RenderInput';
import React, {Fragment, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, FlatList} from 'react-native';
import {
  Caption,
  Divider,
  Subheading,
  Text,
  withTheme,
  Searchbar,
  Menu,
  IconButton,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {getShadow} from 'utils';

const USER_ROLES = [
  {id: 1, title: 'Admin'},
  {id: 2, title: 'Editor'},
  {id: 3, title: 'Preview'},
  {id: 4, title: 'None'},
];

function RenderUser(props) {
  const {user, index, selectedUsers, menuIndex, toggleUser, toggleMenu} = props;
  const {first_name, last_name, email, id} = user;

  const selected = selectedUsers.find(i => i.userId === id);

  const selectedRole = selected
    ? USER_ROLES.find(i => i.id === selected?.roleId)
    : USER_ROLES[0];

  return (
    <TouchableOpacity
      key={index.toString()}
      style={styles.itemContainer}
      onPress={() => toggleUser(id)}>
      <View style={styles.rowBetween}>
        <View>
          <View style={styles.row}>
            <CustomCheckbox
              onChange={() => toggleUser(id)}
              checked={Boolean(selected)}
            />
            <Text>
              {first_name} {last_name}
            </Text>
          </View>
          <Caption style={styles.email}>{email}</Caption>
        </View>
        <Menu
          visible={index === menuIndex}
          contentStyle={styles.menu}
          onDismiss={toggleMenu}
          anchor={
            <TouchableOpacity
              onPress={() => toggleMenu(index)}
              style={styles.row}>
              <Caption>{selectedRole?.title}</Caption>
              <IconButton size={20} icon="chevron-down" />
            </TouchableOpacity>
          }>
          {USER_ROLES.map((item, itemIndex) => (
            <Fragment key={itemIndex.toString()}>
              <Menu.Item
                onPress={() => {
                  toggleUser(id, item.id);
                  toggleMenu();
                }}
                title={item.title}
              />
              <Divider />
            </Fragment>
          ))}
        </Menu>
      </View>
    </TouchableOpacity>
  );
}

function ShareTask(props) {
  const {selectedItem, handleClose, handleSubmit} = props;

  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [menuIndex, setMenuIndex] = useState(false);

  const {commonData} = useSelector(s => s.project);
  const {all_users_belongs_to_projects: allUsers} = commonData;

  const filteredUsers = useMemo(() => {
    return allUsers.filter(
      i =>
        i?.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i?.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i?.email?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [allUsers, searchQuery]);

  const toggleMenu = v => setMenuIndex(v);

  const submitForm = () => {
    if (!selectedUsers.length) {
      setError('Select a User to share!');
      return;
    }
    setError();

    const fileType = selectedItem.folder_name ? 'folder' : 'file';

    handleSubmit({
      fileType,
      id: selectedItem.id,
      users: selectedUsers.map(i => i.userId),
      roles: selectedUsers.map(i => i.roleId),
    });
    handleClose();
  };

  const onSearch = v => {
    setSearchQuery(v);
  };

  const toggleUser = (userId, roleId) => {
    const _selectedUsers = [...selectedUsers];
    const index = _selectedUsers.findIndex(i => i.userId === userId);

    if (index === -1) {
      _selectedUsers.push({userId, roleId: roleId || 1});
    } else if (roleId && _selectedUsers[index].roleId !== roleId) {
      _selectedUsers[index] = {..._selectedUsers[index], roleId};
    } else {
      _selectedUsers.splice(index, 1);
    }

    setSelectedUsers(_selectedUsers);
  };

  const renderDivider = () => <Divider />;

  return (
    <CustomDialog {...props} title="Share File" submitForm={submitForm}>
      <View style={styles.contentContainer}>
        <Subheading>Select person to share</Subheading>
        <Searchbar
          style={styles.searchBar}
          value={searchQuery}
          onChangeText={onSearch}
        />

        {error ? (
          <View style={styles.errorContainer}>
            <RenderError error={error} />
          </View>
        ) : null}

        <FlatList
          data={filteredUsers}
          extraData={filteredUsers}
          contentContainerStyle={styles.scrollContainer}
          keyExtractor={(_, index) => index.toString()}
          ItemSeparatorComponent={renderDivider}
          renderItem={({item, index}) => (
            <RenderUser
              user={item}
              index={index}
              menuIndex={menuIndex}
              selectedUsers={selectedUsers}
              toggleUser={toggleUser}
              toggleMenu={toggleMenu}
            />
          )}
        />
      </View>
    </CustomDialog>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    marginVertical: 10,
  },
  contentContainer: {
    padding: 15,
    flexGrow: 1,
  },
  searchBar: {
    backgroundColor: '#EAECF11A',
    borderWidth: 1,
    borderColor: 'rgba(4, 29, 54, 0.1)',
    marginTop: 10,
    ...getShadow(0),
  },
  itemContainer: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  email: {
    marginLeft: 35,
    lineHeight: 13,
  },
  menu: {
    borderRadius: 10,
  },
});

export default withTheme(ShareTask);

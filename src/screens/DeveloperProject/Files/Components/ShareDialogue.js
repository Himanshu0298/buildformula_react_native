import CustomCheckbox from 'components/Atoms/CustomCheckbox';
import CustomDialog from 'components/Atoms/CustomDialog';
import {RenderError} from 'components/Atoms/RenderInput';
import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
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

function ShareDialog(props) {
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
    } else {
      setError();
    }

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

  return (
    <CustomDialog {...props} title={'Share File'} submitForm={submitForm}>
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

        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {filteredUsers.map((user, index) => {
            const {first_name, last_name, email, id} = user;

            const selected = selectedUsers.find(i => i.userId === id);

            const selectedRole = selected
              ? USER_ROLES.find(i => i.id === selected.roleId)
              : USER_ROLES[0];

            return (
              <>
                <TouchableOpacity
                  key={index}
                  style={styles.itemContainer}
                  onPress={() => toggleUser(id)}>
                  <View style={styles.rowBetween}>
                    <View>
                      <View style={styles.row}>
                        <CustomCheckbox
                          onChange={() => toggleUser(id)}
                          checked={selected}
                        />
                        <Text>
                          {first_name} {last_name}
                        </Text>
                      </View>
                      <Caption style={{marginLeft: 35, lineHeight: 13}}>
                        {email}
                      </Caption>
                    </View>
                    <Menu
                      visible={index === menuIndex}
                      contentStyle={{borderRadius: 10}}
                      onDismiss={toggleMenu}
                      anchor={
                        <TouchableOpacity
                          onPress={() => toggleMenu(index)}
                          style={styles.row}>
                          <Caption>{selectedRole?.title}</Caption>
                          <IconButton size={20} icon="chevron-down" />
                        </TouchableOpacity>
                      }>
                      {USER_ROLES.map((item, i) => (
                        <>
                          <Menu.Item
                            key={`${index}_${i}`}
                            onPress={() => {
                              toggleUser(id, item.id);
                              toggleMenu();
                            }}
                            title={item.title}
                          />
                          <Divider />
                        </>
                      ))}
                    </Menu>
                  </View>
                </TouchableOpacity>
                <Divider />
              </>
            );
          })}
        </ScrollView>
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
});

export default withTheme(React.memo(ShareDialog));

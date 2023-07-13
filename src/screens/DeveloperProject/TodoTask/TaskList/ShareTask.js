import CustomCheckbox from 'components/Atoms/CustomCheckbox';
import CustomDialog from 'components/Atoms/CustomDialog';
import {RenderError} from 'components/Atoms/RenderInput';
import React, {useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, FlatList} from 'react-native';
import {
  Caption,
  Divider,
  Subheading,
  Text,
  withTheme,
  Searchbar,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {getShadow} from 'utils';

function RenderUser(props) {
  const {user, index, selectedUsers, toggleUser} = props;
  const {name, email, id} = user;

  const selected = selectedUsers?.find(i => i.userId === id);

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
            <Text>{name}</Text>
          </View>
          <Caption style={styles.email}>{email}</Caption>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function ShareTask(props) {
  const {selectedList, handleClose, handleSubmit} = props;

  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [menuIndex, setMenuIndex] = useState(false);

  const {assigntoData} = useSelector(s => s.sales);

  function getUniqueOptions(options) {
    const uniqueData = options?.filter((obj, index) => {
      return (
        index ===
        options?.findIndex(
          o => obj.name === o.name || obj.id === o.id || obj.email === o.email,
        )
      );
    });

    return uniqueData;
  }

  const assigntoOptions = useMemo(() => {
    return getUniqueOptions(
      assigntoData?.map(i => ({
        id: i.id,
        name: `${i.first_name} ${i.last_name}`,
        email: i.email,
      })),
    );
  }, [assigntoData]);

  const filteredUsers = useMemo(() => {
    return assigntoOptions.filter(
      i =>
        i?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i?.email?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [assigntoOptions, searchQuery]);

  const toggleMenu = v => setMenuIndex(v);

  const submitForm = () => {
    if (!selectedUsers.length) {
      setError('Select a user to share!');
      return;
    }
    setError();

    const usersList = selectedUsers.map(e => e.userId);

    // const fileType = selectedItem.folder_name ? 'folder' : 'file';

    handleSubmit(selectedList?.id || selectedList, usersList);
    setError(undefined);
    setSelectedUsers(undefined);
    handleClose();
  };

  const onSearch = v => {
    setSearchQuery(v);
  };

  const toggleUser = userId => {
    const _selectedUsers = [...selectedUsers];
    const index = _selectedUsers?.findIndex(i => i.userId === userId);

    if (index === -1) {
      _selectedUsers.push({userId});
    } else {
      _selectedUsers.splice(index, 1);
    }

    setSelectedUsers(_selectedUsers);
  };

  const renderDivider = () => <Divider />;

  return (
    <CustomDialog {...props} title="Share List" submitForm={submitForm}>
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

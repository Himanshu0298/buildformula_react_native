import CustomCheckbox from 'components/Atoms/CustomCheckbox';
import CustomDialog from 'components/Atoms/CustomDialog';
import {RenderError} from 'components/Atoms/RenderInput';
import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Caption,
  Divider,
  IconButton,
  Searchbar,
  Subheading,
  Text,
  withTheme,
} from 'react-native-paper';
import {getShadow} from 'utils';

const USERS = [
  {id: 1, name: 'Rohan Sharma'},
  {id: 2, name: 'Mukul Sharma'},
  {id: 3, name: 'Mukul Sharma'},
  {id: 4, name: 'Mukul Sharma'},
];

function AddReviewerDialog(props) {
  const {handleSubmit, handleClose} = props;

  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const filteredUsers = useMemo(() => {
    return USERS.filter(i =>
      i.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const submitForm = () => {
    handleSubmit();
    handleClose();
  };

  const onSearch = v => {
    setSearchQuery(v);
  };

  const toggleUser = id => {
    const _selectedUsers = [...selectedUsers];
    const index = _selectedUsers.indexOf(id);

    if (index === -1) {
      _selectedUsers.push(id);
    } else {
      _selectedUsers.splice(index, 1);
    }

    if (_selectedUsers.length > 3) {
      setError('Max 3 reviewers only!');
      return;
    } else {
      setError();
    }

    setSelectedUsers(_selectedUsers);
  };

  return (
    <CustomDialog {...props} title="Reviewer" submitForm={submitForm}>
      <View style={styles.contentContainer}>
        <Subheading>Select Reviewer</Subheading>
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
            const {name, id} = user;
            return (
              <>
                <TouchableOpacity
                  key={index}
                  style={styles.itemContainer}
                  onPress={() => toggleUser(id)}>
                  <View style={styles.row}>
                    <CustomCheckbox
                      onChange={() => toggleUser(id)}
                      checked={selectedUsers.includes(id)}
                    />
                    <Text>{name}</Text>
                  </View>
                  <Caption style={{marginLeft: 35, lineHeight: 13}}>
                    rohan@gmail.com
                  </Caption>
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

function ReviewPanel(props) {
  const [dialog, setDialog] = useState(false);

  const toggleDialog = () => setDialog(v => !v);

  const handleSubmit = () => {};

  return (
    <View style={styles.container}>
      {dialog ? (
        <AddReviewerDialog
          {...props}
          open={dialog}
          handleClose={toggleDialog}
          handleSubmit={handleSubmit}
        />
      ) : null}
      <Text>Review</Text>
      <IconButton
        size={20}
        style={styles.plusButton}
        icon="plus"
        onPress={toggleDialog}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F2F4F5',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  errorContainer: {
    marginVertical: 10,
  },
  plusButton: {
    backgroundColor: '#fff',
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
});

export default withTheme(ReviewPanel);

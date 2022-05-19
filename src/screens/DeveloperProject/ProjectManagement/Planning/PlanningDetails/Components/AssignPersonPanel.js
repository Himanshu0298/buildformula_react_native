import React, {useState, useMemo} from 'react';
import {ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  Caption,
  Divider,
  IconButton,
  Searchbar,
  Subheading,
  Text,
  withTheme,
} from 'react-native-paper';
import CustomDialog from 'components/Atoms/CustomDialog';
import {RenderError} from 'components/Atoms/RenderInput';
import {getShadow} from 'utils';
import CustomCheckbox from 'components/Atoms/CustomCheckbox';

const BANK_PERSONS = [
  {id: 1, name: 'Rohan Sharma'},
  {id: 2, name: 'Mukul Sharma'},
];

function AssignPersonDialog(props) {
  const {handleSubmit, handleClose} = props;

  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const filteredUsers = useMemo(() => {
    return BANK_PERSONS.filter(i =>
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

    setSelectedUsers(_selectedUsers);
  };

  return (
    <CustomDialog {...props} title="Assign Person" submitForm={submitForm}>
      <View style={styles.contentContainer}>
        <Subheading>
          {selectedUsers.length
            ? `${selectedUsers.length} selected`
            : 'Select your bank person'}
        </Subheading>
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

function AssignPersonPanel(props) {
  const [dialog, setDialog] = useState(false);

  const toggleDialog = () => setDialog(v => !v);

  const handleSubmit = () => {
    console.log('-------->', handleSubmit);
  };
  return (
    <View style={styles.container}>
      {dialog ? (
        <AssignPersonDialog
          {...props}
          open={dialog}
          handleClose={toggleDialog}
          handleSubmit={handleSubmit}
        />
      ) : null}
      <Text>Assign person</Text>
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
  plusButton: {
    backgroundColor: '#fff',
  },
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
});

export default withTheme(AssignPersonPanel);

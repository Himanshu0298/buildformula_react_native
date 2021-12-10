import CustomCheckbox from 'components/Atoms/CustomCheckbox';
import CustomDialog from 'components/Atoms/CustomDialog';
import RenderInput from 'components/Atoms/RenderInput';
import {cloneDeep} from 'lodash';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {IconButton, Text, withTheme, TextInput} from 'react-native-paper';

const CHECKLIST_DATA = [
  {
    title: 'Checklist heading',
    items: [
      {title: 'item 1', status: true},
      {title: 'item 2', status: true},
    ],
  },
];

function AddChecklistDialog(props) {
  const {theme, handleSubmit} = props;

  const [checklists, setChecklists] = useState(CHECKLIST_DATA);
  const [checklistName, setChecklistName] = useState();
  const [itemName, setItemName] = useState();
  const [addItemIndex, setAddItemIndex] = useState();

  const submitForm = () => handleSubmit(checklists);
  const toggleAddItem = v => setAddItemIndex(v);

  const addChecklist = () => {
    const _checklists = cloneDeep(checklists);

    _checklists.push({title: checklistName, items: []});

    setChecklists(_checklists);
    setChecklistName();
  };

  const addChecklistItem = () => {
    const _checklists = cloneDeep(checklists);

    _checklists[addItemIndex].items.push({title: itemName, status: true});

    setChecklists(_checklists);
    setItemName();
    setAddItemIndex();
  };

  const deleteChecklist = index => {
    const _checklists = cloneDeep(checklists);
    _checklists.splice(index, 1);

    setChecklists(_checklists);
  };

  const toggleItemStatus = (checklistIndex, itemIndex) => {
    const _checklists = cloneDeep(checklists);
    const {status} = _checklists[checklistIndex].items[itemIndex];
    _checklists[checklistIndex].items[itemIndex].status = !status;

    setChecklists(_checklists);
  };

  const removeItem = (checklistIndex, itemIndex) => {
    const _checklists = cloneDeep(checklists);
    _checklists[checklistIndex].items.splice(itemIndex, 1);

    setChecklists(_checklists);
  };

  return (
    <CustomDialog {...props} title="Checklist" submitForm={submitForm}>
      <View style={styles.contentContainer}>
        <RenderInput
          id="checklistName"
          label="Checklist Name"
          placeholder="Add checklist heading"
          value={checklistName}
          roundness={5}
          onChangeText={setChecklistName}
          right={
            <TextInput.Icon size={20} name="check" onPress={addChecklist} />
          }
        />

        <View style={{flexGrow: 1, marginTop: 10}}>
          <ScrollView>
            {checklists.map((checklist, index) => {
              const {title, items} = checklist;
              return (
                <View
                  key={index}
                  style={[
                    styles.checklistContainer,
                    {borderColor: theme.colors.primary},
                  ]}>
                  <View style={styles.rowBetween}>
                    <Text>{title}</Text>
                    <IconButton
                      icon="delete"
                      size={16}
                      color={theme.colors.red}
                      onPress={() => deleteChecklist(index)}
                    />
                  </View>
                  {items.map((item, i) => {
                    return (
                      <View key={i} style={styles.rowBetween}>
                        <CustomCheckbox
                          label={item.title}
                          checked={item.status}
                          onChange={() => toggleItemStatus(index, i)}
                        />
                        <IconButton
                          icon="close"
                          size={14}
                          color={theme.colors.red}
                          onPress={() => removeItem(index, i)}
                        />
                      </View>
                    );
                  })}
                  {addItemIndex === index ? (
                    <RenderInput
                      id="itemName"
                      label="Add new"
                      placeholder="Add checklist item"
                      value={itemName}
                      roundness={5}
                      onChangeText={setItemName}
                      right={
                        <TextInput.Icon
                          size={20}
                          name="check"
                          onPress={addChecklistItem}
                        />
                      }
                    />
                  ) : (
                    <CustomCheckbox
                      label="Add item"
                      checked={false}
                      onChange={() => toggleAddItem(index)}
                    />
                  )}
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </CustomDialog>
  );
}

function ChecklistPanel(props) {
  const [dialog, setDialog] = useState(false);

  const toggleDialog = () => setDialog(v => !v);

  const handleSubmit = () => {};

  return (
    <View style={styles.container}>
      {dialog ? (
        <AddChecklistDialog
          {...props}
          open={dialog}
          handleClose={toggleDialog}
          handleSubmit={handleSubmit}
        />
      ) : null}
      <Text>Checklist</Text>
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
  contentContainer: {
    padding: 10,
    flexGrow: 1,
  },
  checklistContainer: {
    padding: 10,
    borderWidth: 0.3,
    marginVertical: 10,
    borderRadius: 5,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default withTheme(ChecklistPanel);

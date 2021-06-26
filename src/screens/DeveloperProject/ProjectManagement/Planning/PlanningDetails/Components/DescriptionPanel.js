import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Text, withTheme} from 'react-native-paper';
import {RenderError} from 'components/Atoms/RenderInput';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import CustomDialog from 'components/Atoms/CustomDialog';

function AddDescriptionDialog(props) {
  const {handleSubmit} = props;

  const [error, setError] = useState('');
  const [description, setDescription] = useState('');

  const submitForm = () => {
    if (!description) {
      setError('Description is required');
      return;
    }

    handleSubmit(description);
  };

  return (
    <CustomDialog {...props} title="Description" submitForm={submitForm}>
      <View style={styles.contentContainer}>
        {error ? (
          <View style={styles.errorContainer}>
            <RenderError error={error} />
          </View>
        ) : null}

        <RenderTextBox
          name="description"
          label={'Description'}
          value={description}
          onChangeText={setDescription}
          numberOfLines={6}
        />
      </View>
    </CustomDialog>
  );
}

function DescriptionPanel(props) {
  const [dialog, setDialog] = useState(false);

  const toggleDialog = () => setDialog(v => !v);

  const handleSubmit = () => {};

  return (
    <View style={styles.container}>
      {dialog ? (
        <AddDescriptionDialog
          {...props}
          open={dialog}
          handleClose={toggleDialog}
          handleSubmit={handleSubmit}
        />
      ) : null}
      <Text>Description</Text>
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
    marginBottom: 10,
  },
  contentContainer: {
    padding: 10,
  },
});

export default withTheme(DescriptionPanel);

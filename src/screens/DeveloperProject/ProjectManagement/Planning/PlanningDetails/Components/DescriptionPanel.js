import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Subheading, Text, withTheme} from 'react-native-paper';
import Modal from 'react-native-modal';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RenderError} from 'components/Atoms/RenderInput';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import {SafeAreaView} from 'react-native-safe-area-context';

function AddDescriptionDialog(props) {
  const {theme, open, handleClose, handleSubmit} = props;

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
    <Modal
      isVisible={open}
      backdropOpacity={0.4}
      onBackButtonPress={handleClose}
      onBackdropPress={handleClose}
      style={{justifyContent: 'flex-end', margin: 0}}>
      <View style={styles.modalContainer}>
        <SafeAreaView>
          <View style={styles.headerContainer}>
            <View style={styles.titleContainer}>
              <Subheading style={{color: theme.colors.primary}}>
                Description
              </Subheading>
            </View>
            <View style={styles.actionContainer}>
              <OpacityButton
                opacity={0.1}
                color={theme.colors.primary}
                style={{borderRadius: 50, marginRight: 10}}
                onPress={submitForm}>
                <MaterialIcon
                  name="check"
                  color={theme.colors.primary}
                  size={18}
                />
              </OpacityButton>
              <OpacityButton
                opacity={0.1}
                color={theme.colors.error}
                style={{borderRadius: 50}}
                onPress={handleClose}>
                <MaterialIcon
                  name="close"
                  color={theme.colors.error}
                  size={18}
                />
              </OpacityButton>
            </View>
          </View>

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
        </SafeAreaView>
      </View>
    </Modal>
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
  headerContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {},
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    height: '100%',
  },
  errorContainer: {
    marginBottom: 10,
  },
  contentContainer: {
    padding: 10,
  },
});

export default withTheme(DescriptionPanel);

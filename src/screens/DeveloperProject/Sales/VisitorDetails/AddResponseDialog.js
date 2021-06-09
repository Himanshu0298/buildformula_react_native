import {Subheading, withTheme} from 'react-native-paper';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {useTranslation} from 'react-i18next';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {RenderError} from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import {StyleSheet, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

function AddResponseDialog(props) {
  const {theme, open, handleClose, handleSubmit} = props;

  const {t} = useTranslation();

  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [response, setResponse] = useState('');

  const submitForm = () => {
    handleSubmit();
    handleClose();
  };

  return (
    <Modal
      isVisible={open}
      backdropOpacity={0.4}
      onBackButtonPress={handleClose}
      onBackdropPress={handleClose}
      style={{justifyContent: 'flex-end', margin: 0}}>
      <ActionSheetProvider>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.titleContainer}>
              <Subheading style={{color: theme.colors.primary}}>
                Add customer response
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
            <RenderSelect
              name="status"
              label={t('label_status')}
              options={[]}
              containerStyles={styles.input}
              value={status}
              onSelect={setStatus}
            />

            <View style={styles.responseContainer}>
              <RenderTextBox
                name="response"
                label={t('label_customer_response')}
                numberOfLines={8}
                value={response}
                onSelect={setResponse}
              />
            </View>
          </View>
        </View>
      </ActionSheetProvider>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    padding: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorContainer: {
    marginBottom: 10,
  },
  titleContainer: {},
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    paddingVertical: 15,
  },
  responseContainer: {
    marginTop: 15,
  },
});

export default withTheme(AddResponseDialog);

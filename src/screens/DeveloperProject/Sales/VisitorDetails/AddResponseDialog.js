import {withTheme} from 'react-native-paper';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {RenderError} from 'components/Atoms/RenderInput';
import RenderSelect from 'components/Atoms/RenderSelect';
import RenderTextBox from 'components/Atoms/RenderTextbox';
import {StyleSheet, View} from 'react-native';
import CustomDialog from 'components/Atoms/CustomDialog';

function AddResponseDialog(props) {
  const {handleClose, handleSubmit} = props;

  const {t} = useTranslation();

  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [response, setResponse] = useState('');

  const submitForm = () => {
    handleSubmit();
    handleClose();
  };

  return (
    <CustomDialog
      {...props}
      title="Add customer response"
      submitForm={submitForm}>
      <ActionSheetProvider>
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
      </ActionSheetProvider>
    </CustomDialog>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    marginBottom: 10,
  },
  contentContainer: {
    padding: 15,
  },
  responseContainer: {
    marginTop: 15,
  },
});

export default withTheme(AddResponseDialog);

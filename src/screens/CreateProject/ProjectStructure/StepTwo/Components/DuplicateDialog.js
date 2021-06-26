import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Subheading, withTheme} from 'react-native-paper';
import RenderSelect from 'components/Atoms/RenderSelect';
import {useTranslation} from 'react-i18next';
import CustomCheckbox from 'components/Atoms/CustomCheckbox';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {cloneDeep} from 'lodash';
import {RenderError} from 'components/Atoms/RenderInput';
import CustomDialog from 'components/Atoms/CustomDialog';

function RenderCheckbox(props) {
  return (
    <View style={styles.checkboxContainer}>
      <CustomCheckbox {...props} />
    </View>
  );
}

function DuplicateDialog(props) {
  const {open, title, options, handleClose, handleSubmit} = props;

  const {t} = useTranslation();

  const [duplicateFrom, setDuplicateFrom] = useState();
  const [duplicateTo, setDuplicateTo] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (error) {
      setError('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const addToDuplicateList = option => {
    const _duplicateTo = cloneDeep(duplicateTo);
    const index = _duplicateTo.findIndex(v => v === option);
    if (index > -1) {
      _duplicateTo.splice(index, 1);
    } else {
      _duplicateTo.push(option);
    }

    setDuplicateTo(_duplicateTo);
  };

  const submitForm = () => {
    if (!duplicateFrom) {
      setError('Select Duplicate from option');
      return;
    }
    if (!duplicateTo.length) {
      setError('Select Duplicate to option');
      return;
    }

    handleSubmit(duplicateFrom, duplicateTo);
    handleClose();
  };

  const checkedAll = options.length === duplicateTo.length;

  return (
    <CustomDialog {...props} title={title} submitForm={submitForm}>
      <ActionSheetProvider>
        <View style={styles.contentContainer}>
          {error ? (
            <View style={styles.errorContainer}>
              <RenderError error={error} />
            </View>
          ) : null}
          <RenderSelect
            name="duplicateFrom"
            label={t('label_duplicate_from')}
            options={options}
            containerStyles={styles.input}
            value={duplicateFrom}
            onSelect={setDuplicateFrom}
          />

          <Subheading style={{marginTop: 20, paddingLeft: 10}}>To</Subheading>
          <View style={{flexDirection: 'row'}}>
            <RenderCheckbox
              label="All"
              checked={checkedAll}
              onChange={() =>
                setDuplicateTo(checkedAll ? [] : options.map(i => i.value))
              }
            />
          </View>

          <View style={styles.optionsContainer}>
            {options.map((option, i) => {
              return (
                <RenderCheckbox
                  key={i}
                  label={option.label}
                  checked={duplicateTo.includes(option.value)}
                  onChange={() => addToDuplicateList(option.value)}
                />
              );
            })}
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
    padding: 10,
  },
  checkboxContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    paddingRight: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

export default withTheme(DuplicateDialog);

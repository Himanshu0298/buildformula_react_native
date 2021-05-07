import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Subheading, withTheme} from 'react-native-paper';
import Modal from 'react-native-modal';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RenderSelect from 'components/Atoms/RenderSelect';
import {useTranslation} from 'react-i18next';
import CustomCheckbox from 'components/Atoms/CustomCheckbox';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {cloneDeep} from 'lodash';

function RenderCheckbox(props) {
  return (
    <View style={styles.checkboxContainer}>
      <CustomCheckbox {...props} />
    </View>
  );
}

function DuplicateDialog(props) {
  const {theme, open, title, options, handleClose, handleSubmit} = props;

  const {t} = useTranslation();

  const [duplicateFrom, setDuplicateFrom] = useState();
  const [duplicateTo, setDuplicateTo] = useState([]);

  const addToDuplicateList = (option) => {
    const _duplicateTo = cloneDeep(duplicateTo);
    const index = _duplicateTo.findIndex((v) => v === option);
    if (index > -1) {
      _duplicateTo.splice(index, 1);
    } else {
      _duplicateTo.push(option);
    }

    setDuplicateTo(_duplicateTo);
  };

  const checkedAll = options.length === duplicateTo.length;

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
                {title}
              </Subheading>
            </View>
            <View style={styles.actionContainer}>
              <OpacityButton
                opacity={0.1}
                color={theme.colors.primary}
                style={{borderRadius: 50, marginRight: 10}}
                onPress={() => {
                  handleSubmit(duplicateFrom, duplicateTo);
                  handleClose();
                }}>
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
                  setDuplicateTo(checkedAll ? [] : options.map((i) => i.value))
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
        </View>
      </ActionSheetProvider>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
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

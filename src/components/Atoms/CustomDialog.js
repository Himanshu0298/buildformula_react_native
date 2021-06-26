import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Subheading, withTheme} from 'react-native-paper';
import Modal from 'react-native-modal';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import PropTypes from 'prop-types';

function CustomDialog(props) {
  const {theme, open, title, handleClose, submitForm, children} = props;

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
                {title}
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
          {children}
        </SafeAreaView>
      </View>
    </Modal>
  );
}

CustomDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
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
});

export default withTheme(CustomDialog);

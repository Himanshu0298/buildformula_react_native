import React from 'react';
import {StyleSheet, View} from 'react-native';
import {withTheme} from 'react-native-paper';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import {theme} from 'styles/theme';

function RenderOpacityButton(props) {
  const {handleClose, submitForm} = props;

  return (
    <View style={styles.actionContainer}>
      <OpacityButton
        opacity={0.1}
        color={theme.colors.primary}
        style={styles.checkButton}
        onPress={submitForm}>
        <MaterialIcon name="check" color={theme.colors.primary} size={18} />
      </OpacityButton>
      <OpacityButton
        opacity={0.1}
        color={theme.colors.error}
        style={styles.closeButton}
        onPress={handleClose}>
        <MaterialIcon name="close" color={theme.colors.error} size={18} />
      </OpacityButton>
    </View>
  );
}

OpacityButton.propTypes = {
  handleClose: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  checkButton: {
    borderRadius: 50,
    marginRight: 10,
  },
  closeButton: {
    borderRadius: 50,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default withTheme(RenderOpacityButton);

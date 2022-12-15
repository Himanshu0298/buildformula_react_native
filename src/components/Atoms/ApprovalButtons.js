import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import PropTypes from 'prop-types';

function ApproveButtons(props) {
  const {
    rejectLabel,
    approveLabel,
    approveDisabled,
    style,
    onReject,
    onApprove,
  } = props;

  return (
    <View style={[styles.actionContainer, style]}>
      <Button
        style={styles.approveButton}
        contentStyle={styles.buttonLabel}
        labelStyle={{color: 'red'}}
        buttonColor="red"
        mode="outlined"
        onPress={onReject}>
        {rejectLabel || 'Reject'}
      </Button>
      <Button
        style={styles.approveButton}
        contentStyle={styles.buttonLabel}
        disabled={approveDisabled}
        mode="contained"
        onPress={onApprove}>
        {approveLabel || 'Approve'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 2,
    marginHorizontal: -5,
  },
  approveButton: {
    color: 'red',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonLabel: {
    padding: 3,
  },
});

ApproveButtons.defaultProps = {
  rejectLabel: 'Reject',
  approveLabel: 'Approve',
  approveDisabled: false,
};

ApproveButtons.propTypes = {
  rejectLabel: PropTypes.string,
  approveLabel: PropTypes.string,
  onReject: PropTypes.func.isRequired,
  onApprove: PropTypes.func.isRequired,
  approveDisabled: PropTypes.bool,
};

export default ApproveButtons;

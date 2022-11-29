import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import PropTypes from 'prop-types';

function ApproveButtons(props) {
  const {
    rejectLabel,
    approvedLabel,
    approveDisabled,
    style,
    onReject,
    onApprove,
  } = props;

  return (
    <View style={[styles.actionContainer, style]}>
      <Button
        style={styles.rejectButton}
        contentStyle={styles.buttonLabel}
        labelStyle={styles.label}
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
        {approvedLabel || 'Approved'}
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
  buttonLabel: {
    padding: 3,
  },
  rejectButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#FF5D5D',
  },
  approveButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    color: 'white',
  },
});

ApproveButtons.defaultProps = {
  rejectLabel: 'Reject',
  approvedLabel: 'Approved',
  approveDisabled: false,
};

ApproveButtons.propTypes = {
  rejectLabel: PropTypes.string,
  approvedLabel: PropTypes.string,
  onReject: PropTypes.func.isRequired,
  onApproved: PropTypes.func.isRequired,
  approveDisabled: PropTypes.bool,
};

export default ApproveButtons;

import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Subheading, withTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {theme} from 'styles/theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ActivityChatModal from './Components/ActivityChat';
import FileSection from './Components/FileSection';

function BankLoans(props) {
  const {route} = props;
  const {project_id, unit} = route?.params || {};

  const [activityModal, setActivityModal] = React.useState(true);

  const {bankDetails} = useSelector(({customer}) => customer);

  const toggleActivityModal = () => setActivityModal((v) => !v);

  return (
    <>
      <ActivityChatModal
        open={activityModal}
        handleClose={toggleActivityModal}
      />
      <View style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <View style={styles.headingRow}>
            <Subheading
              style={{
                color: theme.colors.primary,
              }}>
              FINALIZED BANK DETAILS
            </Subheading>
            <Button
              icon="format-list-bulleted"
              mode="text"
              onPress={toggleActivityModal}>
              Activity
            </Button>
          </View>
          <FileSection {...props} {...{bankDetails}} />
        </KeyboardAwareScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    paddingVertical: 7,
  },
  actionContainer: {
    marginTop: 15,
  },
  submitButton: {
    width: '100%',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: theme.colors.primary,
  },
  fileHeading: {
    marginTop: 20,
    marginBottom: 10,
  },
  filesContainer: {
    paddingTop: 10,
  },
  fileContainer: {
    flexDirection: 'row',
  },
  pdfIcon: {
    height: 40,
    width: 40,
  },
  fileContentContainer: {
    flexGrow: 1,
    paddingLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default withTheme(BankLoans);

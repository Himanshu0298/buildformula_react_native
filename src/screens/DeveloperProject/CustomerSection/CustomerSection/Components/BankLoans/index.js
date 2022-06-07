import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Subheading, withTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {theme} from 'styles/theme';
import {getPermissions} from 'utils';
import {Tabs} from 'react-native-collapsible-tab-view';
import ActivityChatModal from './Components/ActivityChat';
import FileSection from './Components/FileSection';
import BankDetailsSection from './Components/BankDetailsSection';
import ShareFiles from './Components/ShareFiles';

function BankLoans(props) {
  const {isCustomer} = props;
  const modulePermissions = getPermissions('Bank Loan');

  const [activityModal, setActivityModal] = React.useState(false);
  const [shareModal, setShareModal] = React.useState(false);

  const {bankDetails} = useSelector(s => s.customer);

  const toggleActivityModal = () => setActivityModal(v => !v);
  const toggleShareModal = () => setShareModal(v => !v);

  const ContainerView = isCustomer ? ScrollView : Tabs.ScrollView;

  return (
    <>
      <ActivityChatModal
        open={activityModal}
        handleClose={toggleActivityModal}
      />
      <ShareFiles open={shareModal} handleClose={toggleShareModal} />
      <ContainerView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.headingRow}>
            <Subheading style={styles.heading}>BANK DETAILS</Subheading>
            <Button
              icon="format-list-bulleted"
              mode="text"
              onPress={toggleActivityModal}>
              Activity
            </Button>
          </View>
          <BankDetailsSection
            {...props}
            {...{bankDetails, modulePermissions}}
          />
          <FileSection
            {...props}
            {...{bankDetails, modulePermissions, toggleShareModal}}
          />
        </View>
      </ContainerView>
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
  heading: {
    fontSize: 14,
    color: theme.colors.primary,
  },
});

export default withTheme(BankLoans);

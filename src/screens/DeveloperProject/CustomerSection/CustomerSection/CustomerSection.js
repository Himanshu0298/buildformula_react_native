import NoResult from 'components/Atoms/NoResult';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Divider, withTheme, Title, IconButton} from 'react-native-paper';
import {useSelector} from 'react-redux';
import useCustomerActions from 'redux/actions/customerActions';
import {MaterialTabBar, Tabs} from 'react-native-collapsible-tab-view';

import {theme} from 'styles/theme';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import {useCustomerLoading} from 'redux/selectors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useFileActions from 'redux/actions/fileActions';
import {
  Account,
  BankLoans,
  BookingDetails,
  Details,
  Files,
  ModifyRequest,
} from './Components';
import DetailsHeader from './Components/DetailsHeader';

const TABS = [
  {key: 0, title: 'DETAILS', id: 14},
  {key: 1, title: 'BOOKING FORM', id: 15},
  {key: 2, title: 'BANK LOANS', id: 16},
  {key: 3, title: 'ACCOUNT', id: 17},
  {key: 4, title: 'MODIFY REQUEST', id: 18},
  {key: 5, title: 'FILES', id: 19},
];

function filterTabs(tabs, permissions) {
  return tabs.filter(tab => {
    return permissions[tab.id] && !permissions[tab.id]?.none;
  });
}

const renderTabBar = params => {
  return (
    <MaterialTabBar
      {...params}
      scrollEnabled
      activeColor={theme.colors.primary}
      inactiveColor="#000"
      tabStyle={styles.tab}
    />
  );
};

function CustomerSection(props) {
  const {route, navigation} = props;
  const {project_id, unitId} = route?.params || {};

  const insets = useSafeAreaInsets();

  const tabBarRef = React.useRef();

  const {t} = useTranslation();
  const {
    getCustomerDetails,
    getBookingDetails,
    getBankDetails,
    getModifyRequests,
    getAccountDetails,
  } = useCustomerActions();

  const {getFiles, getFolders} = useFileActions();

  const loading = useCustomerLoading();
  const {permissions, isProjectAdmin} = useSelector(s => s.project);

  const routes = React.useMemo(() => {
    if (isProjectAdmin) {
      return TABS;
    }

    return filterTabs(TABS, permissions);
  }, [isProjectAdmin, permissions]);

  React.useEffect(() => {
    getCustomerDetails({project_id, unit_id: unitId});
    getBookingDetails({project_id, unit_id: unitId});
    getBankDetails({project_id, unit_id: unitId});
    getModifyRequests({project_id, unit_id: unitId});
    getAccountDetails({project_id, unit_id: unitId});
    getFolders({project_id, unit_id: unitId, index_of: 0});
    getFiles({project_id, unit_id: unitId, folder_id: 0});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderHeader = () => {
    return (
      <>
        <ProjectHeader {...props} />
        <View style={styles.mainContainer}>
          <IconButton
            icon="keyboard-backspace"
            size={18}
            color="#4872f4"
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          />
          <Title>{t('title_customer_section')}</Title>
        </View>
        <View style={styles.container}>
          <DetailsHeader {...route?.params} />
          <Divider style={styles.divider} />
        </View>
      </>
    );
  };

  return (
    <>
      <Spinner visible={loading} textContent="" />

      {routes?.length ? (
        <Tabs.Container
          renderHeader={renderHeader}
          renderTabBar={renderTabBar}
          ref={tabBarRef}
          minHeaderHeight={insets.top}
          headerHeight={146}>
          <Tabs.Tab name="Details">
            <Details {...props} />
          </Tabs.Tab>
          <Tabs.Tab name="Booking Details">
            <BookingDetails {...props} unit_id={unitId} />
          </Tabs.Tab>
          <Tabs.Tab name="Bank Loans">
            <BankLoans {...props} />
          </Tabs.Tab>
          <Tabs.Tab name="Account">
            <Account {...props} />
          </Tabs.Tab>
          <Tabs.Tab name="Modify Request">
            <ModifyRequest {...props} />
          </Tabs.Tab>
          <Tabs.Tab name="Files">
            <Files {...props} />
          </Tabs.Tab>
        </Tabs.Container>
      ) : (
        <NoResult title="You do not permissions to view this page. Contact a project admin for support." />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  divider: {
    marginTop: 8,
    borderWidth: 0.2,
    borderColor: 'rgba(139, 149, 159, 0.25)',
  },
  tab: {
    width: 180,
  },
  backIcon: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    marginRight: 11,
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default withTheme(CustomerSection);

import NoResult from 'components/Atoms/NoResult';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Divider, withTheme, Button, Title} from 'react-native-paper';
import {TabBar, TabView} from 'react-native-tab-view';
import {useSelector} from 'react-redux';
import useCustomerActions from 'redux/actions/customerActions';
import {getShadow} from 'utils';
import Layout from 'utils/Layout';
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

function RenderTab(props) {
  const {route: item, navigationState, onPress} = props;
  const active = navigationState.index === item.key;

  return (
    <View style={styles.tab} key={item.key}>
      <Button
        style={{marginHorizontal: 5}}
        mode={active ? 'contained' : 'outlined'}
        theme={{roundness: 20}}
        onPress={onPress}>
        {item.title}
      </Button>
    </View>
  );
}

function RenderTabBar(tabBarProps) {
  // TODO: improve tab change animation
  return (
    <TabBar
      {...tabBarProps}
      scrollEnabled
      style={styles.tabContainer}
      tabStyle={styles.tab}
      indicatorStyle={{backgroundColor: 'white'}}
      renderTabBarItem={props => <RenderTab {...props} />}
    />
  );
}

function CustomerSection(props) {
  const {route} = props;
  const {project_id, unit} = route?.params || {};

  const {t} = useTranslation();
  const {
    getCustomerDetails,
    getBookingDetails,
    getBankDetails,
    getModifyRequests,
    getAccountDetails,
  } = useCustomerActions();

  const {user} = useSelector(s => s.user);
  const {loading} = useSelector(s => s.customer);
  const {permissions, isProjectAdmin} = useSelector(s => s.project);

  console.log('----->user.id', user.id);

  const [selectedTab, setSelectedTab] = React.useState(0);
  const routes = React.useMemo(() => {
    if (isProjectAdmin) {
      return TABS;
    }

    return filterTabs(TABS, permissions);
  }, [isProjectAdmin, permissions]);

  React.useEffect(() => {
    getCustomerDetails({project_id, unit_id: unit.unit_id});
    getBookingDetails({project_id, unit_id: unit.unit_id});
    getBankDetails({project_id, unit_id: unit.unit_id});
    getModifyRequests({project_id, unit_id: unit.unit_id});
    getAccountDetails({project_id, unit_id: unit.unit_id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderScene = ({route: {key}}) => {
    switch (key) {
      case 0:
        return <Details {...props} setSelectedTab={setSelectedTab} />;
      case 1:
        return <BookingDetails {...props} setSelectedTab={setSelectedTab} />;
      case 2:
        return <BankLoans {...props} {...{setSelectedTab}} />;
      case 3:
        return <Account {...props} setSelectedTab={setSelectedTab} />;
      case 4:
        return <ModifyRequest {...props} setSelectedTab={setSelectedTab} />;
      case 5:
        return <Files {...props} setSelectedTab={setSelectedTab} />;
      default:
        return <View />;
    }
  };

  return (
    <>
      <Spinner visible={loading} textContent="" />
      <View style={styles.container}>
        <Title>{t('title_customer_section')}</Title>
        <DetailsHeader {...route?.params} />
        <Divider style={styles.divider} />
      </View>

      {routes?.length ? (
        <TabView
          navigationState={{index: selectedTab, routes}}
          renderScene={renderScene}
          onIndexChange={setSelectedTab}
          initialLayout={{width: Layout.window.width}}
          renderTabBar={tabBarProps => <RenderTabBar {...tabBarProps} />}
        />
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
    marginBottom: 15,
    borderWidth: 0.2,
    borderColor: 'rgba(139, 149, 159, 0.25)',
  },
  tabContainer: {
    backgroundColor: '#fff',
    ...getShadow(0),
    width: '100%',
    marginBottom: 15,
  },
  tab: {
    width: 180,
  },
});

export default withTheme(CustomerSection);

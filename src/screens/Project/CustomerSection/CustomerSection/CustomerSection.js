import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Divider, Subheading, withTheme, Button} from 'react-native-paper';
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

function RenderTabBar(tabBarProps) {
  //TODO: improve tab change animation
  return (
    <TabBar
      {...tabBarProps}
      scrollEnabled
      style={{
        backgroundColor: '#fff',
        ...getShadow(0),
        width: '100%',
        marginBottom: 15,
      }}
      tabStyle={styles.tab}
      indicatorStyle={{backgroundColor: 'white'}}
      renderTabBarItem={({route: item, navigationState, onPress}) => {
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
      }}
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
  } = useCustomerActions();

  const {user} = useSelector(state => state.user);
  const {loading} = useSelector(state => state.customer);

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [routes] = React.useState([
    {key: 0, title: 'DETAILS'},
    {key: 1, title: 'BOOKING FORM'},
    {key: 2, title: 'BANK LOANS'},
    {key: 3, title: 'ACCOUNT'},
    {key: 4, title: 'MODIFY REQUEST'},
    {key: 5, title: 'FILES'},
  ]);

  React.useEffect(() => {
    console.log('-----> unit.unitId', unit.unitId);
    getCustomerDetails({user_id: user.id, project_id, unit_id: unit.unitId});
    getBookingDetails({project_id, unit_id: unit.unitId});
    getBankDetails({project_id, unit_id: unit.unitId});
    getModifyRequests({project_id});
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
    }
  };

  return (
    <>
      <Spinner visible={loading} textContent={''} />
      <View style={styles.container}>
        <Subheading>{t('title_customer_section')}</Subheading>
        <DetailsHeader {...route?.params} />
        <Divider style={styles.divider} />
      </View>

      <TabView
        navigationState={{index: selectedTab, routes}}
        renderScene={renderScene}
        onIndexChange={setSelectedTab}
        initialLayout={{width: Layout.window.width}}
        renderTabBar={tabBarProps => <RenderTabBar {...tabBarProps} />}
      />
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
  tab: {
    width: 180,
  },
});

export default withTheme(CustomerSection);

import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {Divider, Subheading, Text, withTheme, Button} from 'react-native-paper';
import {TabBar, TabView} from 'react-native-tab-view';
import {secondaryTheme, theme} from 'styles/theme';
import {getFloorNumber, getShadow, getTowerLabel, getUnitLabel} from 'utils';
import {STRUCTURE_TYPE_LABELS} from 'utils/constant';
import Layout from 'utils/Layout';
import Details from './Components/Details';

function renderDetailText(label, value) {
  return (
    <Text theme={secondaryTheme} style={{marginVertical: 4}}>
      {label} : <Text style={{color: theme.colors.primary}}>{value}</Text>
    </Text>
  );
}

function CustomerSection(props) {
  const {route} = props;
  const {towerId, floorId, project_id, selectedStructure, unit} =
    route?.params || {};
  console.log('-----> unit', unit);
  const {t} = useTranslation();

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [routes] = React.useState([
    {key: 0, title: 'DETAILS'},
    {key: 1, title: 'BOOKING FORM'},
    {key: 2, title: 'BANK LOANS'},
    {key: 3, title: 'ACCOUNT'},
    {key: 4, title: 'MODIFY REQUEST'},
    {key: 5, title: 'FILES'},
  ]);

  const renderScene = ({route: {key}}) => {
    switch (key) {
      case 0:
        return <Details {...props} setSelectedTab={setSelectedTab} />;
      case 1:
        return <Details {...props} setSelectedTab={setSelectedTab} />;
      case 2:
        return <Details {...props} setSelectedTab={setSelectedTab} />;
      case 3:
        return <Details {...props} setSelectedTab={setSelectedTab} />;
      case 4:
        return <Details {...props} setSelectedTab={setSelectedTab} />;
      case 5:
        return <Details {...props} setSelectedTab={setSelectedTab} />;
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Subheading theme={secondaryTheme}>
          {t('title_customer_section')}
        </Subheading>
        <View style={styles.detailContainer}>
          <View style={styles.detailSubContainer}>
            {renderDetailText(
              'Project type',
              STRUCTURE_TYPE_LABELS[selectedStructure],
            )}
            {renderDetailText('Floor type', getFloorNumber(floorId))}
          </View>
          <View style={styles.detailSubContainer}>
            {renderDetailText('Tower', getTowerLabel(towerId))}
            {renderDetailText('Unit number', getUnitLabel(floorId, unit.index))}
          </View>
        </View>
        <Divider style={{marginVertical: 10}} />
      </View>

      <TabView
        navigationState={{index: selectedTab, routes}}
        renderScene={renderScene}
        onIndexChange={setSelectedTab}
        initialLayout={{width: Layout.window.width}}
        renderTabBar={(tabBarProps) => (
          <TabBar
            {...tabBarProps}
            scrollEnabled
            style={{backgroundColor: '#fff', ...getShadow(0)}}
            indicatorStyle={{backgroundColor: 'white'}}
            renderTabBarItem={({route: item, navigationState, onPress}) => {
              const active = navigationState.index === item.key;
              return (
                <View key={item.key} style={styles.tabContainer}>
                  <Button
                    mode={active ? 'contained' : 'outlined'}
                    theme={{roundness: 20}}
                    onPress={onPress}>
                    {item.title}
                  </Button>
                </View>
              );
            }}
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  detailContainer: {
    flexDirection: 'row',
  },
  detailSubContainer: {
    flex: 1,
    marginTop: 15,
  },
  tabContainer: {
    padding: 5,
    minWidth: 150,
  },
});

export default withTheme(CustomerSection);

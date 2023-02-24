import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Divider, IconButton, Subheading, Title} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const ROUTE = [
  {
    screenName: 'Industrial Unit Add',
    route: 'IndustrialUnitDetails',
    key: 'UnitAdd',
  },
  {screenName: 'Area Sheet', route: 'IndustrialAreaSheet', key: 'AreaSheet'},
  {
    screenName: 'Property Remark',
    route: 'IndustrialUnitRemark',
    key: 'PropertyRemark',
  },
  {
    screenName: 'Pricing',
    route: 'IndustrialUnitPricing',
    key: 'Pricing',
  },
  {
    screenName: 'Location Information',
    route: 'IndustrialLocationInfo',
    key: 'LocationInfo',
  },
  {
    screenName: 'Unit Owner Information',
    route: 'IndustrialUnitOwnerInfo',
    key: 'UnitOwnerInfo',
  },
  {
    screenName: 'Security/ Caretaker Info',
    route: 'IndustrialUnitSecurityInfo',
    key: 'security/caretakerInfo',
  },
  {
    screenName: 'Industrial Details Information',
    route: 'IndustrialUnitDetailsInfo',
    key: 'IndustrialDetailsInformation',
  },
  {
    screenName: 'Files/ Attachments',
    route: 'IndustrialUnitFiles',
    key: 'Files/Attachments',
  },
];

const RenderRow = props => {
  const {navigation, screenName, route} = props;
  return (
    <>
      <View style={styles.row}>
        <Subheading>{screenName}</Subheading>
        <OpacityButton
          opacity={0.1}
          color="#4872f4"
          style={styles.navBTN}
          onPress={() => navigation.navigate(route)}>
          <MaterialIcon name="edit" color="#4872f4" size={15} />
        </OpacityButton>
      </View>
      <Divider style={styles.seperator} />
    </>
  );
};

const ProjectUnitDetails = props => {
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerWrapper}>
        <IconButton
          icon="keyboard-backspace"
          size={18}
          color="#4872f4"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Title>Add Industrial Land </Title>
      </View>
      <Divider />
      <View style={styles.bodyWrap}>
        {ROUTE.map(item => {
          return (
            <RenderRow
              {...props}
              key={item.key}
              screenName={item.screenName}
              route={item.route}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default ProjectUnitDetails;

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    marginRight: 11,
  },
  mainContainer: {
    paddingHorizontal: 10,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  bodyWrap: {
    paddingHorizontal: 5,
    marginTop: 10,
  },
  seperator: {
    height: 1,
    marginVertical: 5,
  },
  navBTN: {
    borderRadius: 50,
  },
});

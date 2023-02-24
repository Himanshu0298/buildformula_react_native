import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Divider, IconButton, Subheading, Title} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {useSelector} from 'react-redux';

const ROUTE = [
  {screenName: 'Unit Details', route: 'UnitDetails', key: 'UnitDetails'},
  {screenName: 'Location Info', route: 'LocationInfo', key: 'LocationInfo'},
  // {screenName: 'Area Sheet', route: 'UnitAreaSheet', key: 'AreaSheet'},
  // {
  //   screenName: 'Infrastructure Info',
  //   route: 'InfrastructureInfo',
  //   key: 'InfrastructureInfo',
  // },
  // {screenName: 'Details', route: 'UnitInformation', key: 'Details'},
  // {screenName: 'Pricing', route: 'UnitPricing', key: 'UnitPricing'},
  // {
  //   screenName: 'Owner Information',
  //   route: 'ProjectUnitOwner',
  //   key: 'UnitOwnerInfo',
  // },
  // {
  //   screenName: 'Security/ Caretaker Info',
  //   route: 'UnitSecurityInfo',
  //   key: 'Security/CaretakerInfo',
  // },
  // {
  //   screenName: 'Files/ Attachments',
  //   route: 'UnitFiles',
  //   key: 'Files/Attachments',
  // },
];

const RenderRow = props => {
  const {navigation, screenName, route, unitId, selectedUnit} = props;

  return (
    <>
      <View style={styles.row}>
        <Subheading>{screenName}</Subheading>
        <OpacityButton
          opacity={0.1}
          color="#4872f4"
          style={styles.navBTN}
          onPress={() => navigation.navigate(route, {unitId, selectedUnit})}>
          <MaterialIcon name="edit" color="#4872f4" size={15} />
        </OpacityButton>
      </View>
      <Divider style={styles.seperator} />
    </>
  );
};

const ProjectUnitDetails = props => {
  const {navigation, route} = props;
  const {unitId} = route?.params || {};

  const {unitList = []} = useSelector(s => {
    return s.projectStructure;
  });

  const selectedUnit = unitList?.find(i => i.id === unitId);

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
        <Title>Add Unit</Title>
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
              unitId={unitId}
              selectedUnit={selectedUnit}
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

import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Subheading,
  withTheme,
  Text,
  Button,
  Card,
  Divider,
  IconButton,
  Title,
  Caption,
  Avatar,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getFloorNumber, getTowerLabel, getUnitLabel} from 'utils';
import {STRUCTURE_TYPE_LABELS} from 'utils/constant';

function RenderRow(props) {
  const {heading, content} = props;

  return (
    <View style={styles.headingRow}>
      <Caption>{heading}</Caption>
      <Text>{content}</Text>
    </View>
  );
}

function InfoRow(props) {
  const {data} = props;

  return (
    <View style={styles.rowContainer}>
      {data.map(({title, value}) => (
        <View style={styles.rowCell}>
          <Caption>{title}: </Caption>
          <Text>{value}</Text>
        </View>
      ))}
    </View>
  );
}

function PropertyHoldUserDetails(props) {
  const {route} = props;
  const {structureType} = route?.params || {};

  return (
    <View style={{marginTop: 20}}>
      <Title>Property On Hold</Title>
      <Caption>On-hold by</Caption>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Avatar.Icon size={40} style={{marginRight: 10}} />
        <View>
          <Text>Ashish Patel</Text>
          <Caption>ashishpatel@example.com</Caption>
        </View>
      </View>
      <RenderRow heading="Date" content="20 Sept, 2020" />
      <RenderRow heading="Hold Duration" content="15 Days" />
      <RenderRow
        heading="Remark"
        content="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
      />
      <Button
        mode="contained"
        onPress={() => {
          console.log('----->BookingFormOnHold button pressed');
          //   navigation.navigate('HoldPropertyForm');
        }}
        uppercase={false}
        style={{margin: 15, borderRadius: 10}}>
        Unhold this property
      </Button>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Caption>This property is on hold till </Caption>
        <Text>20 Sept, 2020 8:30pm</Text>
      </View>
    </View>
  );
}

function BookingFormOnHold(props) {
  const {navigation, route, theme} = props;
  const {structureType, towerId, floorId, unitId} = route?.params || {};

  const [propertyBooked, setPropertyBooked] = useState(false);

  const navToForm = () => {
    navigation.navigate('HoldPropertyForm', {...route?.params});
  };

  const navToHistory = () => navigation.navigate('History');

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.backContainer}>
          <IconButton icon="keyboard-backspace" onPress={navigation.goBack} />
          <Text>Property On-hold</Text>
        </View>
        <OpacityButton
          opacity={0.1}
          onPress={navToHistory}
          style={styles.historyButton}>
          <MaterialCommunityIcons
            name="information-outline"
            size={18}
            color={theme.colors.primary}
            style={styles.infoIcon}
          />
          <Text>History</Text>
        </OpacityButton>
      </View>
      <Card elevation={5} style={styles.infoCard}>
        <Subheading>Property info</Subheading>
        <Divider style={styles.divider} />
        <InfoRow
          data={[
            {
              title: 'Project type',
              value: STRUCTURE_TYPE_LABELS[structureType],
            },
            {title: 'Tower', value: getTowerLabel(towerId)},
          ]}
        />
        <InfoRow
          data={[
            {title: 'Floor', value: getFloorNumber(floorId)},
            {title: 'Unit Number', value: getUnitLabel(floorId, unitId)},
          ]}
        />
      </Card>
      {propertyBooked ? (
        <PropertyHoldUserDetails {...props} />
      ) : (
        <Button
          mode="contained"
          onPress={navToForm}
          uppercase={false}
          style={styles.holdButton}>
          Hold this property
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    padding: 7,
  },
  infoIcon: {
    marginRight: 7,
  },
  infoCard: {
    padding: 15,
    marginVertical: 15,
  },
  rowContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 3,
  },
  holdButton: {
    margin: 15,
    borderRadius: 10,
  },
  divider: {
    height: 1,
    marginBottom: 5,
  },
  rowCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingRow: {
    marginTop: 20,
  },
});

export default withTheme(BookingFormOnHold);

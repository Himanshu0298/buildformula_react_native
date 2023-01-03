import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {IconButton, Switch, Text, Title} from 'react-native-paper';

const DATA = [
  {name: 'Club House'},
  {name: 'Lift'},
  {name: 'Jogging and Strolling Track'},
  {name: 'Security '},
  {name: 'Outdoor Tennis Courts'},
  {name: 'Park'},
  {name: 'Power Back Up'},
  {name: 'Banquet Hall'},
  {name: 'DTH Television Facility'},
  {name: 'Water Storage'},
  {name: 'Premium Branded Fittings'},
  {name: 'Earth Quake Resistant'},
  {name: 'Multipurpose Hall'},
  {name: 'Event Space & Amphitheatre'},
  {name: 'Bank & ATM'},
  {name: 'Rain Water Harvesting'},
];

function ProjectAmenities(props) {
  const {navigation} = props;

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerWrapper}>
        <IconButton
          icon="keyboard-backspace"
          size={18}
          color="#4872f4"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Title>Building Amenities </Title>
      </View>
      <ScrollView style={{marginBottom: 30}}>
        {DATA.map((item, i) => {
          return (
            <View style={styles.extraDetailsRow}>
              <View style={styles.extraDetailsSwitchWrap}>
                <Switch
                  value={isSwitchOn}
                  onValueChange={onToggleSwitch}
                  color="#77E675"
                  style={{
                    transform: [{scaleX: 0.6}, {scaleY: 0.6}],
                  }}
                />
              </View>
              <View style={{marginLeft: 8}}>
                <Text>{item.name}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

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
    flexGrow: 1,
    margin: 10,
  },
  extraDetailsRow: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
});

export default ProjectAmenities;

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Button, Subheading, TextInput, withTheme} from 'react-native-paper';
import BaseText from '../../../../../components/BaseText';
import floorSlab from '../../../../../assets/images/slab.png';
import Layout from '../../../../../utils/Layout';
import {getFloorNumber} from '../../../../../utils/Layout';
import {theme} from '../../../../../styles/theme';

function RenderFloors({floors, onChangeUnit, selectedFloor, onPress}) {
  let floorsList = [];
  for (let i = 0; i < floors; i += 1) {
    floorsList.push(
      <View key={i} style={styles.floorContainer}>
        <View onPress={() => onPress(i)} style={styles.row1Container}>
          <BaseText style={styles.floorLabel}>{getFloorNumber(i)}</BaseText>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              dense
              blurOnSubmit
              value={floors ? floors.toString() : floors}
              onChangeText={onChangeUnit}
              style={styles.unitsInput}
              keyboardType="decimal-pad"
              theme={{
                colors: {
                  underlineColor: 'transparent',
                  text: '#000',
                  accent: theme.colors.primary,
                },
              }}
            />
            <Button
              compact
              color="#5B6F7C"
              mode="contained"
              uppercase={false}
              contentStyle={{paddingVertical: 5}}
              theme={{roundness: 5}}
              onPress={() => {
                console.log('----->next ');
              }}>
              <BaseText style={styles.allUnitsLabel}>
                {'Show all units'}
              </BaseText>
            </Button>
          </View>
        </View>
        <Image source={floorSlab} style={styles.slabImage} />
      </View>,
    );
  }
  return <View style={styles.floorsList}>{floorsList}</View>;
}

function FloorsScreen(props) {
  const {theme, floors, onChangeFloors} = props;
  const [selectedFloor, setSelectedFloor] = useState();

  const toggleSelectedFloor = (value) => {
    if (selectedFloor === value) {
      setSelectedFloor(undefined);
    } else {
      setSelectedFloor(value);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <BaseText style={styles.title}>Floors</BaseText>
            <TextInput
              dense
              mode="outlined"
              blurOnSubmit
              value={floors ? floors.toString() : floors}
              onChangeText={onChangeFloors}
              style={styles.input}
              keyboardType="decimal-pad"
              theme={{
                roundness: 10,
                colors: {
                  underlineColor: 'transparent',
                  text: '#000',
                  accent: theme.colors.primary,
                },
              }}
            />
            <Button
              compact={true}
              mode="contained"
              uppercase={false}
              contentStyle={{paddingVertical: 2, paddingHorizontal: 6}}
              theme={{roundness: 10}}
              onPress={() => {}}>
              <BaseText style={styles.applyButton}>
                {'Apply for all floors'}
              </BaseText>
            </Button>
          </View>
          {floors && floors > 0 ? (
            <View style={styles.floorsListContainer}>
              <RenderFloors
                selectedFloor={selectedFloor}
                onPress={toggleSelectedFloor}
                floors={floors}
              />
            </View>
          ) : null}
          <View style={styles.button}>
            {!isNaN(selectedFloor) ? (
              <Button
                style={{width: '50%'}}
                compact
                mode="contained"
                contentStyle={{padding: 5}}
                theme={{roundness: 15}}
                onPress={() => {
                  console.log('----->next ');
                }}>
                <BaseText style={styles.nextButtonLabel}>{'Back'}</BaseText>
              </Button>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginBottom: 150,
  },
  headingContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
  input: {
    width: 80,
    display: 'flex',
    justifyContent: 'center',
  },
  unitsInput: {
    width: 45,
    display: 'flex',
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  applyButton: {
    fontSize: 12,
  },
  floorsListContainer: {
    marginTop: 20,
  },
  floorsList: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  floorContainer: {
    marginBottom: 10,
  },
  row1Container: {
    width: Layout.window.width * 0.8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  floorLabel: {
    color: 'grey',
    fontSize: 13,
  },
  allUnitsLabel: {
    fontSize: 14,
  },
  slabImage: {
    height: Layout.window.width * 0.8 * (20 / 320),
    width: Layout.window.width * 0.8,
  },
  floorLabelContainer: {
    marginTop: 3,
  },
  button: {
    marginTop: 20,
    width: '95%',
    display: 'flex',
    alignItems: 'flex-end',
  },
  nextButtonLabel: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default withTheme(FloorsScreen);
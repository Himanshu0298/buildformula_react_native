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
import towerActive from '../../../../../assets/images/tower.png';
import towerInactive from '../../../../../assets/images/tower_inactive.png';
import Layout from '../../../../../utils/Layout';

function RenderTowers({towers, selectedTower, onPress}) {
  let towersList = [];
  for (let i = 1; i <= towers; i += 1) {
    const active = selectedTower === i;
    towersList.push(
      <TouchableOpacity
        key={i}
        onPress={() => onPress(i)}
        style={styles.towerContainer}>
        <ImageBackground
          source={active ? towerActive : towerInactive}
          style={styles.towerImage}>
          <View style={styles.towerLabelContainer}>
            <Subheading style={!active && styles.inactiveLabel}>
              {String.fromCharCode(64 + i)}
            </Subheading>
          </View>
        </ImageBackground>
      </TouchableOpacity>,
    );
  }
  return <View style={styles.towersList}>{towersList}</View>;
}

function TowersScreen(props) {
  const {theme, towers, onChangeTowers} = props;
  const [selectedTower, setSelectedTower] = useState();

  const toggleSelectedTower = (value) => {
    if (selectedTower === value) {
      setSelectedTower(undefined);
    } else {
      setSelectedTower(value);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <BaseText style={styles.title}>Towers</BaseText>
            <TextInput
              dense
              mode="outlined"
              blurOnSubmit
              value={towers ? towers.toString() : towers}
              onChangeText={onChangeTowers}
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
                {'Apply for all towers'}
              </BaseText>
            </Button>
          </View>
          {towers && towers > 0 ? (
            <View style={styles.towersListContainer}>
              <RenderTowers
                selectedTower={selectedTower}
                onPress={toggleSelectedTower}
                towers={towers}
              />
            </View>
          ) : null}
          <View style={styles.button}>
            {!isNaN(selectedTower) ? (
              <Button
                style={{width: '50%'}}
                compact
                mode="contained"
                contentStyle={{padding: 5}}
                theme={{roundness: 15}}
                onPress={() => {
                  console.log('----->next ');
                }}>
                <BaseText style={styles.nextButtonLabel}>{'Next'}</BaseText>
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
  applyButton: {
    fontSize: 12,
  },
  towersListContainer: {
    marginTop: 20,
  },
  towersList: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  towerContainer: {
    width: Layout.window.width * 0.22,
    height: Layout.window.width * 0.15,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
  },
  towerImage: {
    height: 50,
    width: 65,
    display: 'flex',
    alignItems: 'center',
  },
  towerLabelContainer: {
    marginTop: 3,
  },
  inactiveLabel: {
    color: 'gray',
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

export default withTheme(TowersScreen);

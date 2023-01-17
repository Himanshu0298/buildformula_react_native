import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import TowerSelector from 'components/Molecules/TowerSelector';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IconButton, Subheading} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

function TowerPreview(props) {
  const {navigation} = props;

  const onSelectTower = () => {
    navigation.navigate('FloorPreview');
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            style={styles.titleContainer}
            onPress={navigation.goBack}>
            <IconButton icon="keyboard-backspace" />
          </TouchableOpacity>
          <Subheading>Towers</Subheading>
        </View>
        <View>
          <OpacityButton
            opacity={0.1}
            color="#4872f4"
            style={styles.editIcon}
            onPress={() => navigation.navigate('TowerList')}>
            <MaterialIcon name="edit" color="#4872f4" size={15} />
          </OpacityButton>
        </View>
      </View>
      <TowerSelector {...props} {...{onSelectTower}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -10,
  },
  editIcon: {
    borderRadius: 50,
  },
});

export default TowerPreview;

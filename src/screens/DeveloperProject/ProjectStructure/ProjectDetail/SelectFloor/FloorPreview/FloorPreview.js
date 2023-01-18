import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import FloorBar from 'components/Atoms/FloorBar';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {IconButton, Subheading} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

function FloorPreview(props) {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            style={styles.titleContainer}
            onPress={navigation.goBack}>
            <IconButton icon="keyboard-backspace" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.subContainer}>
        <Subheading style={styles.floorsTitle}>Floors</Subheading>
        <OpacityButton
          opacity={0.1}
          color="#4872F4"
          style={styles.editIcon}
          onPress={() => navigation.navigate('FloorList')}>
          <MaterialIcon name="edit" color="#4872F4" size={15} />
        </OpacityButton>
      </View>
      <FloorBar {...props} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -10,
  },
  editIcon: {
    borderRadius: 50,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default FloorPreview;

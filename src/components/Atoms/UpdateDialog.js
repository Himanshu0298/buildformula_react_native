import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Text, useTheme} from 'react-native-paper';
import UpdateIcon from 'assets/images/update.svg';

function UpdateDialog(props) {
  const {restartApp} = props;
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.contentContainer, {backgroundColor: colors.success}]}
        onPress={restartApp}>
        <View style={styles.leftContainer}>
          <UpdateIcon height={28} width={28} />
          <View style={styles.body}>
            <Text style={styles.title}>Update Available</Text>
            <Text style={styles.subTitle}>
              A new version of app is available
            </Text>
          </View>
        </View>

        <SimpleLineIcons color="#fff" name="arrow-right" size={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    padding: 20,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
  },
  subTitle: {
    color: '#fff',
  },
  body: {
    marginLeft: 10,
  },
});

export default UpdateDialog;

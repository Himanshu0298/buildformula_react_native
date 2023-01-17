import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Caption, IconButton, Subheading} from 'react-native-paper';

function Description(props) {
  const {navigation, route} = props;
  const {description} = route?.params || {};
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
        <Subheading>Description</Subheading>
      </View>
      <Caption>{description}</Caption>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    margin: 10,
    flex: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    marginRight: 11,
  },
});

export default Description;

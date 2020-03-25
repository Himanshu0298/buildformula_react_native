import React, { useState } from 'react';
import { StyleSheet, Text, StatusBar, View, Image, TouchableOpacity } from 'react-native';
import { withTheme } from 'react-native-paper';
import { theme } from '../../../styles/theme';
import welcomeImage from './../../../assets/images/layer 2.png';


function LanguageSelect(props) {

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      <View style={styles.contentContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.headline}>
            Welcome,
            </Text>
          <Text style={styles.caption}>Login to continue</Text>
        </View>
        <View style={styles.logoContainer}>
          <Image source={welcomeImage} style={styles.image} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  image: {
    width: '100%',
    height: 300,
  },
});

export default withTheme(LanguageSelect);

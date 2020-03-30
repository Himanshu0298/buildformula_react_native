import React from 'react';
import { StyleSheet, StatusBar, View, Image, TouchableOpacity } from 'react-native';
import { withTheme } from 'react-native-paper';
import { theme } from '../../../styles/theme';
import welcomeImage from './../../../assets/images/layer_2.png';
import banner from './../../../assets/images/banner.png';
import BaseText from '../../../components/BaseText';
import { useTranslation } from 'react-i18next';


function LanguageButton({ label, language, onPress }) {
  return (
    <TouchableOpacity
      style={styles.languageButton}
      onPress={() => onPress(language)}
    >
      <BaseText style={styles.buttonText}>
        {label}
      </BaseText>
    </TouchableOpacity>
  );
}

function LanguageSelect(props) {
  const { i18n } = useTranslation();

  const selectLanguage = (language) => {
    i18n.changeLanguage(language);
    props.navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      <View style={styles.contentContainer}>
        <View style={styles.topContainer}>
          <View style={styles.bannerContainer}>
            <Image source={banner} style={styles.banner} />
          </View>
          <View style={styles.buttonContainer}>
            <LanguageButton label="English" language="en" onPress={selectLanguage} />
            <LanguageButton label="हिन्दी" language="hi" onPress={selectLanguage} />
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image source={welcomeImage} style={styles.image} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  contentContainer: {
    marginVertical: 40,
    marginHorizontal: 30,
    flex: 1,
    justifyContent: 'space-between',
    borderRadius: 50,
    backgroundColor: theme.colors.surface,
  },
  topContainer: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bannerContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  banner: {
    width: '75%',
    height: 100,
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    paddingVertical: 50,
    alignItems: 'center',
  },
  languageButton: {
    width: '75%',
    padding: 15,
    elevation: 5,
    borderRadius: 30,
    display: 'flex',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: '70%',
    height: 255,
  },
});

export default withTheme(LanguageSelect);

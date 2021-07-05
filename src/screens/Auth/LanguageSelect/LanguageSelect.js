import React, {useEffect} from 'react';
import {StyleSheet, StatusBar, View, Image} from 'react-native';
import {withTheme, Button, Headline} from 'react-native-paper';
import welcomeImage from 'assets/images/language.png';
import banner from 'assets/images/banner.png';
import BaseText from 'components/Atoms/BaseText';
import {useTranslation} from 'react-i18next';
import Layout from 'utils/Layout';
import {secondaryTheme, theme} from 'styles/theme';
import {useSelector} from 'react-redux';
import useAppActions from 'redux/actions/appActions';

function LanguageButton({label, language, onPress, ...props}) {
  return (
    <Button
      {...props}
      style={styles.languageButton}
      contentStyle={[styles.buttonContent, {borderColor: props.color}]}
      theme={{roundness: 15}}
      onPress={() => onPress(language)}>
      <BaseText style={styles.buttonText}>{label}</BaseText>
    </Button>
  );
}

function LanguageSelect(props) {
  const {navigation} = props;
  const {colors} = props.theme;

  const {i18n} = useTranslation();
  const {setAppLanguage} = useAppActions();

  const {language = 'en'} = useSelector(state => state.app);

  useEffect(() => {
    //TODO: Remove this when language screen is to be enabled agaian
    selectLanguage('en');
    if (language) {
      i18n.changeLanguage(language);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectLanguage = selectedLanguage => {
    setAppLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.text} />
      <View style={styles.topContainer}>
        <View style={styles.bannerContainer}>
          <Image source={banner} style={styles.banner} />
        </View>
        <View style={styles.imageContainer}>
          <Image source={welcomeImage} style={styles.image} />
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.headlineContainer}>
          <Headline theme={secondaryTheme} style={styles.headline}>
            Select Language
          </Headline>
        </View>
        <View style={styles.buttonContainer}>
          <LanguageButton
            color={colors.accent}
            label="English"
            mode="contained"
            language="en"
            onPress={selectLanguage}
          />
          <LanguageButton
            color={'#fff'}
            mode="outlined"
            label="हिन्दी"
            language="hi"
            onPress={selectLanguage}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bannerContainer: {
    width: '100%',

    alignItems: 'center',
  },
  banner: {
    width: Layout.window.width * 0.75,
    height: Layout.window.width * 0.75 * (5 / 12),
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: Layout.window.width * 0.75,
    height: Layout.window.width * 0.75 * (77 / 120),
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: theme.colors.primary,
  },
  headlineContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headline: {
    fontWeight: '500',
    fontSize: 26,
  },
  buttonContainer: {
    width: '100%',
    flex: 1.5,
    alignItems: 'center',
  },
  languageButton: {
    width: '80%',
    marginVertical: 20,
  },
  buttonContent: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default withTheme(LanguageSelect);

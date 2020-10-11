import React, {useEffect} from 'react';
import {StyleSheet, StatusBar, View, Image} from 'react-native';
import {withTheme, Button, Headline} from 'react-native-paper';
import welcomeImage from './../../../assets/images/language.png';
import banner from './../../../assets/images/banner.png';
import BaseText from '../../../components/BaseText';
import {useTranslation} from 'react-i18next';
import Layout from '../../../utils/Layout';
import {theme} from '../../../styles/theme';
import {getInitialAuthScreen} from '../../../navigation';
import {useSelector} from 'react-redux';
import useAppActions from '../../../redux/actions/appActions';

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

  const reduxStore = useSelector((v) => v);
  const {language} = useSelector((state) => state.app);

  useEffect(() => {
    if (language) {
      selectLanguage(language);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectLanguage = (selectedLanguage) => {
    i18n.changeLanguage(selectedLanguage);
    setAppLanguage(selectedLanguage);
    let route = getInitialAuthScreen(reduxStore);
    navigation.navigate(route);
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
          <Headline style={{fontWeight: '500', fontSize: 26}}>
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
            color={colors.text}
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
    display: 'flex',
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bannerContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  banner: {
    width: Layout.window.width * 0.75,
    height: Layout.window.width * 0.75 * (5 / 12),
  },
  imageContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: Layout.window.width * 0.75,
    height: Layout.window.width * 0.75 * (77 / 120),
  },
  contentContainer: {
    flex: 0.6,
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
    color: theme.colors.text,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default withTheme(LanguageSelect);

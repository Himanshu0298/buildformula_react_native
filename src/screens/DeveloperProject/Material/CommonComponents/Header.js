import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Subheading} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {theme} from './src/styles/theme';

const Header = props => {
  const {navigation, title} = props;

  const onPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <OpacityButton opacity={0.18} style={styles.button} onPress={onPress}>
        <MaterialCommunityIcons name="arrow-left" size={18} />
      </OpacityButton>
      <Subheading>{title}</Subheading>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  button: {
    marginRight: 10,
    borderRadius: 20,
  },
});

export default Header;

import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import React from 'react';
import {View} from 'react-native';
import {Subheading} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {theme} from './src/styles/theme';

const Header = props => {
  const {navigation, title} = props;

  const onPress = () => {
    navigation.goBack();
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <OpacityButton
        opacity={0.18}
        style={{marginRight: 10, borderRadius: 20}}
        onPress={onPress}>
        <MaterialCommunityIcons name="arrow-left" size={20} />
      </OpacityButton>
      <Subheading>{title}</Subheading>
    </View>
  );
};

export default Header;

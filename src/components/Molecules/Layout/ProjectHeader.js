import React from 'react';
import {Subheading, Badge, withTheme, Avatar} from 'react-native-paper';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import Timer from 'components/Atoms/Timer';
import {useNavigation} from '@react-navigation/native';
import logo from 'assets/images/logo.png';

function ProjectHeader(props) {
  const {theme, showTimer, showLogo} = props;
  const navigation = useNavigation();

  const {selectedProject} = useSelector(state => state.project);
  const {user} = useSelector(state => state.user);

  const navToNotification = () => {
    navigation.navigate('Notification', {showLogo});
  };

  const navToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Subheading style={{fontSize: 14}}>
            {showLogo ? (
              <Image source={logo} style={styles.banner} />
            ) : (
              selectedProject?.project_name
            )}
          </Subheading>
        </View>
        <View style={styles.rightContainer}>
          <Timer displayTimer={showTimer} />
          <TouchableOpacity
            style={styles.bellContainer}
            onPress={navToNotification}>
            <MaterialCommunityIcons name={'bell'} color={'#000'} size={20} />
            <Badge size={10} style={styles.badge} />
          </TouchableOpacity>

          {user?.profile_url ? (
            <TouchableOpacity
              onPress={navToProfile}
              style={styles.profileIconContainer}>
              <Avatar.Image size={23} source={{uri: user.profile_url}} />
            </TouchableOpacity>
          ) : (
            <OpacityButton
              color={theme.colors.primary}
              onPress={navToProfile}
              style={styles.profileIconContainer}>
              <MaterialIcons
                name={'person'}
                color={theme.colors.primary}
                size={19}
              />
            </OpacityButton>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default withTheme(ProjectHeader);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {},
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellContainer: {
    position: 'relative',
    marginLeft: 10,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderWidth: 1,
    borderColor: '#fff',
  },
  banner: {
    width: 160,
    height: 20,
  },
  profileIconContainer: {
    marginLeft: 15,
    borderRadius: 20,
  },
});

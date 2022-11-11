import * as React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {
  Caption,
  IconButton,
  Subheading,
  Text,
  withTheme,
} from 'react-native-paper';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {useSelector} from 'react-redux';
import ScreenTitle from 'components/Atoms/ScreenTitle';
import useAppActions from 'redux/actions/appActions';
import userProfile from 'assets/images/customer.png';

import * as Progress from 'react-native-progress';
import ImageProgress from 'react-native-image-progress';

function Profile(props) {
  const {theme, navigation} = props;

  const {user} = useSelector(s => s.user);
  const {first_name, last_name, email, phone, profile_url} = user || {};

  const {logout} = useAppActions();

  const navToEdit = () => navigation.navigate('EditProfile');
  const navToChangePassword = () =>
    navigation.navigate('ChangePasswordStepOne');

  return (
    <View style={styles.contentContainer}>
      <ScreenTitle title="Profile" backIcon />
      <View style={styles.headerContainer}>
        {/* {profile_url ? (
          <UserAvatar size={150} uri={profile_url} />
        ) : (
          <UserAvatar size={150} uri={userProfile} />
        )} */}
        {profile_url ? (
          <ImageProgress
            source={{uri: profile_url}}
            indicator={Progress.Pie}
            indicatorProps={{
              size: 80,
              borderWidth: 0,
              color: 'rgba(234,236,241,1)',
              unfilledColor: 'rgba(211,218,239,1)',
            }}
            style={styles.profileIMG}
          />
        ) : (
          <Image source={userProfile} style={styles.profileIMG} />
        )}
        <Subheading style={styles.subheading}>
          {first_name} {last_name}
        </Subheading>
        <Caption style={styles.email}>{email}</Caption>
        {phone ? <Caption>+91{phone}</Caption> : null}
      </View>

      <View style={styles.actionContainer}>
        <OpacityButton
          onPress={navToEdit}
          opacity={0.15}
          style={styles.buttonContainer}>
          <IconButton color={theme.colors.primary} icon="pencil" size={20} />
          <Text>Edit Profile</Text>
        </OpacityButton>
        <OpacityButton
          opacity={0.15}
          style={styles.buttonContainer}
          onPress={navToChangePassword}>
          <IconButton color={theme.colors.primary} icon="refresh" size={20} />
          <Text>Reset Password</Text>
        </OpacityButton>
        <OpacityButton
          opacity={0.15}
          color="#FF5D5D"
          style={styles.buttonContainer}
          onPress={logout}>
          <IconButton color={theme.colors.red} icon="logout" size={20} />
          <Text>Logout</Text>
        </OpacityButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 10,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  actionContainer: {
    marginTop: 20,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 7,
  },
  subheading: {
    marginTop: 15,
  },
  email: {
    marginTop: 10,
  },
  profileIMG: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: 'hidden',
  },
});

export default withTheme(Profile);

import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Avatar,
  Caption,
  IconButton,
  Subheading,
  Text,
  withTheme,
} from 'react-native-paper';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {useSelector} from 'react-redux';
import UserAvatar from 'components/Atoms/UserAvatar';

function Profile(props) {
  const {theme, navigation} = props;

  const {user} = useSelector(state => state.user);
  const {first_name, last_name, email, phone, profile_url} = user;

  const navToEdit = () => navigation.navigate('EditProfile');
  const navToChangePassword = () => navigation.navigate('ChangePassword');

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Subheading>Profile Details</Subheading>
        <View style={styles.headerContainer}>
          <UserAvatar size={150} uri={profile_url} />
          <Subheading style={{marginTop: 15}}>
            {first_name} {last_name}
          </Subheading>
          <Caption style={{marginTop: 10}}>{email}</Caption>
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
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 10,
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
});

export default withTheme(Profile);

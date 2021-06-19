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
import {SafeAreaView} from 'react-native-safe-area-context';
import UserPic from 'assets/images/customer.png';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';

function Profile(props) {
  const {theme, navigation} = props;

  const navToEdit = () => navigation.navigate('EditProfile');

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.contentContainer}>
          <Subheading>Profile Details</Subheading>
          <View style={styles.headerContainer}>
            <Avatar.Image size={150} source={UserPic} />
            <Subheading style={{marginTop: 15}}>James Parker</Subheading>
            <Caption style={{marginTop: 10}}>jamesp@gmail.com</Caption>
            <Caption>8545652312 </Caption>
          </View>

          <View style={styles.actionContainer}>
            <OpacityButton
              onPress={navToEdit}
              opacity={0.15}
              style={styles.buttonContainer}>
              <IconButton
                color={theme.colors.primary}
                icon="pencil"
                size={20}
              />
              <Text>Edit Profile</Text>
            </OpacityButton>
            <OpacityButton opacity={0.15} style={styles.buttonContainer}>
              <IconButton
                color={theme.colors.primary}
                icon="refresh"
                size={20}
              />
              <Text>Reset Password</Text>
            </OpacityButton>
          </View>
        </View>
      </SafeAreaView>
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

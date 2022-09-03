import * as React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import useAppActions from 'redux/actions/appActions';

function Settings() {
  const {logout} = useAppActions();
  return (
    <View style={styles.container}>
      <Text>Search!</Text>
      <Button onPress={logout}>Logout</Button>
    </View>
  );
}

export default Settings;
const styles = StyleSheet.create({
  container: {
    height: '100%',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

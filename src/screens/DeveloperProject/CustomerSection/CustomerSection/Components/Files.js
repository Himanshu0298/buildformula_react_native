import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {FAB, IconButton, Menu, Subheading, Text} from 'react-native-paper';
import {theme} from 'styles/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

function Files(props) {
  const {navigation} = props;
  const navToAdd = () => {
    navigation.navigate();
  };
  const [menu, setMenu] = React.useState();

  const data = useSelector(s => s.customer.files);
  const data1 = useSelector(s => s.customer);

  console.log('data1', data1);

  const toggleMenu = () => setMenu();

  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle}>
      <View styles={styles.contentContainer}>
        <Subheading>Files</Subheading>
        <View>
          <Subheading style={styles.folder}>FOLDERS</Subheading>
        </View>
        <View
          style={{
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name="folder"
              size={50}
              color={theme.colors.primary}
            />
            <View>
              <Subheading style={{fontWeight: 'bold'}}>Dharti Saket</Subheading>
              <Text>10 June 2020</Text>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text>2.24kb</Text>
            <Menu
              visible={console.log('-----> ')}
              onDismiss={() => toggleMenu()}
              anchor={
                <IconButton
                  size={20}
                  onPress={() => toggleMenu()}
                  icon="dots-vertical"
                  style={styles.menuIcon}
                />
              }>
              hello
            </Menu>
          </View>
          {/* <MaterialCommunityIcons
            name="folder"
            size={30}
            color={theme.colors.primary}
          />
          <View>
            <Subheading style={{fontWeight: 'bold'}}> Dharti Saket</Subheading>
            <Text>10 June 2020</Text>
            <View style={{flexDirection: 'row'}}>
              <Text>2.24kb</Text>
            </View>
          </View> */}
        </View>
      </View>
      <View style={styles.contentContainerStyle}>
        <Subheading> FILE</Subheading>
      </View>

      <FAB
        style={[styles.fab, {backgroundColor: theme.colors.primary}]}
        icon="plus"
        onPress={navToAdd}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 10,
    bottom: 2,
    zIndex: 2,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
  },
  folder: {
    color: theme.colors.primary,
  },
  contentContainerStyle: {flexGrow: 1, display: 'flex'},
});

export default Files;

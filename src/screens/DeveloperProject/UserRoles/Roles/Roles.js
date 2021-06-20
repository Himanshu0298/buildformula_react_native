import MaterialTabBar from 'components/Atoms/MaterialTabBar';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import * as React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  withTheme,
  Menu,
  Divider,
  IconButton,
  Caption,
  Chip,
  FAB,
} from 'react-native-paper';
import {TabView} from 'react-native-tab-view';
import {useSelector} from 'react-redux';
import Layout from 'utils/Layout';

const USERS = [
  {roles: ['Layout']},
  {roles: ['Layout', 'Layout', 'Layout', 'Layout', 'Layout']},
  {roles: ['Layout', 'Layout', 'Layout', 'Layout']},
  {roles: ['Layout', 'Layout', 'Layout']},
];

const ROLES = ['Layout', 'Layout', 'Layout', 'Layout', 'Layout'];

function RenderUserCard(props) {
  const {item, index, menuIndex, toggleMenu, onDelete, onUpdate} = props;
  const {roles} = item;

  return (
    <View style={styles.userCardContainer}>
      <View style={styles.rowBetween}>
        <Text>Unnat Thamma</Text>
        <Menu
          visible={index === menuIndex}
          contentStyle={{borderRadius: 10}}
          onDismiss={toggleMenu}
          anchor={
            <IconButton
              size={20}
              icon="dots-vertical"
              onPress={() => toggleMenu(index)}
            />
          }>
          <Menu.Item
            icon="pencil"
            onPress={() => onUpdate(item)}
            title="Edit"
          />
          <Divider />
          <Menu.Item
            icon="delete"
            onPress={() => onDelete(item.id)}
            title="Delete"
          />
        </Menu>
      </View>
      <View style={styles.rowBetween}>
        <Caption>+91 6546 980008</Caption>
        <Caption>unaattamma@xyz.com</Caption>
      </View>
      <Divider style={{marginVertical: 10}} />
      <View style={styles.userRoleContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {roles.map(role => (
            <Chip style={{marginHorizontal: 5}}>{role}</Chip>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

function RenderUsers(props) {
  const {navigation, theme} = props;

  const [menuIndex, setMenuIndex] = useState(false);

  const toggleMenu = index => setMenuIndex(index);

  const onUpdate = () => {};

  const onDelete = () => {};

  const navToAddRole = () => navigation.navigate('AddUser');

  return (
    <View style={styles.contentContainer}>
      <FlatList
        data={USERS}
        extraData={USERS}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({item, index}) => (
          <RenderUserCard
            {...{item, index, menuIndex, toggleMenu, onDelete, onUpdate}}
          />
        )}
      />
      <FAB
        style={[styles.fab, {backgroundColor: theme.colors.primary}]}
        icon="plus"
        onPress={navToAddRole}
      />
    </View>
  );
}

function RenderRole(props) {
  const {item, index, menuIndex, toggleMenu, onDelete, onUpdate} = props;

  return (
    <View style={styles.rolePanelContainer}>
      <View style={styles.rowBetween}>
        <Text>General manager</Text>
        <Menu
          visible={index === menuIndex}
          contentStyle={{borderRadius: 10}}
          onDismiss={toggleMenu}
          anchor={
            <IconButton
              size={20}
              icon="dots-vertical"
              onPress={() => toggleMenu(index)}
            />
          }>
          <Menu.Item
            icon="pencil"
            onPress={() => onUpdate(item)}
            title="Edit"
          />
          <Divider />
          <Menu.Item
            icon="delete"
            onPress={() => onDelete(item.id)}
            title="Delete"
          />
        </Menu>
      </View>
    </View>
  );
}

function RenderRoles(props) {
  const {navigation, theme} = props;

  const [menuIndex, setMenuIndex] = useState(false);

  const toggleMenu = index => setMenuIndex(index);

  const onUpdate = () => {};

  const onDelete = () => {};

  const navToAddRole = () => navigation.navigate('AddRole');

  return (
    <View style={styles.contentContainer}>
      <FlatList
        data={ROLES}
        extraData={ROLES}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({item, index}) => (
          <>
            <RenderRole
              {...{item, index, menuIndex, toggleMenu, onDelete, onUpdate}}
            />
            {index !== ROLES.length - 1 ? (
              <Divider style={{marginVertical: 5}} />
            ) : null}
          </>
        )}
      />
      <FAB
        style={[styles.fab, {backgroundColor: theme.colors.primary}]}
        icon="plus"
        onPress={navToAddRole}
      />
    </View>
  );
}

function Roles(props) {
  const {loading} = useSelector(s => s.user);

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [routes] = React.useState([
    {key: 0, title: 'Users'},
    {key: 1, title: 'Roles'},
  ]);

  const renderScene = ({route: {key}}) => {
    if (key) {
      return <RenderRoles {...props} />;
    }
    return <RenderUsers {...props} />;
  };

  return (
    <>
      <Spinner visible={loading} textContent={''} />

      <TabView
        navigationState={{index: selectedTab, routes}}
        renderScene={renderScene}
        onIndexChange={setSelectedTab}
        initialLayout={{width: Layout.window.width}}
        renderTabBar={tabBarProps => {
          return (
            <View style={styles.headerContainer}>
              <ProjectHeader />
              <MaterialTabBar {...tabBarProps} />
            </View>
          );
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 20,
    bottom: 20,
  },
  userCardContainer: {
    backgroundColor: '#F2F4F5',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  rolePanelContainer: {
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userRoleContainer: {},
});

export default withTheme(Roles);

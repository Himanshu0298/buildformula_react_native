import MaterialTabBar from 'components/Atoms/MaterialTabBar';
import NoResult from 'components/Atoms/NoResult';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import * as React from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  RefreshControl,
} from 'react-native';
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
import useRoleActions from 'redux/actions/roleActions';
import Layout from 'utils/Layout';

const ROLES = ['Layout', 'Layout', 'Layout', 'Layout', 'Layout'];

function RenderUserCard(props) {
  const {item, index, menuIndex, toggleMenu, onDelete, onUpdate} = props;
  const {first_name, last_name, roles = [], phone, email} = item;

  return (
    <View style={styles.userCardContainer}>
      <View style={styles.rowBetween}>
        <Text>
          {first_name} {last_name}
        </Text>
        {/* <Menu
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
        </Menu> */}
      </View>
      <View style={styles.rowBetween}>
        <Caption>{phone ? `+91 ${phone}` : 'NA'}</Caption>
        <Caption>{email || 'NA'}</Caption>
      </View>
      {roles.length ? (
        <>
          <Divider style={{marginVertical: 10}} />
          <View style={styles.userRoleContainer}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {roles.map((role, i) => (
                <Chip mode="outlined" key={i} style={{marginHorizontal: 5}}>
                  {role}
                </Chip>
              ))}
            </ScrollView>
          </View>
        </>
      ) : null}
    </View>
  );
}

function RenderUsers(props) {
  const {navigation, theme, members, getMemberData} = props;
  const {assign_roles, assign_users = {}, admin_users = []} = members;

  const [menuIndex, setMenuIndex] = useState(false);

  const users = React.useMemo(() => {
    const admins = admin_users.map(i => ({...i, roles: ['Admin']}));
    const otherUsers = Object.values(assign_users).map(i => {
      const roles = assign_roles[i.user_id];
      return {...i, roles};
    });

    return [...admins, ...otherUsers];
  }, [admin_users, assign_roles, assign_users]);

  const toggleMenu = index => setMenuIndex(index);

  const onUpdate = user => navigation.navigate('AddUser', {user});

  const onDelete = () => {};

  const navToAddRole = () => navigation.navigate('AddUser');

  return (
    <View style={styles.contentContainer}>
      <FlatList
        data={users}
        extraData={users}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        keyExtractor={(_, i) => i.toString()}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={getMemberData} />
        }
        ListEmptyComponent={() => <NoResult title="No Users found" />}
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
  const {role_name} = item;

  return (
    <View style={styles.rolePanelContainer}>
      <View style={styles.rowBetween}>
        <Text>{role_name}</Text>
        {/* TODO: reactivate this */}
        {/* <Menu
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
        </Menu> */}
      </View>
    </View>
  );
}

function RenderRoles(props) {
  const {navigation, theme, roles, getRoleData} = props;

  const [menuIndex, setMenuIndex] = useState(false);

  const toggleMenu = index => setMenuIndex(index);

  const onUpdate = () => {};

  const onDelete = () => {};

  const navToAddRole = () => navigation.navigate('AddRole');

  return (
    <View style={styles.contentContainer}>
      <FlatList
        data={roles}
        extraData={roles}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={getRoleData} />
        }
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
  const {selectedProject} = useSelector(s => s.project);
  const {members, loading, roles} = useSelector(s => s.role);

  const {getMembers, getRoles} = useRoleActions();

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [routes] = React.useState([
    {key: 0, title: 'Users'},
    {key: 1, title: 'Roles'},
  ]);

  React.useEffect(() => {
    getMemberData();
    getRoleData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMemberData = () => getMembers({project_id: selectedProject.id});
  const getRoleData = () => getRoles({project_id: selectedProject.id});

  const renderScene = ({route: {key}}) => {
    switch (key) {
      case 0:
        return <RenderUsers {...props} {...{members, getMemberData}} />;
      case 1:
        return <RenderRoles {...props} {...{roles, getRoleData}} />;
    }
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
    paddingHorizontal: 5,
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
    marginVertical: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userRoleContainer: {},
});

export default withTheme(Roles);

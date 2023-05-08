import React, {useMemo} from 'react';
import {StyleSheet, View, Linking} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Paragraph, Drawer, Button, withTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {SITE_URL} from 'utils/constant';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DEVELOPER_DRAWER_ITEMS, CUSTOMER_DRAWER_ITEMS} from './DrawerItems';

function filterSidebar(items, permissions) {
  const filteredItems = [];

  items.map(item => {
    if (item?.routes) {
      const filteredSubModules = item?.routes?.filter(i => {
        return i.id ? permissions?.[i.id] && !permissions?.[i.id]?.none : true;
      });

      if (filteredSubModules?.length) {
        filteredItems.push({...item, routes: filteredSubModules});
      }
    } else {
      filteredItems.push(item);
    }
    return item;
  });

  return filteredItems;
}

const materialCommunityIcon = ({icon, color, size}) => (
  <MaterialCommunityIcons {...{name: icon, color, size}} />
);

const materialIcon = ({icon, color, size}) => (
  <MaterialIcons {...{name: icon, color, size}} />
);

const INITIAL_ROUTES = {
  general: 'Home',
  developer: 'DeveloperHome',
  customer: 'Ownership',
};

const DrawerItem = React.memo(props => {
  const {
    routeData,
    theme,
    route,
    navigation,
    label,
    icon,
    onPress,
    activeIcon,
    drawerType,
    inactiveIcon,
    ...restProps
  } = props;

  const {currentRoute, parentRoute} = routeData;
  const active = [currentRoute, parentRoute].includes(route);

  let drawerIcon;
  if (typeof icon === 'string') {
    drawerIcon = params => materialCommunityIcon({...params, icon});
  } else if (icon) {
    drawerIcon = icon;
  } else {
    drawerIcon = active ? activeIcon : inactiveIcon;
  }

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate(INITIAL_ROUTES[drawerType]);
      navigation.navigate(route);
      navigation.closeDrawer();
    }
  };

  return (
    <Drawer.Item
      {...restProps}
      label={label}
      theme={{
        colors: {primary: active ? '#fff' : theme.colors.primary},
      }}
      onPress={handlePress}
      style={active ? {backgroundColor: theme.colors.primary} : {}}
      active={active}
      icon={drawerIcon}
    />
  );
});

function RenderGeneralDrawerItems(props) {
  return (
    <>
      <DrawerItem
        {...props}
        label="Home"
        route="Home"
        icon="home-variant-outline"
      />
      <DrawerItem
        {...props}
        label="Profile"
        route="Profile"
        icon="account-box-outline"
      />
      <DrawerItem
        {...props}
        label="Project Purchase"
        route="PurchasedProjects"
        icon={params => materialIcon({...params, icon: 'shop'})}
      />
      <DrawerItem
        {...props}
        label="Support"
        route="Support"
        onPress={() => Linking.openURL(SITE_URL)}
        icon={params => materialIcon({...params, icon: 'support'})}
      />
      <DrawerItem
        {...props}
        label="Help"
        route="Help"
        onPress={() => Linking.openURL(SITE_URL)}
        icon="help-box"
      />
    </>
  );
}

function RenderDeveloperDrawerItems(props) {
  const {theme} = props;

  const {permissions, isProjectAdmin, availableModules} = useSelector(
    s => s.project,
  );

  const projectRoutes = useMemo(() => {
    return DEVELOPER_DRAWER_ITEMS?.filter(e => availableModules.includes(e.id));
  }, [availableModules]);

  const routes = useMemo(() => {
    if (isProjectAdmin) {
      return projectRoutes;
    }
    return filterSidebar(projectRoutes, permissions);
  }, [isProjectAdmin, permissions, projectRoutes]);

  return routes.map(section => {
    if (section.title) {
      return (
        <Drawer.Section key={section.title} style={styles.drawerSection}>
          <Paragraph
            style={styles.title}
            theme={{colors: {text: theme.colors.primary}}}>
            {section.title}
          </Paragraph>
          {section.routes.map(route => {
            return (
              <DrawerItem
                {...props}
                type="developer"
                key={route.route}
                {...route}
              />
            );
          })}
        </Drawer.Section>
      );
    }

    return <DrawerItem {...props} key={section.route} {...section} />;
  });
}

function RenderCustomerDrawerItems(props) {
  const {theme} = props;

  return (
    <>
      {CUSTOMER_DRAWER_ITEMS.map(section => {
        return (
          <Drawer.Section key={section.title} style={styles.drawerSection}>
            <Paragraph
              style={styles.title}
              theme={{
                colors: {text: theme.colors.primary},
              }}>
              {section.title}
            </Paragraph>
            {section.routes.map(route => {
              return (
                <DrawerItem
                  type="customer"
                  {...props}
                  key={route.route}
                  {...route}
                />
              );
            })}
          </Drawer.Section>
        );
      })}
    </>
  );
}

function DrawerContent(props) {
  const {navigation, theme} = props;
  const {drawerType} = useSelector(s => s.app);

  return (
    <SafeAreaView style={styles.scrollView} edges={['bottom']}>
      <DrawerContentScrollView
        {...props}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <View
          style={[
            styles.drawerContent,
            {backgroundColor: theme.colors.surface},
          ]}>
          <View style={styles.backContainer}>
            <Button
              icon="arrow-expand-left"
              onPress={() => navigation.toggleDrawer()}
              style={styles.backIcon}>
              Back
            </Button>
          </View>
          {drawerType === 'general' ? (
            <RenderGeneralDrawerItems {...props} drawerType={drawerType} />
          ) : null}
          {drawerType === 'developer' ? (
            <RenderDeveloperDrawerItems {...props} drawerType={drawerType} />
          ) : null}
          {drawerType === 'customer' ? (
            <RenderCustomerDrawerItems {...props} drawerType={drawerType} />
          ) : null}
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  drawerContent: {
    flexGrow: 1,
    marginTop: -4,
  },
  backContainer: {
    marginTop: 5,
    marginRight: 5,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  drawerSection: {
    marginTop: 5,
  },
  title: {
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 14,
  },
  backIcon: {
    width: 100,
    marginBottom: 5,
  },
});

export default withTheme(React.memo(DrawerContent));

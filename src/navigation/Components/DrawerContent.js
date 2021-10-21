import React, {useMemo} from 'react';
import {StyleSheet, View, Linking, NativeModules} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Paragraph, Drawer, Button, withTheme} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useAppActions from '../../redux/actions/appActions';
import {SITE_URL} from 'utils/constant';
import {DEVELOPER_DRAWER_ITEMS, CUSTOMER_DRAWER_ITEMS} from './DrawerItems';
import {useSelector} from 'react-redux';

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
  });

  return filteredItems;
}

const DrawerItem = React.memo(props => {
  const {
    routeData,
    theme,
    route,
    navigation,
    label,
    icon,
    onPress = () => navigation.navigate(route),
    activeIcon,
    inactiveIcon,
    image,
    ...restProps
  } = props;

  const {currentRoute, parentRoute} = routeData;
  const active = [currentRoute, parentRoute].includes(route);

  let drawerIcon;
  if (typeof icon === 'string') {
    drawerIcon = ({color, size}) => (
      <MaterialCommunityIcons {...{name: icon, color, size}} />
    );
  } else if (icon) {
    drawerIcon = icon;
  } else {
    drawerIcon = active ? activeIcon : inactiveIcon;
  }

  return (
    <Drawer.Item
      {...restProps}
      label={label}
      theme={{
        colors: {primary: active ? '#fff' : theme.colors.primary},
      }}
      onPress={onPress}
      style={active ? {backgroundColor: theme.colors.primary} : {}}
      active={active}
      icon={drawerIcon}
    />
  );
});

function RenderGeneralDrawerItems(props) {
  const {logout} = useAppActions();

  return (
    <>
      <DrawerItem
        {...props}
        label={'Home'}
        route="Home"
        icon={'home-variant-outline'}
      />
      <DrawerItem
        {...props}
        label={'Profile'}
        route="Profile"
        icon={'account-box-outline'}
      />
      <DrawerItem
        {...props}
        label={'Project Purchase'}
        route="PurchasedProjects"
        icon={({color, size}) => (
          <MaterialIcons name={'shop'} color={color} size={size} />
        )}
      />
      <DrawerItem
        {...props}
        label={'Support'}
        route="Support"
        onPress={() => Linking.openURL(SITE_URL)}
        icon={({color, size}) => (
          <MaterialIcons name={'support'} color={color} size={size} />
        )}
      />
      <DrawerItem
        {...props}
        label={'Help'}
        route="Help"
        onPress={() => Linking.openURL(SITE_URL)}
        icon={'help-box'}
      />
      <DrawerItem
        {...props}
        label={'Logout'}
        route="Help"
        onPress={logout}
        icon={'logout'}
      />
    </>
  );
}

function RenderDeveloperDrawerItems(props) {
  const {theme} = props;

  const {permissions, isProjectAdmin} = useSelector(s => s.project);

  const routes = useMemo(() => {
    if (isProjectAdmin) {
      return DEVELOPER_DRAWER_ITEMS;
    } else {
      return filterSidebar(DEVELOPER_DRAWER_ITEMS, permissions);
    }
  }, [isProjectAdmin, permissions]);

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
            return <DrawerItem {...props} key={route.route} {...route} />;
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
              return <DrawerItem {...props} key={route.route} {...route} />;
            })}
          </Drawer.Section>
        );
      })}
    </>
  );
}

function DrawerContent(props) {
  const {navigation, theme, type} = props;

  const translateX = Animated.interpolate(props.progress, {
    inputRange: [0, 0.5, 0.7, 0.8, 1],
    outputRange: [-100, -85, -70, -45, 0],
  });

  return (
    <DrawerContentScrollView
      {...props}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollView}>
      <Animated.View
        style={[
          styles.drawerContent,
          {
            backgroundColor: theme.colors.surface,
            transform: [{translateX}],
          },
        ]}>
        <View style={styles.backContainer}>
          <Button
            icon="arrow-expand-left"
            onPress={() => navigation.toggleDrawer()}
            style={{width: 100, marginBottom: 5}}>
            Back
          </Button>
        </View>
        {type === 'general' ? <RenderGeneralDrawerItems {...props} /> : null}
        {type === 'developer' ? (
          <RenderDeveloperDrawerItems {...props} />
        ) : null}
        {type === 'customer' ? <RenderCustomerDrawerItems {...props} /> : null}
      </Animated.View>
    </DrawerContentScrollView>
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
});

export default withTheme(React.memo(DrawerContent));

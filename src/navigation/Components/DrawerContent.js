import React from 'react';
import {StyleSheet, View, Linking} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {useTheme, Paragraph, Drawer, Button} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {theme} from 'styles/theme';
import useAppActions from '../../redux/actions/appActions';
import {SITE_URL} from 'utils/constant';
import {PROJECT_DRAWER_ITEMS} from './DrawerItems';

const DrawerItem = React.memo(props => {
  const {
    routeData,
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

  const active = [routeData.currenRoute, routeData.parentRoute].includes(route);

  let drawerIcon;
  if (typeof icon === 'string') {
    drawerIcon = ({color, size}) => (
      <MaterialCommunityIcons {...{name: icon, color, size}} />
    );
  } else if (icon) {
    drawerIcon = icon;
  } else if (active) {
    drawerIcon = activeIcon;
  } else {
    drawerIcon = inactiveIcon;
  }

  return (
    <Drawer.Item
      {...restProps}
      label={label}
      theme={{
        colors: {
          text: '#000',
          primary: active ? '#fff' : theme.primary,
        },
      }}
      onPress={onPress}
      style={active ? styles.activeDrawerItem : {}}
      active={active}
      icon={drawerIcon}
    />
  );
});

function DrawerContent(props) {
  const {navigation, routeData, type} = props;
  const paperTheme = useTheme();
  const {logout} = useAppActions();

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
            backgroundColor: paperTheme.colors.surface,
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
        {type === 'general' ? (
          <>
            <DrawerItem
              label={'Home'}
              route="Home"
              navigation={navigation}
              routeData={routeData}
              icon={({color, size}) => (
                <Feather name={'home'} color={color} size={size} />
              )}
            />
            <DrawerItem
              label={'Settings'}
              route="Settings"
              navigation={navigation}
              routeData={routeData}
              icon={'cog-outline'}
            />
            <DrawerItem
              label={'Help'}
              route="help"
              onPress={() => Linking.openURL(SITE_URL)}
              routeData={routeData}
              icon={'help-box'}
            />
            <DrawerItem
              label={'Logout'}
              routeData={routeData}
              onPress={logout}
              icon={'logout'}
            />
          </>
        ) : (
          <>
            <DrawerItem
              label={'Dashboard'}
              route="ProjectDashboard"
              navigation={navigation}
              routeData={routeData}
              icon={({color, size}) => (
                <MaterialCommunityIcons
                  name={'view-dashboard-outline'}
                  color={color}
                  size={size}
                />
              )}
            />
            {PROJECT_DRAWER_ITEMS.map(section => {
              return (
                <Drawer.Section
                  key={section.title}
                  style={styles.drawerSection}>
                  <Paragraph
                    style={styles.title}
                    theme={{
                      colors: {text: paperTheme.colors.primary},
                    }}>
                    {section.title}
                  </Paragraph>
                  {section.routes.map(route => {
                    return (
                      <DrawerItem
                        key={route.route}
                        {...route}
                        navigation={navigation}
                        routeData={routeData}
                      />
                    );
                  })}
                </Drawer.Section>
              );
            })}
          </>
        )}
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
    display: 'flex',
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
  activeDrawerItem: {
    backgroundColor: theme.colors.primary,
  },
});

export default React.memo(DrawerContent);

import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import {
  Avatar,
  Caption,
  Title,
  Drawer,
  useTheme,
} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import providerIcon from './../../assets/images/provider.png';
import profilePlaceholder from './../../assets/images/profile_placeholder.png';
import yourRidesIcon from './../../assets/images/rides.png';
import rateCardIcon from './../../assets/images/ratecard.png';
import paymentsIcon from './../../assets/images/payments.png';
import inviteFriendsIcon from './../../assets/images/invitefriends.png';
import helpIcon from './../../assets/images/help.png';
import aboutIcon from './../../assets/images/about.png';
import logoutIcon from './../../assets/images/logout.png';
import menuIcon from './../../assets/images/menu.png';
import { theme } from '../../styles/theme';

function DrawerItem(props) {
  const { activeRoute, route, Label, image, ...restProps } = props;
  let active = activeRoute === route;
  return (
    <Drawer.Item
      {...restProps}
      Label={Label}
      theme={{ colors: { text: '#fff', primary: active ? '#fff' : theme.primary } }}
      style={active ? styles.activeDrawerItem : {}}
      active={active}
      icon={({ color, size }) => (
        <Image
          style={{ height: size, width: size }}
          source={image}
        />
      )} />
  );
}

export default function DrawerContent(props) {
  const paperTheme = useTheme();

  const translateX = Animated.interpolate(props.progress, {
    inputRange: [0, 0.5, 0.7, 0.8, 1],
    outputRange: [-100, -85, -70, -45, 0],
  });

  let { routeNames } = props.state;
  let currentRoute = routeNames[routeNames.length - 1];

  return (
    <View style={styles.drawerContainer}>
      <TouchableOpacity style={styles.menuIconContainer} onPress={() => props.navigation.toggleDrawer()}>
        <Image style={{ height: 40, width: 40 }} source={menuIcon} />
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.drawerContent,
          {
            backgroundColor: paperTheme.colors.primary,
            transform: [{ translateX }],
          },
        ]}>
        { /**
           * Top Section of Drawer
           * Using fragment instead of view will be ignored during bundling 
           * so justify content css will be combined
           */}
        <View>
          <TouchableOpacity
            style={styles.userInfoSection}
            onPress={() => props.navigation.toggleDrawer()}
          >
            <Avatar.Image source={profilePlaceholder}
              size={50}
            />
            <View style={styles.userName}>
              <Title style={styles.title}>Dawid Urbaniak</Title>
              <Caption style={styles.caption}>@trensik</Caption>
            </View>
          </TouchableOpacity>
          <View style={styles.divider} />
          <DrawerItem
            label="Providers"
            route="LinkAccounts"
            activeRoute={currentRoute}
            onPress={() => props.navigation.navigate('LinkAccounts')}
            image={providerIcon}
          />
          <DrawerItem
            label="Your Rides"
            route="RideHistory"
            activeRoute={false}
            onPress={() => props.navigation.navigate('RideHistory')}
            image={yourRidesIcon}
          />
          <View style={styles.divider} />
          <DrawerItem
            label="Rate Card"
            route="RateCard"
            activeRoute={false}
            onPress={() => { }}
            image={rateCardIcon}
          />
          <DrawerItem
            label="Payments"
            route="Payments"
            activeRoute={false}
            onPress={() => { }}
            image={paymentsIcon}
          />
          <View style={styles.divider} />
          <DrawerItem
            label="Invite Friends"
            route="InviteFriends"
            activeRoute={false}
            onPress={() => { }}
            image={inviteFriendsIcon}
          />
          <DrawerItem
            label="Help"
            route="Help"
            activeRoute={false}
            onPress={() => { }}
            image={helpIcon}
          />
          <DrawerItem
            label="About"
            route="About"
            activeRoute={false}
            onPress={() => { }}
            image={aboutIcon}
          />
        </View>

        { /**
     * Bottom Section of Drawer
     * Using fragment instead of view will be ignored during bundling so all will be combined
     */}
        <View style={{ paddingTop: 10 }}>
          <View style={styles.divider} />
          <DrawerItem
            label="Logout"
            activeRoute={false}
            onPress={() => { }}
            image={logoutIcon}
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    position: 'relative',
  },
  drawerContent: {
    flex: 1,
    width: '75%',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 30,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 5,
    backgroundColor: '#fff',
  },
  menuIconContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  //Drawer Header
  userInfoSection: {
    flexDirection: 'row',
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
  },
  userName: {
    marginLeft: 10,
  },
  title: {
    fontWeight: 'bold',
    lineHeight: 16,
    fontSize: 16,
    color: '#fff',
  },
  caption: {
    lineHeight: 13,
    fontSize: 14,
    color: '#fff',
  },
  //Drawer Item
  activeDrawerItem: {
    backgroundColor: '#871a1a',
  },
});

import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {useTheme, Paragraph, Drawer, TouchableRipple} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {theme} from '../../styles/theme';
import Arrow from './../../assets/images/arrow_icon.png';
import StructureActive from './../../assets/images/structure_icon_active.png';
import Structure from './../../assets/images/structure_icon.png';
import PaymentActive from './../../assets/images/payment_icon_active.png';
import Payment from './../../assets/images/payment_icon.png';
import AssignTaskActive from './../../assets/images/task_icon_active.png';
import AssignTask from './../../assets/images/task_icon.png';
import ProcessIconActive from './../../assets/images/process_icon_active.png';
import ProcessIcon from './../../assets/images/process_icon.png';
import EstimationIconActive from './../../assets/images/estimation_icon_active.png';
import EstimationIcon from './../../assets/images/estimation_icon.png';
import OrderIconActive from './../../assets/images/order_icon_active.png';
import OrderIcon from './../../assets/images/order_icon.png';
import BaseText from '../../components/BaseText';

const sections = [
  {
    title: 'SALES',
    routes: [
      {
        route: 'Inquiry',
        label: 'Inquiry',
        icon: 'account-question-outline',
      },
      {
        route: 'ProjectStructure',
        label: 'Project Structure',
        activeIcon: ({color, size}) => (
          <Image source={StructureActive} style={{height: size, width: size}} />
        ),
        inactiveIcon: ({color, size}) => (
          <Image source={Structure} style={{height: size, width: size}} />
        ),
      },
      {
        route: 'BookingChart',
        label: 'Booking Chart',
        icon: 'chart-line',
      },
      {
        route: 'Payment',
        label: 'Payment',
        activeIcon: ({color, size}) => (
          <Image
            source={PaymentActive}
            style={{height: size - 5, width: size + 5}}
          />
        ),
        inactiveIcon: ({color, size}) => (
          <Image source={Payment} style={{height: size - 5, width: size + 5}} />
        ),
      },
    ],
  },
  {
    title: 'PROJECT MANAGEMENT',
    routes: [
      {
        route: 'ProjectSchedule',
        label: 'Project Schedule',
        icon: 'calendar-month-outline',
      },
      {
        route: 'MainPhase',
        label: 'Main Phase',
        icon: 'clock-outline',
      },
      {
        route: 'AssignTask',
        label: 'Assign Task',
        activeIcon: ({color, size}) => (
          <Image
            source={AssignTaskActive}
            style={{height: size, width: size}}
          />
        ),
        inactiveIcon: ({color, size}) => (
          <Image source={AssignTask} style={{height: size, width: size}} />
        ),
      },
      {
        route: 'ProcessChart',
        label: 'Process Chart',
        activeIcon: ({color, size}) => (
          <Image
            source={ProcessIconActive}
            style={{height: size, width: size}}
          />
        ),
        inactiveIcon: ({color, size}) => (
          <Image source={ProcessIcon} style={{height: size, width: size}} />
        ),
      },
    ],
  },
  {
    title: 'MATERIAL MANAGEMENT',
    routes: [
      {
        route: 'Estimation',
        label: 'Estimation',
        activeIcon: ({color, size}) => (
          <Image
            source={EstimationIconActive}
            style={{height: size, width: size}}
          />
        ),
        inactiveIcon: ({color, size}) => (
          <Image source={EstimationIcon} style={{height: size, width: size}} />
        ),
      },
      {
        route: 'RequestForPrice',
        label: 'Request For Price',
        icon: 'tag-outline',
      },
      {
        route: 'PurchaseOrders',
        label: 'Purchase Orders',
        activeIcon: ({color, size}) => (
          <Image source={OrderIconActive} style={{height: size, width: size}} />
        ),
        inactiveIcon: ({color, size}) => (
          <Image source={OrderIcon} style={{height: size, width: size}} />
        ),
      },
    ],
  },
  {
    title: 'FILES',
    routes: [
      {
        route: 'Files',
        label: 'Files',
        icon: 'folder-open-outline',
      },
    ],
  },
];

function DrawerItem(props) {
  const {
    currentRoute,
    route,
    navigation,
    label,
    icon,
    activeIcon,
    inactiveIcon,
    image,
    ...restProps
  } = props;
  let active = route === currentRoute;
  let drawerIcon;
  if (typeof icon === 'string') {
    drawerIcon = ({color, size}) => (
      <MaterialCommunityIcons name={icon} color={color} size={size} />
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
      theme={{colors: {text: '#000', primary: active ? '#fff' : theme.primary}}}
      onPress={() => navigation.navigate(route)}
      style={active ? styles.activeDrawerItem : {}}
      active={active}
      icon={drawerIcon}
    />
  );
}

export default function DrawerContent(props) {
  const {navigation, currentScreen} = props;
  const paperTheme = useTheme();

  const translateX = Animated.interpolate(props.progress, {
    inputRange: [0, 0.5, 0.7, 0.8, 1],
    outputRange: [-100, -85, -70, -45, 0],
  });
  return (
    <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
      <Animated.View
        //@ts-ignore
        style={[
          styles.drawerContent,
          {
            backgroundColor: paperTheme.colors.surface,
            transform: [{translateX}],
          },
        ]}>
        <View style={styles.backContainer}>
          <TouchableRipple
            onPress={() => navigation.toggleDrawer()}
            rippleColor="rgba(0, 0, 0, .32)"
            style={{width: 100}}>
            <View style={styles.backButton}>
              <BaseText variant="semiBold" style={styles.backText}>
                Back
              </BaseText>
              <Image source={Arrow} style={{height: 12, width: 18}} />
            </View>
          </TouchableRipple>
        </View>
        <DrawerItem
          label={'Dashboard'}
          route="Dashboard"
          navigation={navigation}
          currentRoute={currentScreen}
          icon={({color, size}) => (
            <Feather name={'home'} color={color} size={size} />
          )}
        />
        {sections.map((section) => {
          return (
            <Drawer.Section key={section.title} style={styles.drawerSection}>
              <Paragraph
                style={styles.title}
                theme={{
                  colors: {text: paperTheme.colors.primary},
                }}>
                {section.title}
              </Paragraph>
              {section.routes.map((route) => {
                return (
                  <DrawerItem
                    key={route.route}
                    {...route}
                    navigation={navigation}
                    currentRoute={currentScreen}
                  />
                );
              })}
            </Drawer.Section>
          );
        })}
      </Animated.View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  backContainer: {
    marginTop: 5,
    marginRight: 5,
    display: 'flex',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  backButton: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  backText: {
    color: '#000',
    fontSize: 16,
    marginRight: 5,
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

import React from 'react';
import {Subheading, Badge, withTheme} from 'react-native-paper';
import {View, TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import Timer from 'components/Atoms/Timer';
import logo from 'assets/images/vshwanLogo.png';
import UserAvatar from 'components/Atoms/UserAvatar';

function ProjectHeader(props) {
  const {navigation, showTimer, showLogo, showHeaderIcons = true} = props;

  const {selectedProject} = useSelector(s => s.project);
  const {projectNotifications} = useSelector(s => s.notification);
  const {user} = useSelector(s => s.user);

  const navToNotification = () => {
    if (showLogo) {
      navigation.navigate('GlobalNotification', {showLogo});
    } else {
      navigation.navigate('ProjectNotification', {showLogo});
    }
  };

  const navToProfile = () => navigation.push('Profile');

  return (
    <SafeAreaView edges={['right', 'top', 'left']}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Subheading style={styles.headerLogo}>
            {showLogo ? (
              <Subheading style={styles.headerText}>
                <Image source={logo} style={styles.banner} />
              </Subheading>
            ) : (
              selectedProject?.project_name
            )}
          </Subheading>
        </View>
        {showHeaderIcons ? (
          <View style={styles.rightContainer}>
            <Timer displayTimer={showTimer} />
            <TouchableOpacity
              style={styles.bellContainer}
              onPress={navToNotification}>
              <MaterialCommunityIcons name="bell" color="#000" size={25} />
              {projectNotifications.length > 0 &&
              projectNotifications.length < 99 ? (
                <Badge size={17} style={styles.badge}>
                  {projectNotifications.length}
                </Badge>
              ) : projectNotifications.length > 100 ? (
                <Badge size={17} style={styles.badge}>
                  <Text style={{fontSize: 8}}>99+</Text>
                </Badge>
              ) : projectNotifications.length === 0 ? null : null}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={navToProfile}
              style={styles.profileIconContainer}>
              <UserAvatar size={25} uri={user?.profile_url} />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {},
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellContainer: {
    position: 'relative',
    marginLeft: 10,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: 0,
    borderWidth: 0.3,
    borderColor: '#fff',
  },
  banner: {
    width: 150,
    height: 24,
  },
  profileIconContainer: {
    marginLeft: 15,
    borderRadius: 20,
  },
  headerLogo: {
    fontSize: 17,
    fontWeight: '600',
  },
  headerText: {
    fontSize: 35,
  },
});

export default withTheme(React.memo(ProjectHeader));

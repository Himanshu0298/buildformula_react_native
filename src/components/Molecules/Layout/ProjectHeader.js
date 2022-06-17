import React from 'react';
import {Subheading, Badge, withTheme} from 'react-native-paper';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
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
    navigation.push('ProjectNotification', {showLogo});
  };

  const navToProfile = () => {
    navigation.push('Profile');
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Subheading style={{fontSize: 14}}>
            {showLogo ? (
              <Subheading style={{fontSize: 35}}>
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
              <MaterialCommunityIcons name="bell" color="#000" size={20} />
              {projectNotifications.length ? (
                <Badge size={10} style={styles.badge} />
              ) : null}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={navToProfile}
              style={styles.profileIconContainer}>
              <UserAvatar size={23} uri={user?.profile_url} />
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
    top: 0,
    right: 0,
    borderWidth: 1,
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
});

export default withTheme(React.memo(ProjectHeader));

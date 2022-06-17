import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import * as React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import {Text, withTheme, Caption} from 'react-native-paper';
import {getShadow} from 'utils';
import dayjs from 'dayjs';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import useNotificationActions from 'redux/actions/notificationActions';
import ScreenTitle from 'components/Atoms/ScreenTitle';
import {useState, useRef} from 'react';
import {theme} from 'styles/theme';
import UserImage from 'assets/images/requestedUser.png';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Layout from 'utils/Layout';

const rightSwipeActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 1],
    outputRange: [1, 0],
  });
  return (
    <TouchableOpacity onPress={() => alert('Delete button pressed')}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'red',
          justifyContent: 'center',
          marginVertical: 5,
          borderBottomRightRadius: 5,
          borderTopRightRadius: 5,
        }}>
        <Animated.Text
          style={{
            color: 'white',
            paddingHorizontal: 10,
            fontWeight: '700',
            transform: [{scale}],
          }}>
          Delete
        </Animated.Text>
      </View>
    </TouchableOpacity>
  );
};

const leftActions = (progress, dragX) => {
  const translateX = dragX.interpolate({
    inputRange: [-Layout.window.width, 0],
    outputRange: [-(Layout.window.width / 2 - 50), 0],
  });
  return (
    <View
      style={{
        width: Layout.window.width,
        backgroundColor: 'rgba(255, 94, 94, 0.2)',
        marginVertical: 5,
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}>
      <Animated.Text
        style={{
          paddingHorizontal: 10,
          fontWeight: '600',
          color: theme.colors.error,
          transform: [{translateX}],
        }}>
        {/* <AntDesign name="closecircle" size={20} color="red" /> */}
        Removed
      </Animated.Text>
    </View>
  );
};

function ChatActivityButton() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <View style={styles.chatActivity}>
      <View style={styles.buttonContainer}>
        <OpacityButton
          onPress={() => setSelectedTab(1)}
          style={selectedTab ? styles.activeButton : styles.inactiveButton}>
          <Text style={selectedTab ? styles.activeText : styles.inactiveText}>
            Unread
          </Text>
        </OpacityButton>
        <OpacityButton
          onPress={() => setSelectedTab(0)}
          style={selectedTab ? styles.inactiveButton : styles.activeButton}>
          <Text style={!selectedTab ? styles.activeText : styles.inactiveText}>
            Read
          </Text>
        </OpacityButton>
      </View>
    </View>
  );
}

function RenderNotification(props) {
  const {item, handleNotification, clearNotification} = props;
  const {modules, receive_datetime} = item;

  const ref = useRef();

  const handleClick = () => {
    // open the nested swipeable
    ref.current.open();
  };

  return (
    <Swipeable
      renderRightActions={rightSwipeActions}
      ref={ref}
      {...props}
      onSwipeableLeftOpen={() => clearNotification(item.id)}>
      <View style={styles.notificationContainer}>
        <View>
          <OpacityButton style={styles.userIcon} opacity={0.1}>
            <Image source={UserImage} />
          </OpacityButton>
        </View>

        <View style={styles.notificationBody}>
          <View style={styles.notificationText}>
            <Text>{modules}</Text>
            <Caption>{`${dayjs(receive_datetime).format('hh:mm A')}`}</Caption>
          </View>
          <Caption>{`You have ${modules} unread notifications`}</Caption>

          {/* To do After API
           <Text style={styles.alertBadge}>Important</Text> */}
          <TouchableOpacity>
            <Text style={styles.alertActionBadge}>Action Needed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );
}

function EmptyComponent() {
  return (
    <View style={styles.emptyContainer}>
      <Text>No new notifications!</Text>
    </View>
  );
}

function ProjectNotification(props) {
  const {isHome, navigation} = props;

  const {getProjectNotifications, removeNotification} =
    useNotificationActions();

  const {projectNotifications, loading} = useSelector(s => s.notification);
  const {selectedProject, projects} = useSelector(s => s.project);

  const clearNotification = async id => {
    await removeNotification(id, {project_id: selectedProject.id});
    getProjectNotifications({project_id: selectedProject.id});
  };

  const handleNotification = notification => {
    if (isHome) {
      const {developers = [], suppliers = [], customers = []} = projects;

      const project = [...developers, ...suppliers, ...customers].find(
        i => i.id === notification.project_id,
      );
      navigation.navigate('DeveloperDashboard', {
        screen: 'DeveloperHome',
        params: {project},
      });
    }
  };

  const renderEmpty = () => <EmptyComponent />;

  console.log('-------->projectNotifications', projectNotifications);

  return (
    <View style={styles.container}>
      <View style={styles.rowBetween}>
        <ScreenTitle title="Notifications" backIcon />
        <Text style={styles.allNotifications}>Mark all Read</Text>
      </View>

      <ChatActivityButton />
      <Spinner visible={loading} textContent="" />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={projectNotifications}
        extraData={projectNotifications}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({item}) => (
          <RenderNotification
            {...{item, clearNotification, handleNotification}}
          />
        )}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  notificationContainer: {
    paddingVertical: 10,
    padding: 8,
    backgroundColor: '#fff',
    margin: 5,
    ...getShadow(3),
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: 'red',
  },
  userIcon: {
    borderRadius: 30,
    marginRight: 10,
  },
  notificationBody: {
    flex: 1,
  },
  notificationText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertBadge: {
    backgroundColor: theme.colors.primary,
    borderRadius: 15,
    color: '#fff',
    width: 80,
    paddingLeft: 10,
    paddingBottom: 2,
  },
  alertActionBadge: {
    backgroundColor: theme.colors.error,
    borderRadius: 15,
    color: '#fff',
    width: 110,
    paddingLeft: 10,
    paddingBottom: 2,
  },

  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 20,
    width: 160,
    backgroundColor: '#ADD8E6',
  },
  activeButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 25,
    width: 80,
  },
  inactiveButton: {
    borderRadius: 25,
    width: 80,
    backgroundColor: 'transparent',
  },
  activeText: {
    color: '#fff',
  },
  inactiveText: {
    color: theme.colors.primary,
  },
  chatActivity: {
    paddingBottom: 10,
  },
  emptyContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  allNotifications: {
    color: theme.colors.primary,
    marginRight: 5,
  },
});

export default withTheme(ProjectNotification);

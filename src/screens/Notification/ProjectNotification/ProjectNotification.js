import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import * as React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
  RefreshControl,
} from 'react-native';
import {Text, withTheme, Caption, Avatar} from 'react-native-paper';
import {getShadow} from 'utils';
import dayjs from 'dayjs';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import useNotificationActions from 'redux/actions/notificationActions';
import ScreenTitle from 'components/Atoms/ScreenTitle';
import {useState, useRef} from 'react';
import {theme} from 'styles/theme';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import useAppActions from 'redux/actions/appActions';

const rightSwipeActions = (progress, dragX, handleRemove) => {
  return (
    <TouchableOpacity onPress={handleRemove}>
      <View style={styles.swipeContainer}>
        <Animated.Text style={styles.deleteText}>Delete</Animated.Text>
      </View>
    </TouchableOpacity>
  );
};

function RenderNotification(props) {
  const {item, handleNotification, clearNotification, actionStatus} = props;
  const {modules, receive_datetime, notifications_text} = item;

  const ref = useRef();

  const handleRemove = async () => {
    await clearNotification(item.id);
    ref?.current?.close();
  };

  return (
    <Swipeable
      ref={ref}
      renderRightActions={(...params) =>
        rightSwipeActions(...params, handleRemove)
      }
      {...props}>
      <View style={styles.notificationContainer}>
        <View>
          <OpacityButton style={styles.userIcon} opacity={0.1}>
            <Avatar.Text size={35} label={modules.charAt(0).toUpperCase()} />
          </OpacityButton>
        </View>

        <View style={styles.notificationBody}>
          <View style={styles.notificationText}>
            <Text>{modules}</Text>
            <Caption>{`${dayjs(receive_datetime).format('hh:mm A')}`}</Caption>
          </View>
          <Caption>{notifications_text}</Caption>

          {/* To do After API
           <Text style={styles.alertBadge}>Important</Text> */}
          {actionStatus ? (
            <TouchableOpacity>
              <Text style={styles.alertActionBadge}>Action Needed</Text>
            </TouchableOpacity>
          ) : null}
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

  const [selectedTab, setSelectedTab] = useState(1);
  const [notificationType, setNotificationType] = useState('');

  const {getProjectNotifications, removeNotification} =
    useNotificationActions();
  const {setDrawerType} = useAppActions();

  const {projectNotifications, loading} = useSelector(s => s.notification);
  const {selectedProject, projects} = useSelector(s => s.project);

  const clearNotification = async id => {
    await removeNotification(id, {project_id: selectedProject.id});
    return loadData();
  };

  React.useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    selectedTab ? setNotificationType('read') : setNotificationType('');
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  const loadData = () => {
    getProjectNotifications({
      project_id: selectedProject.id,
      notification_type: notificationType,
    });
  };

  const handleNotification = notification => {
    if (isHome) {
      const {developers = [], suppliers = [], customers = []} = projects;

      const project = [...developers, ...suppliers, ...customers].find(
        i => i.id === notification.project_id,
      );
      setDrawerType('developer');
      navigation.navigate('DeveloperHome', {project});
    }
  };

  const renderEmpty = () => <EmptyComponent />;

  return (
    <View style={styles.container}>
      <View style={styles.rowBetween}>
        <ScreenTitle title="Notifications" backIcon />
        <Text style={styles.allNotifications}>Mark all Read</Text>
      </View>

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
            <Text
              style={!selectedTab ? styles.activeText : styles.inactiveText}>
              Read
            </Text>
          </OpacityButton>
        </View>
      </View>
      <Spinner visible={loading} textContent="" />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={loadData} />
        }
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
    borderLeftColor: 'blue',
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
  swipeContainer: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    marginVertical: 5,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  deleteText: {
    color: 'white',
    paddingHorizontal: 10,
    fontWeight: '700',
  },
});

export default withTheme(ProjectNotification);

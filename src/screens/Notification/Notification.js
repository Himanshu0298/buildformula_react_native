import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import * as React from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {Title, Text, withTheme, Caption, Button} from 'react-native-paper';
import {getShadow} from 'utils';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import useNotificationActions from 'redux/actions/notificationActions';
import {useAlert} from 'components/Atoms/Alert';

function RenderNotification(props) {
  const {item, isHome, clearNotification, handleNotification} = props;
  const {project_name, notifications_text, notifications, receive_datetime} =
    item;

  return (
    <TouchableOpacity
      style={styles.notificationContainer}
      onPress={() => handleNotification(item)}
    >
      <View>
        <OpacityButton style={styles.userIcon} opacity={0.1}>
          <MaterialIcons name="account-outline" size={25} />
        </OpacityButton>
      </View>

      <View style={styles.notificationBody}>
        <Text>{isHome ? project_name : notifications_text}</Text>
        <Caption>
          {isHome
            ? `You have ${notifications} unread notifications`
            : dayjs(receive_datetime).format('DD MMM YYYY, hh:mm A')}
        </Caption>
      </View>

      {!isHome ? (
        <TouchableOpacity
          style={styles.closeIconContainer}
          onPress={() => clearNotification(item.id)}
        >
          <MaterialIcons name="close-circle-outline" size={20} />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
}

function EmptyComponent() {
  return (
    <View style={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>No new notifications!</Text>
    </View>
  );
}

function Notification(props) {
  const {isHome, navigation} = props;

  const alert = useAlert();

  const {getProjectNotifications, removeAllNotifications, removeNotification} =
    useNotificationActions();

  const {allNotifications, projectNotifications, loading} = useSelector(
    s => s.notification,
  );
  const {selectedProject, projects} = useSelector(s => s.project);

  const clearAll = () => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to clear all notifications?',
      onConfirm: async () => {
        await removeAllNotifications({project_id: selectedProject.id});
        getProjectNotifications({project_id: selectedProject.id});
      },
    });
  };

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

  return (
    <View style={styles.container}>
      <View style={styles.rowBetween}>
        <Title>Notifications</Title>
        {!isHome && projectNotifications.length ? (
          <Button
            mode="contained"
            theme={{roundness: 10}}
            onPress={clearAll}
            uppercase={false}
            labelStyle={{marginVertical: 6, fontSize: 13}}
          >
            CLear All
          </Button>
        ) : null}
      </View>
      <Spinner visible={loading} textContent="" />
      <FlatList
        data={isHome ? allNotifications : projectNotifications}
        extraData={isHome ? allNotifications : projectNotifications}
        contentContainerStyle={{flexGrow: 1}}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({item}) => (
          <RenderNotification
            {...{item, isHome, clearNotification, handleNotification}}
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
    padding: 12,
    backgroundColor: '#fff',
    margin: 5,
    ...getShadow(3),
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    borderRadius: 30,
    padding: 7,
    marginRight: 10,
  },
  notificationBody: {
    flex: 1,
    marginRight: 10,
  },
  closeIconContainer: {
    height: '100%',
    padding: 2,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default withTheme(Notification);

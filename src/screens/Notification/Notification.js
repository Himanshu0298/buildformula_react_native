import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import * as React from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {Title, Text, withTheme, Caption} from 'react-native-paper';
import {getShadow} from 'utils';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

function RenderNotification(props) {
  const {item, isHome} = props;
  const {
    project_name,
    notifications_text,
    notifications,
    receive_datetime,
  } = item;

  return (
    <View style={styles.notificationContainer}>
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
        <TouchableOpacity style={styles.closeIconContainer}>
          <MaterialIcons name="close-circle-outline" size={20} />
        </TouchableOpacity>
      ) : null}
    </View>
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
  const {isHome} = props;

  const {allNotifications, projectNotifications, loading} = useSelector(
    s => s.notification,
  );

  return (
    <View style={styles.container}>
      <Title>Notifications</Title>
      <Spinner visible={loading} textContent="" />
      <FlatList
        data={isHome ? allNotifications : projectNotifications}
        extraData={isHome ? allNotifications : projectNotifications}
        contentContainerStyle={{flexGrow: 1}}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({item}) => <RenderNotification {...{item, isHome}} />}
        ListEmptyComponent={() => <EmptyComponent />}
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
  },
  closeIconContainer: {
    height: '100%',
    padding: 2,
  },
});

export default withTheme(Notification);

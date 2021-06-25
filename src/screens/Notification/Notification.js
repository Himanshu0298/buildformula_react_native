import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import * as React from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {Title, Text, withTheme, Caption} from 'react-native-paper';
import {getShadow} from 'utils';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';

const NOTIFICATIONS = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

function RenderNotification(props) {
  const {item} = props;

  return (
    <View style={styles.notificationContainer}>
      <View>
        <OpacityButton style={styles.userIcon} opacity={0.1}>
          <MaterialIcons name="account-outline" size={25} />
        </OpacityButton>
      </View>

      <View style={styles.notificationBody}>
        <Text>Nilesh joshi just updated booking status for Mohit pala</Text>
        <Caption>{dayjs().format('DD MMM YYYY, hh:mm A')}</Caption>
      </View>

      <TouchableOpacity style={styles.closeIconContainer}>
        <MaterialIcons name="close-circle-outline" size={20} />
      </TouchableOpacity>
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

function Notification() {
  return (
    <View style={styles.container}>
      <Title>Notifications</Title>

      <FlatList
        data={NOTIFICATIONS}
        extraData={NOTIFICATIONS}
        contentContainerStyle={{flexGrow: 1}}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({item}) => <RenderNotification item={item} />}
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

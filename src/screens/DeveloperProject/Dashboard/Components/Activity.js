import React from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import {Avatar, Caption, Text, withTheme} from 'react-native-paper';
import dayjs from 'dayjs';
import {useSelector} from 'react-redux';

const RenderActivity = React.memo(({collection}) => {
  const {first_name, last_name, profile_pic, log_time} = collection;

  const name = `${first_name} ${last_name}`;
  const initials = name
    .match(/(\b\S)?/g)
    .join('')
    .match(/(^\S|\S$)?/g)
    .join('')
    .toUpperCase();

  return (
    <View style={styles.activityContainer}>
      {profile_pic ? (
        <Avatar.Image size={40} source={{uri: profile_pic}} />
      ) : (
        <Avatar.Text size={40} label={initials} />
      )}
      <View style={styles.collectionDetails}>
        <Text>Ashish Patel</Text>
        <Caption>Uploaded 2 items</Caption>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Caption>{dayjs(log_time).format('DD MMM, YYYY')}</Caption>
        <Caption>{dayjs(log_time).format('hh:mm a')}</Caption>
      </View>
    </View>
  );
});

function Activity(props) {
  const {onRefresh} = props;

  const {dashboardData} = useSelector(s => s.project);
  const {todayProjectUserNotifications} = dashboardData;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }>
        {todayProjectUserNotifications?.length ? (
          todayProjectUserNotifications.map((collection, index) => (
            <React.Fragment key={index}>
              <RenderActivity collection={collection} />
            </React.Fragment>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text>No Activities found!</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eaeff1',
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  activityContainer: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 3,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  collectionDetails: {
    marginLeft: 10,
    flex: 1,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});

export default withTheme(Activity);

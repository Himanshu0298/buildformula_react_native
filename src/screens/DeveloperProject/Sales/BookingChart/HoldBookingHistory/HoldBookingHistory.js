import UserAvatar from 'components/Atoms/UserAvatar';
import dayjs from 'dayjs';
import React, {useMemo} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  withTheme,
  Text,
  IconButton,
  Caption,
  Divider,
} from 'react-native-paper';
import {useSelector} from 'react-redux';

function RenderHistory(props) {
  const {item} = props;
  const {type, date, user, holdTill, remark} = item;

  const name = `${user?.first_name} ${user?.last_name}`;
  const days = dayjs(holdTill).diff(date, 'd');

  const title =
    type === 'hold'
      ? `${name} , just have put this project On-hold for ${days} days`
      : `${name} have put this project Un-hold`;

  return (
    <View style={styles.itemContainer}>
      <UserAvatar size={50} uri={user?.profile_pic} />
      <View style={styles.labelContainer}>
        <Text>{title}</Text>
        <Caption>On {dayjs(date).format('DD MMMM YYYY')}</Caption>
        {remark ? <Caption>{remark}</Caption> : null}
      </View>
    </View>
  );
}

function HoldBookingHistory(props) {
  const {navigation, route} = props;
  const {history} = route?.params || {};

  const historyData = useMemo(() => {
    const data = [];

    history.map(i => {
      data.push({
        type: 'hold',
        date: i.created,
        holdTill: `${i.hold_till_date} ${i.hold_till_time}`,
        remark: i.remark,
        user: i.hold_user_id,
      });
      if (i.unhold_datetime) {
        data.push({
          type: 'unHold',
          date: i.unhold_datetime,
          unHoldUser: i.unhold_user_id,
        });
      }
      return i;
    });

    return data;
  }, [history]);

  const renderDivider = () => <Divider style={styles.divider} />;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.headingContainer}
        onPress={navigation.goBack}>
        <IconButton icon="keyboard-backspace" />
        <Text>History & Activities</Text>
      </TouchableOpacity>
      <FlatList
        data={historyData}
        extraData={historyData}
        ItemSeparatorComponent={renderDivider}
        renderItem={({item}) => <RenderHistory item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flexGrow: 1,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -10,
  },
  itemContainer: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelContainer: {
    marginLeft: 10,
    flex: 1,
  },
  divider: {
    height: 1,
    marginVertical: 7,
  },
});

export default withTheme(HoldBookingHistory);

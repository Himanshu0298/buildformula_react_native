import React, {useEffect, useMemo} from 'react';
import {Divider, Text, withTheme, Button} from 'react-native-paper';
import {StyleSheet, View, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import Layout from 'utils/Layout';
import RenderHtml from 'react-native-render-html';
import useSalesActions from 'redux/actions/salesActions';

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const ACTIVITY_LABELS = {
  followups: 'follow up',
  visitor_comment: 'comment',
  visitor_call_log: 'call logs',
};

const FILTERS = [
  {label: 'All', value: 'all'},
  {label: 'Comment', value: 'visitor_comment'},
  {label: 'Call Log', value: 'visitor_call_Log'},
  {label: 'Follow Up', value: 'visitor_followup'},
];

function Heading(props) {
  const {text} = props;
  var _text = text;

  if (text === 'a day ago') {
    _text = 'Yesterday';
  }

  return (
    <View style={styles.heading}>
      <Divider style={styles.divider} />
      <Text>{_text}</Text>
      <Divider style={styles.divider} />
    </View>
  );
}

function DetailCard(props) {
  const {name, comment, type, call_out_come} = props;
  const date = dayjs(props.date).format('DD-MM-YYYY');
  const time = dayjs(props.date).format('hh:mm');

  const isHtml = comment?.includes('<') && comment?.includes('>');

  return (
    <View style={styles.detailCard}>
      <Text>{date}</Text>
      <View style={styles.commentDetailText}>
        {type === 'visitor_comment' ? (
          <View>
            <Text style={{color: 'blue'}}>Note </Text>
          </View>
        ) : null}
        <Text style={styles.userNameText}>{name}</Text>
        <Text> added {ACTIVITY_LABELS[type]}</Text>
      </View>
      {type === 'visitor_call_log' ? (
        <Text style={{marginTop: 10}}>
          {call_out_come} at {time} on {date}
        </Text>
      ) : null}
      {type === 'followups' ? (
        <Text style={{marginTop: 10}}>
          Due at {time} on {date}
        </Text>
      ) : null}
      {!isHtml ? (
        <Text style={{marginTop: 10}}>{comment}</Text>
      ) : (
        <RenderHtml
          source={{html: comment}}
          contentWidth={Layout.window.width}
        />
      )}
    </View>
  );
}

function RenderSection(props) {
  const {title, activities, user} = props;

  return (
    <View style={{marginBottom: 25}}>
      <Heading text={title} />
      {activities[title].map((activity, index) => (
        <DetailCard
          key={index}
          date={activity.created}
          name={`${user.first_name} ${user.last_name}`}
          comment={activity.remarks}
          type={activity.type}
          call_out_come={activity.call_out_come}
        />
      ))}
    </View>
  );
}

function FilterPanel(props) {
  const {theme, filter, setFilter} = props;
  const {primary} = theme.colors;

  return (
    <ScrollView
      horizontal={true}
      style={styles.container}
      showsHorizontalScrollIndicator={false}>
      {FILTERS.map(i => {
        const active = filter === i.value;
        return (
          <Button
            mode="outlined"
            onPress={() => setFilter(i.value)}
            color={active ? 'white' : null}
            style={[styles.filter, active ? {backgroundColor: primary} : {}]}>
            {i.label}
          </Button>
        );
      })}
    </ScrollView>
  );
}

function Activities(props) {
  const {visitorActivities} = useSelector(s => s.sales);
  const {user} = useSelector(s => s.user);

  const activities = useMemo(() => {
    const data = {};

    visitorActivities
      .sort((a, b) => dayjs(b.created).toDate() - dayjs(a.created).toDate())
      .map(i => {
        const key = dayjs(i.created).fromNow();
        data[key] = data[key] || [];
        data[key].push(i);
      });

    return data;
  }, [visitorActivities]);

  return (
    <View style={styles.mainContainer}>
      <FilterPanel {...props} />
      <ScrollView contentContainerStyle={{padding: 20}}>
        {Object.keys(activities).map(key => (
          <RenderSection
            key={key}
            title={key}
            activities={activities}
            user={user}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
  },
  container: {
    marginTop: 10,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userNameText: {
    color: '#85909B',
  },
  divider: {
    height: 1,
    width: '100%',
    marginRight: 10,
    marginLeft: 10,
  },
  detailCard: {
    borderRadius: 10,
    backgroundColor: '#F9F9F9',
    padding: 15,
    marginTop: 10,
  },
  commentDetailText: {
    flexDirection: 'row',
    marginTop: 10,
  },
  filter: {
    marginHorizontal: 10,
    borderRadius: 20,
  },
});

export default withTheme(Activities);

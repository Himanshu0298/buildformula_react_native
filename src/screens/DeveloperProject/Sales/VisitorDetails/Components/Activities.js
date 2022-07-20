import React, {useMemo} from 'react';
import {Divider, Text, withTheme, Button, Caption} from 'react-native-paper';
import {StyleSheet, View, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import Layout from 'utils/Layout';
import RenderHtml from 'react-native-render-html';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(relativeTime);

const ACTIVITY_LABELS = {
  visitor_followup: 'follow up',
  visitor_comment: 'comment',
  visitor_call_log: 'call logs',
};

const FILTERS = [
  {label: 'All', value: 'all'},
  {label: 'Comment', value: 'visitor_comment'},
  {label: 'Call Log', value: 'visitor_call_log'},
  {label: 'Follow Up', value: 'visitor_followup'},
];

function Heading(props) {
  const {text} = props;
  let heading = text;

  if (text === 'a day ago') {
    heading = 'Yesterday';
  }

  return (
    <View style={styles.heading}>
      <Divider style={styles.divider} />
      <Text>{heading}</Text>
      <Divider style={styles.divider} />
    </View>
  );
}

function DetailCard(props) {
  const {theme, name, comment, activity, type} = props;
  const {created, followup_date, followup_time} = activity;

  const followup = dayjs(`${followup_date} ${followup_time}`).format(
    'YYYY-MM-DD hh:mm:ss',
  );

  const isHtml = comment?.includes('<') && comment?.includes('>');

  return (
    <View style={styles.detailCard}>
      <View style={styles.dateTimeLabel}>
        <Caption>{dayjs(created).format('DD-MM-YYYY')}</Caption>
        <Caption>{dayjs(created).format('hh:mm a')}</Caption>
      </View>
      <View style={styles.commentDetailText}>
        {type === 'visitor_comment' ? (
          activity.is_important ? (
            <View>
              <Text style={{color: theme.colors.primary}}>Important </Text>
            </View>
          ) : null
        ) : null}
        <Text style={styles.userNameText}>{name}</Text>
        <Text> added {ACTIVITY_LABELS[type]}</Text>
      </View>
      {type === 'visitor_call_log' ? (
        <Text style={styles.valueContainer}>
          {activity.call_out_come} at {activity.last_time} on{' '}
          {activity.last_date}
        </Text>
      ) : null}
      {type === 'visitor_followup' ? (
        <Text style={styles.valueContainer}>
          Due at {dayjs(followup).format('hh:mm a')} on{' '}
          {dayjs(followup).format('DD-MM-YYYY')}
        </Text>
      ) : null}
      {!isHtml ? (
        <Caption style={styles.valueContainer}>{comment}</Caption>
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
    <View style={styles.sectionContainer}>
      <Heading text={title} />
      {activities[title].map((activity, index) => (
        <DetailCard
          {...props}
          key={index?.toString()}
          date={activity.created}
          name={`${user.first_name} ${user.last_name}`}
          comment={activity.remarks}
          type={activity.type}
          activity={activity}
        />
      ))}
    </View>
  );
}

function FilterPanel(props) {
  const {theme, filter, setFilter} = props;
  const {primary} = theme.colors;

  return (
    <View>
      <ScrollView
        horizontal
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
    </View>
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
        return i;
      });

    return data;
  }, [visitorActivities]);

  return (
    <View style={styles.mainContainer}>
      <FilterPanel {...props} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {Object.keys(activities).map((key, index) => (
          <RenderSection
            {...props}
            key={index?.toString()}
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
    marginTop: 5,
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
  valueContainer: {
    marginTop: 10,
  },
  scrollContainer: {
    padding: 20,
  },
  sectionContainer: {
    marginBottom: 25,
  },
  dateTimeLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default withTheme(Activities);

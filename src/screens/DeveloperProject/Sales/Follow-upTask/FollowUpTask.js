import * as React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, withTheme, Subheading, Caption} from 'react-native-paper';
import {theme} from 'styles/theme';
import {useState, useEffect} from 'react';
import {Agenda} from 'react-native-calendars';
import {useSelector} from 'react-redux';
import useSalesActions from 'redux/actions/salesActions';
import NoResult from 'components/Atoms/NoResult';

const Calendar = props => {
  const {navigation, todayFollowups} = props;

  const [items, setItems] = useState(todayFollowups);

  const renderItem = item => {
    const navToDetails = () => {
      navigation.navigate('FollowUpDetails', {
        date: item.followup_date,
        visitorId: item.visitor_followup_id,
      });
    };
    return (
      <View style={styles.renderContainer}>
        <TouchableOpacity
          onPress={navToDetails}
          style={styles.cardMainContainer}>
          <View style={styles.itemContainer}>
            <Text>{`${item.followup_time}`}</Text>
            <Text
              style={
                styles.nameText
              }>{`${item.first_name} ${item.last_name}`}</Text>
            <Caption style={styles.taskText}>{item.task_title}</Caption>
          </View>
          <View style={styles.avatarText}>
            <Text style={styles.avatarTextStyle}>DT</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.agenda}>
      <Agenda
        showClosingKnob
        rowHasChanged={(r1, r2) => {
          return r1.text !== r2.text;
        }}
        renderEmptyData={() => {
          return (
            <View style={{flex: 1, alignItems: 'center'}}>
              <NoResult title="No data found" />
            </View>
          );
        }}
        futureScrollRange={4}
        theme={{
          agendaDayTextColor: '#000',
          agendaDayNumColor: 'green',
          agendaTodayColor: 'red',
          agendaKnobColor: theme.colors.primary,
        }}
        items={items}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

function FollowUpTask(props) {
  const {navigation, route} = props;

  const {selectedProject} = useSelector(s => s.project);
  const project_id = selectedProject.id;

  const {todayFollowups} = useSelector(s => s.sales);

  const givenDate = Object.keys(todayFollowups);
  console.log('-------->givenDate', givenDate);

  const {getFollowUpList} = useSalesActions();

  useEffect(() => {
    getFollowUpList({project_id, given_date: '20-07-2022'});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navToAdd = () => {
    navigation.navigate('', {...route?.params});
  };

  return (
    <View style={styles.container}>
      <View style={styles.scrollView}>
        <View style={styles.headingContainer}>
          <Subheading style={styles.Subheading}>Follow-up Task</Subheading>
        </View>
        <Calendar todayFollowups={todayFollowups} {...props} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 20,
    flex: 1,
  },

  Subheading: {
    paddingVertical: 10,
    color: theme.colors.primary,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  renderContainer: {
    backgroundColor: '#fff',
    margin: 8,
    flex: 1,
    marginTop: 10,
    padding: 10,
    height: 120,
    borderRadius: 5,
  },
  cardMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemContainer: {
    margin: 10,
  },
  nameText: {
    fontSize: 19,
    marginTop: 5,
  },
  taskText: {
    fontSize: 15,
    marginTop: 5,
  },
  avatarText: {
    backgroundColor: '#A020F0',
    borderRadius: 30,
    padding: 10,
    marginRight: 10,
  },
  avatarTextStyle: {
    color: '#fff',
    fontSize: 25,
  },
  agenda: {
    flex: 1,
  },
});

export default withTheme(FollowUpTask);

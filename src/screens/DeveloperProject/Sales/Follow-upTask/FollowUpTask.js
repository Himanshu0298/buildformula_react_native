import * as React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, withTheme, Subheading, Caption} from 'react-native-paper';
import {theme} from 'styles/theme';
import {useState} from 'react';
import {Agenda} from 'react-native-calendars';

const Calendar = props => {
  const {navigation} = props;
  const [items, setItems] = useState({
    '2022-07-20': [
      {name: 'Mihir Patel', task: 'call for visit', cookies: true},
      {name: 'Mihir Patel', task: 'call for visit', cookies: true},
    ],
    '2022-07-19': [
      {name: 'Mihir Patel', task: 'call for visit', cookies: false},
    ],
    '2022-07-18': [
      {name: 'Mihir Patel', task: 'call for visit', cookies: false},
    ],
    '2022-07-21': [
      {name: 'Mihir Patel', task: 'call for visit', cookies: false},
    ],
    '2022-07-15': [
      {name: 'Mihir Patel', task: 'call for visit', cookies: false},
    ],
  });

  const renderItem = item => {
    const navToDetails = () => {
      navigation.navigate('FollowUpDetails');
    };
    return (
      <View style={styles.renderContainer}>
        <TouchableOpacity
          onPress={navToDetails}
          style={styles.cardMainContainer}>
          <View style={styles.itemContainer}>
            <Text>10:00 AM - 10:25 AM</Text>
            <Text style={styles.nameText}>{item.name}</Text>
            <Caption style={styles.taskText}>{item.task}</Caption>
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

  const navToAdd = () => {
    navigation.navigate('', {...route?.params});
  };

  return (
    <View style={styles.container}>
      <View style={styles.scrollView}>
        <View style={styles.headingContainer}>
          <Subheading style={styles.Subheading}>Follow-up Task</Subheading>
        </View>
        <Calendar {...props} />
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

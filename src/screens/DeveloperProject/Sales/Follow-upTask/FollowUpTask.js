import * as React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, withTheme, Subheading} from 'react-native-paper';
import {theme} from 'styles/theme';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const DATA = [1, 2, 3];

const WEEKDATA = [
  {label: 'S', Value: 15},
  {label: 'M', Value: 16},
  {label: 'T', Value: 17},
  {label: 'W', Value: 18},
  {label: 'T', Value: 19},
  {label: 'F', Value: 20},
  {label: 'S', Value: 21},
];

const CalendarIcon = () => {
  const [date, setDate] = React.useState(new Date());
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const test = moment(date).isoWeek();
  const number = moment().isoWeekday(1);

  console.log('-------->test', test);
  console.log('-------->number', number);
  console.log('-------->moment().isoWeekday(7)', moment().isoWeekday(1));

  return (
    <View>
      {console.log('-------->date', date)}
      <TouchableOpacity style={styles.calendarIcon} onPress={showDatepicker}>
        <FontAwesome5 name="calendar-alt" size={24} color="blue" />
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          // is24Hour
          onChange={onChange}
        />
      )}
    </View>
  );
};

const RenderWeek = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
      }}>
      {WEEKDATA.map(item => {
        return (
          <View>
            <Text>{item.label}</Text>
            <Text>{item.Value}</Text>
          </View>
        );
      })}
    </View>
  );
};

const TaskList = props => {
  const {navigation} = props;
  const navToDetails = () => {
    navigation.navigate('FollowUpDetails');
  };
  return (
    <TouchableOpacity style={styles.contentContainer} onPress={navToDetails}>
      <View style={styles.titleStyle}>
        <View style={styles.taskContainer}>
          <Text style={styles.taskHeader}>Call For Visit Side</Text>
        </View>
        <Feather name="check-circle" size={16} color="green" />
      </View>
      <View>
        <Text style={styles.listText}>Mihir Patel</Text>
        <Text style={styles.listText}>9876543210</Text>
      </View>
      <View style={styles.userStatus}>
        <Text style={styles.visitorText}>Visitor</Text>
        <Text style={styles.timeText}>04:44 PM</Text>
      </View>
    </TouchableOpacity>
  );
};

function FollowUpTask(props) {
  const {navigation, route} = props;

  const navToAdd = () => {
    navigation.navigate('', {...route?.params});
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headingContainer}>
          <Subheading style={styles.Subheading}>Follow-up Task</Subheading>
          <CalendarIcon />
        </View>
        <RenderWeek />

        {DATA.map(item => {
          return <TaskList item={item} {...props} />;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 20,
    flexGrow: 1,
  },

  contentContainer: {
    backgroundColor: '#F2F4F5',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },

  titleStyle: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
  },

  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskHeader: {
    color: '#000',
    fontWeight: 'bold',
  },

  listText: {
    marginVertical: 2,
  },
  visitorText: {
    marginVertical: 2,
    color: theme.colors.primary,
  },
  userStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 11,
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
  calendarIcon: {
    marginRight: 4,
  },
});

export default withTheme(FollowUpTask);

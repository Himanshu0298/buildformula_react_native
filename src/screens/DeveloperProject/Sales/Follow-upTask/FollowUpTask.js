import * as React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, withTheme, Subheading, Caption, FAB} from 'react-native-paper';
import {theme} from 'styles/theme';
import {useEffect} from 'react';
import {Agenda} from 'react-native-calendars';
import {useSelector} from 'react-redux';
import useSalesActions from 'redux/actions/salesActions';
import NoResult from 'components/Atoms/NoResult';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';
import Spinner from 'react-native-loading-spinner-overlay';
import {getPermissions} from 'utils';
import {store} from 'redux/store';

const Calendar = props => {
  const {navigation, followUpsData, loadMonthData} = props;

  const navToDetails = item => {
    navigation.navigate('FollowUpDetails', {
      date: item.followup_date,
      visitorId: item.visitor_followup_id,
    });
  };

  const renderItem = item => {
    return (
      <View style={styles.renderContainer}>
        <TouchableOpacity onPress={() => navToDetails(item)}>
          <View style={styles.followupTime}>
            <Text>{`${item?.followup_time}`}</Text>
            {item.completed === 'yes' ? (
              <MaterialCommunityIcons
                name="check-circle-outline"
                size={24}
                color="green"
              />
            ) : null}
          </View>
          <View style={styles.avatarContainer}>
            <View>
              <Text
                style={
                  styles.nameText
                }>{`${item.first_name} ${item.last_name}`}</Text>
              <Caption style={styles.taskText}>{item.task_title}</Caption>
            </View>
            {/* <View style={styles.avatarText}>
              <Text style={styles.avatarTextStyle}>DT</Text>
            </View> */}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.agenda}>
      <Agenda
        showClosingKnob
        rowHasChanged={(r1, r2) => r1.text !== r2.text}
        loadItemsForMonth={loadMonthData}
        renderEmptyData={() => {
          return (
            <View style={styles.noResult}>
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
        items={followUpsData}
        renderItem={renderItem}
        extraData={followUpsData}
      />
    </SafeAreaView>
  );
};

function FollowUpTask(props) {
  const {navigation} = props;
  const {selectedProject} = useSelector(s => s.project);
  const project_id = selectedProject.id;

  const {followUpsData, loading, visitors = []} = useSelector(s => s.sales);

  const {getFollowUpList, getVisitors} = useSalesActions();

  const [filter, setFilter] = React.useState('name');

  const modulePermission = getPermissions('Inquiry');

  const {isProjectAdmin} = store.getState().project;

  const visitorsOptions = React.useMemo(() => {
    const options = visitors?.map(e => {
      return {label: `${e.first_name} ${e.last_name}`, value: e?.id};
    });
    return options;
  }, [visitors]);

  // const loadMonthData = ({dateString}) => {
  //   getFollowUpList({project_id, given_date: dateString});
  // };

  useEffect(() => {
    loadMonthData({dateString: dayjs().format('YYYY-MM-DD')});
    getVisitors({project_id: selectedProject.id, filter_mode: filter});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMonthData = ({dateString}) => {
    getFollowUpList({
      project_id,
      given_date: dateString,
      role: modulePermission?.admin || isProjectAdmin ? 'admin' : 'none',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.scrollView}>
        <View style={styles.headingContainer}>
          <Subheading style={styles.Subheading}>Follow-up Task</Subheading>
        </View>
        <Spinner visible={loading} textContent="" />

        <Calendar
          {...props}
          followUpsData={followUpsData}
          loadMonthData={loadMonthData}
        />
      </View>
      <FAB
        style={[styles.fab, {backgroundColor: theme.colors.primary}]}
        large
        icon="plus"
        onPress={() =>
          navigation.navigate('AddDetails', {
            type: 'Follow-up',
            visitorsOptions,
          })
        }
      />
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
  nameText: {
    fontSize: 19,
    marginTop: 5,
  },
  taskText: {
    fontSize: 15,
    marginTop: 5,
  },
  // avatarText: {
  //   backgroundColor: '#A020F0',
  //   borderRadius: 30,
  //   padding: 10,
  //   marginRight: 10,
  // },
  // avatarTextStyle: {
  //   color: '#fff',
  //   fontSize: 25,
  // },
  agenda: {
    flex: 1,
  },
  followupTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  noResult: {
    flex: 1,
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});

export default withTheme(FollowUpTask);

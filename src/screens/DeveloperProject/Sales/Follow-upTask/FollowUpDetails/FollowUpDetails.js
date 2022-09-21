import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import * as React from 'react';
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import {
  Text,
  withTheme,
  Subheading,
  Caption,
  Divider,
  Button,
} from 'react-native-paper';
import {theme} from 'styles/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import UserIcon from 'assets/images/requestedUser.png';
import {useEffect} from 'react';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import RenderHtml from 'react-native-render-html';
import Layout from 'utils/Layout';
import Spinner from 'react-native-loading-spinner-overlay';

const TaskList = props => {
  const {item, navigation} = props;

  const isHtml = item.f_remarks?.includes('<') && item.f_remarks?.includes('>');
  const source = {
    html: `<span style="color: '#DEE1E4';margin-left: 2px;font-size: 15px">
       ${item.completed_remarks}</span>`,
  };

  const navToDetails = () => {
    navigation.navigate('VisitorDetails', {visitorId: item.visitor_id});
  };
  const handleTask = () => {
    navigation.navigate('CompleteTask', {
      date: item.followup_date,
      time: item.followup_time,
      visitorID: item.visitor_followup_id,
    });
  };
  return (
    <View style={styles.listContainer}>
      <Text style={styles.taskHeading}>{item.task_title}</Text>
      <View style={styles.listItems}>
        <MaterialCommunityIcons name="home-analytics" size={24} color="grey" />
        <Caption style={styles.captionText}>
          {item.address ? item.address : '--'}
        </Caption>
      </View>
      <View style={styles.listItems}>
        <MaterialIcons name="phone" size={24} color="grey" />
        <Caption style={styles.captionText}>+91 {item.phone}</Caption>
      </View>
      <Divider style={styles.divider} />

      <View style={styles.remarkContainer}>
        <Text style={styles.remarkText}>Remark</Text>
        {!isHtml ? (
          <Caption>{item.f_remarks}</Caption>
        ) : (
          <View style={styles.renderHtml}>
            <RenderHtml
              source={{html: item.f_remarks}}
              contentWidth={Layout.window.width}
            />
          </View>
        )}
      </View>
      <Divider style={styles.divider} />
      {item.completed_remarks ? (
        <>
          <View style={styles.remarkContainer}>
            <Text style={styles.remarkText}>Complete Remark</Text>
            {!source ? (
              <Caption>{source}</Caption>
            ) : (
              <View style={styles.renderHtml}>
                <RenderHtml
                  source={source}
                  contentWidth={Layout.window.width}
                />
              </View>
            )}
          </View>
          <Divider style={styles.divider} />
        </>
      ) : null}

      <View style={styles.userContainer}>
        <Image source={UserIcon} />
        <View style={styles.userDetails}>
          <Caption>Assigned to</Caption>
          <Text>Sanaya Patel</Text>
        </View>
      </View>
      <Divider style={styles.divider} />

      <View style={styles.taskButtonContainer}>
        <Button
          style={styles.taskButton}
          mode="outlined"
          onPress={navToDetails}>
          View Details
        </Button>
        {item.completed === 'no' ? (
          <Button
            style={styles.taskButton}
            onPress={handleTask}
            mode="contained">
            Complete Task
          </Button>
        ) : null}
      </View>
    </View>
  );
};

function FollowUpDetails(props) {
  const {navigation, route} = props;
  const {visitorId, date} = route?.params || {};

  const {selectedProject} = useSelector(s => s.project);
  const project_id = selectedProject.id;

  const {approvalDetailsList, loading} = useSelector(s => s.sales);

  const {getFollowUpDetailsList} = useSalesActions();

  useEffect(() => {
    getFollowUpDetailsList({
      project_id,
      visitor_followup_id: visitorId,
      followup_date: date,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.button}>
          <OpacityButton
            opacity={0.1}
            color={theme.colors.primary}
            style={styles.backButton}
            onPress={navigation.goBack}>
            <MaterialCommunityIcons
              name="keyboard-backspace"
              size={18}
              color="black"
            />
          </OpacityButton>
          <Subheading>Follow-up Task Details</Subheading>
        </View>
        {approvalDetailsList?.map(item => {
          return <TaskList {...props} item={item} />;
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
    flexGrow: 1,
  },

  button: {
    flexDirection: 'row',
    padding: 10,
  },
  backButton: {
    borderRadius: 50,
    marginRight: 7,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 15,
    padding: 10,
  },
  taskHeading: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 15,
  },
  listItems: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  captionText: {
    marginLeft: 10,
  },
  divider: {
    height: 1,
    marginTop: 10,
  },
  remarkContainer: {
    marginTop: 10,
  },
  remarkText: {
    // color: '#000',
    // fontWeight: '700',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  userDetails: {
    marginLeft: 15,
  },
  taskButton: {
    borderColor: theme.colors.primary,
  },
  taskButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
    paddingHorizontal: 10,
  },
  renderHtml: {
    marginTop: 10,
  },
});

export default withTheme(FollowUpDetails);

import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import * as React from 'react';
import {Text, withTheme} from 'react-native-paper';
import {ScrollView, StyleSheet, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from 'styles/theme';
import useProjectManagementActions from 'redux/actions/projectManagementActions';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import NoResult from 'components/Atoms/NoResult';
import ProgressCard from '../Components/ProgressCard';
import AddProgressDialog from '../Components/AddProgressDialog';
import WorkPath from '../Components/WorkPath';

const UpdatedCard = props => {
  const {navigation, route, progressReport} = props;

  return (
    <View style={styles.detailsContainer}>
      <View style={styles.executionDateContainer}>
        <View style={styles.progressRecordHeader}>
          <Text style={styles.executionDate}>Progress Record</Text>
          <OpacityButton
            opacity={2}
            style={styles.rightArrow}
            color={theme.colors.primary}
            onPress={() =>
              navigation.navigate('RecordsDetail', {...route?.params})
            }>
            <MaterialCommunityIcons name="arrow-right" size={16} color="#fff" />
          </OpacityButton>
        </View>
        {progressReport ? (
          <ProgressCard details={progressReport} />
        ) : (
          <NoResult title="No Files Found" />
        )}
      </View>
    </View>
  );
};

export const Header = props => {
  const {navigation, data} = props;
  return (
    <View>
      <View style={styles.headerContainer}>
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
        </View>
        <Text style={styles.headerNavigationText}>{data[data.length - 1]}</Text>
      </View>
      <WorkPath data={data} />
    </View>
  );
};

const Details = props => {
  const {workDetails} = props;
  const {
    wbs_schedule_start_date,
    wbs_schedule_end_date,
    wbs_schedule_duration,
  } = workDetails;

  const data = [
    {
      name: 'Start Date',
      value: wbs_schedule_start_date
        ? dayjs(wbs_schedule_start_date).format('DD-MM-YYYY')
        : 'NA',
    },
    {
      name: 'Finish Date',
      value: wbs_schedule_end_date
        ? dayjs(wbs_schedule_end_date).format('DD-MM-YYYY')
        : 'NA',
    },
    {name: 'Duration', value: wbs_schedule_duration},
  ];

  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.executionHeading}>Execution</Text>
      <View style={styles.executionDateContainer}>
        <Text style={styles.executionDate}>Execution Date</Text>
        {data.map(item => {
          return (
            <View style={styles.renderContainer}>
              <Text>{item.name}</Text>
              <Text>:-{'  '}</Text>
              <Text>{item.value}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const AddButton = props => {
  const {onPress} = props;
  return (
    <OpacityButton
      onPress={onPress}
      opacity={0.1}
      style={styles.addButton}
      color="#fff">
      <Text style={{color: theme.colors.primary}}>+ Add Progress Record</Text>
    </OpacityButton>
  );
};

function Execution(props) {
  const {route, navigation} = props;
  const {parent_id, pathList} = route?.params || {};

  const [showAdd, setShowAdd] = React.useState(false);

  const toggleAddDialog = () => setShowAdd(v => !v);

  const {WBSExecutionDetails, addProgressRecord} =
    useProjectManagementActions();
  const {selectedProject} = useSelector(s => s.project);
  const {WBSDetails} = useSelector(s => s.projectManagement);

  const workDetails = WBSDetails?.wbs_works?.[0] || {};
  const latestProgressReport = !Array.isArray(WBSDetails?.wbs_execution)
    ? WBSDetails?.wbs_execution || {}
    : undefined;

  React.useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = () =>
    WBSExecutionDetails({
      project_id: selectedProject.id,
      wbs_works_id: parent_id,
    });

  const handleAddProgress = async values => {
    const formData = new FormData();

    formData.append('project_id', selectedProject.id);
    formData.append('wbs_works_id', parent_id);
    formData.append('quantity_completed', Number(values.quantity));
    formData.append('percentage_completed', Number(values.percentage));
    formData.append('remarks', values.remark);
    formData.append('file', values.attachments);

    await addProgressRecord(formData);
    loadData();

    navigation.goBack();
  };

  return (
    <View>
      <AddProgressDialog
        open={showAdd}
        title="Add Progress Record"
        handleClose={toggleAddDialog}
        handleSubmit={handleAddProgress}
        path={pathList}
        progressReport={latestProgressReport}
      />
      <ScrollView>
        <Header {...props} data={pathList} />
        <Details {...props} workDetails={workDetails} />
        <UpdatedCard {...props} header progressReport={latestProgressReport} />
        <AddButton onPress={toggleAddDialog} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerNavigationText: {
    marginRight: 10,
  },
  button: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    padding: 10,
  },
  backButton: {
    borderRadius: 50,
    marginRight: 7,
  },

  detailsContainer: {
    padding: 10,
  },
  executionHeading: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  executionDateContainer: {
    padding: 10,
    backgroundColor: '#F2F4F5',
    borderRadius: 5,
  },
  executionDate: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  renderContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  addButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.primary,
    padding: 10,
    margin: 10,
  },

  progressRecordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  rightArrow: {
    borderRadius: 25,
  },
});

export default withTheme(Execution);

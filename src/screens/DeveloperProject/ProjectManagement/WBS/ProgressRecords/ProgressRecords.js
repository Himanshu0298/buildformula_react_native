import * as React from 'react';
import {Divider, Text, withTheme} from 'react-native-paper';
import {StyleSheet, View, FlatList, RefreshControl} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {theme} from 'styles/theme';
import useProjectManagementActions from 'redux/actions/projectManagementActions';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import NoResult from 'components/Atoms/NoResult';
import ProgressCard from '../Components/ProgressCard';
import AddProgressDialog from '../Components/AddProgressDialog';

const Header = props => {
  const {onPress, navigation, path} = props;
  return (
    <View>
      <View style={styles.container}>
        <Text style={{color: theme.colors.primary}}>Record Progress</Text>
      </View>
      <View>
        <Text style={styles.headerText}>WBS Execution</Text>
      </View>
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
        <View style={styles.navigationTextContainer}>
          <Text style={styles.headerNavigationText}>
            {path[path.length - 1]}
          </Text>
        </View>
        <OpacityButton
          opacity={0.2}
          color={theme.colors.primary}
          style={styles.addbutton}
          onPress={onPress}>
          <Text style={{color: theme.colors.primary}}>Add</Text>
        </OpacityButton>
      </View>
      <Divider />
    </View>
  );
};

function RecordsDetails(props) {
  const {route, navigation} = props;
  const {parent_id, pathList} = route?.params || {};

  const [showAdd, setShowAdd] = React.useState(false);

  const toggleAddDialog = () => setShowAdd(v => !v);

  const {WBSExecutionList, WBSExecutionDetails, addProgressRecord} =
    useProjectManagementActions();

  const {selectedProject} = useSelector(s => s.project);
  const {WBSList} = useSelector(s => s.projectManagement);

  React.useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = () =>
    WBSExecutionList({project_id: selectedProject.id, wbs_works_id: parent_id});

  const loadDetails = () => {
    WBSExecutionDetails({
      project_id: selectedProject.id,
      wbs_works_id: parent_id,
    });
  };

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
    loadDetails();
    navigation.goBack();
  };
  const renderEmpty = () => <NoResult />;

  return (
    <View style={styles.recordContainer}>
      <AddProgressDialog
        open={showAdd}
        title="Add Progress Record"
        handleClose={toggleAddDialog}
        handleSubmit={handleAddProgress}
        path={pathList}
      />
      <Header {...props} onPress={toggleAddDialog} path={pathList} />
      <View style={styles.listContainer}>
        <FlatList
          data={WBSList}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={WBSExecutionList} />
          }
          keyExtractor={item => item.id}
          ListEmptyComponent={renderEmpty}
          renderItem={({item}) => {
            return <ProgressCard details={item} />;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    margin: 10,
  },
  headerNavigationText: {
    marginRight: 10,
    fontSize: 13,
    marginBottom: 5,
    backgroundColor: '#rgba(72, 114, 244, 0.1);',
    borderRadius: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  button: {
    padding: 10,
  },
  backButton: {
    borderRadius: 50,
    marginRight: 7,
  },
  addbutton: {
    marginRight: 10,
  },
  recordContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    paddingVertical: 10,
  },

  navigationTextContainer: {
    flexDirection: 'row',
    marginRight: 150,
    alignItems: 'center',
  },

  headerText: {
    margin: 10,
    fontSize: 18,
  },
});

export default withTheme(RecordsDetails);

import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector} from 'react-redux';
import useProjectActions from 'redux/actions/projectActions';

export default function DeveloperDashboard(props) {
  const {route} = props;
  const {project} = route?.params || {};

  const {getProjectData, getProjectCommonData} = useProjectActions();
  const {loading} = useSelector(state => state.project);

  useEffect(() => {
    getProjectData(project.id);
    getProjectCommonData(project.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent={''} />
      <Text>Project Dashboard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeff1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

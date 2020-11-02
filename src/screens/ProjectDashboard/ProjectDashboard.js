/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector} from 'react-redux';
import useProjectActions from '../../redux/actions/projectActions';

export default function ProjectDashboard(props) {
  const {route} = props;
  const projectId = route?.params?.projectId;

  const {getProjectData} = useProjectActions();
  const {loading} = useSelector((state) => state.project);

  useEffect(() => {
    getProjectData(projectId);
  }, [projectId]);

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

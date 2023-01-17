import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Divider, IconButton, Subheading, Title} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const ROUTE = [
  {
    screenName: 'Project Details',
    route: 'UpdateProjectDetails',
    key: 'UpdateProjectDetails',
  },
  {
    screenName: 'Project History',
    route: 'ProjectHistory',
    key: 'ProjectHistory',
  },
  {
    screenName: 'Project Structure',
    route: 'ProjectStructure',
    key: 'ProjectStructure',
  },
  {
    screenName: 'Project Brief',
    route: 'ProjectBrief',
    key: 'ProjectBrief',
  },
  {
    screenName: 'Project Amenities',
    route: 'ProjectAmenities',
    key: 'ProjectAmenities',
  },
  {
    screenName: 'Project Owner Info',
    route: 'ProjectOwner',
    key: 'ProjectOwner',
  },
  {
    screenName: 'Security/ Caretaker Info',
    route: 'ProjectSecurity',
    key: 'ProjectSecurity',
  },
  {
    screenName: 'Files/ Attachments',
    route: 'ProjectFiles',
    key: 'ProjectFiles',
  },
];

const RenderRow = props => {
  const {navigation, screenName, route, projectId} = props;

  return (
    <>
      <View style={styles.row}>
        <Subheading>{screenName}</Subheading>
        <OpacityButton
          opacity={0.1}
          color="#4872f4"
          style={styles.navBTN}
          onPress={() => navigation.navigate(route, {projectId})}>
          <MaterialIcon name="edit" color="#4872f4" size={15} />
        </OpacityButton>
      </View>
      <Divider style={styles.seperator} />
    </>
  );
};

const ProjectStructureDetails = props => {
  const {navigation, route} = props;
  const {projectId} = route?.params || {};

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerWrapper}>
        <IconButton
          icon="keyboard-backspace"
          size={18}
          color="#4872f4"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Title>Add Project</Title>
      </View>
      <Divider />
      <View style={styles.bodyWrap}>
        {ROUTE.map(item => {
          return (
            <RenderRow
              {...props}
              key={item.key}
              screenName={item.screenName}
              route={item.route}
              projectId={projectId}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    marginRight: 11,
  },
  mainContainer: {
    paddingHorizontal: 10,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  bodyWrap: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  seperator: {
    height: 1,
    marginVertical: 10,
  },
  navBTN: {
    borderRadius: 50,
  },
});

export default ProjectStructureDetails;

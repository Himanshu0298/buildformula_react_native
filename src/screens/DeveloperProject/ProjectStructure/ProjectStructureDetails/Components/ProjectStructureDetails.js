import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Divider, IconButton, Subheading, Title} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const RenderRow = props => {
  const {navigation, screenName, route} = props;
  return (
    <>
      <View style={styles.row}>
        <Subheading>{screenName}</Subheading>
        <OpacityButton
          opacity={0.1}
          color="#4872f4"
          style={styles.navBTN}
          onPress={() => navigation.navigate(route)}>
          <MaterialIcon name="edit" color="#4872f4" size={15} />
        </OpacityButton>
      </View>
      <Divider style={styles.seperator} />
    </>
  );
};

const ProjectStructureDetails = props => {
  const {navigation} = props;
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
        <RenderRow {...props} screenName="Project Details" route="AddProject" />
        <RenderRow
          {...props}
          screenName="Project History"
          route="ProjectHistory"
        />
        <RenderRow
          {...props}
          screenName="Project Structure"
          route="ProjectStructure"
        />
        <RenderRow {...props} screenName="Project Brief" route="ProjectBrief" />
        <RenderRow
          {...props}
          screenName="Project Amenities"
          route="ProjectAmenities"
        />
        <RenderRow
          {...props}
          screenName="Project Owner Info"
          route="ProjectOwner"
        />
        <RenderRow
          {...props}
          screenName="Security/ Caretaker Info"
          route="ProjectSecurity"
        />
        <RenderRow
          {...props}
          screenName="Files/ Attachments"
          route="ProjectFiles"
        />
      </View>
    </SafeAreaView>
  );
};

export default ProjectStructureDetails;

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

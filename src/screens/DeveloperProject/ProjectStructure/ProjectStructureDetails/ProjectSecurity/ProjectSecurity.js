import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {FAB, IconButton, Text, Title} from 'react-native-paper';
import {theme} from 'styles/theme';
import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {useSelector} from 'react-redux';
import {useAlert} from 'components/Atoms/Alert';
import Spinner from 'react-native-loading-spinner-overlay';

function ProjectSecurityDetails(props) {
  const {item, handleDelete, navigation, projectId} = props;

  const {contact_person_name, contact_person_number, id} = item;

  const navToEdit = () =>
    navigation.navigate('AddProjectSecurity', {projectId, item});
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text>{contact_person_name?.toUpperCase()}</Text>
        <View style={styles.headerSubContainer}>
          <View style={styles.editIconContainer}>
            <OpacityButton
              color="#4872f4"
              opacity={0.18}
              style={styles.editIcon}
              onPress={navToEdit}>
              <MaterialIcons name="edit" color="#4872f4" size={13} />
            </OpacityButton>
          </View>
          <View>
            <OpacityButton
              color="#FF5D5D"
              opacity={0.18}
              onPress={() => handleDelete(id)}
              style={styles.deleteIcon}>
              <MaterialIcons name="delete" color="#FF5D5D" size={13} />
            </OpacityButton>
          </View>
        </View>
      </View>
      <View style={styles.phoneContainer}>
        <MaterialIcons name="phone" color="#4872f4" size={18} />
        <View style={styles.rowData}>
          <Text style={styles.number}> {contact_person_number}</Text>
        </View>
      </View>
    </View>
  );
}

function ProjectSecurity(props) {
  const {navigation, route} = props;

  const {projectId} = route?.params || {};

  const alert = useAlert();

  const {getProjectDetails, deleteProjectSecurity} =
    useProjectStructureActions();

  const {projectDetails, loading} = useSelector(s => s.projectStructure);

  const {security_info} = projectDetails;

  const {selectedProject} = useSelector(s => s.project);
  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    await getProjectDetails({project_id: selectedProject.id, id: projectId});
  };

  const handleDelete = async security_id => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: async () => {
        await deleteProjectSecurity({
          project_id: selectedProject.id,
          id: projectId,
          security_id,
        });
        getData();
      },
    });
  };

  const navToAdd = () => navigation.navigate('AddProjectSecurity', {projectId});

  return (
    <View style={styles.mainContainer}>
      <Spinner visible={loading} textContent="" />

      <View style={styles.headerWrapper}>
        <IconButton
          icon="keyboard-backspace"
          size={18}
          color="#4872f4"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Title> Project Security/ Caretaker Info</Title>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.cardContainer}>
          {security_info?.map(item => {
            return (
              <ProjectSecurityDetails
                item={item}
                handleDelete={handleDelete}
                navigation={navigation}
                projectId={projectId}
              />
            );
          })}
        </View>
      </ScrollView>
      <FAB
        style={[styles.fab, {backgroundColor: theme.colors.primary}]}
        icon="plus"
        onPress={navToAdd}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    borderWidth: 1,
    padding: 20,
    borderColor: '#4872F4',
    borderRadius: 10,
    marginVertical: 10,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  mainContainer: {
    margin: 10,
    flex: 1,
  },
  backIcon: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    marginRight: 11,
  },

  headerSubContainer: {
    flexDirection: 'row',
    marginEnd: 10,
    alignSelf: 'center',
  },
  deleteIcon: {
    borderRadius: 20,
  },
  editIcon: {
    borderRadius: 20,
    marginLeft: 15,
  },
  editIconContainer: {
    marginRight: 15,
  },
  phoneContainer: {
    margin: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    color: '#4872f4',
  },
  scrollView: {
    marginBottom: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 10,
  },
  rowData: {
    marginVertical: 8,
  },
  cardContainer: {
    marginVertical: 20,
  },
});

export default ProjectSecurity;

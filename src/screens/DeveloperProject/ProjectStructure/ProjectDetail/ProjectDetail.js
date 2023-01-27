import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {IconButton, Subheading} from 'react-native-paper';
import {TabView} from 'react-native-tab-view';
import {getShadow} from 'utils';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {cloneDeep} from 'lodash';
import ProjectPreview from './ProjectPreview';
import StructurePreview from './StructurePreview';

import ProjectTabBar from './ProjectPreview/component/projectTabBar';

function ProjectDetail(props) {
  const {navigation, route} = props;
  const {id: projectId} = route.params;

  const [selectedTab, setSelectedTab] = useState(0);
  const [details, setDetails] = useState(projectDetails || {});

  const {selectedProject} = useSelector(s => s.project);
  const {projectDetails} = useSelector(s => s.projectStructure);

  const {createProjectDuplicate, getProjectDetails, getProjectList} =
    useProjectStructureActions();

  const [routes] = useState([
    {key: 'first', title: 'Details'},
    {key: 'second', title: 'Structure'},
  ]);

  React.useEffect(() => {
    getList();
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    await getProjectDetails({project_id: selectedProject.id, id: projectId});
  };
  const getList = async () => {
    await getProjectList({project_id: selectedProject.id});
  };

  const renderTabBar = prop => (
    <View style={styles.headerContainer}>
      <ProjectTabBar {...prop} />
    </View>
  );

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <ProjectPreview {...props} />;
      case 'second':
        return <StructurePreview {...props} />;

      default:
        return null;
    }
  };

  const onMakeDuplicate = async () => {
    const data = {
      project_id: selectedProject.id,
      id: projectId,
    };

    await createProjectDuplicate(data);
    getData();
    getList();
    navToNext();
    getList();
  };

  const navToEdit = () =>
    navigation.navigate('ProjectStructureDetails', {projectId, projectDetails});

  const navToNext = values => {
    const _projectDetails = cloneDeep(details);
    _projectDetails.push(values);
    const params = {details: _projectDetails};

    navigation.push('ProjectStructureDetails', params);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerWrapper}>
        <View style={styles.subContainer}>
          <IconButton
            icon="keyboard-backspace"
            size={18}
            color="#4872f4"
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          />
          <Subheading style={styles.header}>Project Details</Subheading>
        </View>
        <View style={styles.editIconContainer}>
          <OpacityButton
            color="#4872f4"
            opacity={0.18}
            style={styles.editIcon}
            onPress={navToEdit}>
            <MaterialIcons name="edit" color="#4872f4" size={13} />
          </OpacityButton>
          <OpacityButton
            color="#4872f4"
            opacity={0.18}
            style={styles.editIcon}
            onPress={onMakeDuplicate}>
            <MaterialIcons name="content-copy" color="#4872f4" size={13} />
          </OpacityButton>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <TabView
          navigationState={{index: selectedTab, routes}}
          onIndexChange={setSelectedTab}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    ...getShadow(5),
    backgroundColor: '#fff',
  },
  header: {
    paddingLeft: 15,
    marginBottom: 10,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'space-between',
  },
  backIcon: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    marginRight: 11,
  },
  editIcon: {
    borderRadius: 20,
    marginLeft: 15,
  },
  editIconContainer: {
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ProjectDetail;

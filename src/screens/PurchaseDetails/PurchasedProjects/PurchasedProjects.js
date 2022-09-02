import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import React, {useEffect, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Title, withTheme} from 'react-native-paper';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import useProjectActions from 'redux/actions/projectActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {useProjectLoading} from 'redux/selectors';

function ProjectCard(props) {
  const {navigation, theme, project} = props;
  const {company_name, id, project_id} = project;

  const status = useMemo(() => {
    return new Date(project.expired_date) > new Date() ? 'ACTIVE' : 'EXPIRE';
  }, [project.expired_date]);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('ProjectDetails', {
          id,
        })
      }>
      <View style={styles.cardContent}>
        <View>
          <Text>{project_id}</Text>
        </View>
        <View>
          <Text style={{color: status === 'ACTIVE' ? '#07CA03' : 'red'}}>
            {status}
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.company}>{company_name}</Text>
      </View>
      {status === 'EXPIRE' ? (
        <View style={styles.status}>
          <OpacityButton
            color={theme.colors.primary}
            opacity={0.15}
            style={styles.button}
            // onPress={toggleAddDialog}
          >
            <Text style={{color: theme.colors.primary}}>Renew Now</Text>
          </OpacityButton>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

function PurchasedProjects(props) {
  const {purchasedProjects} = useSelector(s => s.project);
  const loading = useProjectLoading();

  const {getPurchasedProjects} = useProjectActions();

  useEffect(() => {
    getPurchasedProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />
      <ProjectHeader {...props} showLogo />
      <View style={styles.projectContainer}>
        <Title style={styles.text}>Projects</Title>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          {purchasedProjects.map(project => (
            <ProjectCard {...props} project={project} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F2F4F5',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    justifyContent: 'center',
  },
  container: {
    flexGrow: 1,
  },
  text: {
    marginBottom: 15,
  },
  projectContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  company: {
    marginTop: 5,
  },
  status: {
    paddingHorizontal: '30%',
  },
});

export default withTheme(PurchasedProjects);

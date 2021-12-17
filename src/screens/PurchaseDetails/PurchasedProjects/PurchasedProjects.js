import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import React, {useEffect, useMemo} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Title, withTheme} from 'react-native-paper';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import useProjectActions from 'redux/actions/projectActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

function ProjectCard(props) {
  const {navigation, theme, project} = props;
  const {company_name, id, project_id} = project;

  console.log('----->id in first scren', id);

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
        <Text style={{marginTop: 5}}>{company_name}</Text>
      </View>
      {status === 'EXPIRE' ? (
        <View style={{paddingHorizontal: '30%'}}>
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
  const {loading, purchasedProjects} = useSelector(s => s.project);

  const {getPurchasedProjects} = useProjectActions();

  useEffect(() => {
    getPurchasedProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      <Spinner visible={loading} textContent="" />
      <ProjectHeader {...props} showLogo />
      <View style={{padding: 10}}>
        <Title style={{marginBottom: 15}}>Projects</Title>
        {purchasedProjects.map(project => (
          <ProjectCard {...props} project={project} />
        ))}
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
});

export default withTheme(PurchasedProjects);

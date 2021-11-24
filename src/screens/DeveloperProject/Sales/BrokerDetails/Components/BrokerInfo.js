import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {withTheme, Text, Subheading} from 'react-native-paper';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import {theme} from 'styles/theme';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const RenderPairData = props => {
  const {title, value} = props;

  return (
    <View style={{marginBottom: 15}}>
      <Subheading style={{color: '#5E6D7C'}}>{title}</Subheading>
      <Subheading>{value}</Subheading>
    </View>
  );
};

function BrokerInfo(props) {
  const {first_name, last_name, email, phone, dealsClosed, id} = props.userData;
  const {navigation} = props;

  const {selectedProject} = useSelector(s => s.project);
  const {deleteBroker} = useSalesActions();

  const projectId = selectedProject.id;

  const data = [
    {title: 'First Name', value: first_name},
    {title: 'Last Name', value: last_name},
    {title: 'Email', value: email},
    {title: 'Phone', value: `+91 ${phone}`},
    {title: 'Deals closed', value: dealsClosed},
  ];

  const handleDeleteButton = (_id, project_id) => {
    console.log('----->project_id', project_id);
    console.log('----->id', id);
    deleteBroker({project_id: project_id, broker_id: _id});
  };

  return (
    <ScrollView style={{padding: 20}}>
      {data.map(i => {
        return <RenderPairData title={i.title} value={i.value} />;
      })}
      <View style={styles.dialogActionContainer}>
        <OpacityButton
          color={'#4872F4'}
          opacity={0.18}
          style={styles.Button}
          onPress={() =>
            navigation.navigate('AddBroker', {broker: props.userData})
          }>
          <MaterialIcons
            style={{marginRight: 10}}
            name="edit"
            color={theme.colors.primary}
            size={24}
          />
          <Text style={{color: theme.colors.primary, fontSize: 20}}>Edit</Text>
        </OpacityButton>
        {console.log('----->dealsClosed', dealsClosed)}
        {dealsClosed == 0 ? (
          <OpacityButton
            color={theme.colors.error}
            opacity={0.18}
            style={styles.Button}
            onPress={() => handleDeleteButton(id, projectId)}>
            <MaterialIcons
              name="delete"
              color={theme.colors.error}
              style={{marginRight: 10}}
              size={24}
            />
            <Text style={{color: theme.colors.error, fontSize: 20}}>
              Delete
            </Text>
          </OpacityButton>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dialogActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  Button: {
    width: '50%',
    margin: 10,
    padding: 5,
  },
});

export default withTheme(BrokerInfo);

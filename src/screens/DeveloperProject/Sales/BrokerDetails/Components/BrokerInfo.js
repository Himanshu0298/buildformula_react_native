import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {withTheme, Button, Subheading} from 'react-native-paper';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import {theme} from 'styles/theme';

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
  const {navigation, brokerInfo} = props;

  const {selectedProject} = useSelector(s => s.project);
  const {deleteBroker, getBrokersList} = useSalesActions();

  const projectId = selectedProject.id;

  const data = [
    {title: 'First Name', value: brokerInfo?.first_name},
    {title: 'Last Name', value: brokerInfo?.last_name},
    {title: 'Email', value: brokerInfo?.email},
    {title: 'Phone', value: `+91 ${brokerInfo?.phone}`},
    {title: 'Deals closed', value: brokerInfo?.dealClosedCount},
  ];

  const handleDeleteButton = async () => {
    await deleteBroker({project_id: projectId, broker_id: brokerInfo.id});
    await getBrokersList({project_id: projectId});
    navigation.navigate('BrokerList');
  };

  return (
    <ScrollView style={{padding: 20}}>
      {data.map(i => {
        return <RenderPairData title={i.title} value={i.value} />;
      })}
      <View style={styles.actionContainer}>
        <Button
          style={{flex: 1, marginHorizontal: 5}}
          icon="pencil-outline"
          mode="contained"
          contentStyle={{padding: 3}}
          theme={{roundness: 15}}
          onPress={() =>
            navigation.navigate('AddBroker', {broker: props.userData})
          }>
          {'Edit'}
        </Button>
        {!Number(brokerInfo?.dealClosedCount) ? (
          <Button
            style={{flex: 1, marginHorizontal: 5}}
            icon="delete"
            mode="contained"
            color={theme.colors.error}
            contentStyle={{padding: 3}}
            theme={{roundness: 15}}
            onPress={handleDeleteButton}>
            {'Delete'}
          </Button>
        ) : null}
      </View>

      {/* <View style={styles.dialogActionContainer}>
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

        {brokerInfo?.dealClosedCount == 0 ? (
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
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    marginTop: 25,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default withTheme(BrokerInfo);

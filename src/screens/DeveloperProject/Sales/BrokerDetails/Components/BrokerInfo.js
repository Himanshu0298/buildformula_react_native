import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {withTheme, Button, Caption, Text} from 'react-native-paper';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import {theme} from 'styles/theme';

function RenderPairData(props) {
  const {title, value} = props;

  return (
    <View style={styles.rowContainer}>
      <Caption>{title}</Caption>
      <Text>{value}</Text>
    </View>
  );
}

function BrokerInfo(props) {
  const {navigation, brokerInfo, userData} = props;

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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View>
        {data.map(i => {
          return <RenderPairData title={i.title} value={i.value} />;
        })}
      </View>

      <View style={styles.actionContainer}>
        <Button
          style={styles.button}
          icon="pencil-outline"
          mode="contained"
          contentStyle={styles.buttonLabel}
          theme={{roundness: 15}}
          onPress={() => navigation.navigate('AddBroker', {broker: userData})}>
          Edit
        </Button>
        {!Number(brokerInfo?.dealClosedCount) ? (
          <Button
            style={styles.button}
            icon="delete"
            mode="contained"
            color={theme.colors.error}
            contentStyle={styles.buttonLabel}
            theme={{roundness: 15}}
            onPress={handleDeleteButton}>
            Delete
          </Button>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  rowContainer: {
    marginBottom: 15,
  },
  actionContainer: {
    marginTop: 25,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonLabel: {
    padding: 3,
  },
});

export default withTheme(BrokerInfo);

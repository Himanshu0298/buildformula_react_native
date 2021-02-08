import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Caption,
  Text,
  List,
  withTheme,
  Subheading,
  FAB,
  Button,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {secondaryTheme} from 'styles/theme';

const STATIC = [
  {
    title: 'Modify Request 1',
    status: 1,
    description: 'This is the description of the modify request 1.',
  },
  {
    title: 'Modify Request 1',
    status: 1,
    description: 'This is the description of the modify request 1.',
  },
  {
    title: 'Modify Request 2',
    status: 2,
    description: 'This is the description of the modify request 1.',
  },
  {
    title: 'Modify Request 2',
    status: 3,
    description: 'This is the description of the modify request 1.',
  },
  {
    title: 'Modify Request 2',
    status: 3,
    description: 'This is the description of the modify request 1.',
  },
  {
    title: 'Modify Request 2',
    status: 3,
    description: 'This is the description of the modify request 1.',
  },
];

const STATUS_LIST = {
  1: {
    label: 'PENDING APPROVAL',
    color: '#F4AF48',
  },
  2: {
    label: 'APPROVED',
    color: '#07CA03',
  },
  3: {
    label: 'REJECTED',
    color: '#FF5D5D',
  },
};

function RenderRequests({requests}) {
  if (requests.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Caption>No requests found!</Caption>
      </View>
    );
  }

  return requests.map((request, index) => {
    const {title, status, description} = request;
    return (
      <View key={index} style={styles.requestContainer}>
        <View style={styles.requestHeadingRow}>
          <Text>{title}</Text>
          <Text style={{fontSize: 11, color: STATUS_LIST[status].color}}>
            {STATUS_LIST[status].label}
          </Text>
        </View>
        <Caption>{description}</Caption>
        {status === 2 ? (
          <View style={styles.actionContainer}>
            <Button
              // compact
              contentStyle={{paddingHorizontal: 1}}
              theme={{roundness: 15}}
              style={{marginRight: 10}}
              onPress={() => console.log('-----> cancel')}>
              {'Cancel'}
            </Button>
            <Button
              // compact
              mode="contained"
              contentStyle={{paddingHorizontal: 1}}
              theme={{roundness: 15}}
              onPress={() => console.log('-----> confirm')}>
              {'Confirm'}
            </Button>
          </View>
        ) : null}
      </View>
    );
  });
}

function RequestsAccordion({title, requests = []}) {
  const [expanded, setExpanded] = React.useState(true);

  const toggle = () => setExpanded((v) => !v);

  return (
    <View style={styles.sectionContainer}>
      <List.Accordion
        titleStyle={{color: '#5E6D7C', fontSize: 14, marginBottom: 5}}
        style={{padding: 0, margin: -8}}
        title={`${title} (${requests.length})`}
        expanded={expanded}
        onPress={toggle}
      />
      {expanded ? <RenderRequests requests={requests} /> : null}
    </View>
  );
}

function ModifyRequest(props) {
  const {theme, navigation, route} = props;
  const {params} = route;

  const navToAdd = (customer) => {
    navigation.push('AddModifyRequest', {...params});
  };

  const requests = React.useMemo(() => {
    const pendingRequests = STATIC.filter((v) => v.status === 1);
    const approvedRequests = STATIC.filter((v) => v.status === 2);
    const rejectedRequests = STATIC.filter((v) => v.status === 3);

    return {pendingRequests, approvedRequests, rejectedRequests};
  }, []);

  const {pendingRequests, approvedRequests, rejectedRequests} = requests;
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <Subheading style={{marginBottom: 10}}>All Modify Requests</Subheading>
        <RequestsAccordion
          title="Pending requests"
          requests={pendingRequests}
        />
        <RequestsAccordion
          title="Approved requests"
          requests={approvedRequests}
        />
        <RequestsAccordion
          title="Rejected requests"
          requests={rejectedRequests}
        />
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
  container: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexGrow: 1,
  },
  sectionContainer: {
    marginVertical: 10,
  },
  emptyContainer: {
    backgroundColor: '#F2F3F5',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  requestContainer: {
    backgroundColor: '#F2F3F5',
    padding: 10,
    borderRadius: 5,
    marginVertical: 7,
  },
  requestHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 10,
  },
  actionContainer: {
    marginTop: 25,
    paddingHorizontal: 10,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default withTheme(ModifyRequest);

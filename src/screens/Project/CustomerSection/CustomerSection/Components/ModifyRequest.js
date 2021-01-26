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
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {secondaryTheme} from 'styles/theme';

const STATIC = [
  {
    title: 'Modify Request 1',
    status: 'PENDING APPROVAL',
    description: 'This is the description of the modify request 1.',
  },
  {
    title: 'Modify Request 1',
    status: 'PENDING APPROVAL',
    description: 'This is the description of the modify request 1.',
  },
  {
    title: 'Modify Request 1',
    status: 'PENDING APPROVAL',
    description: 'This is the description of the modify request 1.',
  },
  {
    title: 'Modify Request 1',
    status: 'PENDING APPROVAL',
    description: 'This is the description of the modify request 1.',
  },
  {
    title: 'Modify Request 1',
    status: 'PENDING APPROVAL',
    description: 'This is the description of the modify request 1.',
  },
  {
    title: 'Modify Request 1',
    status: 'PENDING APPROVAL',
    description: 'This is the description of the modify request 1.',
  },
  {
    title: 'Modify Request 1',
    status: 'PENDING APPROVAL',
    description: 'This is the description of the modify request 1.',
  },
];

function RenderRequests({requests}) {
  if (requests.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Caption theme={secondaryTheme}>No requests found!</Caption>
      </View>
    );
  }

  return requests.map((request, index) => {
    const {title, status, description} = request;
    return (
      <View key={index} style={styles.requestContainer}>
        <View style={styles.requestHeadingRow}>
          <Text theme={secondaryTheme}>{title}</Text>
          <Text theme={secondaryTheme} style={{fontSize: 11}}>
            {status}
          </Text>
        </View>
        <Caption theme={secondaryTheme}>{description}</Caption>
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
        theme={secondaryTheme}
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

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <Subheading style={{marginBottom: 10}} theme={secondaryTheme}>
          All Modify Requests
        </Subheading>
        <RequestsAccordion title="Pending requests" requests={STATIC} />
        <RequestsAccordion title="Approved requests" requests={STATIC} />
        <RequestsAccordion title="Rejected requests" requests={STATIC} />
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
});

export default withTheme(ModifyRequest);

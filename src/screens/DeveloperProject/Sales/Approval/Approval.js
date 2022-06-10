import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import * as React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Caption, Text, withTheme, FAB, Subheading} from 'react-native-paper';
import {theme} from 'styles/theme';
import {getPermissions} from 'utils';

const DATA = [1, 2, 3];

const ApprovalList = props => {
  const {navigation} = props;

  const navToList = () => {
    navigation.navigate('ApprovalListing');
  };
  return (
    <TouchableOpacity style={styles.contentContainer} onPress={navToList}>
      <View style={styles.titleStyle}>
        <View style={styles.approvalContainer}>
          <OpacityButton style={styles.buttonText}>
            <Text>1</Text>
          </OpacityButton>
          <Text style={styles.headingText}>Research</Text>
        </View>

        <Caption>Pending</Caption>
      </View>
      <View style={styles.listDetailContainer}>
        <View style={styles.cardSection}>
          <Caption style={styles.cardSubSection}>Send by:</Caption>
          <Text>Mihir Patel</Text>
        </View>
        <View style={styles.cardSection}>
          <View style={styles.cardSubContainer}>
            <Caption style={styles.cardSubSection}>Send To:</Caption>
            <Text>Akash Chauhan</Text>
          </View>
        </View>
        <View style={styles.cardSection}>
          <View style={styles.cardSubContainer}>
            <Caption style={styles.cardSubSection}>Due Date:</Caption>
            <Text>15 Oct 2022</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function Approval(props) {
  const {navigation, route} = props;

  const modulePermissions = getPermissions('Approval');

  const navToAdd = () => {
    navigation.navigate('CreateApproval', {...route?.params});
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <Subheading style={styles.Subheading}>Approval listing</Subheading>
        {DATA.map(item => {
          return <ApprovalList item={item} {...props} />;
        })}
      </ScrollView>
      {modulePermissions?.editor || modulePermissions?.admin ? (
        <FAB
          style={[styles.fab, {backgroundColor: theme.colors.primary}]}
          icon="plus"
          onPress={navToAdd}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 20,
    // paddingVertical: 5,
    flexGrow: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 10,
  },
  contentContainer: {
    backgroundColor: '#F2F4F5',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },

  titleStyle: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
  },

  approvalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  buttonText: {
    borderRadius: 5,
  },

  headingText: {
    marginLeft: 2,
  },

  cardSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardSubSection: {
    flexDirection: 'row',
    fontSize: 14,
    marginRight: 10,
  },
  cardSubContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  listDetailContainer: {
    paddingHorizontal: 18,
  },
  Subheading: {
    paddingVertical: 10,
    color: theme.colors.primary,
  },
});

export default withTheme(Approval);

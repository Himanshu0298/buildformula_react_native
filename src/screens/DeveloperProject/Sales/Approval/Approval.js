import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import dayjs from 'dayjs';
import * as React from 'react';
import {useEffect} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Caption, Text, withTheme, FAB, Subheading} from 'react-native-paper';
import {useSelector} from 'react-redux';
import useSalesActions from 'redux/actions/salesActions';
import {theme} from 'styles/theme';
import {getPermissions} from 'utils';
import {MODIFY_REQUEST_STATUS} from 'utils/constant';

const ApprovalList = props => {
  const {navigation, item, index} = props;
  const {status, due_date, title, requested_user_id, approver_id, visitors_id} =
    item;

  const navToList = () => {
    navigation.navigate('ApprovalListing', {...item, visitors_id});
  };
  return (
    <TouchableOpacity style={styles.contentContainer} onPress={navToList}>
      <View style={styles.titleStyle}>
        <View style={styles.approvalContainer}>
          <OpacityButton
            style={styles.buttonText}
            color={theme.colors.primary}
            opacity={0.2}>
            <Text style={{color: theme.colors.primary}}>{index + 1}</Text>
          </OpacityButton>
          <Text style={styles.headingText}>{title}</Text>
        </View>

        <Caption
          style={{
            color: MODIFY_REQUEST_STATUS[status]?.color,
          }}>
          {MODIFY_REQUEST_STATUS[status]?.label}
        </Caption>
      </View>
      <View style={styles.listDetailContainer}>
        <View style={styles.cardSection}>
          <Caption style={styles.cardSubSection}>Send by:</Caption>
          <Text>{requested_user_id}</Text>
        </View>
        <View style={styles.cardSection}>
          <View style={styles.cardSubContainer}>
            <Caption style={styles.cardSubSection}>Send To:</Caption>
            <Text>{approver_id}</Text>
          </View>
        </View>
        <View style={styles.cardSection}>
          <View style={styles.cardSubContainer}>
            <Caption style={styles.cardSubSection}>Due Date:</Caption>
            <Text>{dayjs(due_date).format('MMMM D, YYYY')}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function Approval(props) {
  const {navigation, route} = props;

  const {getApprovals} = useSalesActions();

  const {selectedProject} = useSelector(s => s.project);
  const {approvalList, loading} = useSelector(s => s.sales);

  const projectId = selectedProject.id;

  useEffect(() => {
    getApprovals({project_id: projectId});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const modulePermissions = getPermissions('Approval');

  const navToAdd = () => {
    navigation.navigate('CreateApproval');
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />
      <Subheading style={styles.Subheading}>Approval listing</Subheading>

      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {approvalList?.map((item, index) => {
          return <ApprovalList item={item} index={index} {...props} />;
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
    paddingHorizontal: 25,
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
    paddingHorizontal: 10,
    marginRight: 10,
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
    marginTop: 5,
    paddingHorizontal: 40,
  },
  Subheading: {
    paddingVertical: 20,
    color: theme.colors.primary,
    paddingHorizontal: 20,
  },
});

export default withTheme(Approval);

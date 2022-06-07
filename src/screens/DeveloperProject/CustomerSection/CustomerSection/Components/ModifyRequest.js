import ScreenTitle from 'components/Atoms/ScreenTitle';
import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Tabs} from 'react-native-collapsible-tab-view';
import {
  Caption,
  Text,
  withTheme,
  Subheading,
  FAB,
  Button,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {getPermissions} from 'utils';
import {MODIFY_REQUEST_STATUS} from 'utils/constant';

function ModifyRequest(props) {
  const {theme, navigation, isCustomer, route} = props;

  const modulePermissions = getPermissions('Modify Request');

  const {modifyRequests} = useSelector(s => s.customer);
  const {user} = useSelector(s => s.user);

  const navToAdd = () => {
    navigation.navigate('AddModifyRequest', {...route?.params});
  };

  const checkRole = () => {
    return user.role === 2;
  };

  const navToDetails = request => {
    navigation.navigate('ModifyRequestDetails', {
      ...route?.params,
      id: request.id,
    });
  };

  const ContainerView = isCustomer ? ScrollView : Tabs.ScrollView;

  return (
    <View style={styles.container}>
      <ContainerView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <ScreenTitle title="All Modify Requests" />
        {modifyRequests.map(item => {
          return (
            <View key={item.id} style={styles.contentContainer}>
              <View style={styles.titleStyle}>
                <Text>{item.title}</Text>
                <Caption
                  style={{
                    color: MODIFY_REQUEST_STATUS[item.request_status]?.color,
                  }}>
                  {MODIFY_REQUEST_STATUS[item.request_status]?.label}
                </Caption>
              </View>

              <Caption style={styles.caption}>{item.description}</Caption>
              <View style={styles.button}>
                <Button
                  mode="contained"
                  theme={{roundness: 10}}
                  uppercase={false}
                  onPress={() => navToDetails(item)}>
                  View Modify Request
                </Button>
              </View>
            </View>
          );
        })}
      </ContainerView>
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
    paddingVertical: 5,
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
  button: {
    marginTop: 10,
    flexDirection: 'row',
  },
  titleStyle: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
  },
  Subheading: {
    marginBottom: 10,
  },
  caption: {
    marginTop: 5,
  },
});

export default withTheme(ModifyRequest);

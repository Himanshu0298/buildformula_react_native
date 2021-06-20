import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import RenderSelect from 'components/Atoms/RenderSelect';
import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Button, Caption, Title, withTheme} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const ROLES = [{}, {}, {}, {}, {}, {}];

function AddUser(props) {
  const {theme} = props;

  const handleDelete = () => {};

  const updateRole = (index, role) => {};

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Title>Edit User</Title>
        <OpacityButton
          opacity={0.1}
          color={theme.colors.red}
          style={{borderRadius: 50}}
          onPress={handleDelete}>
          <MaterialIcon name="delete" color={theme.colors.red} size={18} />
        </OpacityButton>
      </View>

      <View style={styles.userCardContainer}>
        <View style={styles.rowBetween}>
          <Text>Unnat Thamma</Text>
        </View>
        <View style={styles.rowBetween}>
          <Caption>+91 6546 980008</Caption>
          <Caption>unaattamma@xyz.com</Caption>
        </View>
      </View>

      <View style={styles.rolesContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1, paddingBottom: 200}}>
          {ROLES.map((role, index) => {
            return (
              <View style={styles.roleContainer}>
                <RenderSelect
                  name="role"
                  label={'Role'}
                  options={[]}
                  value={role}
                  onSelect={value => updateRole(index, value)}
                />
                <View style={styles.rowBetween}>
                  <TouchableOpacity>
                    <Caption style={{color: theme.colors.primary}}>
                      Edit conditions
                    </Caption>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Caption style={{color: theme.colors.red}}>Delete</Caption>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}

          <View style={styles.addButtonContainer}>
            <Button style={styles.addButton} mode="outlined" uppercase={false}>
              + Add another role
            </Button>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userCardContainer: {
    backgroundColor: '#F2F4F5',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rolesContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  roleContainer: {
    marginVertical: 10,
  },
  addButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  addButton: {
    width: '75%',
  },
});

export default withTheme(AddUser);

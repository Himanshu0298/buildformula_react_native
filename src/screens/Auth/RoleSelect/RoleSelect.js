import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Title, withTheme, Caption, Subheading} from 'react-native-paper';
import useUserActions from '../../../redux/actions/userActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {useTranslation} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';

function RoleBox({title, onSelectPackage, roleId, colors}) {
  return (
    <TouchableOpacity
      onPress={() => onSelectPackage(roleId)}
      style={styles.roleContainer}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={colors}
        style={styles.roleBox}>
        <Subheading>{title}</Subheading>
      </LinearGradient>
    </TouchableOpacity>
  );
}

function RoleSelect(props) {
  const {user, loading} = useSelector((state) => state.user);
  const {selectRole} = useUserActions();

  function onSelectPackage(roleId) {
    let formData = new FormData();
    //TODO: Update translations
    formData.append('user_id', user.id);
    formData.append('default_role_id', roleId);

    selectRole(formData)
      .then((data) => {
        props.navigation.navigate('ProjectCreationStepOne');
      })
      .catch((error) => {
        console.log('-----> error', error);
      });
  }

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent={''} />
      <Title style={{color: '#000'}}>Select Your Role</Title>
      <Caption style={{color: 'rgba(0, 0, 0, 0.5)'}}>
        Choose your Role for the project
      </Caption>
      <RoleBox
        title="Developer"
        colors={['#8C55FE', '#21D4FD']}
        onSelectPackage={onSelectPackage}
        roleId={1}
      />
      <RoleBox
        title="Supplier"
        colors={['#FA6A88', '#FF9A8B']}
        onSelectPackage={onSelectPackage}
        roleId={2}
      />
      <RoleBox
        title="Customer"
        colors={['#F5576C', '#F093FB']}
        onSelectPackage={onSelectPackage}
        roleId={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  roleContainer: {
    flex: 0.22,
    marginVertical: 15,
  },
  roleBox: {
    flex: 1,
    borderRadius: 15,
    padding: 12,
  },
});

export default withTheme(RoleSelect);

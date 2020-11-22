import React from 'react';
import {Subheading, Badge, withTheme} from 'react-native-paper';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {secondaryTheme} from 'styles/theme';

const PERSON_ICON_BACKGROUND = 'rgba(72,114,244,0.3)';

function ProjectHeader({theme}) {
  const {selectedProject} = useSelector((state) => state.project);
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Subheading theme={secondaryTheme}>
          {selectedProject.project_name}
        </Subheading>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.bellContainer}>
          <MaterialCommunityIcons name={'bell'} color={'#000'} size={20} />
          <Badge size={10} style={styles.badge} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.personContainer,
            {backgroundColor: PERSON_ICON_BACKGROUND},
          ]}>
          <MaterialIcons
            name={'person'}
            color={theme.colors.primary}
            size={19}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default withTheme(ProjectHeader);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {},
  rightContainer: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  bellContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderWidth: 1,
    borderColor: '#fff',
  },
  personContainer: {
    marginLeft: 15,
    padding: 5,
    borderRadius: 20,
  },
});

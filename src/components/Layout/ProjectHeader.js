import React from 'react';
import {Subheading, Badge, withTheme} from 'react-native-paper';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {secondaryTheme} from 'styles/theme';
import {COLORS} from 'utils/constant';
import {SafeAreaView} from 'react-native-safe-area-context';

function ProjectHeader({theme}) {
  const {selectedProject} = useSelector((state) => state.project);
  return (
    <SafeAreaView edges={['right', 'top', 'left']}>
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
              {backgroundColor: COLORS.primaryLight},
            ]}>
            <MaterialIcons
              name={'person'}
              color={theme.colors.primary}
              size={19}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default withTheme(ProjectHeader);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {},
  rightContainer: {
    flexDirection: 'row',
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

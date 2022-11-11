import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, Divider, Subheading, IconButton} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from 'styles/theme';

const arr = [
  {title: 'OPC - 43 Grade'},
  {title: 'OPC - 53 Grade'},
  {title: 'PSC'},
  {title: 'PPC'},
  {title: 'White Cement'},
];

const MCIcon = () => {
  return (
    <View style={styles.mcContainer}>
      <Text style={{color: theme.colors.white}}> MC</Text>
    </View>
  );
};

function MaterialSubList(props) {
  const {navigation} = props;

  const NavToPreview = () => navigation.navigate('MaterialPreview');

  return (
    <View style={styles.container}>
      <View style={styles.dataRow}>
        <IconButton
          icon="keyboard-backspace"
          size={18}
          color={theme.colors.primary}
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        />
        <Subheading style={styles.headerText}>Cement</Subheading>
      </View>
      {arr.map(ele => {
        return (
          <View>
            <TouchableOpacity onPress={NavToPreview}>
              <View style={styles.sectionContainer}>
                <View style={styles.taskContainer}>
                  <View style={styles.calenderIcon}>
                    <MCIcon />
                  </View>
                  <Text style={styles.subHeading}>{ele.title}</Text>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={28}
                  color={theme.colors.silver}
                />
              </View>
            </TouchableOpacity>
            <Divider />
          </View>
        );
      })}
    </View>
  );
}

export default MaterialSubList;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    margin: 10,
  },

  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    padding: 10,
    fontSize: 18,
  },
  backButton: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
  },

  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  calenderIcon: {
    marginRight: 20,
    padding: 10,
  },
  mcContainer: {
    backgroundColor: theme.colors.primary,
    padding: 8,
    borderRadius: 5,
  },
  titleContainer: {
    margin: 10,
  },
});

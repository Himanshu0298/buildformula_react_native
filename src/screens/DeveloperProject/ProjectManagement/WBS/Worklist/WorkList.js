import * as React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, withTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getShadow} from 'utils';
import WorkDetails from './Components/SubWorkDetailsList';
import SubWorkList from './Components/SubWorkList';

const WORK_LIST = [
  {label: 'Level 1', key: 'level1', value: ''},
  {label: 'Level 2', key: 'level2', value: ''},
  {label: 'Level 3', key: 'level3', value: ''},
];

function RenderRow(props) {
  const {item, onPress} = props;
  const {label} = item;
  console.log('-------->props', props);

  return (
    <View>
      <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
        <Text style={styles.optionLabel}>{label}</Text>
        <MaterialCommunityIcons name="chevron-right" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
}

function WorkList(props) {
  const {route, navigation} = props;
  const {level = 0} = route?.params || {};

  const navToNextLevel = () => {
    if (level < 2) {
      navigation.push('Worklist', {level: level + 1});
    } else {
      navigation.push('WorkDetails', {level: level + 1});
    }
  };

  function renderContent() {
    switch (level) {
      case 0:
        return (
          <>
            <Text style={styles.subHeading}>Work List</Text>
            {WORK_LIST.map((item, index) => (
              <RenderRow
                key={index?.toString()}
                onPress={navToNextLevel}
                {...{item}}
              />
            ))}
          </>
        );
      case 1:
        return <SubWorkList {...props} onPress={navToNextLevel} />;

      default:
        return <WorkDetails {...props} onPress={navToNextLevel} />;
    }
  }

  return (
    <View>
      <ScrollView>{renderContent()}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#fff',
    ...getShadow(1),
    margin: 1,
  },
  optionLabel: {
    margin: 10,
    color: 'black',
    fontSize: 16,
  },
  subHeading: {
    fontSize: 17,
    margin: 10,
  },
});

export default withTheme(WorkList);

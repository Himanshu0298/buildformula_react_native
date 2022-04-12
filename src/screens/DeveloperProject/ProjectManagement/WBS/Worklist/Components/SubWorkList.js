import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import * as React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, useTheme, withTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getShadow} from 'utils';
import WorkPath from '../../Components/WorkPath';
import WorkDetails from './SubWorkDetailsList';

const WORK_LIST = [
  {label: 'Level 1', key: 'level1', value: ''},
  {label: 'Level 2', key: 'level2', value: ''},
  {label: 'Level 3', key: 'level3', value: ''},
  {label: 'Level 4', key: 'level4', value: ''},
  {label: 'Level 5', key: 'level5', value: ''},
];

function RenderRow(props) {
  const {item, onPress} = props;
  const {label} = item;

  return (
    <View>
      <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
        <Text style={styles.optionLabel}>{label}</Text>
        <MaterialCommunityIcons name="chevron-right" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
}

function SubWorkList(props) {
  const {navigation, onPress, data, level} = props;
  const theme = useTheme();

  const [showWorkDetails, setShowWorkDetails] = React.useState(false);

  return (
    <View>
      <ScrollView>
        <View style={styles.headerContainer}>
          <View style={styles.button}>
            <OpacityButton
              opacity={0.1}
              color={theme.colors.primary}
              style={styles.backButton}
              onPress={navigation.goBack}>
              <MaterialCommunityIcons
                name="keyboard-backspace"
                size={18}
                color="black"
              />
            </OpacityButton>
          </View>
          <Text style={styles.headerTitle}>Level {level}</Text>
        </View>
        {console.log('-------->data', data)}
        <WorkPath data={data} />

        {!showWorkDetails ? (
          <View>
            {WORK_LIST.map((item, index) => (
              <RenderRow key={index?.toString()} {...{item, onPress}} />
            ))}
          </View>
        ) : (
          <WorkDetails {...props} />
        )}
      </ScrollView>
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

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    padding: 10,
  },
  backButton: {
    borderRadius: 50,
    marginRight: 7,
  },
  headerTitle: {
    fontSize: 18,
    color: 'black',
  },
});

export default withTheme(SubWorkList);

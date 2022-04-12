import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, withTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from 'styles/theme';
import {getShadow} from 'utils';
import {Header} from '../../WorkDetails/WorkDetails';

const WORK_LIST = [
  {key: 'level1', value: ''},
  {key: 'level2', value: ''},
  {key: 'level3', value: ''},
  {key: 'level4', value: ''},
];

function RenderRow(props) {
  const {onPress} = props;

  return (
    <View>
      <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
        <View style={styles.unitContainer}>
          <Text style={styles.unitDetailsText}>w-1.1</Text>

          <View style={styles.workDetails}>
            <Text>PCC-1 {'  '}</Text>
            <MaterialCommunityIcons name="label" size={18} color="#95A0AC" />
            <Text>{'  '}Footing PCC-1</Text>
          </View>
        </View>
        <OpacityButton
          opacity={0.1}
          style={styles.rightArrow}
          color={theme.colors.primary}>
          <MaterialCommunityIcons name="arrow-right" size={18} color="black" />
        </OpacityButton>
      </TouchableOpacity>
    </View>
  );
}

function SubWorkDetailsList(props) {
  const {data} = props;

  return (
    <View>
      <Header {...props} data={data} />
      {WORK_LIST.map((item, index) => (
        <RenderRow key={index?.toString()} {...props} {...{item}} />
      ))}
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
  rightArrow: {
    borderRadius: 25,
  },
  unitContainer: {
    paddingHorizontal: 7,
    paddingVertical: 8,
  },
  unitDetailsText: {
    fontSize: 15,
    marginBottom: 5,
    backgroundColor: '#rgba(72, 114, 244, 0.1);',
    borderRadius: 5,
    paddingHorizontal: 5,
    width: 55,
  },
  workDetails: {
    flexDirection: 'row',
  },
});

export default withTheme(SubWorkDetailsList);

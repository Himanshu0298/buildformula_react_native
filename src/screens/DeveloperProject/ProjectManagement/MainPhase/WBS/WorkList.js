import * as React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, withTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getShadow} from 'utils';
import SubWorkList from './Components/SubWorkList';

const WORK_LIST = [
  {label: 'Level 1', key: 'level1', value: ''},
  {label: 'Level 2', key: 'level2', value: ''},
  {label: 'Level 3', key: 'level3', value: ''},
];

function RenderRow(props) {
  const {item, setSelected} = props;
  const {label, key} = item;

  return (
    <TouchableOpacity onPress={() => setSelected(key)}>
      <View style={styles.optionContainer}>
        <Text style={styles.optionLabel}>{label}</Text>
        <MaterialCommunityIcons name="chevron-right" size={28} color="black" />
      </View>
    </TouchableOpacity>
  );
}

function WorkList(props) {
  const [selectedSubCategory, setSelectedSubCategory] = React.useState();

  return (
    <View>
      <ScrollView>
        {!selectedSubCategory ? (
          <Text style={styles.subHeading}>Work List</Text>
        ) : null}
        {!selectedSubCategory ? (
          WORK_LIST.map((item, index) => (
            <RenderRow
              key={index?.toString()}
              {...{
                item,
                selectedSubCategory,
                setSelected: setSelectedSubCategory,
              }}
            />
          ))
        ) : (
          <>
            {selectedSubCategory === 'level1' ? (
              <SubWorkList
                {...props}
                {...{setSelectedSubCategory}}
                {...{selectedSubCategory}}
              />
            ) : null}
            {/* {selectedSubCategory === 'bungalow' ? (
            <BungalowAreaSheet {...props} {...{setSelectedSubCategory}} />
          ) : null} */}
          </>
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
    marginVertical: 5,
    backgroundColor: '#fff',
    ...getShadow(1),
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

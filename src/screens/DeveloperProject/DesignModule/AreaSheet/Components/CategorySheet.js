import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Divider, Text, withTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function CategorySheet() {
  return (
    <>
      <TouchableOpacity>
        <View style={styles.optionContainer}>
          <Text style={styles.optionLabel}>Tower</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="black"
          />
        </View>
        <Divider />
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={styles.optionContainer}>
          <Text style={styles.optionLabel}>Bungalow</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="black"
          />
        </View>
        <Divider />
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={styles.optionContainer}>
          <Text style={styles.optionLabel}>Plot</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="black"
          />
        </View>
        <Divider />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  optionLabel: {
    margin: 10,
    color: 'black',
    fontSize: 16,
  },
});

export default withTheme(CategorySheet);

import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import * as React from 'react';
import {Text} from 'react-native-paper';

function RenderTable(props) {
  const {headerColumns, data, tableWidths} = props;

  return (
    <ScrollView horizontal>
      <View>
        <View style={styles.tableRow}>
          {headerColumns.map((cellData, cellIndex) => {
            return (
              <View
                key={cellIndex?.toString()}
                style={[styles.headerRow, {width: tableWidths[cellIndex]}]}>
                <Text
                  onPressIn={() => null}
                  onPressOut={() => null}
                  style={styles.tableRowCellText}>
                  {cellData}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.contentContainer}>
          <FlatList
            data={data}
            extraData={data}
            contentContainerStyle={styles.contentContainerStyle}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => {
              const {id, data: columnData} = item;
              return (
                <View style={styles.tableRow}>
                  {columnData.map((cellData, cellIndex) => {
                    return (
                      <View
                        key={cellIndex?.toString()}
                        style={[
                          styles.tableRowCell,
                          {width: tableWidths[cellIndex]},
                        ]}>
                        <Text
                          onPressIn={() => null}
                          onPressOut={() => null}
                          style={styles.tableRowCellText}>
                          {cellData}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              );
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  headerRow: {
    backgroundColor: '#DEE1E7',
    height: 50,
    borderColor: '#C3C3C3',
    borderWidth: 1,
    justifyContent: 'center',
  },

  tableRow: {
    flexDirection: 'row',
    minHeight: 35,
  },
  tableRowCell: {
    justifyContent: 'center',
    borderColor: '#C3C3C3',
    borderWidth: 1,
  },
  tableRowCellText: {
    textAlign: 'center',
  },
});

export default RenderTable;

import {ScrollView, StyleSheet, View} from 'react-native';
import * as React from 'react';
import {Text} from 'react-native-paper';
import NoResult from 'components/Atoms/NoResult';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';

function RenderCell({value, width}) {
  return (
    <View style={[styles.tableRowCell, {width}]}>
      <Text style={styles.tableRowCellText}>{value}</Text>
    </View>
  );
}

function RenderTable(props) {
  const {headerColumns, data, tableWidths, renderCell} = props;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.contentContainer}>
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
        <View style={styles.keyboardScrollContainer}>
          <View style={styles.contentContainer}>
            {data?.length ? (
              <KeyboardAwareFlatList
                data={data}
                extraData={data}
                contentContainerStyle={styles.contentContainerStyle}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({item}) => {
                  const {id, title, data: columnData} = item;
                  return (
                    <View style={styles.tableRow}>
                      {title ? (
                        <RenderCell value={title} width={tableWidths[0]} />
                      ) : null}
                      {columnData.map((cellData, cellIndex) => {
                        const updatedCellIndex = title
                          ? cellIndex + 1
                          : cellIndex;
                        const width = tableWidths[updatedCellIndex];

                        if (renderCell) {
                          return (
                            <View
                              key={updatedCellIndex?.toString()}
                              style={[styles.tableRowCell, {width}]}>
                              {renderCell(cellData, cellIndex, id)}
                            </View>
                          );
                        }

                        return (
                          <RenderCell
                            key={updatedCellIndex?.toString()}
                            value={cellData}
                            width={width}
                          />
                        );
                      })}
                    </View>
                  );
                }}
              />
            ) : (
              <NoResult style={styles.noResult} title="No Data found!" />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    borderColor: 'red',
  },
  contentContainerStyle: {
    flexGrow: 1,
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
  noResult: {
    marginTop: 10,
  },
  keyboardScrollContainer: {
    flex: 1,
  },
});

export default RenderTable;

import * as React from 'react';
import {Caption, Text, withTheme} from 'react-native-paper';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import FileIcon from 'assets/images/file_icon.png';
import dayjs from 'dayjs';

const ProgressCard = props => {
  const {details} = props;
  const {
    remarks,
    created,
    file_name,
    percentage_completed,
    quantity_completed,
  } = details || {};
  return (
    <View style={styles.container}>
      <View style={styles.recordContainer}>
        <Text>{dayjs(created).format('DD-MM-YYYY')}</Text>
        <View style={styles.cardContainer}>
          <View style={styles.cardDetailsContainer}>
            <Caption>Percentage:</Caption>
            <View>
              <Text style={styles.text}>{percentage_completed}</Text>
            </View>
          </View>
          <View style={styles.cardDetailsContainer}>
            <Caption>Quantity:</Caption>
            <View>
              <Text style={styles.text}>{quantity_completed}</Text>
            </View>
          </View>
        </View>
        <View style={styles.remarkContainer}>
          <Caption>Remark:</Caption>
          <View style={styles.remarkTextContainer}>
            <Text style={styles.remarkText}>{remarks}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.sectionContainer}
          // onPress={() => onPressFile(file)}
        >
          <Image source={FileIcon} style={styles.fileIcon} />
          <View>
            <Text style={(styles.verticalFlex, styles.text)} numberOfLines={2}>
              {file_name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7,
  },
  cardDetailsContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
  },
  text: {
    marginLeft: 5,
  },
  container: {
    padding: 10,
    backgroundColor: '#F2F4F5',
    borderRadius: 5,
    margin: 10,
  },
  recordContainer: {
    paddingBottom: 5,
  },

  remarkContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
    flexGrow: 1,
    paddingLeft: 2,
  },
  remarkText: {
    paddingTop: 3,
  },
  remarkTextContainer: {
    flex: 1,
    paddingHorizontal: 5,
  },
  sectionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    display: 'flex',
    borderRadius: 5,
  },
  fileIcon: {
    width: 32,
    height: 38,
    paddingLeft: 10,
    marginLeft: 10,
  },
});

export default withTheme(ProgressCard);
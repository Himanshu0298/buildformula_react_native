import * as React from 'react';
import {Caption, Subheading, Text, withTheme} from 'react-native-paper';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import FileIcon from 'assets/images/file_icon.png';

const VehicleInfo = () => {
  return (
    <View style={styles.infoContainer}>
      <Subheading style={styles.infoHeading}>Vehicle Info</Subheading>

      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <View style={styles.cardDetailsContainer}>
            <Caption style={styles.captions}>Driver Name</Caption>
            <Text>MukeshBhai</Text>
          </View>
          <View style={styles.cardDetailsContainer}>
            <Caption style={styles.captions}>Vehicle NO.</Caption>
            <Text>GJ-06-BT-0741</Text>
          </View>
        </View>
        <View>
          <Caption style={styles.captions}>Challan Remark</Caption>
          <Text>Lorem ipsum dolor sit amet consectetur, adipisicing eli</Text>
        </View>
        <TouchableOpacity
          style={styles.sectionContainer}
          // onPress={() => onPressFile(file)}
        >
          <Image source={FileIcon} style={styles.fileIcon} />
          <View>
            <Text style={(styles.verticalFlex, styles.text)} numberOfLines={2}>
              image.jpeg
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
  infoContainer: {
    marginTop: 10,
  },
  infoHeading: {
    marginLeft: 10,
  },
  captions: {
    fontSize: 13,
  },
  cardDetailsContainer: {
    flexGrow: 1,
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

  sectionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    display: 'flex',
    borderRadius: 5,
    marginTop: 10,
  },
  fileIcon: {
    width: 32,
    height: 38,
    paddingLeft: 10,
    marginLeft: 10,
  },
});

export default withTheme(VehicleInfo);

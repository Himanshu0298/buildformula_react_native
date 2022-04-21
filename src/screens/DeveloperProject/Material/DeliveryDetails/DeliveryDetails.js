import * as React from 'react';
import {Subheading, Text, withTheme} from 'react-native-paper';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import FileIcon from 'assets/images/file_icon.png';
import Header from '../CommonComponents/Header';
import MaterialInfo from './Components/MaterialInfo';
import VehicleInfo from './Components/VehicleInfo';

const Attachments = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.attachmentsText}>Attachments</Text>
      <TouchableOpacity
        style={styles.sectionContainer}
        // onPress={() => onPressFile(file)}
      >
        <Image source={FileIcon} style={styles.fileIcon} />
        <View>
          <Text style={(styles.verticalFlex, styles.text)} numberOfLines={2}>
            Image.jpeg
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const DeliverDetails = props => {
  return (
    <View style={styles.mainContainer}>
      <Header title="Challan No: 90" {...props} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Subheading style={styles.challanHeading}>Challan Images</Subheading>
          <Attachments />
        </View>
        <MaterialInfo />
        <VehicleInfo />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginLeft: 5,
  },
  container: {
    padding: 10,
    backgroundColor: '#F2F4F5',
    borderRadius: 5,
    margin: 10,
  },
  mainContainer: {
    paddingHorizontal: 10,
    flex: 1,
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
  challanHeading: {
    padding: 10,
  },
  attachmentsText: {
    fontSize: 15,
    paddingBottom: 10,
  },
});

export default withTheme(DeliverDetails);

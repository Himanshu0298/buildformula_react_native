import * as React from 'react';
import {Caption, Subheading, Text, withTheme} from 'react-native-paper';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import FileIcon from 'assets/images/file_icon.png';
import FileViewer from 'react-native-file-viewer';

import NoResult from 'components/Atoms/NoResult';
import {useDownload} from 'components/Atoms/Download';

const VehicleInfo = props => {
  const {vehicleInfo, vehicleAttachments} = props;
  const {driver_name, vehicle_number, challan_remark} = vehicleInfo || {};

  const download = useDownload();

  const onPressFile = async fileUrl => {
    const name = fileUrl.split('/').pop();

    download.link({
      name,
      link: fileUrl,
      showAction: false,
      onFinish: ({dir}) => {
        FileViewer.open(`file://${dir}`);
      },
    });
  };

  function getFileName(string) {
    if (string.includes('/')) {
      const splits = string.split('/');
      return splits[splits.length - 1];
    }

    return string;
  }

  return (
    <View style={styles.infoContainer}>
      <Subheading style={styles.infoHeading}>Vehicle Info</Subheading>

      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <View style={styles.cardDetailsContainer}>
            <Caption style={styles.captions}>Driver Name</Caption>
            <Text>{driver_name}</Text>
          </View>
          <View style={styles.cardDetailsContainer}>
            <Caption style={styles.captions}>Vehicle NO.</Caption>
            <Text>{vehicle_number}</Text>
          </View>
        </View>
        <View>
          <Caption style={styles.captions}>Challan Remark</Caption>
          <Text>{challan_remark}</Text>
        </View>
        {vehicleAttachments?.length ? (
          vehicleAttachments?.map(item => {
            return (
              <TouchableOpacity
                style={styles.sectionContainer}
                onPress={() => onPressFile(item?.image_url)}>
                <Image source={FileIcon} style={styles.fileIcon} />

                <View key={item.id}>
                  <Text
                    style={(styles.verticalFlex, styles.text)}
                    numberOfLines={2}>
                    {/* Vehicle File {index + 1} */}
                    {getFileName(item.image_url)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <NoResult title="No Files" />
        )}
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

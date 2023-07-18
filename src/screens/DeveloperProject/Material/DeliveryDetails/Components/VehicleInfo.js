import * as React from 'react';
import {Caption, Subheading, Text, withTheme} from 'react-native-paper';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import FileIcon from 'assets/images/file_icon.png';
import {getShadow} from 'utils';
import FileViewer from 'react-native-file-viewer';

import {getFileName} from 'utils/constant';
import {useDownload} from 'components/Atoms/Download';

const InvoiceAttachments = props => {
  const {invoiceImages = [], projectId} = props;

  const download = useDownload();

  const onPressFile = async fileUrl => {
    download.link({
      name: getFileName(fileUrl.image_url),

      data: {project_id: projectId, file_url: fileUrl.image_url},
      showAction: false,
      onFinish: ({dir}) => {
        FileViewer.open(`file://${dir}`);
      },
    });
  };

  return (
    <>
      <Subheading style={styles.challanHeading}> Invoice Images</Subheading>

      {invoiceImages?.map((file, index) => {
        return (
          <TouchableOpacity
            style={styles.sectionContainer}
            onPress={() => onPressFile(file)}>
            <Image source={FileIcon} style={styles.fileIcon} />
            <View>
              <Text
                style={[styles.verticalFlex, styles.text]}
                numberOfLines={2}>
                Vehicle Invoice File {index + 1}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </>
  );
};

const VehicleImages = props => {
  const {vehicleAttachments = [], projectId} = props;

  const download = useDownload();

  const onPressFile = async fileUrl => {
    download.link({
      name: getFileName(fileUrl.image_url),

      data: {project_id: projectId, file_url: fileUrl.image_url},
      showAction: false,
      onFinish: ({dir}) => {
        FileViewer.open(`file://${dir}`);
      },
    });
  };

  return (
    <>
      <Subheading style={styles.challanHeading}> Vehicle Images</Subheading>

      {vehicleAttachments?.map((file, index) => {
        return (
          <TouchableOpacity
            style={styles.sectionContainer}
            onPress={() => onPressFile(file)}>
            <Image source={FileIcon} style={styles.fileIcon} />
            <View>
              <Text
                style={[styles.verticalFlex, styles.text]}
                numberOfLines={2}>
                Vehicle File {index + 1}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </>
  );
};

const VehicleInfo = props => {
  const {vehicleInfo, vehicleAttachments, invoiceImages, projectId} = props;
  const {driver_name, vehicle_number, challan_remark} = vehicleInfo || {};

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
          <Text>{challan_remark || ''}</Text>
        </View>
        {vehicleAttachments?.length ? (
          <VehicleImages
            vehicleAttachments={vehicleAttachments}
            projectId={projectId}
          />
        ) : null}

        {invoiceImages?.length ? (
          <InvoiceAttachments
            invoiceImages={invoiceImages}
            projectId={projectId}
          />
        ) : null}
        {/* {vehicleAttachments?.map((item, index) => {
          return (
            <TouchableOpacity
              style={styles.sectionContainer}
              onPress={() => onPressFile(item)}>
              <Image source={FileIcon} style={styles.fileIcon} />

              <View key={item.id}>
                <Text
                  style={(styles.verticalFlex, styles.text)}
                  numberOfLines={2}>
                  Vehicle File {index + 1}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })} */}
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
    marginRight: 10,
  },
  container: {
    padding: 10,
    backgroundColor: '#F2F4F5',
    borderRadius: 5,
    margin: 10,
    ...getShadow(2),
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
  challanHeading: {
    padding: 10,
    marginTop: 10,
    paddingBottom: 0,
  },
});

export default withTheme(VehicleInfo);

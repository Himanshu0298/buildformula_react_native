/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {Image, View, StyleSheet, ScrollView} from 'react-native';
import stock_image from 'assets/images/stock_image.png';
import PdfIcon from 'assets/images/pdf_icon.png';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Caption,
  Divider,
  IconButton,
  Subheading,
  Text,
  Title,
} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FileViewer from 'react-native-file-viewer';

import {useDownload} from 'components/Atoms/Download';
import {getFileName} from 'utils/constant';
import {getDownloadUrl} from 'utils/download';
import {getShadow} from 'utils';
import {theme} from 'styles/theme';
import {DATA, FILES_DATA, OWNER_DATA, SECURITY_DATA} from './Data';

function Files() {
  const download = useDownload();

  const onPressFile = async file => {
    const fileUrl = getDownloadUrl(file);
    const name = getFileName(file);

    download.link({
      name,
      link: fileUrl,
      showAction: false,
      onFinish: ({dir}) => {
        FileViewer.open(`file://${dir}`);
      },
    });
  };
  return (
    <View>
      <Subheading> File's/ Attachments </Subheading>
      {FILES_DATA.map(item => {
        return (
          <View style={styles.recentFiles}>
            <TouchableOpacity
              style={styles.sectionContainer}
              onPress={() => onPressFile(item)}>
              <Image source={PdfIcon} style={styles.fileIcon} />
              <View>
                <Text
                  style={(styles.verticalFlex, styles.text)}
                  numberOfLines={2}>
                  {item.name}
                </Text>
                <View style={styles.type}>
                  <Text style={styles.date}>{item.type}</Text>
                </View>
                <View style={styles.dateContainer}>
                  <Text style={styles.date}>
                    {/* {dayjs(created).format('DD MMM YYYY')} */}
                    {item.date}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <View>
              <IconButton
                icon="dots-vertical"
                onPress={() => console.log('===========> ')}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}

function ProjectSecurityDetails() {
  return (
    <View>
      <Subheading>Project Owner Info</Subheading>
      {SECURITY_DATA.map(item => {
        return (
          <View style={styles.container}>
            <View style={styles.subContainer}>
              <Text>{item.name.toUpperCase()}</Text>
            </View>
            <View style={styles.phoneContainer}>
              <MaterialIcons name="phone" color="#4872f4" size={18} />
              <View style={styles.rowData}>
                <Text style={styles.number}> {item.no}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}

function ProjectOwnerDetails(props) {
  return (
    <>
      <Subheading>Project Owner Info</Subheading>

      {OWNER_DATA.map(item => {
        return (
          <View style={styles.container}>
            <View style={styles.subContainer}>
              <Text>{item.name.toUpperCase()}</Text>
            </View>
            <View>
              <Text>({item.type.toUpperCase()})</Text>
            </View>
            <View style={styles.phoneContainer}>
              <MaterialIcons name="phone" color="#4872f4" size={18} />
              <View style={styles.rowData}>
                <Text style={styles.number}> {item.no}</Text>
              </View>
            </View>
            <View style={styles.phoneContainer}>
              <MaterialIcons name="email" color="#4872f4" size={18} />
              <Text style={styles.number}> {item.email} </Text>
            </View>
          </View>
        );
      })}
    </>
  );
}

function Animates() {
  return (
    <View>
      <Subheading>Building Amenities</Subheading>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{flexDirection: 'row', marginRight: 10}}>
          {DATA.map(item => {
            return (
              <View style={styles.amenitiesContainer}>
                <View style={{alignSelf: 'center'}}>
                  <Image source={item.image} />
                </View>
                <View style={{marginVertical: 5}}>
                  <Text>{item.title}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

function Configuration(props) {
  const {navigation} = props;
  return (
    <View>
      <Subheading>Configuration </Subheading>
      <View style={styles.configurationContainer}>
        <View style={styles.configurationSubContainer}>
          <MaterialIcons
            name="check-circle-outline"
            size={18}
            color="#4872F4"
          />
          <Text style={styles.configurationIcon}>Spacious</Text>
        </View>
        <View style={styles.configurationSubContainer}>
          <MaterialIcons
            name="check-circle-outline"
            size={18}
            color="#4872F4"
          />
          <Text style={styles.configurationIcon}>Luxury</Text>
        </View>
        <View style={styles.configurationSubContainer}>
          <MaterialIcons
            name="check-circle-outline"
            size={18}
            color="#4872F4"
          />
          <Text style={styles.configurationIcon}>Royal</Text>
        </View>
      </View>
      <View style={{marginVertical: 5}}>
        <Subheading> Description</Subheading>
        <Caption>
          Wave Estate in Sector-85, Mohali is a ready-to-move housing society.
          It offers apartments, independent floors and villas in varied budget
          range Wave It offers apartments, independent floors and villas in
          varied budget range Wave housing society floors ran...
          <TouchableOpacity onPress={() => navigation.navigate('Description')}>
            <Text style={{color: theme.colors.primary}}> more</Text>
          </TouchableOpacity>
        </Caption>
      </View>
    </View>
  );
}

function Details() {
  return (
    <>
      <View style={styles.detailContainer}>
        <View>
          <Caption>Project Category </Caption>
          <Text>Towers, Bungalows</Text>
        </View>
        <View>
          <Caption>No of Towers Units</Caption>
          <Text>210 Units</Text>
        </View>
      </View>
      <View style={styles.detailContainer}>
        <View>
          <Caption>No of Tower</Caption>
          <Text>04 Towers</Text>
        </View>
        <View>
          <Caption>Configurations</Caption>
          <Text>2BHK, 4BHK, 6BHK</Text>
        </View>
      </View>
      <View style={styles.detailContainer}>
        <View>
          <Caption>No Of bungalows</Caption>
          <Text>15 Bungalows</Text>
        </View>
        <View>
          <Caption>No of Plots</Caption>
          <Text>10 Plots</Text>
        </View>
      </View>
    </>
  );
}

function StatusField() {
  return (
    <View>
      <View>
        <View style={styles.checkIcon}>
          <MaterialIcons
            name="check-circle-outline"
            size={18}
            color="#1E9400"
          />
          <Text style={styles.approvedStatus}>Rera Approved</Text>
        </View>
        <View style={styles.statusSubContainer}>
          <View style={styles.thumbIcon}>
            <MaterialIcons name="thumb-up-off-alt" size={18} />
            <Text>Good Quality</Text>
          </View>
          <View style={styles.buildingIcon}>
            <MaterialCommunityIcons name="office-building-outline" size={18} />
            <Text>Prime Building</Text>
          </View>
        </View>
      </View>
      <View style={styles.statusContainer}>
        <Subheading>Status</Subheading>
        <Text>Under Construction</Text>
        <Caption>Possession by Dec, 2022</Caption>
      </View>
    </View>
  );
}

function ProjectPreview(props) {
  const {navigation} = props;
  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <Image source={stock_image} />
      <View style={styles.mainContainer}>
        <View>
          <Title>Emaar The View</Title>
          <Text>Sector-105, Mohali</Text>
          <Text>Residential</Text>
        </View>
        <View style={styles.statusField}>
          <StatusField />
        </View>
        <View style={styles.statusField}>
          <Details />
        </View>
        <Divider style={{borderWidth: 0.5}} />
        <View style={styles.statusField}>
          <Configuration navigation={navigation} />
        </View>
        <View style={styles.statusField}>
          <Animates />
        </View>
        <View style={styles.statusField}>
          <ProjectOwnerDetails />
        </View>
        <View style={styles.statusField}>
          <ProjectSecurityDetails />
        </View>
        <View style={styles.statusField}>
          <Files />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    margin: 10,
    flex: 1,
  },

  checkIcon: {
    flexDirection: 'row',
    backgroundColor: '#1e940026',
    padding: 10,
    borderRadius: 10,
    marginRight: '50%',
  },

  configurationSubContainer: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#4872f41a',
    marginRight: 10,
  },
  thumbIcon: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#B5EAEA',
    marginRight: 10,
  },

  buildingIcon: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFF89A',
    marginRight: 10,
  },
  approvedStatus: {
    color: '#1E9400',
    marginLeft: 5,
  },

  statusContainer: {
    backgroundColor: '#4872f41a',
    padding: 10,
    borderRadius: 10,
  },
  amenitiesContainer: {
    backgroundColor: '#4872f41a',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  scrollView: {
    marginBottom: 20,
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  statusSubContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  statusField: {
    marginVertical: 10,
  },
  configurationIcon: {
    color: '#4872F4',
    marginLeft: 5,
  },
  configurationContainer: {
    flexDirection: 'row',
    marginRight: 20,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    borderWidth: 1,
    padding: 20,
    borderColor: '#4872F4',
    borderRadius: 10,
    marginVertical: 10,
  },
  phoneContainer: {
    margin: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    color: '#4872f4',
  },
  rowData: {
    marginVertical: 8,
  },
  recentFiles: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFFFF',
    ...getShadow(3),
    padding: 10,
    borderRadius: 10,
  },
  sectionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  fileIcon: {
    width: 32,
    height: 38,
    paddingLeft: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  type: {
    marginLeft: 10,
  },
  dateContainer: {
    marginLeft: 8,
  },
});

export default ProjectPreview;

/* eslint-disable global-require */
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Caption,
  Divider,
  IconButton,
  Subheading,
  Text,
  Title,
} from 'react-native-paper';
import {theme} from 'styles/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import FileViewer from 'react-native-file-viewer';
import PdfIcon from 'assets/images/pdf_icon.png';

import {useDownload} from 'components/Atoms/Download';
import {getFileName} from 'utils/constant';
import {getDownloadUrl} from 'utils/download';
import {getShadow} from 'utils';
import PostContent from 'components/Atoms/RenderSeeMore';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';

import CustomCarousel from 'components/Atoms/CustomCarousel';
import {
  FILES_DATA,
  OWNER_DATA,
  SECURITY_DATA,
} from '../ProjectDetail/ProjectPreview/Data';

const data = [
  {
    image: require('assets/images/plotPreview.png'),
  },
  {
    image: require('assets/images/plotPreview.png'),
  },
  {
    image: require('assets/images/plotPreview.png'),
  },
];

const description =
  ' Lorem ipsum dolor sit amet consectetur. Tortor adipiscing leo sempermagna ipsum. Suspendisse odio adipiscing ultrices euismod. Eleifend ut';

function OwnerDetails(props) {
  return (
    <View style={{marginVertical: 10, padding: 10}}>
      <View style={{marginBottom: 10}}>
        <Text>Owner Info</Text>
      </View>

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
    </View>
  );
}

function SecurityDetails() {
  return (
    <View style={{marginBottom: 20, padding: 10}}>
      <View style={{marginBottom: 10}}>
        <Text>SECURITY/ CARETAKER INFO</Text>
      </View>
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

function Files() {
  const download = useDownload();

  const onPressFile = async file => {
    download.link({
      name: getFileName(file),
      data: {project_id: file.project_id, file_url: file.file_url},
      showAction: false,
      onFinish: ({dir}) => {
        FileViewer.open(`file://${dir}`);
      },
    });
  };
  return (
    <View style={{marginVertical: 10, padding: 10}}>
      <View style={{marginBottom: 10}}>
        <Text> File's/ Attachments </Text>
      </View>
      {FILES_DATA.map(item => {
        return (
          <View style={styles.recentFiles}>
            <TouchableOpacity
              style={styles.sectionContainer}
              onPress={() => onPressFile(item)}>
              <Image source={PdfIcon} style={styles.fileIcon} />
              <View style={styles.fileWrapper}>
                <Text
                  style={(styles.verticalFlex, styles.text)}
                  numberOfLines={2}>
                  {item.name}
                </Text>
                <View>
                  <Text style={styles.date}>{item.type}</Text>
                </View>
                <View>
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

function Pricing() {
  return (
    <View style={{marginVertical: 10, padding: 10}}>
      <View style={{marginBottom: 10}}>
        <Text>PRICING</Text>
      </View>

      <View>
        <Caption>Survey Price</Caption>
        <Text>₹ 2,00,000</Text>
      </View>
      <View>
        <Caption>TP Price</Caption>
        <Text>₹ 1,02,001</Text>
      </View>
      <View>
        <Caption>Commission</Caption>
        <Text>₹ 5,22,120</Text>
      </View>
      <View>
        <Caption>Remarks</Caption>
        <PostContent description={description} />
      </View>
    </View>
  );
}

function Details() {
  return (
    <View style={{marginBottom: 10, padding: 10}}>
      <View style={styles.detailContainer}>
        <View>
          <Caption>Plot Zone</Caption>
          <Text>R1</Text>
        </View>
        <View>
          <Caption>FSI</Caption>
          <Text>1000 SQFT</Text>
        </View>
      </View>
      <View style={styles.detailContainer}>
        <View>
          <Caption>Survey Number</Caption>
          <Text>02525</Text>
        </View>
        <View>
          <Caption>Plot/ land Size</Caption>
          <Text>500 SQFT</Text>
        </View>
      </View>
      <View style={styles.detailContainer}>
        <View>
          <Caption>Measurement</Caption>
          <Text>110 SQFT</Text>
        </View>
      </View>
    </View>
  );
}

function TPDetails() {
  return (
    <View style={{marginVertical: 10, padding: 10}}>
      <View style={{marginBottom: 10}}>
        <Text>TP DETAILS</Text>
      </View>
      <View style={styles.detailContainer}>
        <View>
          <Caption>Tp Number</Caption>
          <Text>2011541</Text>
        </View>
        <View>
          <Caption>Fp Number</Caption>
          <Text>5221451</Text>
        </View>
      </View>
      <View style={styles.detailContainer}>
        <View>
          <Caption>Plot/ land Size</Caption>
          <Text>500 SQFT</Text>
        </View>
        <View>
          <Caption>Measurement</Caption>
          <Text>1200 FT</Text>
        </View>
      </View>
    </View>
  );
}

function UnitDetails() {
  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Subheading>by</Subheading>
        <View style={{marginLeft: 5}}>
          <Subheading style={{color: theme.colors.primary}}>
            Satymev Residency
          </Subheading>
        </View>
      </View>
      <View>
        <Subheading> Malad Sangata CHS, Malad West, Mumbai</Subheading>
      </View>
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
    </View>
  );
}

function LocationInfo() {
  return (
    <View style={{marginVertical: 10, padding: 10}}>
      <View style={{marginBottom: 10}}>
        <Text>Location Info</Text>
      </View>
      <View>
        <Caption>Property Location URL</Caption>
        <Subheading style={{color: theme.colors.primary}}>
          Satymev Residency
        </Subheading>
      </View>
      <View>
        <Caption>Address</Caption>
        <Text>Madh Street, Ambai faliyu, Keshod, Junagadh - 362001</Text>
      </View>
      <View>
        <Caption>Remarks</Caption>
        <PostContent description={description} />
      </View>
    </View>
  );
}

function UnitPreview(props) {
  const {navigation} = props;
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <View style={styles.headerWrapper}>
            <IconButton
              icon="keyboard-backspace"
              size={18}
              color="#4872f4"
              style={styles.backIcon}
              onPress={() => navigation.goBack()}
            />
            <Subheading>Plot Details</Subheading>
          </View>
          <View style={styles.headerContainer}>
            <OpacityButton
              opacity={0.1}
              color="#4872f4"
              style={styles.navBTN}
              onPress={() => navigation.navigate('')}>
              <MaterialIcons name="content-copy" color="#4872f4" size={15} />
            </OpacityButton>
            <OpacityButton
              opacity={0.1}
              color="#4872f4"
              style={styles.navBTN}
              onPress={() => navigation.navigate('')}>
              <MaterialIcons name="edit" color="#4872f4" size={15} />
            </OpacityButton>
          </View>
        </View>
        <View>
          <CustomCarousel data={data} pagination />
          <View style={styles.sliderWrap}>
            <Title style={styles.sliderText}>648 - 1116 SQ. FT.</Title>
            <Subheading style={styles.sliderText}>Plot for Sold</Subheading>
          </View>
        </View>
        <View style={styles.mainContainer}>
          <UnitDetails />
          {/* <Divider style={{borderWidth: 0.5}} /> */}
          <Details />
          <Divider style={{borderWidth: 0.5}} />
          <TPDetails />
          <Divider style={{borderWidth: 0.5}} />
          <Pricing />
          <Divider style={{borderWidth: 0.5}} />
          <LocationInfo />
          <Divider style={{borderWidth: 0.5}} />
          <OwnerDetails />
          <SecurityDetails />
          <Files />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainContainer: {
    margin: 10,
    flexGrow: 1,
  },
  backIcon: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    marginRight: 11,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
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
  navBTN: {
    borderRadius: 50,
    marginLeft: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  sliderWrap: {
    position: 'absolute',
    left: 10,
    bottom: 48,
  },
  sliderText: {
    color: '#fff',
    fontWeight: '800',
  },
  configurationIcon: {
    color: '#4872F4',
    marginLeft: 5,
  },
  configurationContainer: {
    flexDirection: 'row',
    marginRight: 20,
    marginVertical: 10,
  },
  configurationSubContainer: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#4872f41a',
    marginRight: 10,
    marginTop: 10,
  },
  fileWrapper: {
    marginLeft: 10,
  },
});

export default UnitPreview;

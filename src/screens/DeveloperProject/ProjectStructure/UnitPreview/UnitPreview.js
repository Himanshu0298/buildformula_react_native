import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import unit_image from 'assets/images/unit_image.png';
import {
  Caption,
  Divider,
  IconButton,
  Subheading,
  Text,
  Title,
} from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';

import {theme} from 'styles/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import PrimeIcon from 'assets/images/primeBuilding.svg';
import Hut from 'assets/images/hut.svg';
import CarParking from 'assets/images/car_parking.svg';
import TwoWheelerParking from 'assets/images/two_wheeler_parking.svg';
import FileViewer from 'react-native-file-viewer';
import PdfIcon from 'assets/images/pdf_icon.png';

import {useDownload} from 'components/Atoms/Download';
import {getFileName} from 'utils/constant';
import {getDownloadUrl} from 'utils/download';
import {getShadow} from 'utils';
import PostContent from 'components/Atoms/RenderSeeMore';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {
  FILES_DATA,
  OWNER_DATA,
  SECURITY_DATA,
} from '../ProjectDetail/ProjectPreview/Data';

const description =
  ' Lorem ipsum dolor sit amet consectetur. Tortor adipiscing leo sempermagna ipsum. Suspendisse odio adipiscing ultrices euismod. Eleifend ut';

function SecurityDetails() {
  return (
    <View style={{marginVertical: 10, padding: 10}}>
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

function OwnerDetails(props) {
  return (
    <View style={{marginVertical: 10, padding: 10}}>
      <View style={{marginBottom: 10}}>
        <Text>OWNER INFO</Text>
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
    <View style={{marginVertical: 10, padding: 10}}>
      <View style={{marginBottom: 10}}>
        <Text>FILE'S/ ATTACHMENTS</Text>
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
    <View style={{marginVertical: 20, padding: 10}}>
      <View style={{marginBottom: 10}}>
        <Text>PRICING</Text>
      </View>

      <View>
        <Caption>Price Type</Caption>
        <Text>Bundle / Per Area</Text>
      </View>
      <View>
        <Caption>Bundle Price</Caption>
        <Text>₹ 2000</Text>
      </View>
      <View>
        <Caption>Per Area Price</Caption>
        <Text>₹ 650</Text>
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

function UnitSpecification() {
  return (
    <View style={{marginVertical: 10, padding: 10}}>
      <View style={styles.specification}>
        <View style={styles.specificationContainer}>
          <MaterialCommunityIcons name="bed-king-outline" size={30} />
          <Text> Unfurnished </Text>
        </View>
        <View style={styles.hutIcon}>
          <Hut fill="#041d36" style={styles.hut} />
          <Text>Side Facing</Text>
        </View>
      </View>
      <View style={styles.specificationSubContainer}>
        <CarParking fill="#041d36" style={styles.hut} />
        <Text>2 Four Wheels Allows</Text>
      </View>

      <View style={styles.specificationSubContainer}>
        <TwoWheelerParking fill="#041d36" style={styles.hut} />
        <Text>2 Two Wheels Allows</Text>
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
      <View style={{marginVertical: 15}}>
        <Text>DETAILS</Text>
      </View>
      <View>
        <Caption>SOURCE OF UNIT</Caption>
        <Text>Staff / Sir Referral</Text>
      </View>
      <View>
        <Caption>REFERENCE NAME</Caption>
        <Text>Sawan Patel</Text>
      </View>
      <View>
        <Caption> PRE_LEASE_REMARKS</Caption>
        <PostContent description={description} />
      </View>
    </View>
  );
}

function Details() {
  return (
    <View style={{marginVertical: 10, padding: 10}}>
      <View style={styles.detailContainer}>
        <View>
          <Caption>SUPER BUILDUP AREA</Caption>
          <Text>1000 SQFT</Text>
        </View>
        <View>
          <Caption>BUILDUP AREA</Caption>
          <Text>1160 SQFT</Text>
        </View>
      </View>
      <View style={styles.detailContainer}>
        <View>
          <Caption>CARPET</Caption>
          <Text>110 SQFT</Text>
        </View>
        <View>
          <Caption>WASH AREA</Caption>
          <Text>200 SQFT</Text>
        </View>
      </View>
      <View style={styles.detailContainer}>
        <View>
          <Caption>BALCONY AREA</Caption>
          <Text>100 SQFT</Text>
        </View>
        <View>
          <Caption>TOTAL AREA</Caption>
          <Text>1160 SQFT</Text>
        </View>
      </View>
      <View style={styles.detailContainer}>
        <View>
          <Caption>NORTH</Caption>
          <Text>100 SQFT</Text>
        </View>
        <View>
          <Caption>SOUTH</Caption>
          <Text>1160 SQFT</Text>
        </View>
      </View>
      <View style={styles.detailContainer}>
        <View>
          <Caption>EAST</Caption>
          <Text>100 SQFT</Text>
        </View>
        <View>
          <Caption>WEST</Caption>
          <Text>1160 SQFT</Text>
        </View>
      </View>
      <View style={styles.detailContainer}>
        <View>
          <Caption>OPEN TERRACE AREA</Caption>
          <Text>100 SQFT</Text>
        </View>
        <View>
          <Caption>UNDIVIDED LAND</Caption>
          <Text>220 SQFT</Text>
        </View>
      </View>
    </View>
  );
}

function UnitDetails() {
  return (
    <View style={{padding: 10, paddingTop: 0}}>
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
      <View style={styles.buildingIcon}>
        <PrimeIcon fill="#041d36" style={styles.builderdetailIcon} />
        <Text> Prime Location</Text>
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
            <Subheading>Unit Details</Subheading>
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
          <Carousel
            loop
            width="500"
            height={'500' / 2}
            autoPlay={false}
            data={[...new Array(2).keys()]}
            scrollAnimationDuration={10000}
            onSnapToItem={index => console.log('current index:', index)}
            renderItem={({index}) => {
              return <Image source={unit_image} />;
            }}
          />
          <View style={styles.sliderWrap}>
            <Title style={styles.sliderText}>3BHK</Title>
            <Subheading style={styles.sliderText}>
              Residential Apartment for Rent
            </Subheading>
          </View>
        </View>
        <View style={styles.mainContainer}>
          <UnitDetails />
          <Divider style={{borderWidth: 0.5}} />
          <Details />
          <Divider style={{borderWidth: 0.5}} />
          <UnitSpecification />
          <Pricing />
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
  buildingIcon: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFF89A',
    marginRight: '50%',
    marginVertical: 10,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  specificationContainer: {
    backgroundColor: '#A6DCEF',
    padding: 8,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hutIcon: {
    backgroundColor: '#A6DCEF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hut: {
    marginRight: 5,
  },
  specification: {
    marginVertical: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 40,
  },
  specificationSubContainer: {
    backgroundColor: '#A6DCEF',
    padding: 8,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 40,
  },
  configurationIcon: {
    color: '#4872F4',
    marginLeft: 5,
  },
  configurationContainer: {
    flexDirection: 'row',
    marginRight: 20,
  },
  configurationSubContainer: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#4872f41a',
    marginRight: 10,
    marginTop: 10,
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
    bottom: 28,
  },
  sliderText: {
    color: '#fff',
    fontWeight: '800',
  },
  fileWrapper: {
    marginLeft: 10,
  },
});

export default UnitPreview;

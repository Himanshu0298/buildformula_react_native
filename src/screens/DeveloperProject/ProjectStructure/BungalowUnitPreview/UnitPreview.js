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
import {getPermissions, getShadow} from 'utils';
import PostContent from 'components/Atoms/RenderSeeMore';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import CustomCarousel from 'components/Atoms/CustomCarousel';

import {useSelector} from 'react-redux';
import {
  FILES_DATA,
  OWNER_DATA,
  SECURITY_DATA,
} from 'screens/DeveloperProject/ProjectStructure/ProjectDetail/ProjectPreview/Data';

const data = [
  {
    image: require('assets/images/bungalow_img.png'),
  },
  {
    image: require('assets/images/bungalow_img.png'),
  },
  {
    image: require('assets/images/bungalow_img.png'),
  },
];

const description =
  ' Lorem ipsum dolor sit amet consectetur. Tortor adipiscing leo sempermagna ipsum. Suspendisse odio adipiscing ultrices euismod. Eleifend ut';

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

function OwnerDetails(props) {
  return (
    <View style={{marginBottom: 20, padding: 10}}>
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
    const fileUrl = getDownloadUrl({file, common: true});
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
    <View style={{marginBottom: 20, padding: 10}}>
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
    <View style={{marginBottom: 20, padding: 10}}>
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
      <View style={{marginTop: 30}}>
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
        <Caption> PRE LEASE REMARKS</Caption>
        <PostContent description={description} />
      </View>
    </View>
  );
}

function Details() {
  return (
    <View style={{marginBottom: 20, padding: 10}}>
      <View style={styles.detailContainer}>
        <View>
          <Caption>Net Land Area</Caption>
          <Text>1000 SQFT</Text>
        </View>
        <View>
          <Caption>Undivided Land Area</Caption>
          <Text>1160 SQFT</Text>
        </View>
      </View>
      <View style={styles.detailContainer}>
        <View>
          <Caption>Super Buildup Area</Caption>
          <Text>110 SQFT</Text>
        </View>
        <View>
          <Caption>Carpet Area</Caption>
          <Text>200 SQFT</Text>
        </View>
      </View>
      <View style={styles.detailSingle}>
        <Caption>Construction super Build-up Area</Caption>
        <Text>100 SQFT</Text>
      </View>
      <View style={styles.detailSingle}>
        <Caption>Construction Build-up Area</Caption>
        <Text>1160 SQFT</Text>
      </View>
    </View>
  );
}

function UnitDetails(props) {
  const {premium_location, selected_project, project_name} = props;

  const {area, city, state, country, pincode} = selected_project;

  return (
    <View style={{padding: 10, paddingTop: 0}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Subheading>by</Subheading>
        <View style={{marginLeft: 5}}>
          <Subheading style={{color: theme.colors.primary}}>
            {project_name}
          </Subheading>
        </View>
      </View>
      <View>
        <Subheading>
          {`${area} ${city}, ${state}, ${country} -${pincode}`}
        </Subheading>
      </View>
      {premium_location ? (
        <View style={styles.buildingIcon}>
          <PrimeIcon fill="#041d36" style={styles.builderdetailIcon} />
          <Text> Prime Location</Text>
        </View>
      ) : undefined}
    </View>
  );
}

function UnitPreview(props) {
  const {navigation, route} = props;
  const {unitData} = route.params;

  const {
    id,
    no_of_bhk_name,
    premium_location,
    project_id,
    unit_type_name,
    unit_for,
    unit_category,
    project_name,
  } = unitData;

  const {projectList = []} = useSelector(s => {
    return s.projectStructure;
  });

  const selected_project = projectList?.find(i => i.project_id === project_id);

  const modulePermission = getPermissions('Unit List');

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
            {/* <OpacityButton
              opacity={0.1}
              color="#4872f4"
              style={styles.navBTN}
              onPress={() => navigation.navigate('')}>
              <MaterialIcons name="content-copy" color="#4872f4" size={15} />
            </OpacityButton> */}
            {modulePermission?.editor || modulePermission?.admin ? (
              <OpacityButton
                opacity={0.1}
                color="#4872f4"
                style={styles.navBTN}
                onPress={() =>
                  navigation.navigate('BungalowDetails', {unitId: id})
                }>
                <MaterialIcons name="edit" color="#4872f4" size={15} />
              </OpacityButton>
            ) : null}
          </View>
        </View>
        <View>
          <CustomCarousel data={data} pagination />
          <View style={styles.sliderWrap}>
            <Title style={styles.sliderText}>{no_of_bhk_name}</Title>
            <Subheading style={styles.sliderText}>
              {`${unit_type_name} ${unit_category} for ${unit_for}`}
            </Subheading>
          </View>
        </View>
        <View style={styles.mainContainer}>
          <UnitDetails
            premium_location={premium_location}
            selected_project={selected_project}
            project_name={project_name}
          />
          <Divider style={{borderWidth: 0.5}} />
          {/* <Details />
          <Divider style={{borderWidth: 0.5}} />
          <UnitSpecification />
          <Pricing />
          <OwnerDetails />
          <SecurityDetails />
          <Files /> */}
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
    marginTop: 0,
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
    bottom: 48,
  },
  sliderText: {
    color: '#fff',
    fontWeight: '800',
  },
  detailSingle: {
    marginVertical: 7,
  },
  fileWrapper: {
    marginLeft: 10,
  },
});

export default UnitPreview;

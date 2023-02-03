/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import {
  Image,
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Linking,
} from 'react-native';
import stock_image from 'assets/images/stock_image.png';
import PdfIcon from 'assets/images/pdf_icon.png';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Share from 'react-native-share';

import {
  Caption,
  Divider,
  Menu,
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
import useProjectStructureActions from 'redux/actions/projectStructureActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import dayjs from 'dayjs';
import {SvgXml} from 'react-native-svg';
import {useAlert} from 'components/Atoms/Alert';
import RenderHTML from 'react-native-render-html';
import Layout from 'utils/Layout';
import {useSnackbar} from 'components/Atoms/Snackbar';

function Files(props) {
  const {item, handleDelete, handleShare} = props;

  const download = useDownload();

  const [visible, setVisible] = React.useState(false);

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

  const toggleMenu = () => setVisible(v => !v);

  const onDelete = () => {
    handleDelete(item.id);
    toggleMenu();
  };

  const onShare = () => {
    handleShare(item);
    toggleMenu();
  };

  return (
    <View>
      <View style={styles.recentFiles}>
        <TouchableOpacity
          style={styles.sectionContainer}
          onPress={() => onPressFile(item)}>
          <Image source={PdfIcon} style={styles.fileIcon} />
          <View style={{width: '80%'}}>
            <Text
              style={(styles.verticalFlex, styles.textContainer)}
              numberOfLines={2}>
              {item?.file_name}
            </Text>
            <View style={styles.type}>
              <Text style={styles.date}>{item.title}</Text>
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.date}>
                {dayjs(item?.created_at).format('DD MMM YYYY')}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <Menu
          visible={visible}
          onDismiss={() => toggleMenu()}
          anchor={
            <TouchableOpacity style={styles.editIcon} onPress={toggleMenu}>
              <Entypo name="dots-three-vertical" size={15} />
            </TouchableOpacity>
          }>
          <Menu.Item onPress={onDelete} title="Delete" />
          <Menu.Item onPress={onShare} title="Share" />
        </Menu>
      </View>
    </View>
  );
}

function ProjectSecurityDetails(props) {
  const {projectDetails, openDialScreen} = props;
  const {security_info} = projectDetails || {};

  return (
    <View>
      <Subheading>Project Security/ Caretaker info</Subheading>
      {security_info?.map(item => {
        const {contact_person_name, contact_person_number} = item || {};
        return (
          <View style={styles.container}>
            <View style={styles.subContainer}>
              <Text>{contact_person_name?.toUpperCase()}</Text>
            </View>
            <View style={styles.phoneContainer}>
              <MaterialIcons name="phone" color="#4872f4" size={18} />
              <TouchableOpacity
                style={styles.rowData}
                onPress={() => openDialScreen(contact_person_number)}>
                <Text style={styles.number}>{contact_person_number}</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
}

function ProjectOwnerDetails(props) {
  const {projectDetails, openDialScreen, OpenEmail} = props;

  const {owner_info} = projectDetails || {};

  return (
    <>
      <Subheading>Project Owner Info</Subheading>
      {owner_info?.map(item => {
        const {phone_number, email} = item || {};
        return (
          <View style={styles.container}>
            <View style={styles.subContainer}>
              <Text>{item?.name?.toUpperCase()}</Text>
            </View>
            <View>
              <Text>({item?.title?.toUpperCase()})</Text>
            </View>
            <View style={styles.phoneContainer}>
              <MaterialIcons name="phone" color="#4872f4" size={18} />
              <TouchableOpacity
                style={styles.rowData}
                disabled={!phone_number}
                onPress={() => openDialScreen(phone_number)}>
                <Text style={styles.number}> {phone_number}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.phoneContainer}
              onPress={() => OpenEmail(email)}>
              <MaterialIcons name="email" color="#4872f4" size={18} />
              <Text style={styles.number}> {email} </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </>
  );
}

function Animates(props) {
  const {projectDetails} = props;
  const {building_amenities} = projectDetails || {};

  const xml = `<svg width="71" height="48" viewBox="0 0 71 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M63.2281 46.9834H31.4623C30.7622 46.9834 30.1953 46.4168 30.1953 45.717V1.26644C30.1953 0.566652 30.7622 0 31.4623 0H63.2265C63.9266 0 64.4935 0.566652 64.4935 1.26644V45.717C64.4935 46.4168 63.9266 46.9834 63.2265 46.9834H63.2281ZM32.7309 44.4489H61.9595V2.53289H32.7309V44.4506V44.4489Z" fill="#22252C"/>
  <path d="M69.5042 46.943H25.0326C24.3325 46.943 23.7656 46.3764 23.7656 45.6766C23.7656 44.9768 24.3325 44.4102 25.0326 44.4102H69.5042C70.2042 44.4102 70.7711 44.9768 70.7711 45.6766C70.7711 46.3764 70.2042 46.943 69.5042 46.943Z" fill="#22252C"/>
  <path d="M45.7369 46.943H1.26699C0.566899 46.943 0 46.3764 0 45.6766C0 44.9768 0.566899 44.4102 1.26699 44.4102H45.7369C46.437 44.4102 47.0039 44.9768 47.0039 45.6766C47.0039 46.3764 46.437 46.943 45.7369 46.943Z" fill="#22252C"/>
  <path d="M56.7865 46.9928H37.7279C37.0278 46.9928 36.4609 46.4261 36.4609 45.7263V34.6141C36.4609 33.9143 37.0278 33.3477 37.7279 33.3477H56.7865C57.4866 33.3477 58.0535 33.9143 58.0535 34.6141V45.7263C58.0535 46.4261 57.4866 46.9928 56.7865 46.9928ZM38.9949 44.4583H55.5178V35.8789H38.9949V44.4583Z" fill="#22252C"/>
  <path d="M56.7761 29.5158H50.4232C49.7231 29.5158 49.1562 28.9491 49.1562 28.2493V21.8993C49.1562 21.1995 49.7231 20.6328 50.4232 20.6328H56.7761C57.4762 20.6328 58.0431 21.1995 58.0431 21.8993V28.2493C58.0431 28.9491 57.4762 29.5158 56.7761 29.5158ZM51.6902 26.9813H55.5075V23.1657H51.6902V26.9813Z" fill="#4165AF"/>
  <path d="M44.0808 29.5158H37.7279C37.0278 29.5158 36.4609 28.9491 36.4609 28.2493V21.8993C36.4609 21.1995 37.0278 20.6328 37.7279 20.6328H44.0808C44.7809 20.6328 45.3478 21.1995 45.3478 21.8993V28.2493C45.3478 28.9491 44.7809 29.5158 44.0808 29.5158ZM38.9949 26.9813H42.8122V23.1657H38.9949V26.9813Z" fill="#4165AF"/>
  <path d="M56.7761 16.7931H50.4232C49.7231 16.7931 49.1562 16.2265 49.1562 15.5267V9.1766C49.1562 8.47681 49.7231 7.91016 50.4232 7.91016H56.7761C57.4762 7.91016 58.0431 8.47681 58.0431 9.1766V15.5267C58.0431 16.2265 57.4762 16.7931 56.7761 16.7931ZM51.6902 14.2586H55.5075V10.443H51.6902V14.2586Z" fill="#4165AF"/>
  <path d="M44.0808 16.7931H37.7279C37.0278 16.7931 36.4609 16.2265 36.4609 15.5267V9.1766C36.4609 8.47681 37.0278 7.91016 37.7279 7.91016H44.0808C44.7809 7.91016 45.3478 8.47681 45.3478 9.1766V15.5267C45.3478 16.2265 44.7809 16.7931 44.0808 16.7931ZM38.9949 14.2586H42.8122V10.443H38.9949V14.2586Z" fill="#4165AF"/>
  <path d="M47.3373 47.0021C46.6372 47.0021 46.0703 46.4354 46.0703 45.7356V40.9735C46.0703 40.2737 46.6372 39.707 47.3373 39.707C48.0374 39.707 48.6043 40.2737 48.6043 40.9735V45.7356C48.6043 46.4354 48.0374 47.0021 47.3373 47.0021Z" fill="#22252C"/>
  <path d="M13.0088 38.1551C7.75079 36.3285 4.07812 30.2821 4.07812 23.4514C4.07812 15.0344 9.56681 8.1875 16.3127 8.1875C23.0587 8.1875 28.549 15.0344 28.549 23.4514C28.549 30.2058 25.081 36.0704 19.9204 38.0447L19.014 35.6775C23.135 34.1009 26.0134 29.0741 26.0134 23.4514C26.0134 16.4324 21.6617 10.722 16.3127 10.722C10.9638 10.722 6.61211 16.4324 6.61211 23.4514C6.61211 29.2202 9.58468 34.2828 13.8405 35.7619L13.0088 38.1551Z" fill="#3E65AF"/>
  <path d="M10.4556 46.4888C10.0966 46.4888 9.73928 46.3378 9.48913 46.0423C9.03593 45.5097 9.10091 44.7092 9.63369 44.2562C10.9868 43.1067 11.8444 41.5009 12.0491 39.7376L13.04 31.1534C13.1196 30.4585 13.7498 29.96 14.445 30.0396C15.1402 30.1192 15.6389 30.7491 15.5593 31.444L14.5685 40.0283C14.2907 42.4329 13.1212 44.6199 11.2775 46.1884C11.0388 46.3913 10.748 46.4904 10.4572 46.4904L10.4556 46.4888Z" fill="#22252C"/>
  <path d="M22.0401 46.4907C21.7494 46.4907 21.4586 46.3916 21.2198 46.1887C19.3746 44.6219 18.2067 42.4332 17.9289 40.0286L16.938 31.4443C16.8584 30.7494 17.3571 30.1211 18.0523 30.0399C18.7492 29.9587 19.3762 30.4588 19.4574 31.1537L20.4483 39.7379C20.6513 41.5028 21.509 43.107 22.8637 44.2565C23.3965 44.7095 23.4614 45.51 23.0082 46.0425C22.7581 46.338 22.4007 46.489 22.0417 46.489L22.0401 46.4907Z" fill="#22252C"/>
  <path d="M16.3144 32.5141C16.2933 32.5141 16.2738 32.5141 16.2543 32.5141C14.3424 32.4995 12.5199 31.7721 11.1213 30.4683C10.6097 29.991 10.582 29.1889 11.0596 28.6775C11.5372 28.166 12.3396 28.1384 12.8513 28.6158C14.794 30.4294 17.7471 30.4521 19.719 28.6693L19.7938 28.6011C20.3135 28.1319 21.1144 28.1709 21.5838 28.6904C22.0532 29.21 22.0142 30.0105 21.4944 30.4797L21.4197 30.5479C20.0163 31.816 18.2051 32.5125 16.316 32.5125L16.3144 32.5141Z" fill="#22252C"/>
  </svg>`;

  const parsedXML = xml.replace(/= /g, '=');

  return (
    <View>
      <Subheading>Building Amenities</Subheading>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.animatesContainer}>
          {building_amenities
            ?.filter(i => i.status)
            .map(item => {
              return (
                <View style={styles.amenitiesContainer}>
                  <View style={styles.svgContainer}>
                    {item?.svg ? (
                      <SvgXml width="100%" height="100%" xml={xml} />
                    ) : null}
                  </View>
                  <View style={styles.rawData}>
                    <Text numberOfLines={1}>{item.title}</Text>
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
  const {navigation, projectDetails} = props;
  const {description, configurtion} = projectDetails || {};

  return (
    <View>
      <Subheading>Configuration </Subheading>
      <View style={styles.configurationContainer}>
        {configurtion?.length ? (
          <View style={styles.configurationSubContainer}>
            <MaterialIcons
              name="check-circle-outline"
              size={18}
              color="#4872F4"
            />
            <Text style={styles.configurationIcon}>{configurtion}</Text>
          </View>
        ) : null}
      </View>
      {description?.length ? (
        <View style={styles.descriptionContainer}>
          <Subheading> Description</Subheading>
          <TouchableOpacity
            onPress={() => navigation.navigate('Description', {description})}>
            <RenderHTML
              style={styles.html}
              source={{
                html: description,
              }}
              contentWidth={Layout.window.width - 20}
            />
            <Text style={{color: theme.colors.primary}}>more</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

function Details(props) {
  const {projectDetails} = props;
  const {
    project_category_title,
    total_no_of_units,
    total_no_of_towers,
    bhk_configuration,
    total_no_of_bunglows,
    total_no_of_plots,
  } = projectDetails;

  return (
    <>
      <View style={styles.detailContainer}>
        <View>
          <Caption>Project Category </Caption>
          <Text style={styles.rawData}>{project_category_title}</Text>
        </View>
        <View>
          <Caption>No of Towers Units</Caption>
          <Text style={styles.rawData}>{total_no_of_units}</Text>
        </View>
      </View>
      <View style={styles.detailContainer}>
        <View>
          <Caption>No of Tower</Caption>
          <Text style={styles.rawData}>{total_no_of_towers}</Text>
        </View>
        <View>
          <Caption>Configurations</Caption>
          <Text style={styles.rawData}>{bhk_configuration}</Text>
        </View>
      </View>
      <View style={styles.detailContainer}>
        <View>
          <Caption>No Of bungalows</Caption>
          <Text style={styles.rawData}>{total_no_of_bunglows}</Text>
        </View>
        <View>
          <Caption>No of Plots</Caption>
          <Text style={styles.rawData}> {total_no_of_plots}</Text>
        </View>
      </View>
    </>
  );
}

function StatusField(props) {
  const {projectDetails} = props;
  const {
    project_type_title,
    project_quality_title,
    possesion_year,
    premium_project,
    rera_no,
  } = projectDetails;

  return (
    <View>
      <View>
        {rera_no ? (
          <View style={styles.checkIcon}>
            <MaterialIcons
              name="check-circle-outline"
              size={18}
              color="#1E9400"
            />
            <Text style={styles.approvedStatus}>Rera Approved</Text>
          </View>
        ) : null}

        <View style={styles.statusSubContainer}>
          <View style={styles.thumbIcon}>
            <MaterialIcons name="thumb-up-off-alt" size={18} />
            <Text style={styles.textValue}>{project_quality_title}</Text>
          </View>

          {premium_project ? (
            <View style={styles.buildingIcon}>
              <MaterialCommunityIcons
                name="office-building-outline"
                size={18}
              />
              <Text style={styles.textValue}>Prime Building</Text>
            </View>
          ) : null}
        </View>
      </View>

      <View style={styles.statusContainer}>
        <Subheading>Status</Subheading>
        <Text>{project_type_title}</Text>
        <Caption> Possession by: {possesion_year}</Caption>
      </View>
    </View>
  );
}

function ProjectPreview(props) {
  const {navigation, route} = props;
  const {id: listId} = route?.params || {};

  const alert = useAlert();
  const download = useDownload();
  const snackbar = useSnackbar();

  const [sharing, setSharing] = useState(false);

  const {getProjectDetails, deleteProjectFile} = useProjectStructureActions();
  const {projectDetails, loading} = useSelector(s => s.projectStructure);
  const {selectedProject} = useSelector(s => s.project);
  const {area, project_name, city, state, country} = projectDetails;

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = () =>
    getProjectDetails({project_id: selectedProject.id, id: listId});

  const handleShare = async file => {
    try {
      toggleSharing();
      const fileUrl = getDownloadUrl(file);
      const name = getFileName(file);

      return download.link({
        name,
        link: fileUrl,
        showAction: false,
        base64: true,
        onFinish: ({base64}) => {
          const options = {
            title: 'Share',
            message: `Share ${file.file_name} :`,
            url: base64,
          };
          toggleSharing();

          return Share.open(options);
        },
      });
    } catch (error) {
      console.log('-----> error', error);
      return error;
    }
  };

  const handleDelete = async attachment_id => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete this file?',
      confirmText: 'Delete',
      onConfirm: async () => {
        await deleteProjectFile({
          project_id: selectedProject.id,
          id: listId,
          attachment_id,
        });
        getData();
      },
    });
  };

  const openDialScreen = value => {
    const url =
      Platform.OS !== 'android' ? `telprompt:${value}` : `tel:${value}`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          snackbar.showMessage({
            message: 'Phone number is not available',
            variant: 'error',
          });
          return;
        }
        Linking.openURL(url);
      })
      .catch(err =>
        snackbar.showMessage({message: err.message, variant: 'error'}),
      );
  };

  const OpenEmail = () => Linking.openURL('https://mail.google.com/');

  const file = projectDetails?.attachment_file;
  const projectSecurity = projectDetails?.security_info;
  const projectAmenities = projectDetails?.building_amenities;
  const projectOwner = projectDetails?.owner_info;

  const toggleSharing = () => setSharing(v => !v);

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <Spinner visible={loading} textContent="" />

      <Image source={stock_image} />
      <View style={styles.mainContainer}>
        <View>
          <Title>{project_name?.toUpperCase()} </Title>

          <Text>
            {area} , {city}
          </Text>
          <Text>
            {state} , {country}
          </Text>
        </View>
        <View style={styles.statusField}>
          <StatusField projectDetails={projectDetails} />
        </View>

        <View style={styles.statusField}>
          <Details projectDetails={projectDetails} />
        </View>

        <Divider style={styles.divider} />
        <View style={styles.statusField}>
          <Configuration
            navigation={navigation}
            projectDetails={projectDetails}
          />
        </View>

        {projectAmenities?.length ? (
          <View style={styles.statusField}>
            <Animates projectDetails={projectDetails} />
          </View>
        ) : null}
        {projectOwner?.length ? (
          <View style={styles.statusField}>
            <ProjectOwnerDetails
              projectDetails={projectDetails}
              openDialScreen={openDialScreen}
              OpenEmail={OpenEmail}
            />
          </View>
        ) : null}

        {projectSecurity?.length ? (
          <View style={styles.statusField}>
            <ProjectSecurityDetails
              projectDetails={projectDetails}
              openDialScreen={openDialScreen}
            />
          </View>
        ) : null}

        {file?.length ? (
          <View style={styles.statusField}>
            <Subheading> File's/ Attachments </Subheading>
            {file?.map(item => {
              return (
                <Files
                  item={item}
                  handleDelete={handleDelete}
                  handleShare={handleShare}
                />
              );
            })}
          </View>
        ) : null}
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
    marginRight: 15,
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
    width: 100,
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
  type: {
    marginLeft: 10,
  },
  dateContainer: {
    marginLeft: 8,
  },
  animatesContainer: {
    flexDirection: 'row',
  },

  rawData: {
    alignSelf: 'center',
  },
  svgContainer: {
    alignSelf: 'center',
    width: 50,
    height: 50,
  },
  editIcon: {
    borderRadius: 20,
    alignItems: 'center',
  },
  descriptionContainer: {
    marginVertical: 5,
  },
  divider: {
    borderWidth: 0.2,
    color: 'rgba(4, 29, 54, 0.4)',
  },
  textValue: {
    marginLeft: 5,
  },
  html: {
    color: '#000',
  },
  textContainer: {
    flexGrow: 1,
    flex: 1,
    marginLeft: 8,
  },
});

export default ProjectPreview;

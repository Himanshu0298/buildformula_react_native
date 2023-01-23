/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import {Image, View, StyleSheet, ScrollView} from 'react-native';
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
          <View>
            <Text style={(styles.verticalFlex, styles.text)} numberOfLines={2}>
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
  const {projectDetails} = props;
  const {security_info} = projectDetails || {};

  return (
    <View>
      <Subheading>Project Security/ Caretaker info</Subheading>
      {security_info?.map(item => {
        return (
          <View style={styles.container}>
            <View style={styles.subContainer}>
              <Text>{item?.contact_person_name?.toUpperCase()}</Text>
            </View>
            <View style={styles.phoneContainer}>
              <MaterialIcons name="phone" color="#4872f4" size={18} />
              <View style={styles.rowData}>
                <Text style={styles.number}>
                  {' '}
                  {item?.contact_person_number}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}

function ProjectOwnerDetails(props) {
  const {projectDetails} = props;

  const {owner_info} = projectDetails || {};

  return (
    <>
      <Subheading>Project Owner Info</Subheading>
      {owner_info?.map(item => {
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
              <View style={styles.rowData}>
                <Text style={styles.number}> {item?.phone_number}</Text>
              </View>
            </View>
            <View style={styles.phoneContainer}>
              <MaterialIcons name="email" color="#4872f4" size={18} />
              <Text style={styles.number}> {item?.email} </Text>
            </View>
          </View>
        );
      })}
    </>
  );
}

function Animates(props) {
  const {projectDetails} = props;
  const {building_amenities} = projectDetails || {};

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
                      <SvgXml width="100%" height="100%" xml={item?.svg} />
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
        <View style={styles.configurationSubContainer}>
          <MaterialIcons
            name="check-circle-outline"
            size={18}
            color="#4872F4"
          />
          <Text style={styles.configurationIcon}>{configurtion}</Text>
        </View>
      </View>
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
          <Text style={{color: theme.colors.primary}}> more</Text>
        </TouchableOpacity>
      </View>
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

  const [sharing, setSharing] = useState(false);

  const {getProjectDetails, deleteProjectFile, createProjectDuplicate} =
    useProjectStructureActions();
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
        <View style={styles.statusField}>
          <Animates projectDetails={projectDetails} />
        </View>
        <View style={styles.statusField}>
          <ProjectOwnerDetails projectDetails={projectDetails} />
        </View>
        <View style={styles.statusField}>
          <ProjectSecurityDetails projectDetails={projectDetails} />
        </View>
        <View style={styles.statusField}>
          <Subheading> File's/ Attachments </Subheading>
          {projectDetails?.attachment_file?.map(file => {
            return (
              <Files
                item={file}
                handleDelete={handleDelete}
                handleShare={handleShare}
              />
            );
          })}
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
  text: {
    marginLeft: 10,
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
    borderWidth: 0.5,
  },
  textValue: {
    marginLeft: 5,
  },
  html: {
    color: '#000',
  },
});

export default ProjectPreview;

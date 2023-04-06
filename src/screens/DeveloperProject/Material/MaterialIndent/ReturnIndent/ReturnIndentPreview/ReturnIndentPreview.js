import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

import React, {useEffect} from 'react';
import {
  Caption,
  Divider,
  IconButton,
  Subheading,
  Text,
} from 'react-native-paper';
import {theme} from 'styles/theme';
import {getShadow} from 'utils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FileIcon from 'assets/images/file_icon.png';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import moment from 'moment';
import {useAlert} from 'components/Atoms/Alert';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import ImageView from 'react-native-image-viewing';
import {isNumber} from 'lodash';

const INDENT_STATUS = {
  pending: {label: 'Pending', color: 'rgba(72, 114, 244, 1)'},
  approved: {label: 'Approved', color: '#07CA03'},
  rejected: {label: 'Rejected', color: '#FF5D5D'},
};

const ListingCard = props => {
  const {details} = props;

  const {id, status, email, first_name, last_name, created} = details || {};

  const {label, color} = INDENT_STATUS[status] || {};

  const date = moment(created).format('llll');

  return (
    <TouchableOpacity>
      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <Text style={styles.ID}>{id}</Text>
          <Caption style={{color}}>{label}</Caption>
        </View>
        <Divider />
        <View style={styles.cardDetails}>
          <View style={styles.dataRow}>
            <Subheading>Create by:</Subheading>
            <Subheading>
              {first_name}
              {last_name}
            </Subheading>
          </View>
          <View style={styles.cardContent}>
            <Caption>{email}</Caption>
          </View>
          <View style={styles.createdOn}>
            <Text> Created on:</Text>

            <Text>{date}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const RequiredVendor = props => {
  const {details} = props;

  const {contractor_name, contractor_email, remark} = details || {};

  return (
    <View style={styles.vendorContainer}>
      <View>
        <Subheading> Required For Vendor</Subheading>
      </View>
      <View style={styles.vendorSubContainer}>
        <Text>{contractor_name}</Text>
        <Caption>{contractor_email}</Caption>
      </View>
      <View style={styles.card}>
        <Text> Remark</Text>
        <Caption>{remark}</Caption>
      </View>
    </View>
  );
};

const MaterialCard = props => {
  const {item} = props;

  const {materialcategrytitle, subcategorytitle, quantity, damaged_qty} = item;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeaderStyle}>
        <View style={styles.dataRow}>
          <Caption style={styles.lightData}>Category:</Caption>
          <Text>{materialcategrytitle}</Text>
        </View>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Sub Category:</Caption>
        <Text>{subcategorytitle}</Text>
      </View>

      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Fine Qty:</Caption>
        <Text>{quantity}</Text>
      </View>
      <View style={styles.dataRow}>
        <Caption style={styles.lightData}>Damaged Qty:</Caption>
        <Text>{damaged_qty}</Text>
      </View>
    </View>
  );
};

const MaterialAttachments = props => {
  const {returnAttachments} = props;
  const [imageIndex, setImageIndex] = React.useState(false);

  const returnImages = React.useMemo(() => {
    return returnAttachments?.map(i => ({uri: i.file_url}));
  }, [returnAttachments]);

  return (
    <View>
      <ImageView
        images={returnImages}
        imageIndex={imageIndex}
        visible={isNumber(imageIndex)}
        onRequestClose={() => setImageIndex(false)}
      />
      <View style={styles.attachmentContainer}>
        <View style={styles.renderFileContainer}>
          <Text style={styles.attachmentFileHeader}>Material Images</Text>
        </View>
        {returnAttachments?.map((attachment, index) => {
          return (
            <TouchableOpacity
              style={styles.imageIconContainer}
              onPress={() => setImageIndex(index)}>
              <View key={attachment.file_name}>
                <View style={styles.sectionContainer}>
                  <Image source={FileIcon} style={styles.fileIcon} />
                  <View>
                    <Text
                      style={(styles.verticalFlex, styles.text)}
                      numberOfLines={1}>
                      {attachment.file_name}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

function ReturnIndentPreview(props) {
  const {navigation, route} = props;

  const {id} = route?.params || {};

  const alert = useAlert();

  const {getIndentDetails, deleteIssue, getMaterialIndentList} =
    useMaterialManagementActions();

  const {selectedProject} = useSelector(s => s.project);
  const {indentDetails, loading} = useSelector(s => s.materialManagement);

  const details = indentDetails?.material_indent;

  const returnAttachments = indentDetails?.return_indent_files ?? [];

  const materialData = indentDetails?.material_indent_details;

  useEffect(() => {
    getData();
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    await getIndentDetails({
      project_id: selectedProject.id,
      material_indent_id: id,
    });
  };

  const getList = async () => {
    await getMaterialIndentList({
      project_id: selectedProject.id,
    });
  };

  const handleDelete = () => {
    alert.show({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmText: 'Delete',
      onConfirm: () => {
        deleteIssue({
          material_indent_id: id,
          project_id: selectedProject.id,
        });
        getList();
        navigation.goBack();
      },
    });
  };

  return (
    <View style={styles.mainContainer}>
      <Spinner visible={loading} />
      <View style={styles.headerContainer}>
        <View style={styles.container}>
          <IconButton
            icon="keyboard-backspace"
            size={16}
            color={theme.colors.primary}
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          />
          <Subheading style={styles.headerText}>Return Material</Subheading>
        </View>

        {details?.status === 'approved' ? null : (
          <View style={styles.buttonContainer}>
            <View style={styles.statusContainer}>
              <OpacityButton
                color={theme.colors.primary}
                style={styles.opacity}
                opacity={0.18}
                onPress={() => {
                  navigation.navigate('CreateReturnIndent', {
                    id,
                    indentDetails,
                  });
                }}>
                <MaterialIcons
                  name="edit"
                  color={theme.colors.primary}
                  size={13}
                />
              </OpacityButton>
            </View>
            <View>
              <OpacityButton
                color={theme.colors.error}
                opacity={0.18}
                onPress={handleDelete}
                style={styles.button}>
                <MaterialIcons
                  name="delete"
                  color={theme.colors.error}
                  size={13}
                />
              </OpacityButton>
            </View>
          </View>
        )}
      </View>
      <ScrollView
        style={{marginBottom: 30}}
        showsVerticalScrollIndicator={false}>
        <View>
          <ListingCard details={details} />
        </View>
        <View>
          <RequiredVendor details={details} />
        </View>
        <View style={styles.textContainer}>
          <Subheading style={styles.textSubContainer}>
            Material Request
          </Subheading>
        </View>

        <View>
          {materialData?.map(item => {
            return <MaterialCard item={item} navigation={navigation} />;
          })}
        </View>
        {returnAttachments?.length ? (
          <View>
            <MaterialAttachments returnAttachments={returnAttachments} />
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

export default ReturnIndentPreview;

const styles = StyleSheet.create({
  mainContainer: {
    margin: 20,
    flexGrow: 1,
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vendorSubContainer: {
    marginTop: 10,
  },
  card: {
    paddingTop: 15,
  },

  button: {
    borderRadius: 20,
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  headerText: {
    fontSize: 18,
  },
  textSubContainer: {
    color: 'rgba(72, 114, 244, 1)',
  },
  fileIcon: {
    width: 32,
    height: 38,
    paddingLeft: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 50,
  },
  cardContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    ...getShadow(2),
  },

  attachmentContainer: {
    padding: 10,
    backgroundColor: '#F2F4F5',
    borderRadius: 5,
    marginVertical: 7,
  },

  statusContainer: {
    flexDirection: 'row',
    marginEnd: 10,
    alignSelf: 'center',
  },

  cardDetails: {
    padding: 5,
  },
  textContainer: {
    margin: 10,
  },
  attachmentFileHeader: {
    color: '#000',
    fontSize: 15,
  },
  sectionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    display: 'flex',
    borderRadius: 5,
    marginVertical: 7,
    marginHorizontal: 7,
    flexGrow: 1,
    position: 'relative',
  },

  renderFileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verticalFlex: {
    flexDirection: 'column',
  },
  cardHeader: {
    padding: 10,
    paddingHorizontal: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  createdOn: {
    padding: 10,
    paddingHorizontal: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },

  ID: {
    backgroundColor: '#E5EAFA',
    padding: 7,
    borderRadius: 5,
    fontSize: 10,
    color: 'rgba(72, 114, 244, 1)',
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
  },

  vendorContainer: {
    ...getShadow(2),
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
  },
  lightData: {
    fontSize: 13,
  },
  opacity: {
    borderRadius: 20,
    marginLeft: 10,
    justifyContent: 'flex-end',
  },
  text: {
    color: '#080707',
    paddingHorizontal: 10,
    fontSize: 14,
    alignItems: 'center',
    maxWidth: 170,
    flex: 1,
  },
  deleteIcon: {
    borderRadius: 20,
  },
  cardHeaderStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageIcon: {
    height: 50,
    width: 50,
  },
  imageIconContainer: {
    marginTop: 10,
  },
});

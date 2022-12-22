import * as React from 'react';
import {
  Caption,
  Divider,
  Subheading,
  Text,
  withTheme,
} from 'react-native-paper';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from 'styles/theme';
import {getShadow} from 'utils';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector} from 'react-redux';
import FileIcon from 'assets/images/file_icon.png';
import NoResult from 'components/Atoms/NoResult';
import {useDownload} from 'components/Atoms/Download';
import FileViewer from 'react-native-file-viewer';

const RenderImage = ({item, index, type}) => {
  const label =
    type === 'normal'
      ? `Material image ${index + 1}`
      : `Damaged image ${index + 1}`;

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

  return (
    <TouchableOpacity
      style={styles.sectionContainer}
      onPress={() => onPressFile(item?.image_url)}
      key={item.id}>
      <Image source={FileIcon} style={styles.fileIcon} />
      <View>
        <Text style={[styles.verticalFlex, styles.text]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const RenderMaterialAttachments = props => {
  const {materialImages} = props;

  const normalImages = materialImages?.filter(i => i.image_type === 'normal');
  const damagedImages = materialImages?.filter(i => i.image_type === 'damage');

  return (
    <View style={styles.imageContainer}>
      <Text style={styles.attachmentsText}>Attachments</Text>
      {materialImages?.length ? (
        <>
          {normalImages?.map((item, index) => (
            <RenderImage item={item} index={index} type="normal" />
          ))}
          {damagedImages?.map((item, index) => (
            <RenderImage item={item} index={index} type="damage" />
          ))}
        </>
      ) : (
        <NoResult />
      )}
    </View>
  );
};

const RenderRow = props => {
  const {item} = props;
  return (
    <View style={styles.renderContainer}>
      <Caption style={styles.label}>{item.label}</Caption>
      <Text>{item.value}</Text>
    </View>
  );
};

const MaterialData = props => {
  const {item} = props;
  return (
    <View style={styles.quantityContainer}>
      <View style={styles.itemContainer}>
        <RenderRow item={{label: 'LOM: ', value: item.lomtitle}} />
        <RenderRow
          item={{label: 'Delivered Qantity: ', value: item.quantity}}
        />
        <RenderRow item={{label: 'Damage Qantity: ', value: item.damage}} />
        <RenderRow item={{label: 'Missing Qantity: ', value: item.missing}} />
      </View>
    </View>
  );
};

const MaterialInfo = props => {
  const {materialInfo = {}} = props;
  const {materials = [], material_images} = materialInfo;
  const {loading} = useSelector(s => s.materialManagement);
  return (
    <View style={styles.container}>
      <Subheading>Material Info</Subheading>
      <Spinner visible={loading} textContent="" />

      {materials?.map(item => {
        return (
          <View style={styles.detailsContainer}>
            <View style={styles.subHeading}>
              <Text style={{color: theme.colors.primary}}>
                {item.category_title}
              </Text>
              <MaterialCommunityIcons
                name="label"
                size={20}
                style={[styles.labelIcon, {color: theme.colors.primary}]}
              />
              <Text
                style={{
                  color: theme.colors.primary,
                }}>
                {/* {item.sub_category_title && item.work_units_title */}
                {item.sub_category_title
                  ? ` ${item.sub_category_title} ${item.work_units_title}`
                  : ' NA'}
              </Text>
            </View>
            <Divider style={styles.divider} />
            <MaterialData item={item} />
          </View>
        );
      })}
      <RenderMaterialAttachments materialImages={material_images} />
    </View>
  );
};

const styles = StyleSheet.create({
  renderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    margin: 10,
  },
  label: {
    fontSize: 14,
  },
  detailsContainer: {
    marginTop: 10,
    backgroundColor: '#fff',
    ...getShadow(2),
    borderRadius: 5,
  },
  subHeading: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 2,
  },
  quantityContainer: {
    padding: 10,
  },
  itemContainer: {
    flexGrow: 1,
  },
  fileIcon: {
    width: 32,
    height: 38,
    paddingLeft: 10,
    marginLeft: 10,
  },
  imageContainer: {
    padding: 10,
    backgroundColor: '#F2F4F5',
    borderRadius: 5,
  },
  attachmentsText: {
    fontSize: 15,
    paddingBottom: 10,
  },
  sectionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    display: 'flex',
    borderRadius: 5,
    marginVertical: 5,
  },
  text: {
    marginLeft: 5,
  },
});

export default withTheme(MaterialInfo);

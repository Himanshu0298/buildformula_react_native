/* eslint-disable react-hooks/rules-of-hooks */
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
import FileViewer from 'react-native-file-viewer';

import {useDownload} from 'components/Atoms/Download';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';

const MaterialInfoHeader = props => {
  const {item} = props;

  const {materialCategories, materialSubCategories, makeOfLists} = useSelector(
    s => s.materialManagement,
  );

  const {commonData} = useSelector(s => s.project);
  const {units} = commonData;

  const categoryTitle = React.useMemo(() => {
    return (
      materialCategories?.find(i => i.id === item.material_category_id)
        ?.title || 'NA'
    );
  }, [item.material_category_id, materialCategories]);

  const subCategoryTitle = React.useMemo(() => {
    return (
      materialSubCategories?.find(i => i.id === item.material_sub_category_id)
        ?.title || 'NA'
    );
  }, [item.material_sub_category_id, materialSubCategories]);

  const unitTitle = React.useMemo(() => {
    return units?.find(i => i.id === item.material_units_id)?.title || 'NA';
  }, [item.material_units_id, units]);

  const makeOfListTitle = React.useMemo(() => {
    return (
      makeOfLists?.find(i => i.id === item?.master_list_of_makes_id)?.status ||
      'NA'
    );
  }, [item?.master_list_of_makes_id, makeOfLists]);

  return (
    <>
      <View style={styles.subHeading}>
        <Text style={{color: theme.colors.primary}}>{categoryTitle}</Text>
        <MaterialCommunityIcons
          name="label"
          size={15}
          style={[styles.labelIcon, {color: theme.colors.primary}]}
        />
        <Text
          style={{
            color: theme.colors.primary,
          }}>
          {subCategoryTitle} , {unitTitle}
        </Text>
      </View>
      <View style={styles.lomContainer}>
        <Text style={styles.renderText}>{makeOfListTitle}</Text>
      </View>
    </>
  );
};

const renderImage = (item, index, type) => {
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
      key={item?.id}>
      <Image source={FileIcon} style={styles.fileIcon} />
      <View>
        <Text style={[styles.verticalFlex, styles.text]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const RenderMaterialAttachments = props => {
  const {materialImages, damage} = props;

  const normalImages = materialImages?.filter(i => i.image_type === 'normal');
  const damagedImages = materialImages?.filter(i => i.image_type === 'damage');

  return (
    <View style={styles.imageContainer}>
      <Text style={styles.attachmentsText}>
        {damage ? 'Damage' : 'Material'} Images
      </Text>
      {materialImages?.length ? (
        <>
          {normalImages?.map((item, index) =>
            renderImage(item, index, 'normal'),
          )}
          {damagedImages?.map((item, index) =>
            renderImage(item, index, 'damage'),
          )}
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
        <RenderRow item={{label: 'Received Qty: ', value: item.quantity}} />
        <RenderRow item={{label: 'Damage Qty: ', value: item.damage}} />
        <RenderRow item={{label: 'Missing Qty: ', value: item.missing}} />
        <RenderRow
          item={{label: 'List of Makes: ', value: item.master_list_of_makes_id}}
        />
        <RenderRow
          item={{label: 'Rate: ', value: item.delivery_challan_rate}}
        />
        <RenderRow
          item={{label: 'Total: ', value: item.challan_total_amount}}
        />
      </View>
    </View>
  );
};

const DirectMaterialInfo = props => {
  const {materialInfo = {}} = props;
  const {
    material_request_items = [],
    challan_material_image = [],
    challan_material_damage_image = [],
  } = materialInfo;

  const {getPRMaterialCategories} = useMaterialManagementActions();

  const {selectedProject} = useSelector(s => s.project);
  const projectId = selectedProject.id;

  React.useEffect(() => {
    getPRMaterialCategories({project_id: projectId});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {loading} = useSelector(s => s.materialManagement);

  return (
    <View style={styles.container}>
      <Subheading>Material Info</Subheading>
      <Spinner visible={loading} textContent="" />

      {material_request_items?.map(item => {
        return (
          <View style={styles.detailsContainer}>
            <MaterialInfoHeader item={item} />
            <Divider style={styles.divider} />

            <MaterialData item={item} />
          </View>
        );
      })}
      {challan_material_image?.length ? (
        <RenderMaterialAttachments materialImages={challan_material_image} />
      ) : null}
      {challan_material_damage_image?.length ? (
        <RenderMaterialAttachments
          materialImages={challan_material_damage_image}
          damage
        />
      ) : null}
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
    marginTop: 10,
  },
  text: {
    marginLeft: 5,
  },
  lomContainer: {
    backgroundColor: '#4872F4',
    padding: 5,
    borderRadius: 5,
    margin: 5,
    alignSelf: 'flex-start',
  },
  renderText: {
    color: 'white',
    fontSize: 12,
  },
  labelIcon: {
    marginHorizontal: 5,
  },
});

export default withTheme(DirectMaterialInfo);

import React from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {withTheme, Button} from 'react-native-paper';
import FormTitle from 'components/Atoms/FormTitle';
import {useTranslation} from 'react-i18next';
import {theme} from 'styles/theme';
import BaseText from 'components/Atoms/BaseText';
import apartment from 'assets/images/apartment.png';
import apartmentInactive from 'assets/images/apartment_inactive.png';
import shop from 'assets/images/shop.png';
import shopInactive from 'assets/images/shop_inactive.png';
import office from 'assets/images/office.png';
import officeInactive from 'assets/images/office_inactive.png';
import bungalow from 'assets/images/bungalow.png';
import bungalowInactive from 'assets/images/bungalow_inactive.png';
import plot from 'assets/images/plot.png';
import plotInactive from 'assets/images/plot_inactive.png';
import Layout from 'utils/Layout';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {DEFAULT_STRUCTURE} from 'utils/constant';
import _ from 'lodash';
import useAddProjectActions from 'redux/actions/addProjectActions';

const getStructureItems = () => {
  return [
    {
      title: 'Shops',
      activeSrc: shop,
      inactiveSrc: shopInactive,
      value: 2,
      imageStyle: styles.shop,
    },
    {
      title: 'Offices',
      activeSrc: office,
      inactiveSrc: officeInactive,
      value: 3,
      imageStyle: styles.office,
    },
    {
      title: 'Apartments',
      activeSrc: apartment,
      inactiveSrc: apartmentInactive,
      value: 1,
      imageStyle: styles.apartment,
    },
    {
      title: 'Bungalows',
      activeSrc: bungalow,
      inactiveSrc: bungalowInactive,
      value: 4,
      imageStyle: styles.shop,
    },
    {
      title: 'Plots',
      activeSrc: plot,
      inactiveSrc: plotInactive,
      value: 5,
      style: styles.plotContainer,
      imageStyle: styles.plot,
    },
  ];
};

function ImageRender({item, active, onPress}) {
  const {title, inactiveSrc, activeSrc, imageStyle, value, style} = item;
  return (
    <TouchableOpacity
      style={[styles.box, style, active ? styles.active : {}]}
      onPress={() => onPress(value)}>
      <BaseText style={styles.title}>{title}</BaseText>
      <Image source={active ? activeSrc : inactiveSrc} style={imageStyle} />
    </TouchableOpacity>
  );
}

function StepOne(props) {
  const {navigation} = props;

  const {t} = useTranslation();
  const snackbar = useSnackbar();

  const {updateStructureTypes, updateStructure} = useAddProjectActions();

  const {structureTypes, structure, project, loading} = useSelector(
    (state) => state.addProject,
  );

  console.log('-----> structureTypes', structureTypes);

  const updateTypes = (type) => {
    const types = _.cloneDeep(structureTypes);
    types[type] = !types[type];
    let selectedStructureType = 1;
    if (types[2]) {
      selectedStructureType = 2;
    } else if (types[3]) {
      selectedStructureType = 3;
    }

    updateStructure({structureTypes: types, selectedStructureType});
  };

  const handleSubmit = () => {
    const selectedTypes = Object.keys(structureTypes).filter(
      (key) => structureTypes[key],
    );
    if (selectedTypes.length === 0) {
      snackbar.showMessage({
        message: 'Please select a type',
        variant: 'error',
      });
    } else {
      const types = Object.keys(structureTypes)
        .filter((key) => structureTypes[key])
        .join();

      const formData = new FormData();
      formData.append('project_id', project.project_id);
      formData.append('project_types', types);

      const updatedStructure = {};
      selectedTypes.map((type) => {
        if (structure[type]) {
          updatedStructure[type] = structure[type];
        } else {
          updatedStructure[type] = DEFAULT_STRUCTURE[type];
        }
      });

      updateStructure({structure: updatedStructure});

      updateStructureTypes(formData).then(() => {
        navigation.navigate('ProjectStructureStepTwo');
      });
    }
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      <FormTitle
        title={t('label_project_structure')}
        subTitle={t('label_select_appropriate_option')}
      />
      <Spinner visible={loading} textContent={''} />
      <View style={styles.container}>
        {getStructureItems().map((item, index) => {
          return (
            <ImageRender
              key={index}
              item={item}
              active={structureTypes[item.value]}
              onPress={updateTypes}
            />
          );
        })}
        <View style={styles.button}>
          <Button
            mode="contained"
            style={{width: '40%'}}
            contentStyle={{padding: 3}}
            theme={{roundness: 15}}
            onPress={handleSubmit}>
            {'Next'}
          </Button>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    display: 'flex',
    paddingHorizontal: Layout.window.width * 0.05,
  },
  box: {
    borderWidth: 0.5,
    paddingTop: 5,
    borderColor: '#ccc',
    height: Layout.window.width * 0.4,
    width: Layout.window.width * 0.35,
    margin: Layout.window.width * 0.05,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  active: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  title: {
    fontSize: 14,
    color: '#000',
  },
  apartment: {
    width: Layout.window.width * 0.2,
    height: Layout.window.width * 0.33,
  },
  shop: {
    width: Layout.window.width * 0.25,
    height: Layout.window.width * 0.25,
  },
  office: {
    width: Layout.window.width * 0.25,
    height: Layout.window.width * 0.28,
  },
  plotContainer: {
    height: Layout.window.width * 0.35,
    justifyContent: 'space-evenly',
  },
  plot: {
    width: Layout.window.width * 0.3,
    height: Layout.window.width * 0.18,
  },
  button: {
    width: '95%',
    display: 'flex',
    alignItems: 'flex-end',
  },
});

export default withTheme(StepOne);

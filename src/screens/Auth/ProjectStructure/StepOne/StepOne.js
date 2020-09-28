import React, {useState} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {withTheme, Button} from 'react-native-paper';
import FormTitle from '../../../../components/FormTitle';
import {useTranslation} from 'react-i18next';
import {theme} from '../../../../styles/theme';
import BaseText from '../../../../components/BaseText';
import apartment from '../../../../assets/images/apartment.png';
import apartmentInactive from '../../../../assets/images/apartment_inactive.png';
import shop from '../../../../assets/images/shop.png';
import shopInactive from '../../../../assets/images/shop_inactive.png';
import office from '../../../../assets/images/office.png';
import officeInactive from '../../../../assets/images/office_inactive.png';
import bungalow from '../../../../assets/images/bungalow.png';
import bungalowInactive from '../../../../assets/images/bungalow_inactive.png';
import plot from '../../../../assets/images/plot.png';
import plotInactive from '../../../../assets/images/plot_inactive.png';
import Layout from '../../../../utils/Layout';
import {useSnackbar} from '../../../../components/Snackbar';
import useStructureActions from '../../../../redux/actions/structureActions';
import {useSelector} from 'react-redux';

function ImageRender({
  title,
  inactiveSrc,
  activeSrc,
  imageStyle,
  active,
  updateTypes,
  value,
  style,
}) {
  return (
    <TouchableOpacity
      style={[styles.box, style, active ? styles.active : {}]}
      onPress={() => updateTypes(value)}>
      <BaseText style={styles.title}>{title}</BaseText>
      <Image source={active ? activeSrc : inactiveSrc} style={imageStyle} />
    </TouchableOpacity>
  );
}

function StepOne(props) {
  const {navigation} = props;

  const {t} = useTranslation();
  const snackbar = useSnackbar();

  const {updateStructure} = useStructureActions();

  const {structureTypes} = useSelector((state) => state.structure);

  const updateTypes = (type) => {
    let types = [...structureTypes];
    let index = types.indexOf(type);
    if (index > -1) {
      types.splice(index, 1);
    } else {
      types.push(type);
    }
    updateStructure({structureTypes: types});
  };

  const handleSubmit = () => {
    if (structureTypes.length === 0) {
      snackbar.showMessage({
        message: 'Please select a type',
        variant: 'error',
      });
    } else {
      navigation.navigate('ProjectStructureStepTwo', {
        structureType: structureTypes[0],
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
        title={t('projectStructure')}
        subTitle={t('projectStructureSubtitle')}
      />
      <View style={styles.container}>
        <ImageRender
          title="Apartments"
          activeSrc={apartment}
          inactiveSrc={apartmentInactive}
          value={1}
          updateTypes={updateTypes}
          active={structureTypes.includes(1)}
          imageStyle={styles.apartment}
        />
        <ImageRender
          title="Shops"
          activeSrc={shop}
          inactiveSrc={shopInactive}
          value={2}
          updateTypes={updateTypes}
          active={structureTypes.includes(2)}
          imageStyle={styles.shop}
        />
        <ImageRender
          title="Offices"
          activeSrc={office}
          inactiveSrc={officeInactive}
          value={3}
          updateTypes={updateTypes}
          active={structureTypes.includes(3)}
          imageStyle={styles.office}
        />
        <ImageRender
          title="Bungalows"
          activeSrc={bungalow}
          inactiveSrc={bungalowInactive}
          value={4}
          updateTypes={updateTypes}
          active={structureTypes.includes(4)}
          imageStyle={styles.shop}
        />
        <ImageRender
          title="Plots"
          activeSrc={plot}
          inactiveSrc={plotInactive}
          value={5}
          style={styles.plotContainer}
          updateTypes={updateTypes}
          active={structureTypes.includes(5)}
          imageStyle={styles.plot}
        />
        <View style={styles.button}>
          <Button
            style={{width: '50%'}}
            mode="contained"
            contentStyle={{padding: 8}}
            theme={{roundness: 15}}
            onPress={handleSubmit}>
            <BaseText style={styles.buttonText}>{'Next'}</BaseText>
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
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default withTheme(StepOne);

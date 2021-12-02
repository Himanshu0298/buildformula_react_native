import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import {withTheme} from 'react-native-paper';
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
// import bungalow from 'assets/images/bungalow.svg';
import bungalowInactive from 'assets/images/bungalow_inactive.png';
import plot from 'assets/images/plot.png';
// import tower from 'assets/images/tower.svg';
import plotInactive from 'assets/images/plot_inactive.png';
import Layout from 'utils/Layout';
import PropTypes from 'prop-types';
import SvgUri from 'react-native-svg-uri';

const getStructureItems = () => {
  return [
    {
      title: 'Towers',
      activeSrc: <SvgUri source={require('assets/images/tower.svg')} />,
      value: 6,
      imageStyle: styles.shop,
    },
    // {
    //   title: 'Offices',
    //   activeSrc: office,
    //   inactiveSrc: officeInactive,
    //   value: 4,
    //   imageStyle: styles.office,
    // },
    // {
    //   title: 'Apartments',
    //   activeSrc: apartment,
    //   inactiveSrc: apartmentInactive,
    //   value: 1,
    //   imageStyle: styles.apartment,
    // },
    {
      title: 'Bungalows',
      activeSrc: <SvgUri source={require('assets/images/bungalow.svg')} />,
      inactiveSrc: bungalowInactive,
      value: 4,
      imageStyle: styles.shop,
    },
    {
      title: 'Plots',
      activeSrc: <SvgUri source={require('assets/images/plot_.svg')} />,
      inactiveSrc: plotInactive,
      value: 5,
      style: styles.plotContainer,
      imageStyle: styles.plot,
    },
  ];
};

function ImageRender(props) {
  const {
    title,
    inactiveSrc,
    activeSrc,
    imageStyle,
    active = true,
    onPress,
    value,
    style,
    towerType,
  } = props;

  return (
    <TouchableOpacity
      style={[styles.box, style, active ? styles.active : {}]}
      onPress={() => onPress(value, towerType, activeSrc)}>
      <BaseText style={styles.title}>{title}</BaseText>
      {activeSrc}
    </TouchableOpacity>
  );
}

function StructureSelector(props) {
  const {title, subtitle, onSelectStructure, projectTypes, activeTypes} = props;

  const {t} = useTranslation();

  return (
    <>
      <FormTitle title={t(title)} subTitle={t(subtitle)} />

      <View style={styles.container}>
        {getStructureItems()
          .filter(structure => projectTypes.includes(structure.value))
          .map(item => (
            <ImageRender
              key={item.value}
              {...item}
              active={activeTypes ? activeTypes.includes(item.value) : true}
              onPress={onSelectStructure}
              towerType={item.title}
            />
          ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
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
  shop: {
    width: Layout.window.width * 0.28,
    height: Layout.window.width * 0.25,
  },
  plotContainer: {
    height: Layout.window.width * 0.35,
    justifyContent: 'space-evenly',
  },
  plot: {
    width: Layout.window.width * 0.22,
    height: Layout.window.width * 0.18,
  },
});

StructureSelector.defaultProps = {
  title: 'label_select_structure',
  subtitle: 'label_select_appropriate_option',
  onSelectStructure: () => {},
};

StructureSelector.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  projectTypes: PropTypes.array.isRequired,
  onSelectStructure: PropTypes.func.isRequired,
};

export default withTheme(StructureSelector);

import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
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
import bungalow from 'assets/images/bungalow.png';
import bungalowInactive from 'assets/images/bungalow_inactive.png';
import plot from 'assets/images/plot.png';
import plotInactive from 'assets/images/plot_inactive.png';
import Layout from 'utils/Layout';
import PropTypes from 'prop-types';

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
  } = props;

  return (
    <TouchableOpacity
      style={[styles.box, style, active ? styles.active : {}]}
      onPress={() => onPress(value)}>
      <BaseText style={styles.title}>{title}</BaseText>
      <Image source={active ? activeSrc : inactiveSrc} style={imageStyle} />
    </TouchableOpacity>
  );
}

function StructureSelector({title, subtitle, onSelectStructure, projectTypes}) {
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
              onPress={onSelectStructure}
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
    width: Layout.window.width * 0.28,
    height: Layout.window.width * 0.28,
  },
  shop: {
    width: Layout.window.width * 0.28,
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

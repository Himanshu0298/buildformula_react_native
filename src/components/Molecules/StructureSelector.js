import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {withTheme} from 'react-native-paper';
import FormTitle from 'components/Atoms/FormTitle';
import {useTranslation} from 'react-i18next';
import {theme} from 'styles/theme';
import BaseText from 'components/Atoms/BaseText';
import Layout from 'utils/Layout';
import PropTypes from 'prop-types';
import TowerIcon from 'assets/images/tower.svg';
import BungalowIcon from 'assets/images/bungalow.svg';
import PlotIcon from 'assets/images/plot.svg';

const getStructureItems = () => {
  return [
    {
      title: 'Towers',
      src: (
        <TowerIcon
          fill={theme.colors.accent}
          fillSecondary={theme.colors.primary}
        />
      ),
      value: 6,
      imageStyle: styles.shop,
    },
    {
      title: 'Bungalows',
      src: (
        <BungalowIcon
          fill={theme.colors.accent}
          fillSecondary={theme.colors.primary}
        />
      ),
      value: 4,
      imageStyle: styles.shop,
    },
    {
      title: 'Plots',
      src: (
        <PlotIcon
          fill={theme.colors.accent}
          fillSecondary={theme.colors.primary}
        />
      ),
      value: 5,
      imageStyle: styles.shop,
    },
  ];
};

function ImageRender(props) {
  const {title, src, active = true, onPress, value, style, towerType} = props;

  return (
    <TouchableOpacity
      style={[styles.box, style, active ? styles.active : {}]}
      onPress={() => onPress(value, towerType)}>
      <BaseText style={styles.title}>{title}</BaseText>
      {src}
    </TouchableOpacity>
  );
}

function StructureSelector(props) {
  const {
    title,
    subtitle,
    hideTitle,
    onSelectStructure,
    projectTypes,
    activeTypes,
  } = props;

  const {t} = useTranslation();

  return (
    <>
      {!hideTitle ? (
        <FormTitle title={t(title)} subTitle={t(subtitle)} />
      ) : null}

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
    height: Layout.window.width * 0.38,
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
    borderWidth: 1,
  },
});

StructureSelector.defaultProps = {
  title: 'label_select_structure',
  subtitle: 'label_select_appropriate_option',
};

StructureSelector.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onSelectStructure: PropTypes.func.isRequired,
};

export default withTheme(StructureSelector);

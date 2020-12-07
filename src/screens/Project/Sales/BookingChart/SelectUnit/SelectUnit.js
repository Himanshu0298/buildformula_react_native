import React, {useMemo} from 'react';
import BhkButton from 'components/Buttons/BhkButton';
import FormTitle from 'components/FormTitle';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {Subheading} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {secondaryTheme} from 'styles/theme';
import {BHK_OPTIONS} from 'utils/constant';
import {addOpacity, getUnitLabel} from 'utils';
import Layout from 'utils/Layout';

const DEFAULT_UNIT_COLOR = '#5B6F7C';

function BhkList({onPress, selectedBhk}) {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.towerList}>
          {BHK_OPTIONS.map((bhk, i) => {
            return (
              <BhkButton
                bhk={bhk}
                key={i}
                selected={bhk.type === selectedBhk}
                onPress={onPress}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

function RenderUnits({onPress, units, selectedFloor}) {
  return (
    <View style={styles.unitsList}>
      {Object.keys(units).map((unitId, i) => {
        const unit = units[unitId];
        const unitBhk = BHK_OPTIONS.find((item) => item.type === unit.bhk);
        return (
          <TouchableOpacity
            key={i}
            onPress={() => onPress(i)}
            style={[
              styles.unitContainer,
              {
                borderRadius: 5,
                backgroundColor:
                  (unitBhk && addOpacity(unitBhk.color, 1)) ||
                  DEFAULT_UNIT_COLOR,
              },
            ]}>
            <Subheading>{getUnitLabel(selectedFloor, i)}</Subheading>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function SelectUnit(props) {
  const {navigation, route} = props;
  const {t} = useTranslation();

  const [selectedBhk, setSelectedBhk] = React.useState();

  const {selectedProject = {}} = useSelector((state) => state.project);

  const {selectedStructure, floorId, towerId} = route?.params || {};
  const structureData = selectedProject.projectData?.[selectedStructure] || {};
  const {towers} = structureData;

  const units = useMemo(() => {
    return towers?.[towerId]?.floors?.[floorId]?.units || {};
  }, [floorId, towerId, towers]);

  const handlePress = (unit) => {
    navigation.navigate('BC_Step_Four', {
      selectedStructure,
      floorId,
    });
  };
  return (
    <>
      <FormTitle
        title={t('label_select_unit')}
        subTitle={t('label_select_appropriate_option')}
      />
      <View style={styles.container}>
        <>
          <Subheading theme={secondaryTheme} style={{marginTop: 5}}>
            BHK indication
          </Subheading>
          <BhkList selectedBhk={selectedBhk} onPress={setSelectedBhk} />
          <Subheading theme={secondaryTheme} style={styles.floorTitle}>
            Units
          </Subheading>
          <RenderUnits
            units={units}
            selectedFloor={floorId}
            onPress={handlePress}
          />
        </>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  towerList: {
    flexDirection: 'row',
  },
  floorTitle: {
    marginVertical: 5,
  },
  unitsList: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  unitContainer: {
    width: Layout.window.width * 0.15,
    margin: Layout.window.width * 0.015,
    height: Layout.window.width * 0.15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

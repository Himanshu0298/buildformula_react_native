import React from 'react';
import BhkButton from 'components/Atoms/Buttons/BhkButton';
import FormTitle from 'components/Atoms/FormTitle';
import {useTranslation} from 'react-i18next';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {Badge, Subheading} from 'react-native-paper';
import {secondaryTheme} from 'styles/theme';
import {BHK_OPTIONS} from 'utils/constant';
import {addOpacity, getUnitLabel} from 'utils';
import Layout from 'utils/Layout';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

const DEFAULT_UNIT_COLOR = '#5B6F7C';
const BOOKING_STYLES = {
  filling: {
    borderWidth: 3,
    borderColor: '#07CA03',
    badge: <MaterialCommunityIcons name="minus" color="#fff" />,
  },
  standby: {
    borderWidth: 3,
    borderColor: '#041D36',
    badge: <MaterialCommunityIcons name="minus" color="#fff" />,
  },
  booked: {
    borderWidth: 3,
    borderColor: '#FF5D5D',
    badge: <MaterialIcons name="check" color="#fff" />,
  },
};

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

function RenderUnits({onSelectUnit, units, selectedFloor, isUnitDisabled}) {
  return (
    <View style={styles.unitsList}>
      {Object.keys(units).map((unitId, i) => {
        const unit = units[unitId];
        const unitBhk = BHK_OPTIONS.find((item) => item.type === unit.bhk);

        let bookingStyle = BOOKING_STYLES[unit.booking_status] || {};
        const disabled = isUnitDisabled(unit);

        if (unit?.booking_status === 'filling' && !disabled) {
          bookingStyle = {};
        }

        return (
          <TouchableOpacity
            key={i}
            disabled={disabled}
            onPress={() => onSelectUnit(i, unit)}
            style={[
              styles.unitContainer,
              {
                borderRadius: 10,
                position: 'relative',
                ...bookingStyle,
                backgroundColor:
                  (unitBhk && addOpacity(unitBhk.color, 1)) ||
                  DEFAULT_UNIT_COLOR,
              },
            ]}>
            {bookingStyle.badge ? (
              <Badge
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor: bookingStyle.borderColor,
                  },
                ]}>
                {bookingStyle.badge}
              </Badge>
            ) : null}
            <Subheading>{getUnitLabel(selectedFloor, i)}</Subheading>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function UnitSelector({
  title,
  subtitle,
  showBhkFilters,
  refreshing,
  onRefresh,
  unitBookingStatus,
  units,
  floorId,
  onSelectUnit,
  isUnitDisabled,
}) {
  const {t} = useTranslation();

  const [selectedBhk, setSelectedBhk] = React.useState();

  return (
    <>
      <FormTitle title={t(title)} subTitle={t(subtitle)} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ) : null
        }>
        <View style={styles.container}>
          {showBhkFilters ? (
            <>
              <Subheading theme={secondaryTheme} style={{marginTop: 5}}>
                BHK indication
              </Subheading>
              <BhkList selectedBhk={selectedBhk} onPress={setSelectedBhk} />
            </>
          ) : null}
          <Subheading theme={secondaryTheme} style={styles.floorTitle}>
            Units
          </Subheading>
          <RenderUnits
            units={units}
            selectedFloor={floorId}
            onSelectUnit={onSelectUnit}
            isUnitDisabled={isUnitDisabled}
          />
        </View>
      </ScrollView>
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
  statusBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
});

UnitSelector.defaultProps = {
  title: 'label_select_unit',
  subtitle: 'label_select_appropriate_option',
  showBhkFilters: true,
  onSelectUnit: () => {},
};

UnitSelector.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  showBhkFilters: PropTypes.bool,
  onSelectUnit: PropTypes.func.isRequired,
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
  unitBookingStatus: PropTypes.array,
  units: PropTypes.object,
  floorId: PropTypes.number.isRequired,
};

export default UnitSelector;

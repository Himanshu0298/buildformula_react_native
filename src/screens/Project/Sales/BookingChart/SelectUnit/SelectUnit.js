import React, {useEffect, useMemo} from 'react';
import BhkButton from 'components/Buttons/BhkButton';
import FormTitle from 'components/FormTitle';
import {useTranslation} from 'react-i18next';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {Badge, Subheading} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {secondaryTheme} from 'styles/theme';
import {BHK_OPTIONS} from 'utils/constant';
import {addOpacity, getUnitLabel} from 'utils';
import Layout from 'utils/Layout';
import useSalesActions from 'redux/actions/salesActions';
import Spinner from 'react-native-loading-spinner-overlay';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';

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

function RenderUnits({onPress, units, user, selectedFloor}) {
  return (
    <View style={styles.unitsList}>
      {Object.keys(units).map((unitId, i) => {
        const unit = units[unitId];
        const unitBhk = BHK_OPTIONS.find((item) => item.type === unit.bhk);

        let bookingStyle = BOOKING_STYLES[unit.booking_status] || {};
        let disabled =
          (unit.booking_status && unit.booking_status !== 'filling') ||
          (unit.booking_status === 'filling' &&
            unit.booked_unit_user_id &&
            unit.booked_unit_user_id !== user.id);

        if (
          unit.booking_status &&
          unit.booking_status === 'filling' &&
          dayjs(unit.tmp_booking_time_end).isBefore(dayjs())
        ) {
          bookingStyle = {};
          disabled = false;
        }

        return (
          <TouchableOpacity
            key={i}
            disabled={disabled}
            onPress={() => onPress(i, unit)}
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

export default function SelectUnit(props) {
  const {navigation, route} = props;
  const {t} = useTranslation();

  const {getUnitsBookingStatus, lockUnit} = useSalesActions();

  const [selectedBhk, setSelectedBhk] = React.useState();

  const {selectedProject = {}} = useSelector((state) => state.project);
  const {loading, unitBookingStatus} = useSelector((state) => state.sales);
  const {user} = useSelector((state) => state.user);

  const {selectedStructure, floorId, towerId} = route?.params || {};
  const structureData = selectedProject.projectData?.[selectedStructure] || {};
  const {towers} = structureData;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUnitsBookingStatus();
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const units = useMemo(() => {
    let data = towers?.[towerId]?.floors?.[floorId]?.units || {};

    Object.keys(data).map((key) => {
      let bookingData = unitBookingStatus.find(
        (unit) => unit.id === data[key].unitId,
      );

      if (bookingData) {
        data[key] = {...data[key], ...bookingData};
      }
    });

    return data;
  }, [floorId, towerId, towers, unitBookingStatus]);

  const fetchUnitsBookingStatus = () => {
    const formData = new FormData();
    formData.append('project_id', selectedProject.id);
    formData.append('project_type', selectedStructure);
    formData.append('project_tower', towerId);
    formData.append('project_floor', floorId);

    getUnitsBookingStatus(formData);
  };

  const handlePress = (index, unit) => {
    const formData = new FormData();
    formData.append('unit_id', unit.unitId);

    lockUnit(formData).then(() => {
      fetchUnitsBookingStatus();
    });

    navigation.navigate('BC_Step_Four', {
      project_id: selectedProject.id,
      unit_id: unit.unitId,
    });
  };

  return (
    <>
      <FormTitle
        title={t('label_select_unit')}
        subTitle={t('label_select_appropriate_option')}
      />
      <Spinner visible={loading} textContent={''} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl
            refreshing={unitBookingStatus.length > 0 && loading}
            onRefresh={fetchUnitsBookingStatus}
          />
        }>
        <View style={styles.container}>
          <Subheading theme={secondaryTheme} style={{marginTop: 5}}>
            BHK indication
          </Subheading>
          <BhkList selectedBhk={selectedBhk} onPress={setSelectedBhk} />
          <Subheading theme={secondaryTheme} style={styles.floorTitle}>
            Units
          </Subheading>
          <RenderUnits
            units={units}
            user={user}
            selectedFloor={floorId}
            onPress={handlePress}
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

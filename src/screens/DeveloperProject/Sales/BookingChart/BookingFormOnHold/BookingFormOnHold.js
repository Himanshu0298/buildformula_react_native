import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import UserAvatar from 'components/Atoms/UserAvatar';
import dayjs from 'dayjs';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Subheading,
  withTheme,
  Text,
  Button,
  Card,
  Divider,
  IconButton,
  Caption,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import useSalesActions from 'redux/actions/salesActions';
import {useSalesLoading} from 'redux/selectors';
import {getFloorNumber, getTowerLabel, getUnitLabel} from 'utils';
import {STRUCTURE_TYPE_LABELS} from 'utils/constant';
import BookingHoldForm from './Components/BookingHoldForm';

function RenderRow(props) {
  const {heading, content} = props;

  return (
    <View style={styles.headingRow}>
      <Caption>{heading}</Caption>
      <Text>{content}</Text>
    </View>
  );
}

function InfoRow(props) {
  const {data} = props;

  return (
    <View style={styles.rowContainer}>
      {data.map(({title, value}) => (
        <View key={title} style={styles.rowCell}>
          <Caption>{title}: </Caption>
          <Text>{value}</Text>
        </View>
      ))}
    </View>
  );
}

function PropertyHoldUserDetails(props) {
  const {bookingDetails, userInfo, handleUnHold} = props;

  const {user} = useSelector(s => s.user);

  const holdTill = dayjs(
    `${bookingDetails.hold_till_date} ${bookingDetails.hold_till_time}`,
    'YYYY-MM-DD hh:mm:ss',
  );

  const holdDate = holdTill.format('DD MMM, YYYY');
  const days = holdTill.diff(dayjs(), 'd');

  return (
    <View style={styles.holdDetailsContainer}>
      <Subheading>Property On Hold</Subheading>
      <Caption>On-hold by</Caption>
      <View style={styles.userBlock}>
        <UserAvatar
          size={40}
          uri={userInfo.profile_url}
          style={styles.avatar}
        />
        <View>
          <Text>
            {userInfo.first_name} {userInfo.last_name}
          </Text>
          <Caption>{userInfo.email}</Caption>
        </View>
      </View>
      <RenderRow heading="Date" content={holdDate} />
      <RenderRow heading="Hold Duration" content={`${days} days`} />
      <RenderRow heading="Remark" content={bookingDetails.remark} />

      <View style={styles.actionContainer}>
        {user.id === userInfo.id ? (
          <Button
            mode="contained"
            onPress={handleUnHold}
            uppercase={false}
            style={styles.unHoldButton}>
            Un-hold this property
          </Button>
        ) : null}
        <View style={styles.helperText}>
          <Caption>This property is on hold till </Caption>
          <Text>{holdTill.format('DD MMM, YYYY hh:mm a')}</Text>
        </View>
      </View>
    </View>
  );
}

function BookingFormOnHold(props) {
  const {navigation, route, theme} = props;
  const {project_id, structureType, towerId, floorId, unitIndex, unitId} =
    route?.params || {};

  const {bookingHoldDetails} = useSelector(s => s.sales);
  const loading = useSalesLoading();
  const {current_Hold_By_User_Details: userInfo, holdHistoryList} =
    bookingHoldDetails || {};

  const {
    getHoldBookingDetails,
    unitHoldBooking,
    unitUnHoldBooking,
  } = useSalesActions();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    loadHoldDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitId]);

  const loadHoldDetails = () =>
    getHoldBookingDetails({project_id, unit_id: unitId});

  const toggleHoldForm = () => setVisible(v => !v);

  const navToHistory = () =>
    navigation.navigate('HoldBookingHistory', {history: holdHistoryList});

  const propertyBooked = useMemo(() => {
    return holdHistoryList?.find(i =>
      dayjs(
        `${i.hold_till_date} ${i.hold_till_time}`,
        'YYYY-MM-DD hh:mm:ss',
      ).isAfter(dayjs()),
    );
  }, [holdHistoryList]);

  const handleHold = async values => {
    const {date, time, remark} = values;
    toggleHoldForm();
    await unitHoldBooking({
      project_id,
      unit_id: unitId,
      hold_till_date: dayjs(date).format('DD-MM-YYYY'),
      hold_till_time: dayjs(time).format('hh:mm'),
      remark,
    });
    loadHoldDetails();
  };

  const handleUnHold = async () => {
    toggleHoldForm();
    await unitUnHoldBooking({
      project_id,
      unit_id: unitId,
      units_on_hold_id: propertyBooked.id,
    });
    loadHoldDetails();
  };

  return (
    <>
      <Spinner visible={loading} textContent="" />
      <BookingHoldForm
        {...props}
        open={visible}
        handleClose={toggleHoldForm}
        handleSubmit={handleHold}
      />

      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backContainer}
            onPress={navigation.goBack}>
            <IconButton icon="keyboard-backspace" />
            <Text>Property On-hold</Text>
          </TouchableOpacity>
          <OpacityButton
            opacity={0.1}
            onPress={navToHistory}
            style={styles.historyButton}>
            <MaterialCommunityIcons
              name="information-outline"
              size={18}
              color={theme.colors.primary}
              style={styles.infoIcon}
            />
            <Text>History</Text>
          </OpacityButton>
        </View>
        <Card elevation={5} style={styles.infoCard}>
          <Subheading>Property info</Subheading>
          <Divider style={styles.divider} />
          <InfoRow
            data={[
              {
                title: 'Project type',
                value: STRUCTURE_TYPE_LABELS[structureType],
              },
              {title: 'Tower', value: getTowerLabel(towerId)},
            ]}
          />
          <InfoRow
            data={[
              {title: 'Floor', value: getFloorNumber(floorId)},
              {title: 'Unit Number', value: getUnitLabel(floorId, unitIndex)},
            ]}
          />
        </Card>
        {propertyBooked ? (
          <PropertyHoldUserDetails
            bookingDetails={propertyBooked}
            userInfo={userInfo}
            handleUnHold={handleUnHold}
          />
        ) : (
          <Button
            mode="contained"
            onPress={toggleHoldForm}
            uppercase={false}
            style={styles.holdButton}>
            Hold this property
          </Button>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: -10,
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    padding: 7,
  },
  infoIcon: {
    marginRight: 7,
  },
  infoCard: {
    padding: 15,
    marginVertical: 15,
  },
  rowContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 3,
  },
  holdButton: {
    margin: 15,
    borderRadius: 10,
  },
  divider: {
    height: 1,
    marginBottom: 5,
  },
  rowCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingRow: {
    marginTop: 20,
  },
  holdDetailsContainer: {
    marginTop: 20,
  },
  userBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  avatar: {
    marginRight: 10,
  },
  actionContainer: {
    marginTop: 20,
    margin: 10,
  },
  unHoldButton: {
    borderRadius: 10,
  },
  helperText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withTheme(BookingFormOnHold);

import React, {useEffect, useState} from 'react';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import {Subheading, Text} from 'react-native-paper';
import {getShadow} from 'utils';
import {useSelector} from 'react-redux';
import {SITE_URL} from 'utils/constant';
import dayjs from 'dayjs';
import * as Progress from 'react-native-progress';
import ImageProgress from 'react-native-image-progress';
import developer_building from 'assets/images/developer_building.png';
import DashboardBG from 'assets/images/DashboardBG.png';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

function GeneralDashboard() {
  const {selectedProject} = useSelector(s => s.project);
  const {user} = useSelector(s => s.user);

  const {first_name, last_name} = user || {};

  const company_logo = `${SITE_URL}/logo_images/${selectedProject.company_logo_url}`;
  const [time, setTime] = useState(dayjs().format('hh:mm A'));
  const [date, setDate] = useState(dayjs().format('DD-MM-YYYY'));

  useEffect(() => {
    setInterval(() => {
      setTime(dayjs().format('hh:mm A'));
      setDate(dayjs().format('DD-MM-YYYY'));
    }, 5900);
  }, []);

  return (
    <ImageBackground source={DashboardBG} style={styles.staticsContainer}>
      <View
        showsVerticalScrollIndicator={false}
        style={styles.detailsContainer}>
        {selectedProject.company_logo_url ? (
          <ImageProgress
            source={{uri: company_logo}}
            indicator={Progress.Pie}
            indicatorProps={{
              size: 80,
              borderWidth: 0,
              color: 'rgba(234,236,241,1)',
              unfilledColor: 'rgba(211,218,239,1)',
            }}
            style={styles.profileIMG}
          />
        ) : (
          <Image source={developer_building} style={styles.profileIMG2} />
        )}
        <Text style={styles.subheading}>Hi, {first_name}</Text>
        <View style={styles.timeContainer}>
          <Subheading>
            <MaterialIcon name="calendar" color="#8e8e8e" size={18} />
            {date} ,
          </Subheading>
          <Subheading>
            <MaterialIcon name="clock" color="#8e8e8e" size={18} />
            {time}
          </Subheading>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  staticsContainer: {
    backgroundColor: '#eaeff1',
    flexGrow: 1,
  },
  profileIMG: {
    borderWidth: 0.1,
    borderColor: '#8d8d8d',
    width: '95%',
    height: '30%',
    marginHorizontal: 5,
    // borderRadius: 150,
    overflow: 'hidden',
    ...getShadow(5),
  },
  profileIMG2: {
    borderWidth: 0.1,
    borderColor: '#8d8d8d',
    width: '49%',
    height: '30%',
    marginHorizontal: 5,
    // borderRadius: 150,
    // resizeMode: 'center',
    overflow: 'hidden',
    ...getShadow(5),
  },
  subheading: {
    marginTop: 30,
    fontWeight: '700',
    fontSize: 32,
  },
  detailsContainer: {
    alignItems: 'center',
    flex: 1,
    marginTop: '20%',
  },
  timeContainer: {
    marginTop: 15,
    fontWeight: '600',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default GeneralDashboard;

import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Subheading, Text, withTheme} from 'react-native-paper';
import {getShadow} from 'utils';
import {useSelector} from 'react-redux';
import {SITE_URL} from 'utils/constant';
import dayjs from 'dayjs';
import * as Progress from 'react-native-progress';
import ImageProgress from 'react-native-image-progress';
import developer_building from 'assets/images/developer_building.png';

function GeneralDashboard() {
  const {selectedProject} = useSelector(s => s.project);
  const {user} = useSelector(s => s.user);

  const {first_name, last_name, profile_url} = user || {};

  const company_logo = `${SITE_URL}/logo_images/${selectedProject.company_logo_url}`;

  return (
    <View style={styles.staticsContainer}>
      <View
        showsVerticalScrollIndicator={false}
        style={styles.detailsContainer}>
        {profile_url ? (
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
          <Image source={developer_building} style={styles.profileIMG} />
        )}
        <Text style={styles.subheading}>
          {first_name} {last_name}
        </Text>
        <Subheading style={styles.timeContainer}>
          {dayjs().format('hh:mm:ss A')}
        </Subheading>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  staticsContainer: {
    backgroundColor: '#eaeff1',
    flexGrow: 1,
  },
  profileIMG: {
    width: 210,
    height: 210,
    borderRadius: 100,
    overflow: 'hidden',
    ...getShadow(5),
  },
  subheading: {
    marginTop: 30,
    fontWeight: '600',
    fontSize: 30,
  },
  detailsContainer: {
    alignItems: 'center',
    flex: 1,
    marginTop: 60,
  },
  timeContainer: {
    marginTop: 15,
    color: '#8e8e8e',
  },
});

export default withTheme(GeneralDashboard);

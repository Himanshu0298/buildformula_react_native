import React from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import Layout from 'utils/Layout';
import {Subheading, Text, withTheme} from 'react-native-paper';
import {getShadow} from 'utils';
import {BarChart, LineChart, ProgressChart} from 'react-native-chart-kit';
import {useSelector} from 'react-redux';

function RenderProgressChart(props) {
  const {params, color, width} = props;
  const {labels, data = {}} = params;
  const {totalBookedCount, totalCount} = data;

  // const bookingPercentage =
  //   totalCount && totalBookedCount
  //     ? ((totalBookedCount / totalCount) * 100).toFixed(0)
  //     : 0.0;
  const bookingPercentage =
    totalCount && totalBookedCount ? totalBookedCount / totalCount : 0.0;
  const progressData = {labels, data: [bookingPercentage]};

  return (
    <View style={styles.progressBarContainer}>
      <ProgressChart
        data={progressData}
        width={width}
        height={120}
        strokeWidth={14}
        radius={40}
        hideLegend
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(${color}, ${opacity})`,
        }}
      />
      <Text>{labels[0]}</Text>
      <View style={styles.progressLegend}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            color: `rgba(${color}, 1)`,
          }}>
          {totalCount ? totalBookedCount : 'NA'}
        </Text>
        {totalCount ? (
          <Text style={{color: `rgba(${color}, 1)`}}>/{totalCount}</Text>
        ) : null}
      </View>
    </View>
  );
}

function GeneralDashboard(props) {
  const {onRefresh} = props;

  const {dashboardData = {}} = useSelector(s => s.project);

  return (
    <View style={styles.staticsContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }>
        <Text>Data</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  staticsContainer: {
    backgroundColor: '#eaeff1',
    flexGrow: 1,
  },
  sectionContainer: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 12,
    borderRadius: 5,
    ...getShadow(2),
  },
  progressBarContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  progressLegend: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    paddingBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withTheme(GeneralDashboard);

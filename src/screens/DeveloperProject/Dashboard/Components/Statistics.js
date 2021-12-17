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

function Statistics(props) {
  const {onRefresh} = props;

  const {dashboardData = {}} = useSelector(s => s.project);
  const {
    salesData,
    bookingProjectTypeWiseCount: bookingData,
    projectPhases,
  } = dashboardData;
  const {data_with_date: weeklySalesData} = salesData?.weekly || {};

  return (
    <View style={styles.staticsContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }>
        {weeklySalesData ? (
          <View style={styles.sectionContainer}>
            <Subheading>Sales</Subheading>
            <LineChart
              fromZero
              data={{
                labels: Object.keys(weeklySalesData),
                datasets: [{data: Object.values(weeklySalesData)}],
              }}
              width={Layout.window.width - 30} // from react-native
              height={200}
              withDots={false}
              withHorizontalLines={false}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: 'transparent',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(72,114,244, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              bezier
              style={{
                marginTop: 8,
                marginLeft: -10,
              }}
            />
          </View>
        ) : null}
        {bookingData ? (
          <View style={styles.sectionContainer}>
            <Subheading>Booking</Subheading>
            <View style={styles.row}>
              <RenderProgressChart
                params={{labels: ['Apartment'], data: bookingData.apartment}}
                color="72, 161, 244"
                width={(Layout.window.width - 40) / 3}
              />
              <RenderProgressChart
                params={{labels: ['Shop'], data: bookingData.shop}}
                color="244, 175, 72"
                width={(Layout.window.width - 40) / 3}
              />
              <RenderProgressChart
                color="0, 205, 205"
                params={{labels: ['Office'], data: bookingData.office}}
                width={(Layout.window.width - 40) / 3}
              />
            </View>
            <View style={styles.row}>
              <RenderProgressChart
                params={{labels: ['Bungalow'], data: bookingData.bunglow}}
                color="7, 202, 3"
                width={(Layout.window.width - 40) / 3}
              />
              <RenderProgressChart
                params={{labels: ['Plot'], data: bookingData.plot}}
                color="168, 72, 244"
                width={(Layout.window.width - 40) / 3}
              />
            </View>
          </View>
        ) : null}
        {projectPhases ? (
          <View style={[styles.sectionContainer, {flex: 1}]}>
            <Subheading>Project phases</Subheading>
            <BarChart
              withInnerLines={false}
              fromZero
              verticalLabelRotation="25"
              data={{
                labels: projectPhases.labels || [],
                datasets: [{data: projectPhases.data || []}],
              }}
              width={Layout.window.width - 40} // from react-native
              height={450}
              chartConfig={{
                backgroundColor: 'transparent',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(72,114,244, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                propsForHorizontalLabels: {paddingBottom: 100},
              }}
              style={{
                marginTop: 8,
                marginLeft: -50,
              }}
            />
          </View>
        ) : null}
        {/* <View style={styles.sectionContainer}>
          <Subheading>Project Sub-phases</Subheading>
          <BarChart
            withInnerLines={false}
            fromZero
            data={{
              labels: ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'],
              datasets: [{data: [20, 45, 28, 80]}],
            }}
            width={Layout.window.width - 40} // from react-native
            height={200}
            chartConfig={{
              backgroundColor: 'transparent',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(72,114,244, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            style={{
              marginTop: 8,
            }}
          />
        </View> */}
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

export default withTheme(Statistics);

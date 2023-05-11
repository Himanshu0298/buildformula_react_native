import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import Layout from 'utils/Layout';
import {
  Caption,
  DataTable,
  Subheading,
  Text,
  withTheme,
} from 'react-native-paper';
import {getShadow} from 'utils';
import {
  BarChart,
  LineChart,
  PieChart,
  ProgressChart,
} from 'react-native-chart-kit';
import {useSelector} from 'react-redux';
import useSalesActions from 'redux/actions/salesActions';
import {theme} from 'styles/theme';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const StatsCard = props => {
  const {data, title} = props;
  return (
    <View style={styles.detailContainer}>
      <Caption>{title}</Caption>
      <View style={styles.statsCardContainer}>
        <Subheading>{data}</Subheading>
        {title === 'INQUIRY' || title === 'CUSTOMERS' ? (
          <MaterialIcon
            name={title === 'INQUIRY' ? 'image-search' : 'group'}
            color={theme.colors.primary}
            size={25}
          />
        ) : (
          <MaterialCommunityIcons
            name={
              title === 'PROJECT' ? 'cube-unfolded' : 'office-building-outline'
            }
            size={25}
            color={theme.colors.primary}
          />
        )}
      </View>
    </View>
  );
};

const data = [
  {
    title: 'Seoul',
    count: 21500000,
    color: 'rgba(131, 167, 234, 1)',
    legendFontColor: '#7F7F7F',
  },
  {
    title: 'Toronto',
    count: 2800000,
    color: '#F00',
    legendFontColor: '#7F7F7F',
  },
  {
    title: 'Beijing',
    count: 527612,
    color: 'red',
    legendFontColor: '#7F7F7F',
  },
  {
    title: 'New York',
    count: 8538000,
    color: '#ffffff',
    legendFontColor: '#7F7F7F',
  },
  {
    title: 'Moscow',
    count: 11920000,
    color: 'rgb(0, 0, 255)',
    legendFontColor: '#7F7F7F',
  },
];

function SalesDashboard() {
  const [sourceTypeData, setSourceTypeData] = useState();

  const {get_sales_dashboard_data} = useSalesActions();

  const {selectedProject} = useSelector(s => s.project);
  const {salesDashboardData} = useSelector(s => s.sales);

  const loadData = () => {
    get_sales_dashboard_data({project_id: selectedProject.id});
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView
      style={styles.salesContainer}
      showsVerticalScrollIndicator={false}>
      {/* stats card */}
      <View style={styles.row}>
        <StatsCard data={salesDashboardData.total_visitors} title="INQUIRY" />
        <StatsCard data={salesDashboardData.total_customer} title="CUSTOMERS" />
      </View>
      <View style={styles.row}>
        <StatsCard data={salesDashboardData.total_property} title="PROPERTY" />
        <StatsCard data={salesDashboardData.total_project} title="PROJECT" />
      </View>

      {/* sales pipeline */}
      <View style={[styles.sectionContainer, {flex: 1}]}>
        <Caption>Sales Pipeline</Caption>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <BarChart
            withInnerLines={false}
            fromZero
            verticalLabelRotation="25"
            data={{
              labels: salesDashboardData.sales_pipeline_project_type || [],
              datasets: [
                {
                  data:
                    salesDashboardData.sales_pipeline_project_type_count || [],
                },
              ],
            }}
            width={Layout.window.width + 300} // from react-native
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
            style={{marginTop: 8, marginLeft: -39}}
          />
        </ScrollView>
      </View>

      {/* source-type */}
      <PieChart
        data={data}
        width={Layout.window.width}
        height={220}
        chartConfig={{
          backgroundColor: 'transparent',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(72,114,244, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForHorizontalLabels: {paddingBottom: 100},
        }}
        accessor="count"
        paddingLeft="15"
        center={[5, 10]}
        absolute
        style={{marginTop: 8, marginLeft: -25}}
      />

      {/* property sold by category */}
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Category</DataTable.Title>
          <DataTable.Title numeric>Total</DataTable.Title>
          <DataTable.Title numeric>Booked </DataTable.Title>
          <DataTable.Title numeric>Reserved </DataTable.Title>
          <DataTable.Title numeric>Hold </DataTable.Title>
          <DataTable.Title numeric>Available </DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>Apartment</DataTable.Cell>
          <DataTable.Cell numeric>285</DataTable.Cell>
          <DataTable.Cell numeric>4</DataTable.Cell>
          <DataTable.Cell numeric>25</DataTable.Cell>
          <DataTable.Cell numeric>5</DataTable.Cell>
          <DataTable.Cell numeric>251</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  salesContainer: {
    backgroundColor: '#eaeff1',
    flex: 1,
  },
  detailContainer: {
    backgroundColor: '#e7eafb',
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 5,
    ...getShadow(2),
    width: 180,
    height: 75,
    borderBottomWidth: 5,
    borderColor: theme.colors.primary,
  },
  statsCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 12,
    marginHorizontal: 5,
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

export default withTheme(SalesDashboard);

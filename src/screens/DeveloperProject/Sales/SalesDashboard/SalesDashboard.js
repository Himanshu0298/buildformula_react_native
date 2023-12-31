import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import Layout from 'utils/Layout';
import {
  Badge,
  Caption,
  DataTable,
  Divider,
  Headline,
  Subheading,
  Text,
  withTheme,
} from 'react-native-paper';
import {getShadow} from 'utils';
import {BarChart} from 'react-native-chart-kit';
import {useSelector} from 'react-redux';
import useSalesActions from 'redux/actions/salesActions';
import {theme} from 'styles/theme';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';
import {MONTHS} from 'utils/constant';
import Spinner from 'react-native-loading-spinner-overlay';
import {isArray} from 'lodash';
import {PieChart} from 'react-native-svg-charts';

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

function SalesDashboard() {
  const [currentPie, setCurrentPie] = useState('');
  const [arc, setArc] = useState(0);

  const {get_sales_dashboard_data} = useSalesActions();

  const {selectedProject} = useSelector(s => s.project);
  const {
    salesDashboardData = [],
    loading,
    salesDashboardPermission,
  } = useSelector(s => s.sales);

  const loadData = async () => {
    get_sales_dashboard_data({project_id: selectedProject.id});
  };

  const Colors = [
    '#FF731D',
    '#5F9DF7',
    '#1746A2',
    '#3C2317',
    '#628E90',
    '#B4CDE6',
    '#251B37',
    '#FFCACA',
    '#DD5353',
    '#B73E3E',
    '#FD841F',
    '#87A2FB',
    '#ADDDD0',
    '#554994',
    '#6D8B74',
    '#7D9D9C',
    '#CCF3EE',
    '#F1DDBF',
    '#8FBDD3',
    '#9ADCFF',
    '#9ADCFF',
    '#FF8AAE',
    '#D18CE0',
    '#BB6464',
    '#54BAB9',
    '#C0A080',
  ];

  const pieData = salesDashboardData
    ? salesDashboardData?.source_type_count?.map((value, index) => ({
        value,
        svg: {
          fill: Colors[index],
        },
        label: salesDashboardData?.source_type_type[index],
        key: index,
        arc: index === currentPie ? {outerRadius: arc, cornerRadius: 10} : 0,
        onPress: () => {
          setCurrentPie(index);
          setArc('110%');
        },
      }))
    : [];

  const pieChartLegend = pieData
    ? pieData?.map(e => ({
        key: e.key,
        label: e.label,
        color: e.svg.fill,
        value: e.value,
      }))
    : [];

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return salesDashboardPermission ? (
    <ScrollView
      style={styles.salesContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={loadData} />
      }>
      <Spinner visible={loading} />
      {/* stats card */}
      {salesDashboardData ? (
        <>
          <View style={styles.row}>
            <StatsCard
              data={salesDashboardData?.total_visitors}
              title="INQUIRY"
            />
            <StatsCard
              data={salesDashboardData?.total_customer}
              title="CUSTOMERS"
            />
          </View>
          <View style={styles.row}>
            <StatsCard
              data={salesDashboardData?.total_property}
              title="PROPERTY"
            />
            <StatsCard
              data={salesDashboardData?.total_project}
              title="PROJECT"
            />
          </View>
        </>
      ) : null}

      {/* sales pipeline */}
      {salesDashboardData?.sales_pipeline_project_type ? (
        <View style={styles.sectionContainer}>
          <Caption>Sales Pipeline</Caption>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <BarChart
              withInnerLines
              fromZero
              verticalLabelRotation="25"
              data={{
                labels: salesDashboardData?.sales_pipeline_project_type || [],
                datasets: [
                  {
                    data:
                      salesDashboardData?.sales_pipeline_project_type_count ||
                      [],
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
      ) : null}

      {/* source-type */}
      {salesDashboardData?.source_type_pie_chart?.length ? (
        <View style={styles.sectionContainer}>
          <Caption>Source Type</Caption>
          <PieChart
            style={{height: 350}}
            data={pieData}
            outerRadius="90%"
            spacing={0}
            labelRadius={80}
            innerRadius={10}
          />
          <View style={styles.pieLegend}>
            {pieChartLegend?.map(e => {
              return (
                <View style={styles.pieWrapper}>
                  <MaterialIcon
                    name="circle"
                    color={e.color}
                    size={currentPie === e.key ? 20 : 18}
                  />
                  <Text
                    style={{
                      fontSize: currentPie === e.key ? 16 : 14,
                      fontWeight: currentPie === e.key ? '600' : '400',
                    }}>{` ${e.label}: ${e.value}`}</Text>
                </View>
              );
            })}
          </View>
        </View>
      ) : null}

      {/* property sold by category */}
      {salesDashboardData?.property_sold_by_category?.length ? (
        <View style={styles.sectionContainer}>
          <Caption>Property sold by category</Caption>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <DataTable style={{width: Layout.window.width + 100}}>
              <DataTable.Header>
                <DataTable.Title>Category</DataTable.Title>
                <DataTable.Title numeric>Total</DataTable.Title>
                <DataTable.Title numeric>Booked </DataTable.Title>
                <DataTable.Title numeric>Reserved </DataTable.Title>
                <DataTable.Title numeric>Hold </DataTable.Title>
                <DataTable.Title numeric>Available </DataTable.Title>
              </DataTable.Header>

              {salesDashboardData?.property_sold_by_category?.map(e => {
                return (
                  <DataTable.Row>
                    <DataTable.Cell>{e.category}</DataTable.Cell>
                    <DataTable.Cell
                      numeric
                      textStyle={{color: theme.colors.primary}}>
                      {e.totalCount}
                    </DataTable.Cell>
                    <DataTable.Cell
                      numeric
                      textStyle={{color: theme.colors.error}}>
                      {e.totalBookedCount}
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      {e.totalreservedCount}
                    </DataTable.Cell>
                    <DataTable.Cell numeric>{e.totalholdCount}</DataTable.Cell>
                    <DataTable.Cell
                      numeric
                      textStyle={{color: theme.colors.success}}>
                      {e.available}
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </DataTable>
          </ScrollView>
        </View>
      ) : null}

      {/* Inquiry by priority  */}
      <View style={styles.sectionContainer}>
        <Caption>Inquiry by Priority</Caption>
        <View style={styles.row}>
          <View
            style={[
              styles.inquiryContainer,
              {backgroundColor: 'rgba(4, 29, 54, 0.2)'},
            ]}>
            <Subheading>TOTAL</Subheading>
            <Headline>
              {salesDashboardData?.inquiry_by_priority?.total}
            </Headline>
          </View>
          <View
            style={[
              styles.inquiryContainer,
              {backgroundColor: 'rgba(255, 94, 94, 0.2)'},
            ]}>
            <Subheading>HIGH</Subheading>
            <Headline>{salesDashboardData?.inquiry_by_priority?.high}</Headline>
          </View>
        </View>

        <View style={styles.row}>
          <View
            style={[
              styles.inquiryContainer,
              {backgroundColor: 'rgba(255, 199, 0, 0.2)'},
            ]}>
            <Subheading>MEDIUM</Subheading>
            <Headline>
              {salesDashboardData?.inquiry_by_priority?.medium}
            </Headline>
          </View>
          <View
            style={[
              styles.inquiryContainer,
              {backgroundColor: 'rgba(7, 202, 3, 0.2)'},
            ]}>
            <Subheading>LOW</Subheading>
            <Headline>{salesDashboardData?.inquiry_by_priority?.low}</Headline>
          </View>
        </View>
      </View>

      {/* today's followup */}
      {salesDashboardData ? (
        <View style={styles.sectionContainer}>
          <Caption>Today's Follow-up</Caption>
          <Divider />
          <View style={[styles.followupInner, {marginVertical: 6}]}>
            <View style={styles.followDetail}>
              <Caption>Total Follow-up Task : </Caption>
              <Text>
                {
                  salesDashboardData?.todays_followup_data
                    ?.total_follow_up_count
                }
              </Text>
            </View>
            <View style={styles.followDetail}>
              <Caption>Complete : </Caption>
              <Text>
                {
                  salesDashboardData?.todays_followup_data
                    ?.completed_follow_up_count
                }
              </Text>
            </View>
            <View style={styles.followupInner}>
              <Caption>Not Complete : </Caption>
              <Text>
                {
                  salesDashboardData?.todays_followup_data
                    ?.not_completed_follow_up_count
                }
              </Text>
            </View>
          </View>
          {salesDashboardData?.todays_followup_data?.follow_up_data?.map(e => {
            return (
              <View style={styles.followContainer}>
                <View style={{marginLeft: 5, width: Layout.window.width - 60}}>
                  <View style={styles.statsCardContainer}>
                    <Subheading style={{color: theme.colors.primary}}>
                      {e.task_title}
                    </Subheading>
                    {e.completed === 'yes' ? (
                      <MaterialCommunityIcons
                        name="check-circle-outline"
                        size={24}
                        color="green"
                      />
                    ) : null}
                  </View>
                  <Divider />
                  <View
                    style={[styles.statsCardContainer, {marginVertical: 5}]}>
                    <View style={styles.followRow}>
                      <MaterialIcon name="person" size={20} color="#6f7c8d" />
                      <Text>{`${e.first_name} ${e.last_name}`}</Text>
                    </View>
                    <View style={styles.followRow}>
                      <MaterialIcon name="phone" size={20} color="#6f7c8d" />
                      <Text>{`+91 ${e.phone}`}</Text>
                    </View>
                  </View>
                  <View style={styles.statsCardContainer}>
                    <View style={styles.followRow}>
                      <MaterialIcon
                        name="calendar-today"
                        size={20}
                        color="#6f7c8d"
                      />
                      <Text>{`${e.followup_date}, ${e.followup_time}`}</Text>
                    </View>
                    <View style={styles.followRow}>
                      <Text style={{color: theme.colors.primary}}>
                        {e.inquiry_status_title}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      ) : null}

      {/* monthly payment */}
      <View style={styles.sectionContainer}>
        <Caption>Monthly Payment Collection</Caption>
        <View style={styles.row}>
          <View
            style={[
              styles.inquiryContainer,
              {backgroundColor: 'rgba(72, 114, 244, 0.1)'},
            ]}>
            <Text>Property Amount</Text>
            <Headline>
              {salesDashboardData?.monthly_payment_collection?.property_amount}
            </Headline>
          </View>
          <View
            style={[
              styles.inquiryContainer,
              {backgroundColor: 'rgba(72, 114, 244, 0.1)'},
            ]}>
            <Text>GST Amount</Text>
            <Headline>
              {salesDashboardData?.monthly_payment_collection?.gst_amount}
            </Headline>
          </View>
        </View>

        <View style={styles.row}>
          <View
            style={[
              styles.inquiryContainer,
              {backgroundColor: 'rgba(72, 114, 244, 0.1)'},
            ]}>
            <Text>Addon Other Charges</Text>
            <Headline>
              {
                salesDashboardData?.monthly_payment_collection
                  ?.addon_other_charges
              }
            </Headline>
          </View>
          <View
            style={[
              styles.inquiryContainer,
              {backgroundColor: 'rgba(249, 148, 23, 0.2)'},
            ]}>
            <Text>Documentation Charges</Text>
            <Headline>
              {salesDashboardData?.monthly_payment_collection?.document_charges}
            </Headline>
          </View>
        </View>
      </View>

      {/* Receipt Listing */}
      {salesDashboardData?.receipt_listing?.length ? (
        <View style={styles.sectionContainer}>
          <Caption>
            Receipt Listing{' '}
            {`(${MONTHS[dayjs().format('M') - 1]} -  ${dayjs().format(
              'YYYY',
            )})`}
          </Caption>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <DataTable style={{width: Layout.window.width + 210}}>
              <DataTable.Header>
                <DataTable.Title>Unit Info</DataTable.Title>
                <DataTable.Title>Customer Name</DataTable.Title>
                <DataTable.Title>Created Date</DataTable.Title>
                <DataTable.Title numeric>Amount</DataTable.Title>
              </DataTable.Header>

              {salesDashboardData?.receipt_listing?.map(e => {
                return (
                  <DataTable.Row>
                    <DataTable.Cell>{e.unit_info}</DataTable.Cell>
                    <DataTable.Cell>{e.customer_name}</DataTable.Cell>
                    <DataTable.Cell>{e.created_date}</DataTable.Cell>
                    <DataTable.Cell numeric>{e.amount}</DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </DataTable>
          </ScrollView>
        </View>
      ) : null}

      {/* Payment schedule */}
      {salesDashboardData?.payment_schedule?.length ? (
        <View style={styles.sectionContainer}>
          <Caption>Payment Schedule</Caption>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <DataTable style={{width: Layout.window.width + 800}}>
              <DataTable.Header>
                <DataTable.Title>Unit Info</DataTable.Title>
                <DataTable.Title>Customer Name</DataTable.Title>
                <DataTable.Title>Installment Type</DataTable.Title>
                <DataTable.Title>Installment No</DataTable.Title>
                <DataTable.Title>Due Date</DataTable.Title>
                <DataTable.Title>Amount</DataTable.Title>
                <DataTable.Title>Collection %</DataTable.Title>
              </DataTable.Header>

              {salesDashboardData?.payment_schedule?.map(e => {
                return (
                  <DataTable.Row>
                    <DataTable.Cell>{e.unit_info}</DataTable.Cell>
                    <DataTable.Cell>{e.customer_name}</DataTable.Cell>
                    <DataTable.Cell>{e.instalment_type}</DataTable.Cell>
                    <DataTable.Cell>{e.instalment_no}</DataTable.Cell>
                    <DataTable.Cell>{e.due_date}</DataTable.Cell>
                    <DataTable.Cell>{e.amount}</DataTable.Cell>
                    <DataTable.Cell>{e.action}</DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </DataTable>
          </ScrollView>
        </View>
      ) : null}

      {/* Birthday & Anniversary */}
      {salesDashboardData ? (
        <View style={styles.sectionContainer}>
          <View style={styles.row}>
            <View style={[styles.followupInner, {marginVertical: 6}]}>
              <View style={styles.followDetail}>
                <Caption>TOTAL BIRTHDAY : </Caption>
                <Text style={{color: theme.colors.primary}}>
                  {salesDashboardData?.bday_anniversary?.bday_count}
                </Text>
              </View>
              <View style={styles.followupInner}>
                <Caption>TOTAL ANNIVERSARY : </Caption>
                <Text style={{color: theme.colors.primary}}>
                  {salesDashboardData?.bday_anniversary?.anniversary_count}
                </Text>
              </View>
            </View>
          </View>
          <Divider />
          <View style={styles.row}>
            <Caption>
              {`${MONTHS[dayjs().format('M') - 1]} -  ${dayjs().format(
                'YYYY',
              )}`}
            </Caption>
          </View>
          <Divider />
          <View style={styles.birthdayWrapper}>
            {salesDashboardData?.bday_anniversary
              ? Object.entries(salesDashboardData?.bday_anniversary?.datas)
                  ?.sort()
                  ?.map(item => {
                    return (
                      <View
                        style={[
                          styles.row,
                          {marginVertical: 10, alignItems: 'flex-start'},
                        ]}>
                        {item?.map(date => {
                          return !isArray(date) ? (
                            <View style={styles.birthdayDateWrap}>
                              <Badge style={styles.birthdayDate} size={23}>
                                {date}
                              </Badge>
                            </View>
                          ) : null;
                        })}
                        <View
                          style={{
                            flexDirection: 'column',
                            paddingLeft: 13,
                          }}>
                          {item
                            ?.filter(birthData => isArray(birthData))
                            ?.map(data => {
                              return data.map(val => {
                                return (
                                  <View style={styles.birthdayCard}>
                                    <Text>
                                      {val.bithName}
                                      <Caption>{` (${val.type})`}</Caption>
                                    </Text>
                                    <View style={styles.row}>
                                      <Caption>
                                        {`${val.relation} of `}
                                        <Caption
                                          style={{
                                            color: theme.colors.primary,
                                          }}>
                                          {`${val.visitor_name || 'N.A'} | ${
                                            val.property || 'N.A'
                                          } | ${val.visitor_phone || 'N.A'} | ${
                                            val.visitor_email || 'N.A'
                                          } `}
                                        </Caption>
                                      </Caption>
                                    </View>
                                  </View>
                                );
                              });
                            })}
                        </View>
                      </View>
                    );
                  })
              : null}
          </View>
        </View>
      ) : null}
    </ScrollView>
  ) : (
    <View style={styles.noPermission}>
      <Caption>Sorry you don't have rights to access this screen!</Caption>
    </View>
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
    width: Layout.window.width - 220,
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
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 12,
    marginHorizontal: 5,
    borderRadius: 5,
    ...getShadow(2),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  inquiryContainer: {
    width: Layout.window.width - 230,
    height: 75,
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  followDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 1,
    paddingRight: 3,
    marginRight: 3,
    borderRightColor: '#9f9f9f',
  },
  followupInner: {flexDirection: 'row', alignItems: 'center'},
  followRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 3,
  },
  followContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    padding: 5,
    flex: 1,
    marginVertical: 5,
  },
  birthdayWrapper: {
    borderLeftWidth: 1,
    borderLeftColor: '#838383',
    marginLeft: 8,
  },
  birthdayCard: {
    borderWidth: 0.5,
    borderColor: '#8e8e8e',
    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
    marginVertical: 4,
    width: Layout.window.width - 75,
  },
  birthdayDateWrap: {
    position: 'absolute',
    left: -12,
    marginTop: 3,
  },
  birthdayDate: {
    backgroundColor: '#eff3ff',
    color: theme.colors.primary,
  },
  pieLegend: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginVertical: 10,
  },
  pieWrapper: {
    flexDirection: 'row',
    marginTop: 4,
    width: '50%',
  },
  noPermission: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default withTheme(SalesDashboard);

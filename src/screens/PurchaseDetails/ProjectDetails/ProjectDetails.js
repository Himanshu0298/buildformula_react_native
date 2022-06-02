import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import React, {useEffect, useMemo} from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import useProjectActions from 'redux/actions/projectActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {
  Button,
  Subheading,
  Divider,
  Caption,
  withTheme,
  IconButton,
} from 'react-native-paper';
import {useProjectLoading} from 'redux/selectors';
import dayjs from 'dayjs';

function InvoiceCard(props) {
  const {date, number, amount} = props;

  return (
    <View style={styles.invoiceCardContainer}>
      <Divider style={styles.divider} />
      <View style={styles.invoiceTitle}>
        <View>
          <Caption>Date</Caption>
          <Text>{dayjs(date).format('DD MMMM YYYY')}</Text>
        </View>
        <View>
          <Caption>Tax invoice no</Caption>
          <Text>{number}</Text>
        </View>
      </View>
      <Caption>Total Amount</Caption>
      <View style={styles.rowBetween}>
        <View>
          <Text>₹ {amount}</Text>
        </View>
        <View>
          <OpacityButton
            opacity={0.2}
            style={{borderRadius: 100, marginRight: 10}}>
            <MaterialIcon name="download" color="blue" size={18} />
          </OpacityButton>
        </View>
      </View>
    </View>
  );
}

function ProjectDetails(props) {
  const {theme, route, navigation} = props;

  const {id} = route?.params || {};

  const {purchaseProjectDetails} = useSelector(s => s.project);
  const {projectDetails, invoiceList} = purchaseProjectDetails || {};
  const loading = useProjectLoading();

  const {getPurchaseProjectDetails} = useProjectActions();

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadData = () => getPurchaseProjectDetails(id);

  const {
    company_name,
    project_name,
    project_id,
    project_address,
    expired_date,
    status,
  } = projectDetails || {};

  const isExpired = useMemo(() => {
    return dayjs(expired_date).diff(dayjs(), 'd') < 31;
  }, [expired_date]);

  return (
    <View style={{flexGrow: 1}}>
      <Spinner visible={loading} textContent="" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 15}}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => loadData()} />
        }>
        <TouchableOpacity
          style={styles.titleContainer}
          onPress={navigation.goBack}>
          <IconButton icon="keyboard-backspace" />
          <Subheading>{company_name}</Subheading>
        </TouchableOpacity>
        <View style={{padding: 10, backgroundColor: '#F2F4F5'}}>
          <View style={styles.projectDetailsContainer}>
            <View>
              <Caption>Project id</Caption>
              <Text>{project_id}</Text>
            </View>
            <View>
              <Caption>Project Name</Caption>
              <Text>{project_name}</Text>
            </View>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.mb10}>
            <Caption>Subscription</Caption>
            <Text style={{color: status ? '#07CA03' : 'red'}}>
              {status ? 'ACTIVE' : 'EXPIRE'}
            </Text>
          </View>
          <View style={styles.mb10}>
            <Caption>Subscription Plan</Caption>
            <Text>12 Months</Text>
          </View>
          <View style={styles.mb10}>
            <Caption>Subscription Renewal Date</Caption>
            <Text>{expired_date}</Text>
          </View>
          {/* TODO: enable this */}
          {/* <View style={{flexDirection: 'row', marginVertical: 15}}>
            <View style={styles.companyLabel}>
              <Button
                mode="outlined"
                uppercase={false}
                onPress={() => console.log('Pressed')}
                style={{borderRadius: 10}}>
                View project details
              </Button>
            </View>
            <View>
              <Button
                mode="text"
                uppercase={false}
                onPress={() => console.log('Pressed')}
                color="black">
                Delete project
              </Button>
            </View>
          </View> */}
        </View>

        {isExpired ? (
          <View style={styles.subscriptionContainer}>
            <Subheading>Renew Subscription</Subheading>
            <Text style={styles.billingTitle}>Dummy text</Text>
            <Button
              mode="contained"
              uppercase={false}
              style={styles.upgradeButton}
              onPress={() => console.log('Pressed')}
              color={theme.colors.primary}>
              Upgrade
            </Button>
          </View>
        ) : null}

        <View style={styles.billingContainer}>
          <Subheading style={styles.billingTitle}>
            Billing Information
          </Subheading>
          <Caption style={styles.companyLabel}>{company_name}</Caption>
          <Text style={styles.billingTitle}>{project_address}</Text>
          <OpacityButton
            color={theme.colors.primary}
            opacity={0.15}
            style={styles.button}
            onPress={() =>
              navigation.navigate('UpdateBillingInfo', {project_id: id})
            }>
            <Text style={{color: theme.colors.primary}}>
              Update billing information
            </Text>
          </OpacityButton>
        </View>

        {invoiceList?.length ? (
          <View style={styles.invoices}>
            <Subheading style={styles.invoicesTitle}>Invoice</Subheading>
            {invoiceList.map(i => {
              return (
                <InvoiceCard
                  key={i.id}
                  date={i.created}
                  number={i.invoice}
                  amount={i.total}
                />
              );
            })}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    width: '55%',
  },
  invoiceCardContainer: {
    marginBottom: 10,
  },
  invoiceTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    marginBottom: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  invoices: {
    padding: 10,
    backgroundColor: '#F2F4F5',
    borderRadius: 10,
  },
  invoicesTitle: {
    marginBottom: 15,
  },
  billingContainer: {
    padding: 10,
    backgroundColor: '#F2F4F5',
    borderRadius: 10,
    marginBottom: 20,
  },
  billingTitle: {
    marginBottom: 15,
  },
  companyLabel: {
    marginBottom: 5,
  },
  subscriptionContainer: {
    backgroundColor: '#F2F4F5',
    borderRadius: 10,
    marginVertical: 20,
    padding: 10,
  },
  upgradeButton: {
    width: '40%',
    borderRadius: 15,
  },
  projectDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  mb10: {
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default withTheme(ProjectDetails);

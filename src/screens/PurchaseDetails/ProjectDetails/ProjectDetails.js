import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import React, {useEffect} from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import useProjectActions from 'redux/actions/projectActions';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {
  Title,
  Button,
  Subheading,
  Divider,
  Caption,
  withTheme,
} from 'react-native-paper';

function InvoiceCard(props) {
  const {date, number, amount, navigation} = props;

  return (
    <View style={{marginBottom: 10}}>
      <Divider style={{height: 1, marginBottom: 10}} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}>
        <View>
          <Caption>Date</Caption>
          <Text>16 July 2022</Text>
        </View>
        <View>
          <Caption>Tax invoice no</Caption>
          <Text>{number}</Text>
        </View>
      </View>
      <Caption>Total Amount</Caption>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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

  const {loading, purchaseProjectDetails} = useSelector(s => s.project);
  console.log('----->purchaseProjectDetails', purchaseProjectDetails);
  console.log('----->id', id);

  const {getPurchaseProjectDetails} = useProjectActions();

  useEffect(() => {
    getPurchaseProjectDetails(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // var date1 = new Date();

  // var Difference_In_Time = date2.getTime() - date1.getTime();
  // var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  const {
    company_name,
    project_name,
    project_id,
    project_address,
    expired_date,
    status,
  } = purchaseProjectDetails.projectDetails;

  const date2 = new Date(expired_date);
  const date1 = new Date();

  console.log('----->date2', date2);
  console.log('----->date1', date1);

  const Difference_In_Time = date2.getTime() - date1.getTime();
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  console.log('----->Difference_In_Days', Difference_In_Days);

  return (
    <View style={{flexGrow: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 15}}>
        <Title style={{marginBottom: 20}}>{company_name}</Title>
        <View style={{padding: 10, backgroundColor: '#F2F4F5'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <View>
              <Caption>Project id</Caption>
              <Text>{project_id}</Text>
            </View>
            <View>
              <Caption>Project Name</Caption>
              <Text>{project_name}</Text>
            </View>
          </View>
          <Divider style={{height: 1, marginBottom: 10}} />
          <View style={{marginBottom: 10}}>
            <Caption>Subscription</Caption>
            <Text style={{color: status ? '#07CA03' : 'red'}}>
              {status ? 'ACTIVE' : 'EXPIRE'}
            </Text>
          </View>
          <View style={{marginBottom: 10}}>
            <Caption>Subscription Plan</Caption>
            <Text>12 Months</Text>
          </View>
          <View style={{marginBottom: 10}}>
            <Caption>Subscription Renewal Date</Caption>
            <Text>{expired_date}</Text>
          </View>
          <View style={{flexDirection: 'row', marginVertical: 15}}>
            <View style={{marginRight: 5}}>
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
          </View>
        </View>

        {Difference_In_Days < 31 ? (
          <View
            style={{
              backgroundColor: '#F2F4F5',
              borderRadius: 10,
              marginVertical: 20,
              padding: 10,
            }}>
            <Subheading>Renew Subscription</Subheading>
            <Text style={{marginVertical: 15}}>Dummy text</Text>
            <Button
              mode="contained"
              uppercase={false}
              style={{width: '40%', borderRadius: 15}}
              onPress={() => console.log('Pressed')}
              color={theme.colors.primary}>
              Upgrade
            </Button>
          </View>
        ) : null}

        <View
          style={{
            padding: 10,
            backgroundColor: '#F2F4F5',
            borderRadius: 10,
            marginBottom: 20,
          }}>
          <Subheading style={{marginBottom: 15}}>
            Billing Information
          </Subheading>
          <Caption style={{marginBottom: 5}}>{company_name}</Caption>
          <Text style={{marginBottom: 15}}>{project_address}</Text>
          <OpacityButton
            color={theme.colors.primary}
            opacity={0.15}
            style={styles.button}
            onPress={() => navigation.navigate('UpdateBillingInfo', {id})}>
            <Text style={{color: theme.colors.primary}}>
              Update billing information
            </Text>
          </OpacityButton>
        </View>

        <View
          style={{padding: 10, backgroundColor: '#F2F4F5', borderRadius: 10}}>
          <Subheading style={{marginBottom: 15}}>Invoice</Subheading>
          <InvoiceCard number="67676767" amount={15000} />
          <InvoiceCard number="67676767" amount={15000} />
          <InvoiceCard number="67676767" amount={15000} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    width: '55%',
  },
});

export default withTheme(ProjectDetails);

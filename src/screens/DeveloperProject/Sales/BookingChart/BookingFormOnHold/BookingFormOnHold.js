import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Subheading,
  withTheme,
  Text,
  Button,
  Card,
  Divider,
  IconButton,
  Title,
  Caption,
  Avatar,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

function PropertyHoldUserDetails() {
  function Container(props) {
    const {heading, content} = props;

    return (
      <View style={{marginTop: 20}}>
        <Caption>{heading}</Caption>
        <Text>{content}</Text>
      </View>
    );
  }

  return (
    <View style={{marginTop: 20}}>
      <Title>Property On Hold</Title>
      <Caption>On-hold by</Caption>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Avatar.Icon size={40} style={{marginRight: 10}} />
        <View>
          <Text>Ashish Patel</Text>
          <Caption>ashishpatel@example.com</Caption>
        </View>
      </View>
      <Container heading="Date" content="20 Sept, 2020" />
      <Container heading="Hold Duration" content="15 Days" />
      <Container
        heading="Remark"
        content="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
      />
      <Button
        mode="contained"
        onPress={() => {
          console.log('----->BookingFormOnHold button pressed');
          //   navigation.navigate('HoldPropertyForm');
        }}
        uppercase={false}
        style={{margin: 15, borderRadius: 10}}>
        Unhold this property
      </Button>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Caption>This property is on hold till </Caption>
        <Text>20 Sept, 2020 8:30pm</Text>
      </View>
    </View>
  );
}

function ProjectInfo(props) {
  const {data} = props;

  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      {data.map(({title, value}) => (
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={{color: '#041D36'}}>{title}: </Text>
          <Text>{value}</Text>
        </View>
      ))}
    </View>
  );
}

function BookingFormOnHold(props) {
  const {navigation, route} = props;
  const {params = {}} = route;

  const [propertyBooked, setPropertyBooked] = useState(false);

  function handleClick(id) {
    if (id === 'withRate') {
      console.log('----->handleclick called', id);
    } else {
      console.log('----->else called', id);
    }
  }

  return (
    <View style={{padding: 10}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <IconButton
            icon="keyboard-backspace"
            onPress={() => navigation.goBack()}
          />
          <Text>Property On-hold</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('History')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#EDF1FE',
            borderRadius: 5,
            padding: 5,
          }}>
          <Icon name="information-outline" style={{marginRight: 10}} />
          <Text>History</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Card elevation={5} style={{padding: 15}}>
          <Subheading>Property info</Subheading>
          <Divider style={{height: 1, marginVertical: 5}} />
          <ProjectInfo
            data={[
              {title: 'Project type', value: 'apartment'},
              {title: 'Tower', value: 'A'},
            ]}
          />
          <ProjectInfo
            data={[
              {title: 'Floor', value: '12th Floor'},
              {title: 'Unit Number', value: '1204'},
            ]}
          />
        </Card>
        {propertyBooked ? (
          <PropertyHoldUserDetails />
        ) : (
          <Button
            mode="contained"
            onPress={() => {
              console.log('----->BookingFormOnHold button pressed');
              navigation.navigate('HoldPropertyForm');
            }}
            uppercase={false}
            style={{margin: 15, borderRadius: 10}}>
            Hold this property
          </Button>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default withTheme(BookingFormOnHold);

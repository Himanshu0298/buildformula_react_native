import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {IconButton, FAB} from 'react-native-paper';

const CustDetails = () => (
  <ScrollView style={styles.custContainer}>
    <View style={styles.valueContainer}>
      <Text style={styles.label}>Name</Text>
      <Text style={styles.value}>dsad</Text>
    </View>
    <View style={styles.valueContainer}>
      <Text style={styles.label}>Email</Text>
      <Text style={styles.value}>rohansharma1234@gmail.com</Text>
    </View>
    <View style={styles.valueContainer}>
      <Text style={styles.label}>Phone no.</Text>
      <Text style={styles.value}>+91 7373 576008</Text>
    </View>
    <View style={styles.valueContainer}>
      <Text style={styles.label}>Related Property</Text>
      <TouchableOpacity onPress={() => Alert.alert('jump to property')}>
        <Text style={styles.propLink}>Apartment-301, Office-310, Shop-316</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.valueContainer}>
      <Text style={styles.label}>Broker</Text>
      <Text style={styles.value}>M M</Text>
    </View>
    <View style={styles.valueContainer}>
      <Text style={styles.label}>Birthdate</Text>
      <Text style={styles.value}>10 Feb 1998</Text>
    </View>
    <View style={styles.valueContainer}>
      <Text style={styles.label}>Anniversary Date</Text>
      <Text style={styles.value}>10 May 2020</Text>
    </View>
    <View style={styles.valueContainer}>
      <Text style={styles.label}>Address</Text>
      <Text style={styles.value}>
        310, Vraj Valencia, opposite C.K Party plot, Nr. Kargil Petrolpump, Sola
        Science City Road Ahmedabad, gujarat, India - 380013
      </Text>
    </View>
  </ScrollView>
);

const Activity = () => {
  const [state, setState] = useState({open: false});
  const onStateChange = ({open}) => setState({open});

  const activites = ['All', 'Comment', 'Call Log', 'Follow up'];

  const {open} = state;
  return (
    <View style={styles.mainContainer}>
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={activites}
          renderItem={({item}) => {
            return <Text style={styles.activityBox}>{item}</Text>;
          }}
        />
      </View>
      <FAB.Group
        open={open}
        fabStyle={{
          backgroundColor: open ? '#fff' : '#4872f4',
        }}
        icon={open ? 'window-close' : 'plus'}
        actions={[
          {
            icon: 'message',
            label: 'Add Comment',
            onPress: () => console.log('Pressed'),
          },
          {
            icon: 'phone',
            label: 'Add Call Logs',
            onPress: () => console.log('Pressed'),
          },
          {
            icon: 'arrow-up',
            label: 'Add Follow-up',
            onPress: () => console.log('Pressed'),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
        style={{position: 'absolute', top: 0}}
      />
    </View>
  );
};

const CustomerInnerDetails = ({navigation, route}) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Customer Details'},
    {key: 'second', title: 'Acitivity'},
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      activeColor="#4872f4"
      inactiveColor="#041d36"
      initialLayout={{width: layout.width}}
      style={{backgroundColor: 'transparent'}}
      tabStyle={{borderBottomColor: 'red'}}
      indicatorStyle={{backgroundColor: '#4872f4'}}
    />
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <IconButton
          icon="keyboard-backspace"
          size={25}
          color="#4872f4"
          style={{backgroundColor: 'rgba(72, 114, 244, 0.1)'}}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Customer details</Text>
      </View>
      <TabView
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={SceneMap({
          first: CustDetails,
          second: Activity,
        })}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

export default CustomerInnerDetails;

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 5,
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#4872f4',
  },
  custContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    overflow: 'visible',
  },
  valueContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 13,
    color: '#041d36',
  },
  value: {
    fontSize: 16,
    color: '#5E6D7C',
    marginTop: 5,
  },
  propLink: {
    fontSize: 16,
    color: '#4872f4',
    marginTop: 5,
  },
  activityBox: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    fontSize: 14,
    marginVertical: 10,
    borderColor: 'rgba(4, 29, 54, 0.1)',
    color: '#4872f4',
  },
});

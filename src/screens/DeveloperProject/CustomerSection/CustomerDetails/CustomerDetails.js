import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import {Divider, Text, withTheme, Caption} from 'react-native-paper';
import {theme} from 'styles/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import UserAvatar from 'components/Atoms/UserAvatar';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import {getShadow} from 'utils';
import ScreenTitle from 'components/Atoms/ScreenTitle';

function RenderInfo({label, value}) {
  return (
    <View style={styles.infoContainer}>
      <Text>{label}:</Text>
      <Caption>{value}</Caption>
    </View>
  );
}

function CustomerDetails(props) {
  const {route, navigation} = props;
  const {customer, index} = route?.params || {};
  const {
    profile_pic,
    customer_first_name,
    customer_phone,
    customer_alternate_contact,
    customer_address,
    customer_age,
    customer_email,
    customer_occupation,
    customer_pan_file,
    customer_aadhar_file,
  } = customer;

  const navToAdd = () => {
    navigation.navigate('AddCustomer', {edit: 'true', ...route?.params});
  };

  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ProjectHeader {...props} />
        <ScreenTitle title={t('title_customer_details')} backIcon />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <View style={styles.detailsTopContainer}>
          <UserAvatar size={100} uri={profile_pic} />
          <Text style={styles.nameText}>{customer_first_name}</Text>
          <Caption>{index + 1} Member</Caption>
        </View>
        <Divider />
        <View style={styles.bottomDetails}>
          <RenderInfo label="Full Name" value={customer_first_name} />
          <RenderInfo label="Phone" value={`+91 ${customer_phone}`} />
          {customer_alternate_contact ? (
            <RenderInfo
              label="Alternate contact"
              value={`+91 ${customer_alternate_contact}`}
            />
          ) : null}
          <RenderInfo label="Email" value={customer_email} />
          <RenderInfo label="Address" value={customer_address} />
          <RenderInfo label="Age" value={customer_age} />
          <RenderInfo
            label="Occupation"
            value={!customer_occupation ? customer_occupation : '--'}
          />
          <View style={styles.infoContainer}>
            <Text>PAN No:</Text>
            <View style={styles.valueContainer}>
              <Caption numberOfLines={1}>{customer_pan_file}</Caption>
              <TouchableOpacity style={styles.openButton}>
                <MaterialCommunityIcons
                  name="paperclip"
                  color={theme.colors.primary}
                />
                <Caption style={{color: theme.colors.primary}}>
                  Open attachment
                </Caption>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <Text>Aadhaar No:</Text>
            <View style={styles.valueContainer}>
              <Caption numberOfLines={1}>{customer_aadhar_file}</Caption>
              <TouchableOpacity style={styles.openButton}>
                <MaterialCommunityIcons
                  name="paperclip"
                  color={theme.colors.primary}
                />
                <Caption style={{color: theme.colors.primary}}>
                  Open attachment
                </Caption>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.editButtonContainer}>
          <OpacityButton
            color={theme.colors.primary}
            style={styles.editButton}
            opacity={0.1}
            onPress={navToAdd}>
            <MaterialIcons name="edit" color={theme.colors.primary} />

            <Text style={styles.modifyButton}>Modify</Text>
          </OpacityButton>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#fff',
    marginHorizontal: -20,
    ...getShadow(2),
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  detailsTopContainer: {
    alignItems: 'center',
    padding: 15,
  },
  nameText: {
    marginTop: 10,
    fontSize: 18,
  },
  bottomDetails: {},
  infoContainer: {
    marginVertical: 10,
  },
  valueContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  openButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  editButtonContainer: {
    alignItems: 'flex-end',
  },
  editButton: {
    padding: 10,
  },
  modifyButton: {
    color: theme.colors.primary,
    marginLeft: 7,
  },
});

export default withTheme(CustomerDetails);

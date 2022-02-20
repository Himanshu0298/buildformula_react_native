import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import {Divider, Subheading, Text, withTheme, Caption} from 'react-native-paper';
import {theme} from 'styles/theme';
import backArrow from 'assets/images/back_arrow.png';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import UserAvatar from 'components/Atoms/UserAvatar';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import {getShadow} from 'utils';

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
  const {customer, unit} = route?.params || {};
  const {
    profile_pic,
    name,
    customer_first_name,
    customer_phone,
    role,
    customer_alternate_contact,
    customer_address,
    customer_age,
    customer_email,
    customer_occupation,
    customer_pan_file,
    customer_aadhar_file,
    user_id,
  } = customer;

  const {params} = route;

  const navToAdd = () => {
    navigation.navigate('AddCustomer', {edit: 'true', ...params});
  };

  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ProjectHeader {...props} />

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.titleContainer}>
          <Image source={backArrow} style={styles.backArrow} />
          <Subheading>{t('title_customer_details')}</Subheading>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
        <View style={styles.detailsTopContainer}>
          <UserAvatar size={100} uri={profile_pic} />
          <Text style={styles.nameText}>{name}</Text>
          <Caption>{role}</Caption>
        </View>
        <Divider />
        <View style={styles.bottomDetails}>
          <RenderInfo label="Full Name" value={customer_first_name} />
          <RenderInfo label="Phone" value={`+91 ${customer_phone}`} />
          <RenderInfo
            label="Alternate contact"
            value={customer_alternate_contact ? `+91 ${customer_alternate_contact}` : null}
          />
          <RenderInfo label="Email" value={customer_email} />
          <RenderInfo label="Address" value={customer_address} />
          <RenderInfo label="Age" value={customer_age} />
          <RenderInfo label="Occupation" value={customer_occupation} />
          <View style={styles.infoContainer}>
            <Text>PAN no:</Text>
            <View style={styles.valueContainer}>
              <Caption>{customer_pan_file}</Caption>
              <TouchableOpacity style={styles.openButton}>
                <MaterialCommunityIcons name="paperclip" color={theme.colors.primary} />
                <Caption style={{color: theme.colors.primary}}>Open attachment</Caption>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <Text>Aadhaar no:</Text>
            <View style={styles.valueContainer}>
              <Caption>{customer_aadhar_file}</Caption>
              <TouchableOpacity style={styles.openButton}>
                <MaterialCommunityIcons name="paperclip" color={theme.colors.primary} />
                <Caption style={{color: theme.colors.primary}}>Open attachment</Caption>
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

            <Text style={{color: theme.colors.primary, marginLeft: 7}}>Modify</Text>
          </OpacityButton>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  headerContainer: {
    backgroundColor: '#fff',
    marginHorizontal: -20,
    ...getShadow(2),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  backArrow: {
    height: 25,
    width: 25,
    marginRight: 5,
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
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default withTheme(CustomerDetails);

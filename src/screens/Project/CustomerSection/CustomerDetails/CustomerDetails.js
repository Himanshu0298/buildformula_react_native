import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {
  Divider,
  Subheading,
  Text,
  withTheme,
  Avatar,
  Caption,
} from 'react-native-paper';
import {secondaryTheme, theme} from 'styles/theme';
import backArrow from 'assets/images/back_arrow.png';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';

function RenderInfo({label, value}) {
  return (
    <View style={styles.infoContainer}>
      <Text theme={secondaryTheme}>{label}:</Text>
      <Caption theme={secondaryTheme}>{value}</Caption>
    </View>
  );
}

function CustomerDetails(props) {
  const {route, navigation} = props;
  const {customer} = route?.params || {};
  const {profile_pic, name, role} = customer;

  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
        stickyHeaderIndices={[0]}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.titleContainer}>
            <Image source={backArrow} style={styles.backArrow} />
            <Subheading theme={secondaryTheme}>
              {t('title_customer_details')}
            </Subheading>
          </TouchableOpacity>
        </View>
        <View style={styles.detailsTopContainer}>
          <Avatar.Image
            size={100}
            source={{
              uri: profile_pic,
            }}
          />
          <Text style={styles.nameText} theme={secondaryTheme}>
            {name}
          </Text>
          <Caption theme={secondaryTheme}>{role}</Caption>
        </View>
        <Divider />
        <View style={styles.bottomDetails}>
          <RenderInfo label={'Full Name'} value={name} />
          <RenderInfo label={'Phone'} value={'+91 9800 56789'} />
          <RenderInfo label={'Alternate contact'} value={'+91 9800 56789'} />
          <RenderInfo label={'Email'} value={'jamesparker@xyz.com'} />
          <RenderInfo
            label={'Address'}
            value={'P 137, Pilanji, Sarojini Nagar, xyz lane, New Delhi'}
          />
          <RenderInfo label={'Age'} value={'17 yrs'} />
          <RenderInfo label={'Occupation'} value={'Business'} />
          <View style={styles.infoContainer}>
            <Text theme={secondaryTheme}>PAN no:</Text>
            <View style={styles.valueContainer}>
              <Caption theme={secondaryTheme}>1234567890</Caption>
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
            <Text theme={secondaryTheme}>Aadhaar no:</Text>
            <View style={styles.valueContainer}>
              <Caption theme={secondaryTheme}>1234567890</Caption>
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
            opacity={0.1}>
            <MaterialIcons name="edit" color={theme.colors.primary} />
            <Text style={{color: theme.colors.primary, marginLeft: 7}}>
              Modify
            </Text>
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
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
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
});

export default withTheme(CustomerDetails);

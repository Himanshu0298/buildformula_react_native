import * as React from 'react';
import {Caption, Divider, Subheading, withTheme} from 'react-native-paper';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import {theme} from 'styles/theme';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserImage from 'assets/images/approvalUser.png';
import UserIcon from 'assets/images/requestedUser.png';

const DATA = [1, 2, 3];

const RequestedUser = props => {
  const {remark, approved, approvedBy} = props;
  return (
    <View>
      <View style={styles.renderContainer}>
        <View>
          <Image source={UserIcon} style={styles.requestedImage} />
        </View>
        <View style={styles.userData}>
          <View>
            {approved ? (
              <Text style={styles.userText}>Jasmin Kacha</Text>
            ) : approvedBy ? (
              <Caption>Pending Response</Caption>
            ) : (
              <Caption>Requested by</Caption>
            )}

            {approved ? (
              <View style={styles.statusContainer}>
                <Ionicons name="ios-checkmark-circle" size={18} color="green" />
                <Text style={styles.statusText}> Approved</Text>
              </View>
            ) : null}
          </View>
          <View>
            <Caption>15 Apr,2022</Caption>
          </View>
        </View>
      </View>
      {remark ? (
        <Text style={styles.userComments}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
          doloribus culpa ex expedita provident quae dolorum modi error autem
          neque? Voluptatum mollitia nesciunt at? Perferendis.
        </Text>
      ) : null}
    </View>
  );
};

const RenderImages = () => {
  return (
    <View style={styles.images}>
      <Image source={UserImage} />
    </View>
  );
};

const ListingDescription = () => {
  return (
    <View style={styles.descriptionContainer}>
      <Text style={styles.descriptionText}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste omnis
        natus possimus commodi, impedit provident asperiores, cum dicta eius
        repellat nemo tempore rem magni sit?
      </Text>
      <View style={styles.date}>
        <Text>Due Date:</Text>
        <Text style={styles.dateText}>15 Apr,2022</Text>
      </View>
      <View style={styles.visitor}>
        <Text>Linked Visitor:</Text>
        <Text style={styles.visitorName}>Akash Patel</Text>
      </View>
      <View style={styles.imageContainer}>
        {DATA.map(item => {
          return <RenderImages item={item} />;
        })}
      </View>
    </View>
  );
};

function ApprovalListing(props) {
  const {navigation} = props;
  return (
    <ScrollView style={styles.formContainer}>
      <View style={styles.button}>
        <OpacityButton
          opacity={0.1}
          color={theme.colors.primary}
          style={styles.backButton}
          onPress={navigation.goBack}>
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={18}
            color="black"
          />
        </OpacityButton>
        <Subheading style={styles.subheading}>Approval listing</Subheading>
      </View>
      <ListingDescription />
      <Divider style={styles.divider} />
      <RequestedUser />
      <Divider style={styles.divider} />
      <RequestedUser remark approvedBy />
      <Divider style={styles.divider} />
      <RequestedUser remark approved />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 5,
  },
  subheading: {
    color: theme.colors.primary,
  },

  backButton: {
    borderRadius: 50,
    marginRight: 7,
  },

  button: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    padding: 10,
  },
  images: {
    marginTop: 15,
    marginRight: 10,
  },
  descriptionContainer: {
    flexGrow: 1,
    padding: 10,
  },
  descriptionText: {
    color: '#000',
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  dateText: {
    marginLeft: 5,
    color: '#000',
  },
  visitor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  visitorName: {
    marginLeft: 5,
    color: theme.colors.primary,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 2,
    marginTop: 5,
  },
  renderContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  requestedImage: {
    marginRight: 10,
  },
  userData: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexGrow: 1,
  },
  userComments: {
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  userText: {
    color: '#000',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  statusText: {
    color: 'green',
  },
});

export default withTheme(ApprovalListing);

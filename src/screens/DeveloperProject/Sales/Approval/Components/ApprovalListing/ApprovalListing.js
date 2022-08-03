import * as React from 'react';
import {Caption, Divider, Subheading, withTheme} from 'react-native-paper';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {theme} from 'styles/theme';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import UserAvatar from 'components/Atoms/UserAvatar';
import ImageView from 'react-native-image-viewing';
import {useState, useEffect} from 'react';
import {isNumber} from 'lodash';

const RequestedUser = props => {
  const {requested_user_id, created, approver_info} = props;

  return (
    <View style={styles.renderContainer}>
      <UserAvatar
        size={30}
        uri={approver_info?.profile_url}
        style={styles.requestedImage}
      />

      <View style={styles.userData}>
        <View>
          <Caption>Requested by</Caption>
          <Text>{requested_user_id}</Text>
        </View>
        <View>
          <Caption> {dayjs(created).format('MMMM D, YYYY h:mm A')}</Caption>
        </View>
      </View>
    </View>
  );
};

const ListingDescription = props => {
  const {description, due_date, visitors_details, userDetails} = props;
  const {first_name, last_name} = visitors_details || {};

  const [imageIndex, setImageIndex] = useState(false);

  const userImages = React.useMemo(() => {
    return userDetails?.map(i => ({uri: i.file_url}));
  }, [userDetails]);

  return (
    <View style={styles.descriptionContainer}>
      <ImageView
        images={userImages}
        imageIndex={imageIndex}
        visible={isNumber(imageIndex)}
        onRequestClose={() => setImageIndex(false)}
      />
      <Text style={styles.descriptionText}>{description}</Text>
      <View style={styles.date}>
        <Text>Due Date:</Text>
        <Text style={styles.dateText}>
          {dayjs(due_date).format('MMMM D, YYYY')}
        </Text>
      </View>
      <View style={styles.visitor}>
        <Text>Linked Visitor:</Text>
        <Text style={styles.visitorName}>
          {first_name ? `${first_name} ${last_name}` : ''}
        </Text>
      </View>
      <View style={styles.imageContainer}>
        {userImages?.map((image, index) => (
          <TouchableOpacity
            style={styles.imageIconContainer}
            onPress={() => setImageIndex(index)}>
            <Image source={image} style={styles.imageIcon} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

function ApprovalListing(props) {
  const {navigation, route} = props;
  const {id: approval_id} = route.params || {};

  const {approvalDetails} = useSalesActions();

  const {selectedProject} = useSelector(s => s.project);
  const {approvalsDetails} = useSelector(s => s.sales);

  const {
    visitors_details,
    approver_info,
    record_docs: userDetails,
  } = approvalsDetails;

  const projectId = selectedProject.id;

  useEffect(() => {
    approvalDetails({project_id: projectId, booking_approval_id: approval_id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

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
      <ListingDescription
        {...route.params}
        visitors_details={visitors_details}
        userDetails={userDetails}
      />
      <Divider style={styles.divider} />
      <RequestedUser {...route.params} approver_info={approver_info} />
      <Divider style={styles.divider} />
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
    marginVertical: 10,
  },
  dateText: {
    marginLeft: 5,
    color: '#000',
    fontWeight: '600',
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
    marginRight: 15,
  },
  userData: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexGrow: 1,
  },
  imageIcon: {
    height: 50,
    width: 50,
  },
  imageIconContainer: {
    marginTop: 10,
  },
});

export default withTheme(ApprovalListing);

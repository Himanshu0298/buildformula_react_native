import * as React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Caption, Divider, Subheading, Text} from 'react-native-paper';

import {useState} from 'react';

import ActionButtons from 'components/Atoms/ActionButtons';
import RenderSelect from 'components/Atoms/RenderSelect';

import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/FontAwesome';
import {theme} from 'styles/theme';
import {ScrollView} from 'react-native-gesture-handler';
import {getShadow} from 'utils';
import profile from '../../../../assets/images/profile.png';
import app_logo from '../../../../assets/images/app_logo.png';

const statusOptions = [
  'REVIEWED',
  'CANCELED BY CUSTOMER',
  'CONFIRMED BY CUSTOMER',
  'REJECTED',
  'APPROVED',
];

const ModifyTicketNumber = () => {
  return (
    <View style={styles.contentContainer}>
      <View style={styles.messageContainer}>
        <View>
          <OpacityButton opacity={0.1} borderRadius={30}>
            <Icons
              styles={styles.ticket}
              name="ticket"
              size={27}
              color={theme.colors.primary}
            />
          </OpacityButton>
        </View>

        <View style={styles.ticketNumber}>
          <Text style={styles.userName}>325415698</Text>
          <Text>Creating project issue</Text>
          <Text style={styles.text}>
            Hello sir I want to know how to create project in the system
          </Text>
          {/* <img src={profile} alt="logo" /> */}
          <View style={styles.userImage}>
            {Array(4)
              .fill(0)
              .map(item => {
                return <Image source={profile} style={styles.userProfile} />;
              })}
          </View>
        </View>
      </View>
    </View>
  );
};

const Chat = () => {
  return (
    <View>
      <Subheading style={styles.heading}>Conversation</Subheading>
      <View style={styles.contentContainer}>
        <View style={styles.messageContainer}>
          <View>
            <OpacityButton opacity={0.1} borderRadius={30}>
              <MaterialCommunityIcons
                styles={styles.ticket}
                name="account-circle"
                size={27}
                color={theme.colors.primary}
              />
            </OpacityButton>
          </View>
          <View style={styles.messageBodyContainer}>
            <Text style={styles.userName}>Param Mehta</Text>
            <Text>Yesterday 7:30PM </Text>
            <Text style={styles.text}>
              Hello sir I want to know how to create project in the system
            </Text>
          </View>
        </View>
        <Divider />
        <View style={styles.messageContainer}>
          <View>
            <OpacityButton opacity={0.1} borderRadius={30}>
              <Image source={app_logo} style={styles.image} />
            </OpacityButton>
          </View>
          <View style={styles.messageBodyContainer}>
            <Text style={styles.userName}>Param Mehta</Text>
            <Text>Yesterday 8:00PM </Text>
            <Text style={styles.text}>
              Hi Param, Sorry to hear about your issue Can you please log out
              and login again that will fix your issue
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const Comment = () => {
  return (
    <View style={styles.bottomContainer}>
      <View>
        <OpacityButton
          opacity={0.1}
          color={theme.colors.primary}
          style={styles.commentButton}>
          <Text>Add New Comment</Text>
        </OpacityButton>
      </View>
      <View>
        <OpacityButton opacity={0.1} borderRadius={30}>
          <MaterialCommunityIcons
            name="send"
            size={20}
            color={theme.colors.primary}
            style={{padding: 10}}
          />
        </OpacityButton>
      </View>
    </View>
  );
};

const ModifyRequestDetails = () => {
  const [edit, setEdit] = useState(false);
  const [status, setStatus] = useState();

  const onPressEdit = () => {
    setEdit(true);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Subheading style={styles.heading}>Modify Requests</Subheading>
        <View style={styles.contentContainer}>
          <View style={styles.row}>
            <View style={styles.userData}>
              <Text>Property Details</Text>
              <Caption>3</Caption>
            </View>
            <View style={styles.userData}>
              <Text>Created On </Text>
              <Caption>10/12/2021</Caption>
            </View>
          </View>
          <Text style={styles.userData}>Status</Text>

          <View>
            {!edit ? (
              <View>
                <Caption>Approved</Caption>
                <View style={styles.OpacityButton}>
                  <OpacityButton opacity={0.2} onPress={onPressEdit}>
                    <MaterialCommunityIcons
                      name="pencil"
                      size={14}
                      color={theme.colors.primary}
                    />
                    <Text style={styles.editButton}>Edit</Text>
                  </OpacityButton>
                </View>
              </View>
            ) : (
              <View>
                <RenderSelect
                  name="Modify Request"
                  label="Status"
                  value={status}
                  options={statusOptions}
                  onSelect={setStatus}
                />
                <ActionButtons
                  style={styles.actionButton}
                  cancelLabel="CANCEL"
                  submitLabel="SAVE"
                  onCancel={() => setEdit(false)}
                  onSubmit={() => setEdit(false)}
                />
              </View>
            )}
          </View>
        </View>
        <ModifyTicketNumber />
        <Chat />
        <Comment />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 15,
  },
  contentContainer: {
    backgroundColor: '#FFF',
    ...getShadow(3),
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginBottom: 20,
  },
  OpacityButton: {
    width: 80,
    marginTop: 20,
  },
  ticket: {
    width: 50,
    marginTop: 30,
    alignSelf: 'flex-start',
  },
  ticketNumber: {
    marginLeft: 10,
  },
  commentButton: {
    borderRadius: 50,
    width: 250,
    height: 50,
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  messageBodyContainer: {
    marginLeft: 10,
  },
  heading: {
    marginTop: 10,
    marginBottom: 10,
  },
  userName: {
    fontWeight: 'bold',
  },
  text: {
    marginTop: 10,
  },
  userData: {
    flex: 1,
    marginTop: 20,
  },
  editButton: {
    color: theme.colors.primary,
    marginLeft: 5,
  },
  actionButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    borderRadius: 10,
    marginRight: 5,
    width: 20,
    height: 20,
  },
  userImage: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  userProfile: {
    borderRadius: 10,
    marginRight: 5,
  },
});

export default ModifyRequestDetails;

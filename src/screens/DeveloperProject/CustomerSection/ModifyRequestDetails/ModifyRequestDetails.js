import * as React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {
  Caption,
  Divider,
  Subheading,
  Text,
  TextInput,
} from 'react-native-paper';

import {useState, useEffect} from 'react';

import ActionButtons from 'components/Atoms/ActionButtons';
import RenderSelect from 'components/Atoms/RenderSelect';

import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/FontAwesome';
import {theme} from 'styles/theme';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {getShadow} from 'utils';
import RenderInput from 'components/Atoms/RenderInput';
import useCustomerActions from 'redux/actions/customerActions';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import {MODIFY_REQUEST_STATUS} from 'utils/constant';
import profile from '../../../../assets/images/profile.png';
import app_logo from '../../../../assets/images/app_logo.png';

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
  const [text, setText] = React.useState('');
  return (
    <View style={styles.bottomContainer}>
      <View style={styles.inputContainer}>
        <RenderInput
          placeholder="Add New Comment"
          value={text}
          onChangeText={t => setText(t)}
          right={
            <TextInput.Icon name="attachment" color={theme.colors.primary} />
          }
        />
      </View>
      <View>
        <TouchableOpacity>
          <OpacityButton
            opacity={0.1}
            borderRadius={30}
            style={styles.sendIcon}>
            <MaterialCommunityIcons
              name="send"
              size={18}
              color={theme.colors.primary}
            />
          </OpacityButton>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ModifyRequestDetails = props => {
  const {route} = props;
  const {id, unit, project_id} = route?.params || {};

  const {
    getModifyRequests,
    getModifyRequestDetails,
    updateModifiedRequestStatus,
  } = useCustomerActions();

  const {modifyRequest} = useSelector(s => s.customer);
  const {propertyDetails} = modifyRequest || {};

  const [edit, setEdit] = useState(false);
  const [status, setStatus] = useState();

  useEffect(() => {
    if (id) {
      loadRequestData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const statusOptions = React.useMemo(() => {
    return Object.keys(MODIFY_REQUEST_STATUS).map(key => ({
      label: MODIFY_REQUEST_STATUS[key].label,
      value: key,
    }));
  }, []);

  const loadRequestData = () =>
    getModifyRequestDetails({
      project_id,
      project_modify_request_id: id,
      unit_id: unit.unit_id,
    });

  const toggleEdit = () => setEdit(v => !v);

  const handleStatusUpdate = async () => {
    toggleEdit();
    setStatus();
    await updateModifiedRequestStatus({
      project_id,
      project_modify_request_id: id,
      unit_id: unit.unit_id,
      request_status: status,
    });
    loadRequestData();
    getModifyRequests({project_id, unit_id: unit.unit_id});
  };

  const requestStatus =
    MODIFY_REQUEST_STATUS[propertyDetails?.request_status]?.label;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Subheading style={styles.heading}>Modify Requests</Subheading>
        <View style={styles.contentContainer}>
          <View style={styles.row}>
            <View style={styles.userData}>
              <Text>Property Details</Text>
              <Caption>{propertyDetails?.id}</Caption>
            </View>
            <View style={styles.userData}>
              <Text>Created On </Text>
              <Caption>
                {dayjs(propertyDetails?.created).format('DD MMM YYYY, hh:mm A')}
              </Caption>
            </View>
          </View>

          <View>
            {!edit ? (
              <View>
                <Text style={styles.userData}>Status</Text>
                <Caption style={styles.statusValue}>{requestStatus}</Caption>
                <View style={styles.OpacityButton}>
                  <OpacityButton opacity={0.2} onPress={toggleEdit}>
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
                  value={status || propertyDetails?.request_status}
                  options={statusOptions}
                  onSelect={setStatus}
                />
                <ActionButtons
                  style={styles.actionButton}
                  cancelLabel="CANCEL"
                  submitLabel="SAVE"
                  onCancel={toggleEdit}
                  onSubmit={handleStatusUpdate}
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
  inputContainer: {
    flexGrow: 1,
    marginRight: 10,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
  sendIcon: {
    padding: 11,
    marginTop: 4,
  },
  statusValue: {
    textTransform: 'capitalize',
  },
});

export default ModifyRequestDetails;

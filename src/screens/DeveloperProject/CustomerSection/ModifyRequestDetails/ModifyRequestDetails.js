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
import {MODIFY_REQUEST_STATUS} from 'utils/constant';
import dayjs from 'dayjs';
import RenderHtml from 'react-native-render-html';
import Layout from 'utils/Layout';

const relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(relativeTime);

const ModifyTicket = props => {
  const {modifyRequest} = props;
  const {id, title, description} = modifyRequest?.propertyDetails || {};

  return (
    <View style={styles.cardContainer}>
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
          <Text style={styles.userName}>{id}</Text>
          <Caption>Modify Request</Caption>

          <Text style={styles.issueContainer}>{title}</Text>

          <Text style={styles.text}>{description}</Text>
          <View style={styles.userImage}>
            {modifyRequest?.cs_modify_request_documents?.map(item => {
              return (
                <Image
                  style={styles.documentImage}
                  height={40}
                  width={40}
                  source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                    // uri: item.file_url,
                  }}
                />
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

const Chat = props => {
  const {modifyRequest} = props;

  return (
    <View>
      <Subheading style={styles.heading}>Conversation</Subheading>
      <View style={styles.cardContainer}>
        {modifyRequest?.cs_modify_request_conversations?.map(conversation => {
          const {created, description, user_info} = conversation;
          const {user_full_name, profile_url} = user_info;
          const isHtml =
            description?.includes('<') && description?.includes('>');

          return (
            <View style={styles.messageContainer}>
              <View>
                <OpacityButton opacity={0.1} borderRadius={30}>
                  {/* <MaterialCommunityIcons
                    styles={styles.ticket}
                    name="account-circle"
                    size={27}
                    color={theme.colors.primary}
                  /> */}
                  <Image
                    style={styles.documentImage}
                    height={30}
                    width={30}
                    source={{
                      uri: profile_url,
                      // uri: item.file_url,
                    }}
                  />
                </OpacityButton>
              </View>
              <View style={styles.messageBodyContainer}>
                <Text style={styles.userName}>{user_full_name}</Text>
                <Text>{dayjs(created).fromNow()}</Text>
                {!isHtml ? (
                  <Text style={styles.text}>{description}</Text>
                ) : (
                  <RenderHtml
                    source={{html: description}}
                    contentWidth={Layout.window.width}
                  />
                )}
              </View>
            </View>
          );
        })}
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
  console.log('modify request', modifyRequest);
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
    <View style={styles.container}>
      <Subheading style={styles.heading}>Modify Requests</Subheading>
      <View style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>
            <View style={styles.cardContainer}>
              <View style={styles.row}>
                <View style={styles.userData}>
                  <Text>Property Type</Text>
                  <Caption>Apartment</Caption>
                </View>
                <View style={styles.userData}>
                  <Text> Unit</Text>
                  <Caption>A-502</Caption>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.userData}>
                  <Text>Customer Name</Text>
                  <Caption>ABCDEFGHI</Caption>
                </View>
                <View style={styles.userData}>
                  <Text> Customer Mobile</Text>
                  <Caption>7327621621</Caption>
                </View>
              </View>

              <View>
                {!edit ? (
                  <View>
                    <Text style={styles.userData}>Status</Text>
                    <Caption style={styles.statusValue}>
                      {requestStatus}
                    </Caption>
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
            <ModifyTicket modifyRequest={modifyRequest} />
            {modifyRequest?.cs_modify_request_conversations?.length ? (
              <Chat modifyRequest={modifyRequest} />
            ) : null}
          </View>
        </ScrollView>
      </View>

      <Comment />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 15,
  },
  contentContainer: {
    flexGrow: 1,
    marginTop: 5,
  },
  cardContainer: {
    backgroundColor: '#FFF',
    ...getShadow(3),
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginHorizontal: 2,
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
  userImage: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  documentImage: {
    borderRadius: 5,
  },
  sendIcon: {
    padding: 11,
    marginTop: 4,
  },
  statusValue: {
    textTransform: 'capitalize',
  },
  issueContainer: {
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default ModifyRequestDetails;

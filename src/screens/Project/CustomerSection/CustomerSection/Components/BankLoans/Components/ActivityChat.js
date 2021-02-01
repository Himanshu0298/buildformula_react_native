import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Subheading} from 'react-native-paper';
import {theme} from 'styles/theme';
import Modal from 'react-native-modal';
import {
  Avatar,
  Bubble,
  MessageText,
  GiftedChat,
  Send,
  InputToolbar,
} from 'react-native-gifted-chat';
import DefaultAvatar from 'assets/images/chat_avatar.png';

function renderBubble(props) {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          borderRadius: 7,
        },
        right: {
          borderRadius: 7,
          backgroundColor: '#f0f0f0',
        },
      }}
      textStyle={{
        right: {
          color: '#000',
        },
      }}
      timeTextStyle={{
        right: {color: '#000'},
      }}
    />
  );
}

function renderAvatar(props) {
  return (
    <Avatar
      {...props}
      imageStyle={{left: {height: 30, width: 30}, right: {}}}
    />
  );
}

function renderMessageText(props) {
  return (
    <MessageText {...props} customTextStyle={{fontSize: 13, lineHeight: 13}} />
  );
}

const renderInputToolbar = (props) => (
  <InputToolbar
    {...props}
    containerStyle={{
      borderWidth: 2,
      borderTopWidth: 2,
      borderTopColor: 'rgba(4, 29, 54, 0.1)',
      borderColor: 'rgba(4, 29, 54, 0.1)',
    }}
  />
);

function renderSend(props) {
  return (
    <Send {...props} containerStyle={{borderWidth: 0}}>
      <IconButton icon="send" color="#5E6D7C" />
    </Send>
  );
}

function ActivityChatModal({open, handleClose}) {
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    setMessages([
      {
        _id: '83dcf918-5232-4472-a549-402fd87596f6',
        createdAt: '2021-02-01T01:39:42.802Z',
        text: 'Please go through the documentation carefully',
        user: {_id: 1},
      },
      {
        _id: 1,
        createdAt: '2021-02-01T01:39:35.497Z',
        text: 'Hello developer',
        user: {_id: 2, avatar: DefaultAvatar, name: 'User24 commented'},
      },
    ]);
  }, []);

  const onSend = React.useCallback((msgs = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, msgs),
    );
  }, []);

  console.log('-----> messages', messages);
  return (
    <Modal
      isVisible={open}
      backdropOpacity={0.4}
      onBackButtonPress={handleClose}
      onBackdropPress={handleClose}
      style={{justifyContent: 'flex-end', margin: 0}}>
      <View style={styles.sheetContainer}>
        <View style={styles.closeContainer}>
          <IconButton
            icon="close-circle"
            size={25}
            onPress={handleClose}
            color="grey"
          />
        </View>
        <Subheading
          style={{
            color: theme.colors.primary,
            marginBottom: 10,
            marginLeft: 10,
          }}>
          BANK LOAN ACTIVITY
        </Subheading>
        <GiftedChat
          messages={messages}
          onSend={onSend}
          alwaysShowSend
          renderAvatarOnTop
          renderUsernameOnMessage
          placeholder="Write a comment"
          renderSend={renderSend}
          renderBubble={renderBubble}
          renderAvatar={renderAvatar}
          renderMessageText={renderMessageText}
          renderInputToolbar={renderInputToolbar}
          renderChatFooter={() => <View style={{height: 10}} />}
          user={{_id: 1}}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  sheetContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    minHeight: '90%',
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  closeContainer: {
    alignItems: 'flex-end',
  },
});

export default ActivityChatModal;

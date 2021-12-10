import React from 'react';
import {Avatar} from 'react-native-paper';
import UserPic from 'assets/images/customer.png';

function UserAvatar(props) {
  const {size, uri} = props;
  return <Avatar.Image size={size} source={uri ? {uri} : UserPic} />;
}

export default UserAvatar;

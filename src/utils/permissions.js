import {Platform} from 'react-native';
import {
  check,
  checkNotifications,
  PERMISSIONS,
  request,
  requestNotifications,
  RESULTS,
} from 'react-native-permissions';

const PERMISSION_MAP = {
  fileRead: {
    android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  },
  fileWrite: {
    android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ios: PERMISSIONS.IOS.MEDIA_LIBRARY,
  },
};

export const checkPermission = async permission => {
  try {
    if (permission === 'notification') {
      const {status} = await checkNotifications();
      return status;
    }
    return check(PERMISSION_MAP[permission][Platform.OS]);
  } catch (error) {
    return RESULTS.DENIED;
  }
};

export const requestPermission = async permission => {
  try {
    if (permission === 'notification') {
      const {status} = await requestNotifications(['alert', 'sound']);
      return status;
    }
    return request(PERMISSION_MAP[permission][Platform.OS]);
  } catch (error) {
    return RESULTS.DENIED;
  }
};

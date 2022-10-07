import {debounce} from 'lodash';
import {Platform} from 'react-native';
import {store} from 'redux/store';
import {DEFAULT_ADMIN_PERMISSIONS} from './constant';

const shadowsArray = {
  0: {
    ios: {
      shadowColor: null,
      shadowOffset: null,
      shadowOpacity: null,
      shadowRadius: null,
    },
    android: {
      elevation: 0,
    },
  },
  1: {
    ios: {
      shadowColor: '#222',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
    },
    android: {
      elevation: 1,
    },
  },
  2: {
    ios: {
      shadowColor: '#222',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
    },
    android: {
      elevation: 2,
    },
  },
  3: {
    ios: {
      shadowColor: '#222',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
    },
    android: {
      elevation: 3,
    },
  },
  4: {
    ios: {
      shadowColor: '#222',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
    },
    android: {
      elevation: 4,
    },
  },
  5: {
    ios: {
      shadowColor: '#222',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    android: {
      elevation: 5,
    },
  },
};

export const getShadow = elevation => shadowsArray[elevation][Platform.OS];

export function getTowerLabel(i) {
  i -= 1;
  return (
    (i >= 26 ? getTowerLabel(Math.floor(i / 26) - 1) : '') +
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[i % 26]
  );
}

export function getFloorNumber(i) {
  i = parseInt(i, 10);
  const j = i % 10;
  const k = i % 100;
  let floor;
  if (j === 1 && k !== 11) {
    floor = `${i}st`;
  } else if (j === 2 && k !== 12) {
    floor = `${i}nd`;
  } else if (j === 3 && k !== 13) {
    floor = `${i}rd`;
  } else {
    floor = `${i}th`;
  }

  if (i === 0) {
    return 'Ground Floor';
  }

  return `${floor} Floor`;
}

export const getUnitLabel = (floor, unit) => {
  if (unit.length === 3) {
    return unit;
  }
  return `${floor}${unit.toString().padStart(2, '0')}`;
};

export function getInitialScreen(authenticated, user = {}) {
  const {id, otp_verified, email_verified} = user;
  if (authenticated) {
    // if (project.id) {
    //   return 'ProjectStructureStepOne';
    // }
    return 'GeneralDashboard';
  }
  if (id) {
    if (otp_verified === 'N' || email_verified === 'N') {
      return 'Otp';
    }
  }
  return 'Login';
}

export function addOpacity(color, opacity) {
  return color ? `${color?.split(')')[0]},${opacity})` : undefined;
}

export function round(num, decimalPlaces = 2) {
  num = parseFloat(num);
  num = Math.round(`${num}e${decimalPlaces}`);
  const result = Number(`${num}e${-decimalPlaces}`);
  return result;
}

export function handleDebounce(func) {
  return debounce(func, 2000, {leading: true, trailing: false});
}

export function getPermissions(moduleTitle) {
  const {permissions, isProjectAdmin, commonData} = store.getState().project;
  const {submodules = []} = commonData || {};

  if (isProjectAdmin) {
    return DEFAULT_ADMIN_PERMISSIONS;
  }

  const moduleData = submodules.find(i => i.title === moduleTitle);

  if (moduleData) {
    const modulePermissions = permissions[moduleData?.id];
    return modulePermissions;
  }

  return false;
}

export function getCountryCode(numbers) {
  const regex = /(\+91)/g;
  if (numbers) {
    return numbers.match(regex)?.[0];
  }
  return false;
}

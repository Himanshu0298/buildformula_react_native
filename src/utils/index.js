import {Platform} from 'react-native';

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

export const getShadow = (elevation) => shadowsArray[elevation][Platform.OS];

export const getTowerLabel = (i) => String.fromCharCode(64 + parseInt(i, 10));

export function getFloorNumber(i) {
  i = parseInt(i, 10);
  var j = i % 10,
    k = i % 100;
  let floor;
  if (j === 1 && k !== 11) {
    floor = i + 'st';
  } else if (j === 2 && k !== 12) {
    floor = i + 'nd';
  } else if (j === 3 && k !== 13) {
    floor = i + 'rd';
  } else {
    floor = i + 'th';
  }

  if (i === 0) {
    return 'Ground Floor';
  }

  return `${floor} Floor`;
}

export const processError = (error) => {
  const {response} = error;
  let errorMessage;
  if (response) {
    errorMessage = response && response.data && response.data.msg;
  }

  errorMessage = errorMessage || error.message;
  return errorMessage;
};

export const processResponse = (response) => {
  const {data} = response;

  if (data.status) {
    return data;
  } else {
    throw {response};
  }
};

export const getUnitLabel = (floor, unit) => {
  return `${floor}${unit.toString().padStart(2, '0')}`;
};

export function getInitialAuthScreen({user: {user}, project: {project}}) {
  const {id, otp_verified, email_verified, default_role_id} = user;
  if (id) {
    if (otp_verified === 'N' || email_verified === 'N') {
      return 'Otp';
    } else if (default_role_id === 0) {
      return 'RoleSelect';
    } else if (project.project_id) {
      return 'ProjectStructureStepOne';
    } else if (!project.project_id) {
      return 'ProjectCreationStepOne';
    } else {
      return 'ProjectStructureStepOne';
    }
  } else {
    return 'Login';
  }
}

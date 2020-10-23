export const SITE_URL = 'http://34.67.24.115';
// export const SITE_URL = 'http://vshwanbuild.in';
export const BASE_API_URL = `${SITE_URL}/api/`;

export const PHONE_REGEX = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const PAN_REGEX = /^([a-zA-Z]([a-zA-Z]([a-zA-Z]([a-zA-Z]([a-zA-Z]([0-9]([0-9]([0-9]([0-9]([a-zA-Z])?)?)?)?)?)?)?)?)?)?$/;
export const GST_REGEX = /[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[1-9A-Z]{1}$/;

export const MAX_TOWERS = 26;
export const MAX_FLOORS = 100;
export const MAX_UNITS = 50;

export const DEFAULT_STRUCTURE = {
  1: {
    towerCount: undefined,
    towers: {},
  },
  2: {
    towerCount: undefined,
    towers: {},
  },
  3: {
    towerCount: undefined,
    towers: {},
  },
  4: {
    unitCount: undefined,
    units: {},
  },
  5: {
    unitCount: undefined,
    units: {},
  },
};

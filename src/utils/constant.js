import {theme} from 'styles/theme';

export const SITE_URL = 'http://34.71.16.148';
// export const SITE_URL = 'http://35.232.251.130';
// export const SITE_URL = 'http://vshwanbuild.in';
export const BASE_API_URL = `${SITE_URL}/api/`;

export const PHONE_REGEX = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const PAN_REGEX = /^([a-zA-Z]([a-zA-Z]([a-zA-Z]([a-zA-Z]([a-zA-Z]([0-9]([0-9]([0-9]([0-9]([a-zA-Z])?)?)?)?)?)?)?)?)?)?$/;
export const GST_REGEX = /[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[1-9A-Z]{1}$/;

export const MAX_TOWERS = 26;
export const MAX_FLOORS = 100;
export const MAX_UNITS = {1: 99, 2: 99, 3: 99, 4: 1000, 5: 1000};
export const MAX_BUNGALOW_UNITS = 99;

export const DEFAULT_STRUCTURE = {
  1: {towerCount: undefined, towers: {}},
  2: {towerCount: undefined, towers: {}},
  3: {towerCount: undefined, towers: {}},
  4: {unitCount: undefined, units: {}},
  5: {unitCount: undefined, units: {}},
};

export const STRUCTURE_TYPE_LABELS = {
  2: 'Shops',
  3: 'Offices',
  1: 'Apartments',
  4: 'Bungalows',
  5: 'Plots',
};

export const PRIORITY_COLORS = {
  low: theme.colors.success,
  medium: theme.colors.warning,
  high: 'rgba(255, 93, 93, 1)',
};

export const COLORS = {
  primaryLight: 'rgba(72,114,244,0.3)',
  deleteLight: 'rgba(255,93,93,0.2)',
};

export const APP_BOTTOM_TAB_HEIGHT = 50;

export const BHK_OPTIONS = [
  {type: 1, color: 'rgba(244,175,72)'},
  {type: 2, color: 'rgba(134, 134, 134)'},
  {type: 3, color: 'rgba(72, 161, 244)'},
  {type: 4, color: 'rgba(149, 100, 100)'},
  {type: 5, color: 'rgba(168, 72, 244)'},
  {type: 6, color: 'rgba(0, 205, 205)'},
  {type: 7, color: 'rgba(99, 149, 104)'},
];

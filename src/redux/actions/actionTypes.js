// For App
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const LOGOUT = 'LOGOUT';
export const SET_TIMER = 'SET_TIMER';

// For Auth/User
export const LOGIN = 'LOGIN';
export const SIGN_UP_INIT = 'SIGN_UP_INIT';
export const SIGN_UP = 'SIGN_UP';
export const SEND_OTP = 'SEND_OTP';
export const VERIFY_OTP = 'VERIFY_OTP';
export const SELECT_ROLE = 'SELECT_ROLE';
export const UPDATE_USER = 'UPDATE_USER';
export const SEND_FORGET_PASSWORD_OTP = 'SEND_FORGET_PASSWORD_OTP';

// For Notifications
export const GET_ALL_NOTIFICATIONS = 'GET_ALL_NOTIFICATIONS';
export const GET_PROJECT_NOTIFICATIONS = 'GET_PROJECT_NOTIFICATIONS';
export const REMOVE_ALL_NOTIFICATIONS = 'REMOVE_ALL_NOTIFICATIONS';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

// For Project
export const GET_SELECTED_PROJECT = 'GET_SELECTED_PROJECT';
export const GET_PROJECT_PERMISSIONS = 'GET_PROJECT_PERMISSIONS';
export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_PROJECT_COMMON_DATA = 'GET_PROJECT_COMMON_DATA';
export const SET_SELECTED_UNIT = 'SET_SELECTED_UNIT';
export const GET_PURCHASED_PROJECTS = 'GET_PURCHASED_PROJECTS';
export const GET_PURCHASE_PROJECT_DETAILS = 'GET_PURCHASE_PROJECT_DETAILS';
export const UPDATE_BILLING_DETAILS = 'UPDATE_BILLING_DETAILS';

// For Dashboard
export const GET_DASHBOARD_DATA = 'GET_DASHBOARD_DATA';

// For Add Project
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const UPDATE_LOCAL_STRUCTURE = 'UPDATE_LOCAL_STRUCTURE';
export const SAVE_STRUCTURE = 'SAVE_STRUCTURE';
export const UPDATE_PAYMENT = 'UPDATE_PAYMENT';
export const UPDATE_ADMINS = 'UPDATE_ADMINS';
export const RESET_STRUCTURE = 'RESET_STRUCTURE';
export const SET_PROJECT_DATA = 'SET_PROJECT_DATA';
export const GET_STATES = 'GET_STATES';
export const GET_CITIES = 'GET_CITIES';

// For Sales
export const GET_SALES_DATA = 'GET_SALES_DATA';
export const GET_BROKERS_LIST = 'GET_BROKERS_LIST';
export const GET_VISITORS = 'GET_VISITORS';
export const GET_VISITOR = 'GET_VISITOR';
export const GET_FOLLOWUP_LIST = 'GET_FOLLOWUP_LIST';
export const ADD_VISITOR = 'ADD_VISITOR';
export const ADD_BROKER = 'ADD_BROKER';
export const ADD_VISITOR_COMMENT = 'ADD_VISITOR_COMMENT';
export const ADD_VISITOR_CALL_LOGS = 'ADD_VISITOR_CALL_LOGS';
export const ADD_VISITOR_FOLLOW_UP = 'ADD_VISITOR_FOLLOW_UP';
export const ADD_FOLLOW_UP = 'ADD_FOLLOW_UP';
export const UPDATE_FOLLOW_UP = 'UPDATE_FOLLOW_UP';
export const GET_PIPELINES = 'GET_PIPELINES';
export const ADD_PIPELINE = 'ADD_PIPELINE';
export const DELETE_PIPELINE = 'DELETE_PIPELINE';
export const DELETE_BROKER = 'DELETE_BROKER';
export const MOVE_VISITOR = 'MOVE_VISITOR';
export const UPDATE_BROKER = 'UPDATE_BROKER';
export const GET_BROKER_DETAILS = 'GET_BROKER_DETAILS';
export const GET_BOOKINGS_STATUS = 'GET_BOOKINGS_STATUS';
export const LOCK_UNIT = 'LOCK_UNIT';
export const GET_HOLD_BOOKING_DETAILS = 'GET_HOLD_BOOKING_DETAILS';
export const HOLD_UNIT_BOOKING = 'HOLD_UNIT_BOOKING';
export const UN_HOLD_UNIT_BOOKING = 'UN_HOLD_UNIT_BOOKING';
export const CREATE_BOOKING = 'CREATE_BOOKING';
export const GET_BANK_LIST = 'GET_BANK_LIST';
export const GET_VISITOR_ACTIVITIES = 'GET_VISITOR_ACTIVITIES';
export const GET_PIPELINES_ORDER_LIST = 'GET_PIPELINES_ORDER_LIST';
export const UPDATE_PIPELINE_ORDER_LIST = 'UPDATE_PIPELINE_ORDER_LIST';
export const SET_UPDATED_PIPELINE_DATA = 'SET_UPDATED_PIPELINE_DATA';

// For  Customer Section
export const GET_CUSTOMER_DATA = 'GET_CUSTOMER_DATA';
export const GET_BOOKING_DATA = 'GET_BOOKING_DATA';
export const ADD_CUSTOMER = 'ADD_CUSTOMER';
export const GET_BANK_DETAILS = 'GET_BANK_DETAILS';
export const UPDATE_BANK_DETAILS = 'UPDATE_BANK_DETAILS';
export const UPDATE_BANK_FILES = 'UPDATE_BANK_FILES';
export const GET_MODIFY_REQUESTS = 'GET_MODIFY_REQUESTS';
export const ADD_MODIFY_REQUEST = 'ADD_MODIFY_REQUEST';
export const GET_ACCOUNT_DETAILS = 'GET_ACCOUNT_DETAILS';
export const UPDATE_BOOKING_STATUS = 'UPDATE_BOOKING_STATUS';
export const ADD_COLLECTION = 'ADD_COLLECTION';
export const UPDATE_COLLECTION = 'UPDATE_COLLECTION';
export const DELETE_COLLECTION = 'DELETE_COLLECTION';

// For Files
export const GET_FOLDERS = 'GET_FOLDERS';
export const CREATE_FOLDER = 'CREATE_FOLDER';
export const RENAME_FOLDER = 'RENAME_FOLDER';
export const DELETE_FOLDER = 'DELETE_FOLDER';
export const GET_FILES = 'GET_FILES';
export const UPLOAD_FILE = 'UPLOAD_FILE';
export const DELETE_FILE = 'DELETE_FILE';
export const GET_VERSION = 'GET_VERSION';
export const GET_FILE_ACTIVITIES = 'GET_FILE_ACTIVITIES';
export const RENAME_FILE = 'RENAME_FILE';
export const SHARE_FOLDER_WITH_USERS = 'SHARE_FOLDER_WITH_USERS';
export const SHARE_FILE_WITH_USERS = 'SHARE_FILE_WITH_USERS';
export const ADD_NEW_VERSION = 'ADD_NEW_VERSION';
export const DELETE_VERSION = 'DELETE_VERSION';

// For Project Management
export const GET_WORKS = 'GET_WORKS';
export const GET_WORK_CATEGORIES = 'GET_WORK_CATEGORIES';
export const GET_MILESTONES = 'GET_MILESTONES';
export const CREATE_LINEUP_ENTITY = 'CREATE_LINEUP_ENTITY';
export const UPDATE_LINEUP_ENTITY = 'UPDATE_LINEUP_ENTITY';
export const DELETE_LINEUP_ENTITY = 'DELETE_LINEUP_ENTITY';
export const UPDATE_MILESTONE_ORDER = 'UPDATE_MILESTONE_ORDER';
export const GET_PHASES = 'GET_PHASES';
export const REFRESH_PHASES = 'REFRESH_PHASES';
export const ADD_PHASE = 'ADD_PHASE';
export const UPDATE_PHASE = 'UPDATE_PHASE';
export const DELETE_PHASE = 'DELETE_PHASE';
export const UPDATE_PHASE_ORDER = 'UPDATE_PHASE_ORDER';
export const GET_SUB_PHASES = 'GET_SUB_PHASES';
export const REFRESH_SUB_PHASES = 'REFRESH_SUB_PHASES';
export const ADD_SUB_PHASE = 'ADD_SUB_PHASE';
export const UPDATE_SUB_PHASE = 'UPDATE_SUB_PHASE';
export const DELETE_SUB_PHASE = 'DELETE_SUB_PHASE';
export const GET_PHASE_ACTIVITIES = 'GET_PHASE_ACTIVITIES';
export const ADD_PHASE_ACTIVITY = 'ADD_PHASE_ACTIVITY';
export const UPDATE_PHASE_ACTIVITY = 'UPDATE_PHASE_ACTIVITY';

// For Role and Members
export const GET_MEMBERS = 'GET_MEMBERS';
export const GET_ROLES = 'GET_ROLES';
export const ADD_USERS = 'ADD_USERS';
export const ADD_ROLE = 'ADD_ROLE';
export const EDIT_USERS = 'EDIT_USERS';
export const DELETE_ROLE = 'DELETE_ROLE';
export const DELETE_MEMBER = 'DELETE_MEMBER';

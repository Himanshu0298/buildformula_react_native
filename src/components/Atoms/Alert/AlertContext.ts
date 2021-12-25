import React from 'react';
import {AlertContextType} from './AlertProvider';

const AlertContext = React.createContext<AlertContextType | undefined>(null);
export default AlertContext;

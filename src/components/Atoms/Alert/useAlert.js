import React from 'react';
import AlertContext from './AlertContext';

export default function useAlert() {
  return React.useContext(AlertContext);
}

import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import RenderSelect from 'components/Atoms/RenderSelect';
import SalesDashboard from 'screens/DeveloperProject/Sales/SalesDashboard/SalesDashboard';
import GeneralDashboard from './GeneralDashboard';

const DASHBOARD_OPTIONS = [
  {label: 'General Dashboard', value: '0'},
  {label: 'Sales Dashboard', value: '1'},
];

const DashboardDetails = () => {
  const [dashboard, setDashboard] = useState('0');
  return (
    <View style={styles.mainContainer}>
      <RenderSelect
        value={dashboard}
        options={DASHBOARD_OPTIONS}
        onSelect={v => setDashboard(v)}
        style={{marginBottom: 10}}
      />
      {dashboard === '0' ? <GeneralDashboard /> : <SalesDashboard />}
    </View>
  );
};

export default DashboardDetails;

const styles = StyleSheet.create({
  mainContainer: {padding: 5, flex: 1, backgroundColor: '#eaeff1'},
});

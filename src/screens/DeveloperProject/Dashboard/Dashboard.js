import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import useProjectActions from 'redux/actions/projectActions';
import {Subheading, Menu, IconButton, Divider} from 'react-native-paper';
import useNotificationActions from 'redux/actions/notificationActions';
import {useProjectLoading} from 'redux/selectors';
import useSalesActions from 'redux/actions/salesActions';
import GeneralDashboard from './Components/GeneralDashboard';
import SalesDashboard from '../Sales/SalesDashboard/SalesDashboard';

const DASHBOARD_OPTIONS = [
  {label: 'General Dashboard', value: '0'},
  {label: 'Sales Dashboard', value: '1'},
];

export default function DeveloperDashboard(props) {
  const {route} = props;
  const {project} = route?.params || {};

  const {
    getProjectData,
    getProjectCommonData,
    getDashboardData,
    getProjectPermissions,
    getProjectModules,
  } = useProjectActions();
  const {getProjectNotifications} = useNotificationActions();
  const {get_sales_dashboard_data} = useSalesActions();

  const loading = useProjectLoading();

  const [visible, setVisible] = React.useState(false);
  const toggleMenu = () => setVisible(v => !v);
  const [dashboard, setDashboard] = useState('0');

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project?.id]);

  const loadData = () => {
    if (project?.id) {
      getDashboardData(project.id);
      getProjectPermissions(project.id);
      getProjectModules({project_id: project.id});
      getProjectData(project.id);
      getProjectCommonData(project.id);
      getProjectNotifications({project_id: project.id});
      get_sales_dashboard_data({project_id: project.id});
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />
      <View style={styles.headerContainer}>
        <ProjectHeader {...props} />
        <View style={styles.titleContainer}>
          <Subheading style={{fontWeight: '500'}}>
            {DASHBOARD_OPTIONS[dashboard]?.label}
          </Subheading>
          <Menu
            style={styles.filterMenu}
            visible={visible}
            onDismiss={toggleMenu}
            anchor={
              <IconButton
                icon="menu"
                size={23}
                onPress={toggleMenu}
                color="#4872f4"
                style={styles.iconButton}
              />
            }>
            {DASHBOARD_OPTIONS.map((i, index) => {
              const active = i.value === dashboard;
              return (
                <Menu.Item
                  index={index?.toString()}
                  title={i.label}
                  style={active ? styles.menuItem : {}}
                  titleStyle={active ? styles.menuItem : {}}
                  onPress={() => {
                    setDashboard(i.value);
                    toggleMenu();
                  }}
                />
              );
            })}
          </Menu>
        </View>
        <Divider />
        {dashboard === '0' ? <GeneralDashboard /> : <SalesDashboard />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContainer: {
    flex: 1,
    backgroundColor: '#eaeff1',
  },
  filterMenu: {
    borderRadius: 10,
    paddingVertical: 0,
  },
  menuItem: {
    backgroundColor: '#4872f4',
    color: '#fff',
  },
  iconButton: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
  },
});

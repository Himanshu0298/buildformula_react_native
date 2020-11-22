import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import {TabBar, TabView} from 'react-native-tab-view';
import {Caption, Divider, Subheading} from 'react-native-paper';
import Layout from 'utils/Layout';
import {getShadow} from 'utils';
import {secondaryTheme, theme} from 'styles/theme';
import Spinner from 'react-native-loading-spinner-overlay';
import {COLORS} from 'utils/constant';
import BaseText from 'components/BaseText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DraggableFlatList from 'react-native-draggable-flatlist';

function RenderContacts(props) {
  const {item, drag, isActive} = props;

  const {get_user, get_role} = item?.get_role_user || {};
  return (
    <TouchableOpacity style={styles.contactContainer} onLongPress={drag}>
      <View style={styles.leftContainer}>
        <MaterialIcons
          name={'drag-indicator'}
          color={'rgba(4,29,54,0.15)'}
          size={30}
        />
        <View style={styles.visitorContainer}>
          <Subheading theme={secondaryTheme}>
            {item.first_name} {item.last_name}
          </Subheading>
          <Caption theme={secondaryTheme}>+91 {item.phone}</Caption>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <Subheading theme={secondaryTheme}>
          {get_user.first_name} {get_user.last_name}
        </Subheading>
        <Caption theme={secondaryTheme}>{get_role.role_name}</Caption>
      </View>
    </TouchableOpacity>
  );
}

function RenderContent({data = {}}) {
  const {title, get_visitors} = data;

  return (
    <View style={styles.contentContainer}>
      <View style={styles.pipelineContainer}>
        <View style={styles.headContainer}>
          <Subheading theme={secondaryTheme}>{title}</Subheading>
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.icon}>
              <MaterialIcons
                name={'search'}
                color={'rgba(4,29,54,0.6)'}
                size={19}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.icon, {backgroundColor: COLORS.deleteLight}]}>
              <MaterialIcons name={'delete'} color={'#FF5D5D'} size={19} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.icon,
                {backgroundColor: COLORS.primaryLight, paddingHorizontal: 8},
              ]}>
              <BaseText style={{color: theme.colors.primary}}>2</BaseText>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.addNewButton}>
          <Caption theme={secondaryTheme}>+ Add contact</Caption>
        </TouchableOpacity>

        {get_visitors.length > 0 ? (
          <DraggableFlatList
            data={get_visitors}
            activationDistance={10}
            showsVerticalScrollIndicator={false}
            renderItem={(props) => <RenderContacts {...props} />}
            ItemSeparatorComponent={() => <Divider />}
            keyExtractor={(_, i) => `draggable-item-${i}`}
            onDragEnd={({data}) => {
              console.log('----->TODO: handle drag data');
            }}
          />
        ) : null}
      </View>
    </View>
  );
}

function DotIndicator(props) {
  return (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'transparent'}}
      style={{backgroundColor: '#fff', ...getShadow(0)}}
      contentContainerStyle={{
        justifyContent: 'center',
      }}
      renderTabBarItem={({navigationState, route}) => {
        return (
          <View
            key={route.key}
            style={[
              styles.dotIndicator,
              {
                backgroundColor:
                  route.key === navigationState.index
                    ? theme.colors.primary
                    : 'rgba(4,29,54,0.1)',
              },
            ]}
          />
        );
      }}
    />
  );
}

export default function ProjectStructure(props) {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const {getPipelineData} = useSalesActions();

  const {pipelines, loading} = useSelector((state) => state.sales);
  const {selectedProject} = useSelector((state) => state.project);

  React.useEffect(() => {
    getPipelineData(selectedProject.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const routes = React.useMemo(() => {
    return pipelines.map((_, i) => ({key: i, title: `tab-${i}`}));
  }, [pipelines]);

  const renderScene = ({route: {key}}) => {
    return <RenderContent data={pipelines[key]} />;
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent={''} />
      {pipelines.length === 0 ? (
        <View style={styles.noResultContainer}>
          <Subheading theme={secondaryTheme}>{'No Data Found'}</Subheading>
        </View>
      ) : (
        <TabView
          navigationState={{index: selectedTab, routes}}
          renderScene={renderScene}
          onIndexChange={setSelectedTab}
          initialLayout={{width: Layout.window.width}}
          tabBarPosition="bottom"
          renderTabBar={(tabBarProps) => <DotIndicator {...tabBarProps} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  noResultContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    padding: 20,
    flex: 1,
  },
  pipelineContainer: {
    borderRadius: 15,
    flexGrow: 1,
    padding: 15,
    backgroundColor: 'rgba(242,244,245,1)',
  },
  headContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    padding: 3,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  addNewButton: {
    width: '100%',
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 5,
    marginVertical: 10,
  },
  contactContainer: {
    width: '100%',
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  visitorContainer: {
    marginLeft: 5,
  },
  rightContainer: {
    alignItems: 'center',
  },
  dotIndicator: {
    height: 8,
    width: 8,
    margin: 5,
    borderRadius: 50,
  },
});

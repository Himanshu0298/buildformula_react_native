import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import {Caption, Subheading} from 'react-native-paper';
import {secondaryTheme, theme} from 'styles/theme';
import Spinner from 'react-native-loading-spinner-overlay';
import {COLORS} from 'utils/constant';
import BaseText from 'components/BaseText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Board, BoardRepository} from 'components/Board/components';
// import {BoardRepository, Board} from 'react-native-draganddrop-board';

function RenderContacts({item}) {
  const {get_user = {}, get_role = {}} = item?.get_role_user || {};

  return (
    <View style={styles.contactContainer}>
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
    </View>
  );
}

function RenderHeader({data = {}}) {
  const {title, get_visitors = []} = data?.attributes?.data?.pipeline || {};

  return (
    <>
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
            <BaseText style={{color: theme.colors.primary}}>
              {get_visitors.length}
            </BaseText>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.addNewButton}>
        <Caption theme={secondaryTheme}>+ Add contact</Caption>
      </TouchableOpacity>
    </>
  );
}

function DotIndicator({count, selected}) {
  return (
    <View style={styles.dotContainer}>
      {new Array(count).fill(0).map((_, i) => {
        return (
          <View
            key={i}
            style={[
              styles.dotIndicator,
              {
                backgroundColor:
                  i === selected ? theme.colors.primary : 'rgba(4,29,54,0.1)',
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const RenderBoard = React.memo(({pipelines, setSelectedTab}) => {
  const data = React.useMemo(() => {
    return pipelines.map((pipeline, i) => ({
      id: i + 1,
      name: pipeline.title,
      rows: pipeline.get_visitors,
      pipeline,
    }));
  }, [pipelines]);

  const boardRepository = new BoardRepository(data);

  return (
    <View style={styles.boardContainer}>
      <Board
        boardBackground="#fff"
        boardRepository={boardRepository}
        renderHeader={(column) => <RenderHeader data={column} />}
        cardContent={(item) => <RenderContacts item={item} />}
        onChangeTab={setSelectedTab}
        open={() => {
          console.log('-----> open');
        }}
        onDragEnd={() => {
          console.log('-----> onDragEnd');
        }}
      />
    </View>
  );
});

export default function ProjectStructure(props) {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const {getPipelineData} = useSalesActions();

  let {pipelines, loading} = useSelector((state) => state.sales);
  const {selectedProject} = useSelector((state) => state.project);

  React.useEffect(() => {
    getPipelineData(selectedProject.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent={''} />
      {pipelines.length === 0 ? (
        <View style={styles.noResultContainer}>
          <Subheading theme={secondaryTheme}>{'No Data Found'}</Subheading>
        </View>
      ) : (
        <>
          <RenderBoard pipelines={pipelines} setSelectedTab={setSelectedTab} />
          <DotIndicator count={pipelines.length} selected={selectedTab} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  boardContainer: {
    flexGrow: 1,
  },
  noResultContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingRight: 5,
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
  dotContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotIndicator: {
    height: 8,
    width: 8,
    margin: 5,
    borderRadius: 50,
  },
});

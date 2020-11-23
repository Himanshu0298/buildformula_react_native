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
import {useAlert} from 'components/Alert';
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

function RenderHeader({data = {}, handleDelete}) {
  const {pipeline = {}, id} = data?.attributes?.data || {};
  const {id: pipelineId, title, get_visitors = []} = pipeline;

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
          {id !== 1 ? (
            <TouchableOpacity
              onPress={() => handleDelete(pipelineId, get_visitors.length)}
              style={[styles.icon, {backgroundColor: COLORS.deleteLight}]}>
              <MaterialIcons name={'delete'} color={'#FF5D5D'} size={19} />
            </TouchableOpacity>
          ) : null}
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
        const backgroundColor =
          i === selected ? theme.colors.primary : 'rgba(4,29,54,0.1)';

        return (
          <View key={i} style={[styles.dotIndicator, {backgroundColor}]} />
        );
      })}
    </View>
  );
}

const RenderBoard = React.memo(
  ({pipelines, setSelectedTab, deletePipeline}) => {
    const alert = useAlert();

    const onDeletePipeline = (id, visitorCount) => {
      if (visitorCount > 0) {
        alert.show({
          title: 'Error',
          message: 'Only Empty Cards cn be deleted',
          dismissable: false,
        });
        return;
      }

      const formData = new FormData();
      formData.append('status_id', id);
      deletePipeline(id, formData);
    };

    const boardRepository = React.useMemo(() => {
      const data = pipelines.map((pipeline, i) => ({
        id: i + 1,
        name: pipeline.title,
        rows: pipeline.get_visitors,
        pipeline,
      }));

      return new BoardRepository(data);
    }, [pipelines]);

    return (
      <View style={styles.boardContainer}>
        <Board
          boardBackground="#fff"
          boardRepository={boardRepository}
          renderHeader={(column) => (
            <RenderHeader data={column} handleDelete={onDeletePipeline} />
          )}
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
  },
);

export default function ProjectStructure(props) {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const {getPipelineData, deletePipeline} = useSalesActions();

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
          <RenderBoard
            pipelines={pipelines}
            setSelectedTab={setSelectedTab}
            deletePipeline={deletePipeline}
          />
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

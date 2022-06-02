import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import NoResult from 'components/Atoms/NoResult';
import * as React from 'react';
import {
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Caption, Text, useTheme, withTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import useProjectManagementActions from 'redux/actions/projectManagementActions';
import {getShadow} from 'utils';
import {cloneDeep} from 'lodash';
import WorkPath from '../Components/WorkPath';

function RenderRow(props) {
  const {item, onPress, isSubWorks} = props;
  const {title, unique_id, master_work_category_title, master_work_title} =
    item;

  const {colors} = useTheme();

  return (
    <View>
      <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
        <View style={styles.optionBody}>
          <Text style={styles.optionLabel}>{title || unique_id}</Text>
          {isSubWorks ? (
            <View style={styles.workDetails}>
              <Caption>
                {master_work_category_title} {'  '}
              </Caption>
              <MaterialCommunityIcons name="label" size={18} color="#95A0AC" />
              <Caption>
                {'  '}
                {master_work_title}
              </Caption>
            </View>
          ) : null}
        </View>
        <OpacityButton
          opacity={0.1}
          style={styles.rightArrow}
          color={colors.primary}>
          <MaterialCommunityIcons name="arrow-right" size={18} color="black" />
        </OpacityButton>
      </TouchableOpacity>
    </View>
  );
}

function WorkList(props) {
  const {route, navigation} = props;
  const {parent_id = 0, pathList = []} = route?.params || {};

  const {colors} = useTheme();

  const {getWBSLevelWorks} = useProjectManagementActions();

  const {WBSData, loading} = useSelector(s => s.projectManagement);

  const currentData = WBSData?.[parent_id];
  const isSubWorks = currentData?.wbs_works?.length;

  const listData = React.useMemo(() => {
    if (currentData?.wbs_levels?.length) {
      return currentData?.wbs_levels;
    }
    if (currentData?.wbs_works?.length) {
      return currentData?.wbs_works;
    }
    return [];
  }, [currentData?.wbs_levels, currentData?.wbs_works]);

  const {selectedProject} = useSelector(s => s.project);

  React.useEffect(() => {
    getWBSLevelWorks({project_id: selectedProject.id, parent_id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navToNextLevel = item => {
    const _pathList = cloneDeep(pathList);
    _pathList.push(item.title || item.unique_id);
    const params = {parent_id: item.id, pathList: _pathList};

    if (!isSubWorks) {
      navigation.push('Worklist', params);
    } else {
      navigation.push('WorkDetails', params);
    }
  };

  const renderEmpty = () => <NoResult />;

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />
      {!pathList?.length ? (
        <Text style={styles.subHeading}>Work List</Text>
      ) : (
        <>
          <View style={styles.headerContainer}>
            <View style={styles.button}>
              <OpacityButton
                opacity={0.1}
                color={colors.primary}
                style={styles.backButton}
                onPress={navigation.goBack}>
                <MaterialCommunityIcons
                  name="keyboard-backspace"
                  size={18}
                  color="black"
                />
              </OpacityButton>
            </View>
            <Text style={styles.headerTitle}>
              {pathList[pathList.length - 1]}
            </Text>
          </View>
          <WorkPath data={pathList} />
        </>
      )}
      <FlatList
        data={listData}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={getWBSLevelWorks} />
        }
        contentContainerStyle={styles.flatList}
        keyExtractor={item => item.id}
        ListEmptyComponent={renderEmpty}
        renderItem={({item}) => {
          return (
            <RenderRow
              item={item}
              isSubWorks={isSubWorks}
              onPress={() => navToNextLevel(item)}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#fff',
    ...getShadow(1),
    margin: 1,
  },
  optionLabel: {
    color: 'black',
    fontSize: 16,
  },
  subHeading: {
    fontSize: 17,
    margin: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    padding: 10,
  },
  backButton: {
    borderRadius: 50,
    marginRight: 7,
  },
  headerTitle: {
    fontSize: 18,
    color: 'black',
  },
  workDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionBody: {
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  rightArrow: {
    borderRadius: 25,
  },
  flatList: {
    flexGrow: 1,
  },
});

export default withTheme(WorkList);

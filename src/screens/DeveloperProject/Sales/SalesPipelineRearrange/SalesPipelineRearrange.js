import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {AutoDragSortableView} from 'react-native-drag-sort';
import {Text, withTheme} from 'react-native-paper';
import Layout from 'utils/Layout';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomBadge from 'components/Atoms/CustomBadge';
import {useSelector} from 'react-redux';
import NoResult from 'components/Atoms/NoResult';
import useSalesActions from 'redux/actions/salesActions';
import {getShadow} from 'utils';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSalesLoading} from 'redux/selectors';
import ActionButtons from 'components/Atoms/ActionButtons';

const ROW_HEIGHT = 50;

function RenderPipeline(props) {
  const {item, index} = props;

  return (
    <View style={styles.workContainer}>
      <View style={styles.shadowContainer}>
        <View style={styles.titleContainer}>
          <CustomBadge label={(index + 1).toString()} style={styles.badge} />
          <MaterialIcons
            name="drag-indicator"
            color="rgba(4,29,54,0.15)"
            size={30}
            style={styles.arrangeIcon}
          />
          <Text>{item.title}</Text>
        </View>
      </View>
    </View>
  );
}

function SalesPipelineRearrange(props) {
  const {navigation} = props;

  const {pipelinesOrderList} = useSelector(s => s.sales);
  const {selectedProject} = useSelector(s => s.project);
  const loading = useSalesLoading();

  const {
    getPipelinesOrderList,
    updatePipelineOrderList,
    getPipelineData,
    setUpdatedPipelineOrderList,
  } = useSalesActions();

  useEffect(() => {
    getPipelinesOrderList({project_id: selectedProject.id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject.id]);

  const handleSave = async () => {
    const updatedData = pipelinesOrderList.map((i, index) => ({
      project_id: selectedProject.id,
      record_id: i.id,
      order_by_value: index,
    }));

    await updatePipelineOrderList(updatedData);
    getPipelinesOrderList({project_id: selectedProject.id});
    getPipelineData({project_id: selectedProject.id});
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="" />

      {pipelinesOrderList.length ? (
        <>
          <Text style={styles.heading}>Rearrange Pipeline</Text>
          <AutoDragSortableView
            dataSource={pipelinesOrderList}
            maxScale={1.03}
            style={styles.listContainer}
            childrenWidth={Layout.window.width}
            childrenHeight={ROW_HEIGHT}
            keyExtractor={(_, i) => i.toString()}
            renderItem={(item, index) => <RenderPipeline {...{item, index}} />}
            onDataChange={data => setUpdatedPipelineOrderList(data)}
          />
          <ActionButtons
            cancelLabel="Cancel"
            submitLabel="Save"
            onSubmit={handleSave}
            onCancel={navigation.goBack}
          />
        </>
      ) : (
        <NoResult />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  heading: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  workContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Layout.window.width,
    paddingHorizontal: 20,
  },
  shadowContainer: {
    ...getShadow(2),
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  badge: {
    height: 22,
    width: 22,
    marginLeft: 10,
    borderRadius: 10,
  },
  listContainer: {
    width: '100%',
  },
  arrangeIcon: {
    marginRight: 10,
  },
});

export default withTheme(SalesPipelineRearrange);

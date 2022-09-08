import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {Caption, Divider, FAB} from 'react-native-paper';
import {useSelector} from 'react-redux';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {COMMON_STATUS} from 'utils/constant';

const PRListing = props => {
  const {navigation} = props;

  const {selectedProject} = useSelector(s => s.project);
  const project_id = selectedProject.id;

  const {getMaterialPR} = useMaterialManagementActions();

  const {prList = []} = useSelector(s => s.materialManagement);

  useEffect(() => {
    getMaterialPR({project_id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>PR Listing</Text>
      </View>
      <View style={styles.bodyContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{height: '96%'}}
          data={prList}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('PRPreview', {
                    purchase_request_id: item.id,
                  });
                }}>
                <View style={styles.cardContainer}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.ID}>{item.id}</Text>
                    <Caption
                      style={{
                        color: COMMON_STATUS[item.status]?.color,
                      }}>
                      {COMMON_STATUS[item.status]?.label}
                    </Caption>
                  </View>
                  <Divider style={{color: 'rgba(0, 0, 0, 0.2)', height: 1}} />
                  <View>
                    <Text style={{marginTop: 5}}>{item.subject}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                      }}>
                      <Caption>Approved by:</Caption>
                      <Text style={{marginLeft: 5}}>{item.approved_by}</Text>
                    </View>
                    <Caption>{item.created}</Caption>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <FAB
        style={[styles.fab, {backgroundColor: '#4872f4'}]}
        large
        icon="plus"
        onPress={() => navigation.navigate('CreatePR')}
      />
    </View>
  );
};

export default PRListing;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 5,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '400',
  },
  cardContainer: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#e5eafa',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  cardHeader: {
    padding: 10,
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ID: {
    backgroundColor: '#E5EAFA',
    padding: 5,
    borderRadius: 3,
    color: 'rgba(72, 114, 244, 1)',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});

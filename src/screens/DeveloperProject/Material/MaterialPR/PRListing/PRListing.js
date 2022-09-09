import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {Caption, Divider, FAB} from 'react-native-paper';
import {useSelector} from 'react-redux';
import useMaterialManagementActions from 'redux/actions/materialManagementActions';
import {COMMON_STATUS} from 'utils/constant';
import {getShadow} from 'utils';

function RenderPRCard(props) {
  const {navPRDetails, prData} = props;
  const {id, status, subject, approved_by, created} = prData;
  return (
    <TouchableOpacity
      style={{...getShadow(2)}}
      onPress={() => {
        navPRDetails(id);
      }}>
      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <Text style={styles.ID}>{id}</Text>
          <Caption
            style={{
              color: COMMON_STATUS[status]?.color,
            }}>
            {COMMON_STATUS[status]?.label}
          </Caption>
        </View>
        <Divider style={{color: 'rgba(0, 0, 0, 0.2)', height: 1}} />
        <View>
          <Text style={{marginTop: 5}}>{subject}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Caption>Approved by:</Caption>
            <Text style={{marginLeft: 5}}>{approved_by}</Text>
          </View>
          <Caption>{created}</Caption>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const PRListing = props => {
  const {navigation} = props;
  const navPRDetails = id => {
    navigation.navigate('PRPreview', {purchase_request_id: id});
  };

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
          data={prList}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return <RenderPRCard navPRDetails={navPRDetails} prData={item} />;
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
    paddingHorizontal: 15,
    flex: 1,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '400',
  },
  bodyContainer: {
    flex: 1,
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

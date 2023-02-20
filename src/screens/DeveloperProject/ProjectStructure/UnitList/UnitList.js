import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import towerunit from 'assets/images/towerunit.png';
import plot from 'assets/images/plot.png';
import bungalow from 'assets/images/bungalow.png';
import industrial from 'assets/images/industrial.png';

import {
  Caption,
  Divider,
  FAB,
  Menu,
  Searchbar,
  Subheading,
  Text,
} from 'react-native-paper';
import {getShadow} from 'utils';
import {theme} from 'styles/theme';
import {UnitData} from './UnitData';

const UnitCard = ({item, navigation}) => {
  const [visible, setVisible] = React.useState(false);
  const toggleMenu = () => setVisible(v => !v);

  const {id, project_name, unit, category, status} = item;
  return (
    <TouchableOpacity
      style={styles.projectCardWrapper}
      onPress={() =>
        category === 'Bungalow'
          ? navigation.navigate('BungalowUnitPreview')
          : category === 'Tower'
          ? navigation.navigate('UnitPreview')
          : category === 'Plot'
          ? navigation.navigate('PlotUnitPreview')
          : navigation.navigate('IndustrialUnitPreview')
      }>
      <View style={styles.headerWrapper}>
        <View style={styles.idBox}>
          <Text style={styles.idText}>{id}</Text>
        </View>

        <View style={styles.headerWrapper}>
          <Menu
            visible={visible}
            onDismiss={() => toggleMenu()}
            anchor={
              <OpacityButton
                opacity={0.1}
                color="#4872f4"
                style={styles.editIcon}
                onPress={toggleMenu}>
                <MaterialIcon name="dots-vertical" color="#4872f4" size={15} />
              </OpacityButton>
            }>
            <Menu.Item
              onPress={() => {
                toggleMenu();
              }}
              title="Edit"
            />
            <Menu.Item
              onPress={() => {
                toggleMenu();
              }}
              title="Delete"
            />
          </Menu>
        </View>
      </View>
      <Divider />
      <View style={styles.bodyWrapper}>
        <Text>{`${category} - Unit No. ${unit}`}</Text>
        <Caption>{project_name}</Caption>
      </View>
      <View style={{marginVertical: 10}}>
        <Text>{status}</Text>
      </View>
    </TouchableOpacity>
  );
};

function UnitList(props) {
  const {navigation} = props;

  const {colors} = theme;

  const [selectDialog, setSelectDialog] = React.useState(false);

  const toggleSelectDialog = () => setSelectDialog(v => !v);

  const FAB_ACTIONS = [
    {
      icon: towerunit,
      color: theme.colors.primary,
      label: 'Add Tower Unit',
      onPress: () => navigation.navigate('AddUnit'),
    },
    {
      icon: bungalow,
      color: theme.colors.primary,
      label: 'Add Bungalow',
      onPress: () => navigation.navigate('AddBungalowUnit'),
    },
    {
      icon: plot,
      color: theme.colors.primary,
      label: 'Add Plot',
      onPress: () => navigation.navigate('AddPlotUnit'),
    },
    {
      icon: industrial,
      color: theme.colors.primary,
      label: 'Add Industrial Unit',
      onPress: () => navigation.navigate('AddIndustrialUnit'),
    },
  ];

  return (
    <View style={styles.mainContainer}>
      <Subheading> Unit List</Subheading>
      <Searchbar
        style={styles.searchBar}
        placeholder="Search Project"
        onChangeText={() => console.log('Search')}
      />

      <View style={styles.bodyWrapper}>
        <FlatList
          data={UnitData}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return <UnitCard item={item} navigation={navigation} />;
          }}
        />
      </View>
      <FAB.Group
        open={selectDialog}
        fabStyle={{
          backgroundColor: colors.primary,
        }}
        icon={selectDialog ? 'window-close' : 'plus'}
        small
        onPress={toggleSelectDialog}
        actions={FAB_ACTIONS}
        onStateChange={() => {
          console.log('-----> onStateChange');
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    flexGrow: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  editIcon: {
    borderRadius: 20,
  },
  searchBar: {
    backgroundColor: '#EAECF11A',
    borderWidth: 1.5,
    borderColor: 'rgba(4, 29, 54, 0.2)',
    ...getShadow(0),
    marginVertical: 5,
  },
  bodyWrapper: {
    marginTop: 5,
    flex: 1,
  },
  projectCardWrapper: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
  },
  idBox: {
    backgroundColor: 'rgba(72, 114, 244, 0.1)',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  idText: {
    color: '#4872f4',
  },

  fab: {
    position: 'absolute',
    right: 5,
    bottom: 15,
    backgroundColor: '#4872f4',
  },
});
export default UnitList;

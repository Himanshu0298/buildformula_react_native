import dayjs from 'dayjs';
import React, {useMemo} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Caption,
  Divider,
  IconButton,
  Menu,
  Subheading,
  Text,
} from 'react-native-paper';

const PHASES = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

function RenderPhase(props) {
  const {item, index, menuIndex, toggleMenu, navToActivity} = props;

  return (
    <TouchableOpacity
      onPress={() => navToActivity('Sub Phase Title')}
      style={styles.detailsContainer}>
      <View style={styles.detailsTop}>
        <View style={styles.rowBetween}>
          <Text style={{fontSize: 15}}>Sub Phase Title</Text>
          <Menu
            visible={index === menuIndex}
            contentStyle={{borderRadius: 10}}
            onDismiss={toggleMenu}
            anchor={
              <IconButton
                icon="dots-vertical"
                size={18}
                onPress={() => toggleMenu(index)}
              />
            }>
            <Menu.Item
              style={styles.menuItem}
              icon="pencil"
              onPress={() => {}}
              title="Rename"
            />
            <Divider />
            <Menu.Item
              style={styles.menuItem}
              icon="delete"
              onPress={() => {}}
              title="Delete"
            />
          </Menu>
        </View>
        <View style={styles.details}>
          <Caption>
            {dayjs().format('DD MMM YYYY')} - {dayjs().format('DD MMM YYYY')}{' '}
          </Caption>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function SubPhases(props) {
  const {route, navigation} = props;
  const {phase} = route?.params || {};

  const [menuIndex, setMenuIndex] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState(false);

  const toggleMenu = v => setMenuIndex(v);
  const toggleDialog = () => setShowDialog(v => !v);

  const sortedPhases = useMemo(() => {
    return PHASES;
  }, []);

  const navToActivity = subPhase => {
    navigation.navigate('SubPhaseActivity', {subPhase, phase});
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Subheading>{phase}</Subheading>
        <View style={styles.phasesHeadingContainer}>
          <Subheading style={{fontSize: 15, marginTop: 10}}>
            Subphases
          </Subheading>
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={sortedPhases}
        extraData={sortedPhases}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({item, index}) => (
          <RenderPhase
            {...props}
            item={item}
            index={index}
            menuIndex={menuIndex}
            toggleMenu={toggleMenu}
            navToActivity={navToActivity}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  headingContainer: {
    marginBottom: 10,
  },
  phasesHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailsContainer: {
    backgroundColor: '#F2F4F5',
    borderRadius: 6,
    flexGrow: 1,
    marginVertical: 5,
  },
  detailsTop: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItem: {
    height: 35,
  },
});
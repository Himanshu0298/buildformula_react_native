import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
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
  Title,
  withTheme,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PHASES = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

function RenderPhase(props) {
  const {theme, item, index, menuIndex, toggleMenu, navToPlanning} = props;

  return (
    <TouchableOpacity onPress={navToPlanning} style={styles.detailsContainer}>
      <View style={styles.detailsTop}>
        <View style={styles.rowBetween}>
          <View style={styles.row}>
            <OpacityButton style={styles.badge} opacity={0.15}>
              <Caption style={{color: theme.colors.primary, lineHeight: 16}}>
                {index + 1}
              </Caption>
            </OpacityButton>
            <Text style={{marginLeft: 5, fontSize: 15}}>
              Structure Planning
            </Text>
          </View>
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="bell"
              size={16}
              color={theme.colors.red}
            />
            <Caption style={{marginLeft: 3, color: theme.colors.red}}>
              2
            </Caption>
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
        </View>
        <View style={styles.dateRow}>
          <MaterialCommunityIcons
            name="calendar-blank"
            size={16}
            color={'#A2AAB1'}
            style={{marginRight: 5}}
          />
          <Caption>
            {dayjs().format('DD MMM YYYY')} - {dayjs().format('DD MMM YYYY')}{' '}
          </Caption>
        </View>
        <View style={styles.chipContainer}>
          <View style={styles.textIcon}>
            <MaterialCommunityIcons
              name="text-subject"
              size={16}
              color={'#A2AAB1'}
              style={{marginRight: 5}}
            />
          </View>
          <View style={styles.chip}>
            <MaterialCommunityIcons
              name="clipboard-account"
              size={16}
              color={'#A2AAB1'}
              style={{marginRight: 5}}
            />
            <Caption>3</Caption>
          </View>
          <View style={styles.chip}>
            <MaterialCommunityIcons
              name="checkbox-marked"
              size={16}
              color={'#A2AAB1'}
              style={{marginRight: 5}}
            />
            <Caption>0/3</Caption>
          </View>
          <View style={styles.chip}>
            <MaterialCommunityIcons
              name="attachment"
              size={18}
              color={'#A2AAB1'}
              style={{marginRight: 5}}
            />
            <Caption>3</Caption>
          </View>
          <View style={styles.chip}>
            <MaterialCommunityIcons
              name="message-reply"
              size={16}
              color={'#A2AAB1'}
              style={{marginRight: 5}}
            />
            <Caption>3</Caption>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function SubPhasesActivity(props) {
  const {route, navigation} = props;
  const {phase, subPhase} = route?.params || {};

  const [menuIndex, setMenuIndex] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState(false);

  const sortedPhases = useMemo(() => {
    return PHASES;
  }, []);

  const toggleMenu = v => setMenuIndex(v);
  const toggleDialog = () => setShowDialog(v => !v);

  const navToPlanning = () => navigation.navigate('PlanningDetails');

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <TouchableOpacity onPress={navigation.goBack}>
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={18}
              style={{marginRight: 10}}
            />
            <Title>{subPhase.subphase_title || subPhase.subphase}</Title>
          </View>
        </TouchableOpacity>
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
            navToPlanning={navToPlanning}
            toggleMenu={toggleMenu}
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
  badge: {
    paddingHorizontal: 5,
    padding: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  menuItem: {
    height: 35,
  },
  chipContainer: {
    marginHorizontal: -8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  chip: {
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    flex: 1,
    marginHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textIcon: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 5,
    paddingHorizontal: 2,
    flex: 0.5,
    marginLeft: 8,
    marginRight: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withTheme(SubPhasesActivity);

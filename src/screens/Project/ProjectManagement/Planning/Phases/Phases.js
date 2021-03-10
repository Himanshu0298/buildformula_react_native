import dayjs from 'dayjs';
import React, {useMemo} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {
  Badge,
  Caption,
  Divider,
  FAB,
  IconButton,
  Menu,
  Subheading,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import {theme} from 'styles/theme';
import Layout from 'utils/Layout';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AutoDragSortableView from 'components/Atoms/AutoDragSortableView';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';

const ROW_HEIGHT = 200;

const PHASES = [{}, {}, {}, {}, {}, {}];

function Chip({children}) {
  return <View style={styles.chipContainer}>{children}</View>;
}

function RenderPhase(props) {
  const {
    items,
    item,
    index,
    sortable,
    menuIndex,
    toggleMenu,
    toggleSortable,
    navToSubPhases,
  } = props;

  return (
    <View style={styles.phaseContainer}>
      <View style={styles.bulletContainer}>
        {sortable ? (
          <MaterialIcon
            name="drag-indicator"
            size={24}
            color="rgba(4, 29, 54, 0.15)"
          />
        ) : (
          <>
            <View
              style={[
                styles.line,
                index === 0 && {top: 20},
                index === items.length - 1 && {height: 20},
              ]}
            />
            <Badge style={{backgroundColor: theme.colors.primary}}>
              {index + 1}
            </Badge>
          </>
        )}
      </View>
      <View style={styles.detailsContainer}>
        <TouchableRipple
          disabled={sortable}
          rippleColor="rgba(0, 0, 0, .1)"
          onPress={() => navToSubPhases('Lead Procurement')}>
          <>
            <View style={styles.detailsTop}>
              <View style={styles.rowBetween}>
                <Text style={{fontSize: 15}}>Lead Procurement</Text>
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
                  <Divider />
                  <Menu.Item
                    style={styles.menuItem}
                    icon="drag-vertical"
                    onPress={toggleSortable}
                    title="Arrange"
                  />
                </Menu>
              </View>
              <View style={styles.rowBetween}>
                <View style={styles.row}>
                  <Caption>Duration: </Caption>
                  <Text style={styles.value}>20 Days</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.value}>NORMAL</Text>
                </View>
              </View>
              <View style={styles.rowBetween}>
                <View style={styles.row}>
                  <Caption>Start: </Caption>
                  <Text style={styles.value}>
                    {dayjs().format('DD MMM YYYY')}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Caption>Finish: </Caption>
                  <Text style={styles.value}>
                    {dayjs().format('DD MMM YYYY')}
                  </Text>
                </View>
              </View>
            </View>
            <Divider />
            <View style={styles.detailsBottom}>
              <Caption>Notification:</Caption>
              <View style={{width: '97%'}}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <Chip>
                    <Caption>Activity title</Caption>
                  </Chip>
                  <Chip>
                    <Caption>Activity title</Caption>
                  </Chip>
                  <Chip>
                    <Caption>Activity title</Caption>
                  </Chip>
                  <Chip>
                    <Caption>Activity title</Caption>
                  </Chip>
                </ScrollView>
              </View>
            </View>
          </>
        </TouchableRipple>
      </View>
    </View>
  );
}

export default function Phases(props) {
  const {navigation} = props;

  const [menuIndex, setMenuIndex] = React.useState(false);
  const [addDialog, setAddDialog] = React.useState(false);
  const [sortable, setSortable] = React.useState(false);
  const [selectDialog, setSelectDialog] = React.useState(false);

  const sortedPhases = useMemo(() => {
    return PHASES;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortable]);

  const toggleMenu = (v) => setMenuIndex(v);
  const toggleSortable = () => setSortable((v) => !v);
  const toggleSelectDialog = () => setSelectDialog((v) => !v);
  const toggleAddDialog = (v) => setAddDialog(v);
  const onStateChange = ({open}) => setSelectDialog(open);

  const saveSort = () => {
    toggleSortable();
  };

  const navToSubPhases = () => {
    navigation.navigate('SubPhases', {phase: 'Lead Procurement'});
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Subheading>Project planning</Subheading>
        <View style={styles.phasesHeadingContainer}>
          <Subheading style={{fontSize: 15, marginTop: 10}}>Phases</Subheading>
          {sortable ? (
            <View style={styles.row}>
              <OpacityButton
                opacity={0.15}
                color={theme.colors.primary}
                style={{borderRadius: 50, marginRight: 10}}
                onPress={saveSort}>
                <MaterialIcon
                  name={'check'}
                  color={theme.colors.primary}
                  size={14}
                />
              </OpacityButton>
              <OpacityButton
                opacity={0.15}
                color={theme.colors.error}
                style={{borderRadius: 50}}
                onPress={toggleSortable}>
                <MaterialIcon
                  name={'close'}
                  color={theme.colors.error}
                  size={14}
                />
              </OpacityButton>
            </View>
          ) : null}
        </View>
      </View>
      {sortable ? (
        <AutoDragSortableView
          dataSource={sortedPhases}
          maxScale={1.03}
          style={{width: '100%'}}
          childrenWidth={Layout.window.width}
          childrenHeight={ROW_HEIGHT}
          keyExtractor={(_, i) => i.toString()}
          scrollViewProps={{showsVerticalScrollIndicator: false}}
          renderItem={(item, index) => (
            <RenderPhase
              {...props}
              items={sortedPhases}
              item={item}
              index={index}
              sortable={sortable}
              menuIndex={menuIndex}
              toggleSortable={toggleSortable}
              toggleMenu={toggleMenu}
              navToSubPhases={navToSubPhases}
            />
          )}
          onDataChange={(data) => {
            console.log('-----> onDataChange', data);
          }}
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={sortedPhases}
          extraData={sortedPhases}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({item, index}) => (
            <RenderPhase
              {...props}
              items={sortedPhases}
              item={item}
              index={index}
              sortable={sortable}
              menuIndex={menuIndex}
              toggleSortable={toggleSortable}
              toggleMenu={toggleMenu}
              navToSubPhases={navToSubPhases}
            />
          )}
        />
      )}
      <FAB.Group
        open={selectDialog}
        style={styles.fab}
        fabStyle={{
          backgroundColor: selectDialog ? '#fff' : theme.colors.primary,
        }}
        icon={selectDialog ? 'window-close' : 'plus'}
        onPress={toggleSelectDialog}
        onStateChange={onStateChange}
        actions={[
          {
            label: 'Normal Type',
            icon: 'plus',
            onPress: () => toggleAddDialog('normal'),
          },
          {
            label: 'Construction Type',
            icon: 'star',
            onPress: () => toggleAddDialog('construction'),
          },
        ]}
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
  phaseContainer: {
    flexDirection: 'row',
    width: Layout.window.width - 30,
  },
  bulletContainer: {
    flexDirection: 'column',
    paddingTop: 20,
    position: 'relative',
    alignItems: 'center',
  },
  line: {
    backgroundColor: theme.colors.primary,
    width: 2,
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  detailsContainer: {
    backgroundColor: '#F2F4F5',
    borderRadius: 10,
    flexGrow: 1,
    margin: 5,
  },
  detailsTop: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  detailsBottom: {
    padding: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 13,
  },
  chipContainer: {
    backgroundColor: 'rgba(4, 29, 54, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  menuItem: {
    height: 35,
  },
  fab: {
    position: 'absolute',
    right: 0,
  },
});

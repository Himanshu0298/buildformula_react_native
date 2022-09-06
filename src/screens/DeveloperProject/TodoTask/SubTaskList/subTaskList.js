import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, StyleSheet, FlatList, ScrollView} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {
  Caption,
  FAB,
  Paragraph,
  Subheading,
  Text,
  withTheme,
} from 'react-native-paper';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MenuDialog from '../Components/MenuDialog';

const arr = [
  {id: 1, title: 'Pay Bill For Gas Cylinder', favorite: true, completed: false},
  {id: 2, title: 'Need more candidates', favorite: false, completed: false},
  {id: 3, title: 'interview with startup', favorite: false, completed: false},
  {id: 4, title: '2nd round with dev', favorite: false, completed: false},
  {id: 5, title: 'talk to harry', favorite: false, completed: false},
];

function RenderTodoCard(props) {
  const {item, toggleComplete, toggleFavorite, navToDetails} = props;
  const {id, title, favorite, completed} = item;

  return (
    <ScrollView>
      <View style={styles.cardContainer}>
        <View style={styles.headingContainer}>
          <View style={styles.subCardContainer}>
            <OpacityButton opacity={0} onPress={() => toggleComplete(id)}>
              <MaterialCommunityIcons
                name={
                  completed
                    ? 'checkbox-marked-circle'
                    : 'checkbox-blank-circle-outline'
                }
                size={25}
                color={completed ? '#005BE4' : 'rgba(4, 29, 54, 0.15)'}
                style={styles.circle}
              />
            </OpacityButton>

            <TouchableOpacity onPress={() => navToDetails()}>
              <Paragraph
                style={[
                  styles.successParagraph,
                  completed ? {textDecorationLine: 'line-through'} : {},
                ]}>
                {title}
              </Paragraph>
              <Caption>2 of 5. 15 March,2022. Jayesh Ghandhi</Caption>
            </TouchableOpacity>
          </View>
          <View style={styles.icons}>
            <OpacityButton opacity={0} onPress={() => toggleFavorite(id)}>
              <MaterialCommunityIcons
                name={favorite ? 'star' : 'star-outline'}
                size={23}
                color={favorite ? '#FFC700' : undefined}
              />
            </OpacityButton>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function SubTaskList(props) {
  const {navigation, theme} = props;

  const [list, setList] = React.useState(arr);

  const [completedList, incompleteList] = React.useMemo(() => {
    return [list.filter(i => i.completed), list.filter(i => !i.completed)];
  }, [list]);

  const navToAdd = () => navigation.navigate('AddTask');

  const navToShare = () => navigation.navigate('ShareTask');
  const navToDetails = () => navigation.navigate('TaskDetails');

  const toggleComplete = id => {
    const updatedList = [...list];
    const index = updatedList.findIndex(i => i.id === id);
    updatedList[index].completed = !updatedList[index].completed;

    setList(updatedList);
  };

  const toggleFavorite = id => {
    const updatedList = [...list];
    const index = updatedList.findIndex(i => i.id === id);
    updatedList[index].favorite = !updatedList[index].favorite;

    setList(updatedList);
  };

  const onDelete = () => {
    console.log('----->');
  };
  const onUpdate = () => {
    console.log('----->');
  };
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer2}>
        <View style={styles.subContainer}>
          <OpacityButton
            opacity={0.2}
            // color={theme.colors.primary}
            style={styles.backButton}
            onPress={navigation.goBack}>
            <MaterialIcon name="keyboard-backspace" color="#000" size={20} />
          </OpacityButton>
          <Subheading>Sales Team</Subheading>
        </View>
        <MenuDialog
          onUpdate={onUpdate}
          onDelete={onDelete}
          onShare={navToShare}
        />
      </View>
      {/* <AutoDragSortableView
        dataSource={milestones}
        maxScale={1.03}
        style={styles.autoDragView}
        childrenWidth={Layout.window.width}
        childrenHeight={ROW_HEIGHT}
        keyExtractor={(_, i) => i.toString()}
        renderItem={() => <RenderTaskList />}
      /> */}
      <View style={styles.contentContainer}>
        <FlatList
          data={incompleteList}
          extraData={incompleteList}
          keyExtractor={(_, index) => String(index)}
          renderItem={({item}) => (
            <RenderTodoCard
              item={item}
              toggleComplete={toggleComplete}
              toggleFavorite={toggleFavorite}
              navToDetails={navToDetails}
            />
          )}
        />

        {completedList.length ? (
          <>
            <View style={styles.completeHeadingContainer}>
              <Text style={styles.completedHeading}>Completed</Text>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="black"
              />
            </View>
            <FlatList
              data={completedList}
              extraData={completedList}
              keyExtractor={(_, index) => String(index)}
              renderItem={({item}) => (
                <RenderTodoCard
                  item={item}
                  toggleComplete={toggleComplete}
                  toggleFavorite={toggleFavorite}
                  navToDetails={navToDetails}
                />
              )}
            />
          </>
        ) : null}
      </View>
      <FAB
        style={[styles.fab, {backgroundColor: theme.colors.primary}]}
        icon="plus"
        onPress={navToAdd}
      />
    </View>
  );
}

export default withTheme(SubTaskList);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },
  cardContainer: {
    marginVertical: 5,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  completeHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    marginTop: 10,
    marginBottom: 5,
  },
  subCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    margin: 15,
  },
  completedHeading: {
    fontSize: 17,
  },
  successParagraph: {
    fontSize: 12,
    color: '#005BE4',
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: ' rgba(72, 114, 244, 0.1)',
    borderRadius: 10,
  },
  headingContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    // margin: 15,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },

  backButton: {
    borderRadius: 50,
    marginRight: 10,
    width: 30,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 20,
    bottom: 20,
    color: 'red',
  },
});

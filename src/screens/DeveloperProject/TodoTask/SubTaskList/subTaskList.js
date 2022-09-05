import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {View, StyleSheet} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import {
  Caption,
  FAB,
  Paragraph,
  Subheading,
  Text,
  withTheme,
} from 'react-native-paper';
import {AutoDragSortableView} from 'react-native-drag-sort';

import Layout from 'utils/Layout';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TaskMenu from '../Components/MenuDialog';

const arr = [
  {title: ' Pay Bill For Gas Cylinder', favorite: true},
  {title: 'Need more candidates', favorite: false},
  {title: ' interview with startup', favorite: false},
  {title: ' 2nd round with dev', favorite: false},
  {title: 'talk to harry', favorite: false},
];

function InCompleteCard(props) {
  const {navigation, inComplete, setIncomplete, complete, setComplete} = props;

  const handlePress = i => {
    const dummy = [...inComplete];
    const completeDummy = [...complete, inComplete[i]];
    setComplete(completeDummy);
    dummy.splice(i, 1);
    setIncomplete(dummy);
  };

  const navToDetails = () => navigation.navigate('TaskDetails');

  return (
    <View>
      <Text>
        {inComplete.map((ele, index) => {
          return (
            <View style={styles.CardContainer}>
              <View style={styles.headingContainer}>
                <View style={styles.subCardContainer}>
                  <OpacityButton opacity={0} onPress={() => handlePress(index)}>
                    <Feather
                      name="circle"
                      size={25}
                      color="rgba(4, 29, 54, 0.15)"
                      style={styles.circle}
                    />
                  </OpacityButton>

                  <View style={{}}>
                    <TouchableOpacity
                      onPress={navToDetails}
                      style={styles.paragraph}>
                      <Text style={{color: '#005BE4'}}>{ele.title}</Text>

                      <Caption>2 of 5. 15 March,2022. Jayesh Ghandhi</Caption>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.icons}>
                  {ele.favorite ? (
                    <OpacityButton opacity={0}>
                      <MaterialCommunityIcons
                        name="star"
                        size={23}
                        color="#FFC700"
                      />
                    </OpacityButton>
                  ) : (
                    <OpacityButton opacity={0}>
                      <MaterialCommunityIcons name="star-outline" size={23} />
                    </OpacityButton>
                  )}
                  {/* {index === 0 ? (
                    <OpacityButton opacity={0}>
                      <MaterialIcon
                        name="drag-indicator"
                        id="testId"
                        size={24}
                        color="#041D36"
                      />
                    </OpacityButton>
                  ) : null} */}
                </View>
              </View>
            </View>
          );
        })}
      </Text>
    </View>
  );
}

function Completed(props) {
  const {complete} = props;

  return (
    <View>
      <Text>
        {complete.map((element, index) => {
          return (
            <View style={styles.CardContainer}>
              <View style={styles.headingContainer}>
                <View style={styles.subCardContainer}>
                  <OpacityButton opacity={0}>
                    <MaterialCommunityIcons
                      name="checkbox-marked-circle"
                      size={25}
                      color="#005BE4"
                      style={styles.circle}
                    />
                  </OpacityButton>

                  <View>
                    <Paragraph style={styles.successParagraph}>
                      {element.title}
                    </Paragraph>

                    <Caption>2 of 5. 15 March,2022. Jayesh Ghandhi</Caption>
                  </View>
                </View>
                <View style={styles.icons}>
                  {element.favorite ? (
                    <OpacityButton opacity={0}>
                      <MaterialCommunityIcons
                        name="star"
                        size={23}
                        color="#FFC700"
                      />
                    </OpacityButton>
                  ) : (
                    <OpacityButton opacity={0}>
                      <MaterialCommunityIcons name="star-outline" size={23} />
                    </OpacityButton>
                  )}
                </View>
              </View>
            </View>
          );
        })}
      </Text>
    </View>
  );
}

function SubTaskList(props) {
  const {navigation, theme} = props;

  const [inComplete, setIncomplete] = useState(arr);
  const [complete, setComplete] = useState([]);

  const navToAdd = () => {
    navigation.navigate('AddTask');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer2}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <OpacityButton
            opacity={0.2}
            // color={theme.colors.primary}
            style={styles.backButton}
            onPress={navigation.goBack}>
            <MaterialIcon name="keyboard-backspace" color="#000" size={20} />
          </OpacityButton>
          <Subheading>Sales Team</Subheading>
        </View>
        <TaskMenu />
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
      <View style={styles.container}>
        <InCompleteCard
          inComplete={inComplete}
          setIncomplete={setIncomplete}
          complete={complete}
          navigation={navigation}
          setComplete={setComplete}
        />
        <View
          style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 5}}>
          <Text style={{fontSize: 17}}>Completed</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="black"
          />
        </View>

        <Completed
          inComplete={inComplete}
          setIncomplete={setIncomplete}
          complete={complete}
          setComplete={setComplete}
        />
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
  },

  CardContainer: {
    width: Layout.window.width,
    paddingHorizontal: 8,
    display: 'flex',
    padding: 5,
  },

  subCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  paragraph: {
    fontSize: 12,
    color: '#005BE4',
  },
  menu: {
    marginLeft: 170,
  },

  circle: {
    margin: 15,
  },
  successParagraph: {
    textDecorationLine: 'line-through',
    fontSize: 12,
    color: '#005BE4',
  },
  paragraph2: {
    margin: 30,
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

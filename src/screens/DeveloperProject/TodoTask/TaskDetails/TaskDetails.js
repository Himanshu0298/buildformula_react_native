import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {View, StyleSheet} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import {Caption, Paragraph, Text, withTheme} from 'react-native-paper';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {theme} from 'styles/theme';
import {useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const arr = [
  {title: 'Pay Bill', icon: 'checkbox-marked-circle', completed: false},
  {
    title: 'Check Bank Statement',
    icon: 'checkbox-marked-circle',
    completed: false,
  },
  {
    title: 'Print bill payed Receipt',
    icon: 'checkbox-blank-circle-outline',
    completed: false,
  },
  {
    title: 'Attach in file',
    icon: 'checkbox-blank-circle-outline',
    completed: false,
  },
];

const Attachment = [
  {
    title: 'broser.pdf',
    icon: 'file-pdf-box',
    storage: '1.5mb',
    name: 'download',
  },
  {
    title: 'broser.pdf',
    icon: 'file-pdf-box',
    storage: '1.5mb',
    name: 'download',
  },
];

const Array = [
  {title: 'Reminder', caption: '15 March 2022,1:00 PM'},
  {title: 'Due Date', caption: '20 March, 2022'},
];

function TaskDetails(props) {
  const {navigation} = props;

  const navToEdit = () => {
    navigation.navigate('AddTask', {type: 'edit'});
  };

  const handleDelete = () => {
    console.log('----->');
  };

  const toggleComplete = () => {
    console.log('----->');
  };

  const AddToFavorite = i => {
    console.log('----->i', i);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.subContainer1}>
          <OpacityButton
            opacity={0.2}
            style={styles.backButton}
            onPress={navigation.goBack}>
            <MaterialIcon name="keyboard-backspace" color="#000" size={20} />
          </OpacityButton>

          <Text style={styles.text}> Task</Text>
          <View style={styles.subContainer}>
            <OpacityButton
              opacity={0.1}
              color={theme.colors.error}
              onPress={handleDelete}
              style={styles.icons}>
              <MaterialCommunityIcons name="delete" size={18} color="#FF5D5D" />
            </OpacityButton>
            <OpacityButton
              opacity={0.1}
              color={theme.colors.primary}
              onPress={navToEdit}
              style={styles.icons}>
              <MaterialCommunityIcons
                name="pencil"
                size={18}
                color={theme.colors.primary}
              />
            </OpacityButton>
            <OpacityButton
              opacity={0.2}
              style={styles.icons}
              onPress={AddToFavorite}>
              <MaterialCommunityIcons
                name="star-outline"
                size={18}
                color={theme.colors.primary}
              />
            </OpacityButton>
          </View>
        </View>
        <View style={styles.tasks}>
          <TouchableOpacity opacity={0} onPress={toggleComplete}>
            <Feather name="circle" size={22} color="#4872F4" />
          </TouchableOpacity>
          <Text style={styles.header}>2nd round with dev</Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.textContainer}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida
            duis consectetur adipiscing eu egestas sed id euismod erat. Turpis
            morbi tellus eu leo. Donec vestibulum aliquet facilisi tristique. In
            neque dictum quis turpis. Nisl, faucibus fermentum mauris dolor in
            vitae magna sit. Donec libero sed risus fringilla ultrices imperdiet
            fringilla eu odio.
          </Text>
        </View>
        <View>
          {arr.map((element, index) => {
            return (
              <View style={styles.detailContainer}>
                <OpacityButton opacity={0} onPress={toggleComplete}>
                  <MaterialCommunityIcons
                    name={element.icon}
                    size={20}
                    color="#005BE4"
                    style={styles.circle}
                  />
                </OpacityButton>
                <Paragraph style={styles.successParagraph}>
                  {element.title}
                </Paragraph>
              </View>
            );
          })}
        </View>

        {Array.map((i, index) => {
          return (
            <View style={styles.captionContainer}>
              <Caption style={styles.caption}>{i.title} :</Caption>
              <Text style={styles.value}>{i.caption}</Text>
            </View>
          );
        })}
        <View style={styles.captionContainer}>
          <Caption style={styles.caption}>Assignee:</Caption>
        </View>
        <View style={styles.headingContainer}>
          <View style={{padding: 5}}>
            <Text style={styles.textContainer}> Pratik Ghandhi</Text>

            <Caption style={styles.input}>pratikghandhi0001@gmail.com</Caption>
          </View>
        </View>

        <View style={styles.captionContainer}>
          <Caption style={styles.caption}>Attachments</Caption>
        </View>

        {Attachment.map((ele, index) => {
          return (
            <View style={styles.card}>
              <View style={styles.cardContainer}>
                <View style={styles.subCardContainer}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.pdfIcon}>
                      <MaterialCommunityIcons
                        name={ele.icon}
                        size={25}
                        color="#4872F4"
                      />
                    </View>
                    <View>
                      <View style={styles.InputContainer}>
                        <Text>{ele.title}</Text>
                        <View>
                          <Caption> {ele.storage}</Caption>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.download}>
                  <AntDesign name={ele.name} size={24} color="#4872F4" />
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

export default withTheme(TaskDetails);

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },

  value: {
    fontSize: 12,
    marginTop: 5,
  },

  header: {
    color: '#4872F4',
    margin: 5,
  },

  textContainer: {
    paddingTop: 4,
  },

  pdfIcon: {
    margin: 10,
    backgroundColor: 'rgba(72, 114, 244, 0.2)',
  },

  tasks: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },

  InputContainer: {
    paddingTop: 5,
  },

  download: {
    alignSelf: 'flex-end',
    paddingBottom: 10,
    marginRight: 15,
  },

  card: {
    borderWidth: 1,
    margin: 5,
    borderColor: 'rgba(72, 114, 244, 0.2)',
    borderRadius: 5,
  },

  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  description: {
    marginHorizontal: 15,
  },

  input: {
    fontStyle: 'italic',
  },

  text: {
    paddingTop: 5,
    fontSize: 15,
  },
  subContainer1: {
    flexDirection: 'row',
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },

  caption: {
    margin: 15,
    fontSize: 13,
  },

  captionContainer: {
    marginTop: 15,
    flexDirection: 'row',
  },

  icons: {
    borderRadius: 50,
    width: 28,
    marginRight: 10,
  },
  backButton: {
    borderRadius: 50,
    marginRight: 10,
    width: 30,
  },
  successParagraph: {
    textDecorationLine: 'line-through',
    fontSize: 12,
  },

  subCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingContainer: {
    borderLeftWidth: 4,
    borderLeftColor: '#4872F4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: ' rgba(72, 114, 244, 0.1)',
    borderRadius: 5,
  },
  cardContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'rgba(4, 29, 54, 0.1)',
    borderRadius: 5,
  },
});

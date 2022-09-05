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

const arr = [
  {title: 'Pay Bill', icon: 'checkbox-marked-circle'},
  {title: 'Check Bank Statement', icon: 'checkbox-marked-circle'},
  {title: 'Print bill payed Receipt', icon: 'checkbox-marked-circle'},
  {title: 'Attach in file', icon: 'checkbox-marked-circle'},
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

function TaskDetails(props) {
  const {navigation, onDelete} = props;

  const [edit, setEdit] = useState(false);

  const toggleEdit = () => setEdit(v => !v);

  const navToEdit = () => {
    navigation.navigate('AddTask', {type: 'edit'});
  };

  const handleDelete = () => {
    console.log('-----> ');
  };

  return (
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
            onPress={console.log('-----> ')}>
            <MaterialCommunityIcons
              name="star-outline"
              size={18}
              color="#4872F4"
            />
          </OpacityButton>
        </View>
      </View>
      <View style={styles.tasks}>
        <OpacityButton opacity={0}>
          <Feather name="circle" size={23} color="#4872F4" />
        </OpacityButton>
        <Text style={styles.header}>2nd round with dev</Text>
      </View>
      <View style={styles.description}>
        <Text style={styles.textContainer}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida duis
          consectetur adipiscing eu egestas sed id euismod erat. Turpis morbi
          tellus eu leo. Donec vestibulum aliquet facilisi tristique. In neque
          dictum quis turpis. Nisl, faucibus fermentum mauris dolor in vitae
          magna sit. Donec libero sed risus fringilla ultrices imperdiet
          fringilla eu odio.
        </Text>
      </View>
      <View style={{}}>
        {arr.map((element, index) => {
          return (
            <View style={styles.detailContainer}>
              <OpacityButton opacity={0}>
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
      <View style={styles.captionContainer}>
        <Caption style={styles.caption}>Reminder :</Caption>
        <Text style={styles.value}> 15 March 2022,1:00 PM</Text>
      </View>
      <View style={styles.captionContainer}>
        <Caption style={styles.caption}>Due Date :</Caption>
        <Text style={styles.value}>20 March, 2022</Text>
      </View>
      <View style={styles.captionContainer}>
        <Caption style={styles.caption}>Assignee:</Caption>
      </View>
      <View style={styles.headingContainer}>
        <View style={styles.subCardContainer}>
          <View style={{padding: 5}}>
            <Text style={styles.textContainer}> Pratik Ghandhi</Text>

            <Caption style={styles.input}>pratikghandhi0001@gmail.com</Caption>
          </View>
        </View>
      </View>

      <View style={styles.captionContainer}>
        <Caption style={styles.caption}>Attachments</Caption>
      </View>

      {Attachment.map((ele, index) => {
        return (
          <View style={styles.card}>
            <View style={styles.headingContainer1}>
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
                    <View style={{paddingTop: 5}}>
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
  );
}

export default withTheme(TaskDetails);

const styles = StyleSheet.create({
  container: {margin: 10},

  value: {
    fontSize: 12,
    marginTop: 5,
  },

  header: {
    color: '#4872F4',
    marginTop: 5,
  },

  textContainer: {
    fontSize: 12,
  },

  pdfIcon: {
    margin: 10,
    backgroundColor: 'rgba(72, 114, 244, 0.2)',
  },

  tasks: {
    flexDirection: 'row',
    marginTop: 15,
  },

  download: {
    alignSelf: 'flex-end',
    paddingBottom: 10,
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
    fontSize: 8,
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
    marginVertical: 5,
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
    borderRadius: 10,
  },
  headingContainer1: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'rgba(4, 29, 54, 0.1)',
    borderRadius: 5,
  },
});

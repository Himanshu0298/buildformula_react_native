import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import * as React from 'react';
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import {
  Text,
  withTheme,
  Subheading,
  Caption,
  Divider,
  Button,
} from 'react-native-paper';
import {theme} from 'styles/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import UserIcon from 'assets/images/requestedUser.png';

const TaskList = () => {
  return (
    <View style={styles.listContainer}>
      <Text style={styles.taskHeading}>Call Or visit Side</Text>
      <View style={styles.listItems}>
        <MaterialCommunityIcons name="home-analytics" size={24} color="grey" />
        <Caption style={styles.captionText}>Apr21,Block-25</Caption>
      </View>
      <View style={styles.listItems}>
        <MaterialIcons name="phone" size={24} color="grey" />
        <Caption style={styles.captionText}>+91 9874563210</Caption>
      </View>
      <Divider style={styles.divider} />

      <View style={styles.remarkContainer}>
        <Text style={styles.remarkText}>Remark</Text>
        <Caption>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
          minus beatae! Reprehenderit ex voluptate repudiandae sapiente dolorem,
          molestiae, beatae aut fugit, doloribus dolorum ullam voluptates?
        </Caption>
      </View>
      <Divider style={styles.divider} />

      <View style={styles.userContainer}>
        <Image source={UserIcon} />
        <View style={styles.userDetails}>
          <Caption>Assigned to</Caption>
          <Text>Sanaya Patel</Text>
        </View>
      </View>
      <Divider style={styles.divider} />

      <View style={styles.taskButtonContainer}>
        <Button style={styles.taskButton} mode="outlined">
          View Details
        </Button>
        <Button style={styles.taskButton} mode="contained">
          Complete Task
        </Button>
      </View>
    </View>
  );
};

function FollowUpDetails(props) {
  const {navigation} = props;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.button}>
          <OpacityButton
            opacity={0.1}
            color={theme.colors.primary}
            style={styles.backButton}
            onPress={navigation.goBack}>
            <MaterialCommunityIcons
              name="keyboard-backspace"
              size={18}
              color="black"
            />
          </OpacityButton>
          <Subheading>Follow-up Task Details</Subheading>
        </View>
        <TaskList />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },

  button: {
    flexDirection: 'row',
    padding: 10,
  },
  backButton: {
    borderRadius: 50,
    marginRight: 7,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 15,
    padding: 10,
  },
  taskHeading: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 15,
  },
  listItems: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  captionText: {
    marginLeft: 10,
  },
  divider: {
    height: 2,
    marginTop: 10,
  },
  remarkContainer: {
    marginTop: 10,
  },
  remarkText: {
    color: '#000',
    fontWeight: '700',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  userDetails: {
    marginLeft: 15,
  },
  taskButton: {
    borderColor: theme.colors.primary,
  },
  taskButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
    paddingHorizontal: 10,
  },
});

export default withTheme(FollowUpDetails);

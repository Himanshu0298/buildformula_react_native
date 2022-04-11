import * as React from 'react';
import {Divider, Text, withTheme} from 'react-native-paper';
import {StyleSheet, View, ScrollView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {theme} from 'styles/theme';
import ProgressCard from '../Components/ProgressCard';
import AddProgressDialog from '../Components/AddProgressDialog';

const Header = props => {
  const {onPress, navigation} = props;
  console.log('-------->props', props);
  return (
    <View>
      <View style={styles.container}>
        <Text style={{color: theme.colors.primary}}>Record Progress</Text>
      </View>
      <View>
        <Text style={styles.headerText}>WBS Execution</Text>
      </View>
      <View style={styles.headerContainer}>
        <View style={styles.button}>
          <OpacityButton
            opacity={0.1}
            color={theme.colors.primary}
            style={styles.backButton}
            // onPress={navigation.goBack}
          >
            <MaterialCommunityIcons
              name="keyboard-backspace"
              size={18}
              color="black"
            />
          </OpacityButton>
        </View>
        <View style={styles.navigationTextContainer}>
          <Text style={styles.headerNavigationText}>w-1.1</Text>
          <Text>PCC-1</Text>
        </View>
        <OpacityButton
          opacity={0.2}
          color={theme.colors.primary}
          style={styles.addbutton}
          onPress={onPress}>
          <Text style={{color: theme.colors.primary}}>Add</Text>
        </OpacityButton>
      </View>
      <Divider />
    </View>
  );
};

function RecordsDetails(props) {
  const data = [1, 2, 3, 4];

  const [showAdd, setShowAdd] = React.useState(false);

  const toggleAddDialog = () => setShowAdd(v => !v);

  const handleAddProgress = () => {
    console.log('clicked');
  };

  return (
    <View style={styles.recordContainer}>
      <AddProgressDialog
        open={showAdd}
        title="Add Progress Record"
        handleClose={toggleAddDialog}
        handleSubmit={handleAddProgress}
      />
      <Header onPress={toggleAddDialog} />
      <View style={styles.recordContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {data.map(item => {
            return <ProgressCard header={false} />;
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    margin: 10,
  },
  headerNavigationText: {
    marginRight: 10,
    fontSize: 13,
    marginBottom: 5,
    backgroundColor: '#rgba(72, 114, 244, 0.1);',
    borderRadius: 5,
    paddingHorizontal: 5,
    width: 45,
  },
  button: {
    padding: 10,
  },
  backButton: {
    borderRadius: 50,
    marginRight: 7,
  },
  addbutton: {
    marginRight: 10,
  },
  recordContainer: {
    flex: 1,
  },
  navigationTextContainer: {
    flexDirection: 'row',
    marginRight: 150,
  },

  headerText: {
    margin: 10,
    fontSize: 18,
  },
});

export default withTheme(RecordsDetails);

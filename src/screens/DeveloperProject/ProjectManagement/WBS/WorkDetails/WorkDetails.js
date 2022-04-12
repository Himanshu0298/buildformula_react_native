import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import * as React from 'react';
import {Text, withTheme} from 'react-native-paper';
import {ScrollView, StyleSheet, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from 'styles/theme';
import {getShadow} from 'utils';
import ProgressCard from '../Components/ProgressCard';
import AddProgressDialog from '../Components/AddProgressDialog';
import WorkPath from '../Components/WorkPath';

export const Header = props => {
  const {navigation, data} = props;
  return (
    <View>
      <View style={styles.headerContainer}>
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
        </View>
        <Text style={styles.headerNavigationText}>w-1.1</Text>
        <Text>PCC-1</Text>
      </View>
      <WorkPath data={data} />
    </View>
  );
};

const Details = () => {
  const data = [
    {name: 'Start Date', value: 1},
    {name: 'Finish Date', value: 1},
    {name: 'Duration', value: 1},
  ];

  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.executionHeading}>Execution</Text>
      <View style={styles.executionDateContainer}>
        <Text style={styles.executionDate}>Execution Date</Text>
        {data.map(item => {
          return (
            <View style={styles.renderContainer}>
              <Text>{item.name}</Text>
              <Text>:--</Text>
              <Text>{item.value}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const AddButton = props => {
  const {onPress} = props;
  return (
    <OpacityButton
      onPress={onPress}
      opacity={0.1}
      style={styles.addButton}
      color="#fff">
      <Text style={{color: theme.colors.primary}}>+ Add Progress Record</Text>
    </OpacityButton>
  );
};

function Execution(props) {
  const [showAdd, setShowAdd] = React.useState(false);

  const toggleAddDialog = () => setShowAdd(v => !v);

  const handleAddProgress = value => {
    console.log('-------->value', value);
  };

  return (
    <View>
      <AddProgressDialog
        open={showAdd}
        title="Add Progress Record"
        handleClose={toggleAddDialog}
        handleSubmit={handleAddProgress}
      />
      <ScrollView>
        <Header {...props} data={[1, 2, 3]} />
        <Details {...props} />
        <ProgressCard {...props} header />
        <AddButton onPress={toggleAddDialog} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerNavigationText: {
    marginRight: 10,
  },
  button: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    padding: 10,
  },
  backButton: {
    borderRadius: 50,
    marginRight: 7,
  },

  detailsContainer: {
    padding: 10,
  },
  executionHeading: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  executionDateContainer: {
    padding: 10,
    backgroundColor: '#F2F4F5',
    borderRadius: 5,
  },
  executionDate: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  renderContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  addButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.primary,
    padding: 10,
    margin: 10,
  },
});

export default withTheme(Execution);

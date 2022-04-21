import CustomCheckbox from 'components/Atoms/CustomCheckbox';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Subheading, withTheme} from 'react-native-paper';
import {theme} from 'styles/theme';
import ActionButtons from '../AddChallan/Components/ActionButtons';

const LIST_DATA = [1];

const HeaderTitle = () => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titles}>Catergory</Text>
      <Text style={styles.titles}>Sub Category</Text>
      <Text style={styles.titles}>{'    '}Unit</Text>
    </View>
  );
};

const MaterialData = props => {
  return (
    <View style={styles.valuesContainer}>
      <CustomCheckbox {...props} />
      <Text style={styles.values}>Bricks</Text>
      <Text style={styles.values}>Bricks 6 Inch</Text>
      <Text style={styles.values}>{'    '}Nos</Text>
    </View>
  );
};

function SelectMaterials(props) {
  const {navigation} = props;

  const navToStepThree = () => {
    navigation.navigate('AddMaterialInfo');
  };

  return (
    <View style={styles.actionContainer}>
      <Subheading style={styles.subHeading}>
        Select materials which is right now
      </Subheading>
      <HeaderTitle />
      {LIST_DATA.map(item => {
        return <MaterialData item={item} />;
      })}
      <ActionButtons
        style={styles.actionButton}
        onPress={navToStepThree}
        submitLabel="Select"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    marginTop: 25,
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 50,
    marginTop: 10,
  },
  titles: {
    flex: 1,
    color: theme.colors.primary,
    marginLeft: 15,
  },
  valuesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 50,
    marginTop: 10,
    alignItems: 'center',
  },
  values: {
    flex: 1,
    marginLeft: 15,
  },
  subHeading: {
    marginLeft: 20,
  },
  actionButton: {
    marginRight: 10,
  },
});

export default withTheme(SelectMaterials);

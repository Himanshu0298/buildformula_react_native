import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {Caption, Divider, Title} from 'react-native-paper';
import {theme} from 'styles/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RenderHtml from 'react-native-render-html';
import Layout from 'utils/Layout';

function SingleUnit(props) {
  const {sectionLeft, sectionRight} = props;
  return (
    <View style={styles.singleUnitContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{sectionLeft.label}: </Text>
        <Text>{sectionLeft.value} </Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.labelText}>{sectionRight.label}: </Text>
        <Text>{sectionRight.value} </Text>
      </View>
    </View>
  );
}

const DealsClosed = props => {
  const {dealsClosed, navigation} = props;

  const handleRemarkPress = remark => {
    navigation.navigate('Remark', {remark});
  };

  return (
    <ScrollView style={styles.dealsClosedContainer}>
      {dealsClosed?.map(value => {
        const remark = value.Remark;

        const isHtml = remark?.includes('<') && remark?.includes('>');

        return (
          <View Style={styles.container}>
            <View style={styles.mainContainer}>
              <View style={styles.propertyContainer}>
                <Title>Property</Title>
                <Caption>{value.booking_date}</Caption>
              </View>
              <SingleUnit
                sectionLeft={{label: 'Type', value: value.projectType}}
                sectionRight={{label: 'Tower', value: value.Tower}}
              />
              <SingleUnit
                sectionLeft={{label: 'Floor', value: value.Floor}}
                sectionRight={{label: 'Unit', value: value.Unitnumber}}
              />
            </View>
            <Divider style={styles.divider} />
            <View style={styles.remarkContainer}>
              <View style={styles.remark}>
                <Text>Remark</Text>
                <OpacityButton
                  color={theme.colors.primary}
                  opacity={0.18}
                  style={styles.button}
                  onPress={() => {
                    handleRemarkPress(remark);
                  }}>
                  <MaterialIcons
                    name="edit"
                    color={theme.colors.primary}
                    size={10}
                  />
                </OpacityButton>
              </View>
              {!isHtml ? (
                <Text style={styles.remarkText}>{remark}</Text>
              ) : (
                <RenderHtml
                  source={{html: remark}}
                  contentWidth={Layout.window.width}
                />
              )}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default DealsClosed;

const styles = StyleSheet.create({
  singleUnitContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  labelContainer: {
    borderRightWidth: 1,
    borderRightColor: 'grey',
    flexDirection: 'row',
    paddingRight: 10,
  },
  labelText: {
    color: 'grey',
  },
  rightSection: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  container: {
    borderWidth: 1,
    marginTop: 20,
    borderColor: '#C3C3C3',
    margin: 10,
  },
  propertyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  mainContainer: {
    padding: 10,
  },
  divider: {
    height: 2,
  },
  remarkContainer: {
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
  remark: {
    flexDirection: 'row',
  },
  button: {
    borderRadius: 20,
    marginLeft: 10,
    marginBottom: 10,
  },
  remarkText: {
    marginTop: 10,
  },
  dealsClosedContainer: {
    padding: 10,
  },
});

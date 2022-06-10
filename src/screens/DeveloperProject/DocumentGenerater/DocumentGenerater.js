import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Divider, Subheading, withTheme} from 'react-native-paper';

const DATA = [1, 2, 3];

const HeaderTitle = () => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>ID</Text>
      <Text style={styles.titleText}>Document Name</Text>
      <Text style={styles.titleText}>Description</Text>
    </View>
  );
};

const DocumentDetails = props => {
  return (
    <View>
      <View style={styles.detailsContainer}>
        <Text>1</Text>
        <Text>Allotment Letter</Text>
        <Text>Allotment Letter</Text>
      </View>
      <Divider />
    </View>
  );
};

function DocumentGenerater(props) {
  return (
    <View style={{flex: 1, marginTop: 10}}>
      <Subheading style={{fontSize: 20, padding: 10}}>
        Document Gernerator
      </Subheading>
      <Divider style={{height: 1}} />
      <View style={{flex: 1}}>
        <HeaderTitle />
        <Divider style={{height: 1}} />
        {DATA.map(item => {
          return <DocumentDetails item={item} />;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 5,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    margin: 10,
  },
  titleText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 15,
    margin: 5,
  },
});

export default withTheme(DocumentGenerater);

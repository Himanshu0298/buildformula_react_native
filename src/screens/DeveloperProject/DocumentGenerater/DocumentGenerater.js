import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import * as React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, withTheme, Subheading} from 'react-native-paper';
import {theme} from 'styles/theme';
import Feather from 'react-native-vector-icons/Feather';

const DATA = [1, 2, 3];

const ApprovalList = props => {
  const {navigation} = props;

  const navToDownload = () => {
    navigation.navigate('DocumentDownload');
  };

  return (
    <TouchableOpacity style={styles.contentContainer}>
      <View style={styles.titleStyle}>
        <View style={styles.approvalContainer}>
          <OpacityButton
            style={{
              paddingHorizontal: 5,
              paddingVertical: 2,
              borderRadius: 3,
            }}>
            <Text style={{color: theme.colors.primary}}>2</Text>
          </OpacityButton>
          <Text style={styles.headingText}>Allotment letter</Text>
        </View>
        <TouchableOpacity onPress={navToDownload}>
          <Feather name="download" size={20} color="blue" />
        </TouchableOpacity>
      </View>
      <View style={styles.listDetailContainer}>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
          voluptate eum deserunt, quas minima qui?
        </Text>
      </View>
    </TouchableOpacity>
  );
};

function DocumentGenerater(props) {
  const {navigation, route} = props;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <Subheading style={styles.Subheading}>Document Generater</Subheading>
        {DATA.map(item => {
          return <ApprovalList item={item} {...props} />;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 20,
    // paddingVertical: 5,
    flexGrow: 1,
  },

  contentContainer: {
    backgroundColor: '#F2F4F5',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },

  titleStyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
  },

  approvalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headingText: {
    marginLeft: 5,
  },

  listDetailContainer: {
    paddingLeft: 25,
    marginVertical: 5,
  },
  Subheading: {
    paddingVertical: 10,
    color: theme.colors.primary,
  },
});

export default withTheme(DocumentGenerater);

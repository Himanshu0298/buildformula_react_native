import React from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Layout from 'utils/Layout';
import {Text, withTheme} from 'react-native-paper';
import {getShadow} from 'utils';
import {useSelector} from 'react-redux';
import {BASE_API_URL} from 'utils/constant';

function GeneralDashboard(props) {
  const {onRefresh} = props;

  const {selectedProject} = useSelector(s => s.project);
  console.log(
    '🚀 ~ file: GeneralDashboard.js:12 ~ GeneralDashboard ~ selectedProject:',
    `http://104.198.176.6/logo_images/${selectedProject.company_logo_url}`,
  );

  // http://104.198.176.6/logo_images/1672048141.png

  const company_logo = selectedProject.company_logo_url;

  return (
    <View style={styles.staticsContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }>
        <Text>Data</Text>
        {/* <Image
          source={{
            url: `http://104.198.176.6/logo_images/${}`,
          }}
          width={50}
          height={50}
        /> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  staticsContainer: {
    backgroundColor: '#eaeff1',
    flexGrow: 1,
  },
});

export default withTheme(GeneralDashboard);

import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import {Subheading, withTheme, Divider, Caption} from 'react-native-paper';
import backArrow from 'assets/images/back_arrow.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useCustomerActions from 'redux/actions/customerActions';
import {useState} from 'react';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';

const ModifyRequestDetails = () => {
  const [edit, setEdit] = useState(true);

  return (
    <View>
      <Subheading style={{marginTop: 10, marginBottom: 10}}>
        Modify Requests
      </Subheading>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginHorizontal: 20,
          backgroundColor: '#F2F4F5',
          paddingHorizontal: 20,
          paddingBottom: 20,
          borderRadius: 8,
        }}>
        <View style={{width: '50%', marginTop: 20}}>
          <Text>Property Details</Text>
          <Text>3</Text>
        </View>
        <View style={{width: '50%', marginTop: 20}}>
          <Text>Property </Text>
          <Text>3</Text>
        </View>
        <Text>Property</Text>

        <View style={{width: '100%', marginTop: 20}}>
          {edit ? (
            <View>
              <Text>Approved</Text>
              <OpacityButton
                opacity={1}
                // onPress={onPressNext}
              >
                {/* <MaterialCommunityIcons
                name="arrow-right"
                size={20}
                color="#fff"
              /> */}
                <Text>edit</Text>
              </OpacityButton>
            </View>
          ) : (
            <Text>5</Text>
          )}
        </View>
      </View>

      {/* <View style={styles.contentContainer}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text>Property Details</Text>
          <Text style={{marginLeft: 50}}>Created On</Text>
        </View>
        <Text style={{marginTop: 30}}>Details</Text>
      </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#F2F4F5',
    borderRadius: 8,
    padding: 10,
  },
});

export default ModifyRequestDetails;

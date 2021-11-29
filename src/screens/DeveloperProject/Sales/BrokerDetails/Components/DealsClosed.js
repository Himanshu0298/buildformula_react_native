import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Caption, Divider, Title} from 'react-native-paper';
import {theme} from 'styles/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RenderHtml from 'react-native-render-html';
import Layout from 'utils/Layout';

const SingleUnit = props => {
  const {sectionLeft, sectionRight} = props;
  return (
    <View style={{flexDirection: 'row', marginBottom: 10}}>
      <View
        style={{
          borderRightWidth: 1,
          borderRightColor: 'grey',
          flexDirection: 'row',
          paddingRight: 10,
        }}>
        <Text style={{color: 'grey'}}>{sectionLeft.label}: </Text>
        <Text>{sectionLeft.value} </Text>
      </View>
      <View style={{flexDirection: 'row', marginLeft: 10}}>
        <Text style={{color: 'grey'}}>{sectionRight.label}: </Text>
        <Text>{sectionRight.value} </Text>
      </View>
    </View>
  );
};

const DealsClosed = props => {
  const {dealsClosed, navigation} = props;

  const handleRemarkPress = remark => {
    navigation.navigate('Remark', {remark: remark});
  };

  return dealsClosed?.map(value => {
    const remark = value.Remark;

    const isHtml = remark?.includes('<') && remark?.includes('>');

    return (
      <View
        style={{
          borderWidth: 1,
          marginTop: 20,
          borderColor: '#C3C3C3',
          margin: 10,
        }}>
        <View style={{padding: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
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
        <Divider style={{height: 2}} />
        <View
          style={{paddingHorizontal: 10, paddingTop: 20, paddingBottom: 20}}>
          <View style={{flexDirection: 'row'}}>
            <Text>Remark</Text>
            <OpacityButton
              color={theme.colors.primary}
              opacity={0.18}
              style={{borderRadius: 20, marginLeft: 10, marginBottom: 10}}
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
            <Text style={{marginTop: 10}}>{remark}</Text>
          ) : (
            <RenderHtml
              source={{html: remark}}
              contentWidth={Layout.window.width}
            />
          )}
        </View>
      </View>
    );
  });
};

export default DealsClosed;

const styles = StyleSheet.create({
  // Button: {
  //   padding: 10,
  //   margin: 10,
  // },
});

import React, {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {} from 'react-native-paper';
import PropTypes from 'prop-types';
import book from 'assets/images/book.png';
import hold from 'assets/images/hold.png';
import {theme} from 'styles/theme';
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Title,
  Provider,
  Headline,
  IconButton,
  Subheading,
  Divider,
} from 'react-native-paper';
import useSalesActions from 'redux/actions/salesActions';

const _data = [
  {
    title: 'Book',
    subTitle:
      "Great! You've got new customer who is excited to buy this property.",
    image: book,
  },
  {
    title: 'Hold',
    subTitle:
      "Great! You've got new customer who is excited to buy this property.",
    image: hold,
  },
];

function Option({data, onPress}) {
  return (
    <View style={{padding: 20, alignItems: 'center'}}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          alignItems: 'center',
          borderWidth: 2,
          borderColor: '#EAECF1',
          width: '60%',
          marginBottom: 10,
        }}>
        <Text style={{marginVertical: 10}}>{data.title}</Text>
        <Image
          source={data.image}
          style={{
            width: '100%',
            height: 120,
          }}
        />
      </TouchableOpacity>
      <Text style={{textAlign: 'center', fontSize: 13}}>{data.subTitle}</Text>
    </View>
  );
}

function SelectHoldOrBook({visible, toggleDialog, navigation}) {
  const {lockUnit} = useSalesActions();

  const handleBookPress = async props => {
    // const {navigation} = props;
    toggleDialog();
    // toggleTimer({showTimer: true, startTime: new Date(), time: 1800});
    navigation.navigate('BC_Step_Four', {
      // project_id: selectedProject.id,
      // unit_id: unit.unitId,
    });
  };

  const handleHoldPress = async props => {
    toggleDialog();
    navigation.navigate('BookingFormOnHold', {
      // project_id: selectedProject.id,
      // unit_id: unit.unitId,
    });
    // await lockUnit({unit_id: unit.unitId, project_id: selectedProject.id});
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={toggleDialog} style={styles.dialog}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <Text style={{alignItems: 'center', justifyContent: 'center'}}>
            Select an option to proceed{' '}
          </Text>
          <IconButton
            icon="close"
            size={15}
            color="white"
            onPress={() => {
              toggleDialog();
            }}
            style={{backgroundColor: '#FF5D5D'}}
          />
        </View>
        <Divider style={{backgroundColor: '#D6D3D3', height: 2}} />
        <Option
          data={_data[0]}
          onPress={() => {
            handleBookPress(navigation);
          }}
        />
        <Option data={_data[1]} onPress={handleHoldPress} />
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialog: {},
});

export default SelectHoldOrBook;

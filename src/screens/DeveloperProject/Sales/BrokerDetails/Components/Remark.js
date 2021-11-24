import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {
  withTheme,
  Caption,
  Paragraph,
  FAB,
  IconButton,
  Text,
  Button,
  Subheading,
} from 'react-native-paper';
import {getPermissions, getShadow} from 'utils';
import useSalesActions from 'redux/actions/salesActions';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import Spinner from 'react-native-loading-spinner-overlay';
import {theme} from 'styles/theme';
import ProjectHeader from 'components/Molecules/Layout/ProjectHeader';
import {PRIORITY_COLORS, STRUCTURE_TYPE_LABELS} from 'utils/constant';
import {TabView} from 'react-native-tab-view';
import Layout from 'utils/Layout';
import MaterialTabBar from 'components/Atoms/MaterialTabBar';
import CustomBadge from 'components/Atoms/CustomBadge';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {NavigationContainer} from '@react-navigation/native';
import RenderInput from 'components/Atoms/RenderInput';
import * as Yup from 'yup';
import {Formik} from 'formik';

const schema = Yup.object().shape({
  remark: Yup.string('Invalid').required('Required'),
});

function Remark(props) {
  const {navigation, route} = props;
  const {remark} = route?.params || {};

  console.log('----->remark', remark);

  const {selectedProject} = useSelector(s => s.project);
  const {deleteBroker} = useSalesActions();

  const projectId = selectedProject.id;

  const onSubmit = values => {
    console.log('----->values', values);
  };

  return (
    <ScrollView style={{padding: 20}}>
      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}> */}
      <Text style={{color: theme.colors.primary}}>Remark</Text>
      {/* <View style={{flexDirection: 'row'}}> */}
      {/* <OpacityButton
            color={theme.colors.primary}
            opacity={0.18}
            style={{borderRadius: 20, marginLeft: 10, marginBottom: 10}}
            onPress={() => console.log('----->button pressed')}>
            <MaterialIcons
              name="check"
              color={theme.colors.primary}
              size={15}
            />
          </OpacityButton>
          <OpacityButton
            color={theme.colors.error}
            opacity={0.18}
            style={{borderRadius: 20, marginLeft: 10, marginBottom: 10}}
            onPress={() => navigation.goBack()}>
            <MaterialIcons name="edit" color={theme.colors.primary} size={15} />
          </OpacityButton> */}
      {/* </View> */}
      {/* </View> */}
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{remark: remark}}
        validationSchema={schema}
        onSubmit={onSubmit}>
        {({values, errors, handleChange, handleBlur, handleSubmit}) => {
          return (
            <View style={styles.dialogContentContainer}>
              {console.log('----->errors', errors)}
              <RenderInput
                name="remark"
                multiline
                numberOfLines={8}
                label="Remark"
                // containerStyles={styles.input}
                value={values.remark}
                onChangeText={handleChange('remark')}
                onBlur={handleBlur('remark')}
                onSubmitEditing={handleSubmit}
                returnKeyType="done"
                error={errors.remark}
              />

              <View style={styles.actionContainer}>
                <Button
                  style={{flex: 1, marginHorizontal: 5}}
                  contentStyle={{padding: 3}}
                  theme={{roundness: 15}}
                  onPress={navigation.goBack}>
                  Back
                </Button>
                <Button
                  style={{flex: 1, marginHorizontal: 5}}
                  mode="contained"
                  contentStyle={{padding: 3}}
                  theme={{roundness: 15}}
                  onPress={handleSubmit}>
                  Save
                </Button>
              </View>
            </View>
          );
        }}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  //   dialogActionContainer: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     marginTop: 20,
  //   },
});

export default withTheme(Remark);

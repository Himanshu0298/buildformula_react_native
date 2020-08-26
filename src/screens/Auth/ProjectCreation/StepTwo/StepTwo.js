import React from 'react';
import {View} from 'react-native';
import {withTheme, Title, Caption} from 'react-native-paper';
import FormTitle from '../../../../components/FormTitle';

function StepTwo({title, subTitle, theme}) {
  return (
    <FormTitle
      title={'Project Details'}
      subTitle={'Fill in the below details for your company'}
    />
  );
}

export default withTheme(StepTwo);

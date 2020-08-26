import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {withTheme, Title, Caption} from 'react-native-paper';

function FormTitle({title, subTitle, theme}) {
  return (
    <View
      style={{
        backgroundColor: theme.colors.primary,
        padding: 20,
        wight: '100%',
      }}>
      <Title>{title}</Title>
      <Caption>{subTitle}</Caption>
    </View>
  );
}

FormTitle.defaultProps = {
  title: 'title',
  subTitle: 'subTitle',
};

FormTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
};

export default withTheme(FormTitle);

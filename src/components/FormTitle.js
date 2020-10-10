import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {withTheme, Title, Caption} from 'react-native-paper';

function FormTitle({title, renderTitle, subTitle, theme}) {
  return (
    <View
      style={{
        backgroundColor: theme.colors.primary,
        padding: 20,
        wight: '100%',
      }}>
      <Title>{title || (renderTitle && renderTitle())}</Title>
      <Caption>{subTitle}</Caption>
    </View>
  );
}

FormTitle.defaultProps = {
  title: 'title',
  renderTitle: undefined,
  subTitle: 'subTitle',
};

FormTitle.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  renderTitle: PropTypes.func,
  subTitle: PropTypes.string.isRequired,
};

export default withTheme(FormTitle);

import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {withTheme, Title, Caption} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

function FormTitle({title, renderTitle, subTitle, theme}) {
  return (
    <View
      style={{
        backgroundColor: theme.colors.primary,
        padding: 20,
        wight: '100%',
      }}>
      <SafeAreaView edges={['top', 'left', 'right']}>
        <Title>{title || (renderTitle && renderTitle())}</Title>
        <Caption>{subTitle}</Caption>
      </SafeAreaView>
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

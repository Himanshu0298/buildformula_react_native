import React from 'react';
import BaseLayout from 'components/Molecules/Layout/BaseLayout';
import Home from './Home';
import {StatusBar} from 'react-native';
import {theme} from 'styles/theme';

export default props => {
  return (
    <BaseLayout>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle="dark-content"
      />
      <Home {...props} />
    </BaseLayout>
  );
};

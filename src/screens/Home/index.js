import React from 'react';
import BaseLayout from '../../components/Layout/BaseLayout';
import Home from './Home';

export default (props) => {
  return (
    <BaseLayout>
      <Home {...props} />
    </BaseLayout>
  );
};

import React from 'react';
import BaseLayout from '../../components/Layout/BaseLayout';
import Search from './Search';

export default (props) => {
  return (
    <BaseLayout>
      <Search {...props} />
    </BaseLayout>
  );
};

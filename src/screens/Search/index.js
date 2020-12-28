import React from 'react';
import BaseLayout from 'components/Molecules/Layout/BaseLayout';
import Search from './Search';

export default (props) => {
  return (
    <BaseLayout tabBar={false}>
      <Search {...props} />
    </BaseLayout>
  );
};

import React from 'react';
import BaseLayout from 'components/Molecules/Layout/BaseLayout';
import Profile from './Profile';

export default props => {
  return (
    <BaseLayout tabBar={false}>
      <Profile {...props} />
    </BaseLayout>
  );
};

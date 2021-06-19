import React from 'react';
import BaseLayout from 'components/Molecules/Layout/BaseLayout';
import EditProfile from './EditProfile';

export default props => {
  return (
    <BaseLayout tabBar={false}>
      <EditProfile {...props} />
    </BaseLayout>
  );
};

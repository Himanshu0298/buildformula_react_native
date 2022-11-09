import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import StoreKeeperList from './storeKeeperList';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <StoreKeeperList {...props} />
    </ProjectLayout>
  );
};

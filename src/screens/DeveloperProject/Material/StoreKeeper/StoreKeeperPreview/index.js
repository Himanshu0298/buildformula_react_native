import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import StoreKeeperPreview from './StoreKeeperPreview';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <StoreKeeperPreview {...props} />
    </ProjectLayout>
  );
};

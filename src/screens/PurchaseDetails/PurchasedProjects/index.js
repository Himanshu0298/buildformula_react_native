import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import PurchasedProjects from './PurchasedProjects';

export default props => {
  return (
    <ProjectLayout {...props} showLogo header={false}>
      <PurchasedProjects {...props} />
    </ProjectLayout>
  );
};

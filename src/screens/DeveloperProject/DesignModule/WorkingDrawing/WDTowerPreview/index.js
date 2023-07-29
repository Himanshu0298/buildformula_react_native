import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import WDTowerPreview from './WDTowerPreview';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <WDTowerPreview {...props} />
    </ProjectLayout>
  );
};

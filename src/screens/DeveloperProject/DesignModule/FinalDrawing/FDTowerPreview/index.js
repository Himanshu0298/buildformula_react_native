import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import FDTowerPreview from './FDTowerPreview';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <FDTowerPreview {...props} />
    </ProjectLayout>
  );
};

import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import TowerPreview from './TowerPreview';

export default props => {
  return (
    <ProjectLayout {...props}>
      <TowerPreview {...props} />
    </ProjectLayout>
  );
};

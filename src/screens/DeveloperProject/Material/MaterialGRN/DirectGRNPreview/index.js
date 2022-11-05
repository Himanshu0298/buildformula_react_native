import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import DirectGRNPreview from './DirectGRNPreview';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <DirectGRNPreview {...props} />
    </ProjectLayout>
  );
};

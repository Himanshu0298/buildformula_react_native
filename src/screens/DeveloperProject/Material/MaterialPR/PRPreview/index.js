import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import PRPreview from './PRPreview';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <PRPreview {...props} />
    </ProjectLayout>
  );
};

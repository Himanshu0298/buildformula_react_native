import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import SubListPreview from './SubListPreview';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <SubListPreview {...props} />
    </ProjectLayout>
  );
};

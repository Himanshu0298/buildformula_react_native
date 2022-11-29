import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import MaterialPreview from './MaterialPreview';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <MaterialPreview {...props} />
    </ProjectLayout>
  );
};

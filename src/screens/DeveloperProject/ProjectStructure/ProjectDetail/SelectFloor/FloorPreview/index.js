import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import FloorPreview from './FloorPreview';

export default props => {
  return (
    <ProjectLayout {...props}>
      <FloorPreview {...props} />
    </ProjectLayout>
  );
};

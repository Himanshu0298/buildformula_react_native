import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import DocumentGenerator from './DocumentGenerater';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <DocumentGenerator {...props} />
    </ProjectLayout>
  );
};

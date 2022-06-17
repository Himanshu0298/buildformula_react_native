import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import DocumentDownload from './DocumentDownload';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <DocumentDownload {...props} />
    </ProjectLayout>
  );
};

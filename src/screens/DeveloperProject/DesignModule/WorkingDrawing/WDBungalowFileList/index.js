import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import WDBungalowFileList from './WDBungalowFileList';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <WDBungalowFileList {...props} />
    </ProjectLayout>
  );
};

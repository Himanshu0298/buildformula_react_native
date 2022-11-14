import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import CreatePR from './CreatePR';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <CreatePR {...props} />
    </ProjectLayout>
  );
};

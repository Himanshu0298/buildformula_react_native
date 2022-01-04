import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import Visitors from './Visitors';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <Visitors {...props} />
    </ProjectLayout>
  );
};

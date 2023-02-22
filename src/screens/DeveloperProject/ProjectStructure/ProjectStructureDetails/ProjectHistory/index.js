import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import ProjectHistory from './ProjectHistory';

export default props => {
  return (
    <ProjectLayout {...props}>
      <ProjectHistory {...props} />
    </ProjectLayout>
  );
};

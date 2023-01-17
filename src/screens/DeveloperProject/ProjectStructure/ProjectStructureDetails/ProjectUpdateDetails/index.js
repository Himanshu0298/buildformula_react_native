import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import UpdateProjectDetails from './ProjectUpdateDetails';

export default props => {
  return (
    <ProjectLayout {...props}>
      <UpdateProjectDetails {...props} />
    </ProjectLayout>
  );
};

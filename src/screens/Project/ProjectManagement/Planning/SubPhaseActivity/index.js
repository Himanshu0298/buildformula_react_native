import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import SubPhasesActivity from './SubPhasesActivity';

export default (props) => {
  return (
    <ProjectLayout>
      <SubPhasesActivity {...props} />
    </ProjectLayout>
  );
};

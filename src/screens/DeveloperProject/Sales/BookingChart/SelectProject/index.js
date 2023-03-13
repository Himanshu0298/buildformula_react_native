import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import SelectProject from './SelectProject';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <SelectProject {...props} />
    </ProjectLayout>
  );
};

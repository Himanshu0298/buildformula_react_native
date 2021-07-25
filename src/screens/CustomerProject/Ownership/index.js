import React from 'react';
import Ownership from './Ownership';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';

export default props => {
  return (
    <ProjectLayout {...props}>
      <Ownership {...props} />
    </ProjectLayout>
  );
};

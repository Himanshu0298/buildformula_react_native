import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import Ownership from './Ownership';

export default props => {
  return (
    <ProjectLayout {...props}>
      <Ownership {...props} />
    </ProjectLayout>
  );
};

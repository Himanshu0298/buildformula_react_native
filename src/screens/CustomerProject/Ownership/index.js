import React from 'react';
import Ownership from './CustomerHome';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';

export default props => {
  return (
    <ProjectLayout>
      <Ownership {...props} />
    </ProjectLayout>
  );
};

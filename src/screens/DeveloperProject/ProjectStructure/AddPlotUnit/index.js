import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import AddUnit from './AddUnit';

export default props => {
  return (
    <ProjectLayout {...props}>
      <AddUnit {...props} />
    </ProjectLayout>
  );
};

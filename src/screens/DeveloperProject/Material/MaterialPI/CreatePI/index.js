import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import CreatePI from './CreatePI';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <CreatePI {...props} />
    </ProjectLayout>
  );
};

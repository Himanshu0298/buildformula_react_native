import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import MaterialUtility from './MaterialUtility';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <MaterialUtility {...props} />
    </ProjectLayout>
  );
};

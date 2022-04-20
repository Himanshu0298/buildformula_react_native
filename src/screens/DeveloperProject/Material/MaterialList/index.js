import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import MaterialList from './MaterialList';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <MaterialList {...props} />
    </ProjectLayout>
  );
};

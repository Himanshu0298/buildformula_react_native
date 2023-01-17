import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import TowerList from './TowerList';

export default props => {
  return (
    <ProjectLayout {...props}>
      <TowerList {...props} />
    </ProjectLayout>
  );
};

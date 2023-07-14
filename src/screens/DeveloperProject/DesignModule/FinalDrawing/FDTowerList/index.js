import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import FDTowerList from './FDTowerList';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <FDTowerList {...props} />
    </ProjectLayout>
  );
};

import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import WDTowerList from './WDTowerList';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <WDTowerList {...props} />
    </ProjectLayout>
  );
};

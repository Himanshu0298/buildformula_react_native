import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import WDFloorFolder from './WDFloorFolder';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <WDFloorFolder {...props} />
    </ProjectLayout>
  );
};

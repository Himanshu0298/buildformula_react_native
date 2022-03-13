import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import AreaSheet from './AreaSheet';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <AreaSheet {...props} />
    </ProjectLayout>
  );
};

import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import AreaList from './AreaList';

export default props => {
  return (
    <ProjectLayout {...props}>
      <AreaList {...props} />
    </ProjectLayout>
  );
};

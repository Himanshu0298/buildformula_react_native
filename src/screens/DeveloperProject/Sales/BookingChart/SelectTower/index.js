import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import SelectTower from './SelectTower';

export default props => {
  return (
    <ProjectLayout {...props} header={true}>
      <SelectTower {...props} />
    </ProjectLayout>
  );
};

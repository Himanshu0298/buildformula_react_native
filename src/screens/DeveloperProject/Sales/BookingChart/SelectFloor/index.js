import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import SelectFloor from './SelectFloor';

export default props => {
  return (
    <ProjectLayout {...props} header={false}>
      <SelectFloor {...props} />
    </ProjectLayout>
  );
};

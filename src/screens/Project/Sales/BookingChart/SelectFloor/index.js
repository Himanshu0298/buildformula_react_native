import React from 'react';
import ProjectLayout from 'components/Layout/ProjectLayout';
import SelectFloor from './SelectFloor';

export default (props) => {
  return (
    <ProjectLayout>
      <SelectFloor {...props} />
    </ProjectLayout>
  );
};

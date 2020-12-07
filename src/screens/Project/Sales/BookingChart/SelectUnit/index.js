import React from 'react';
import ProjectLayout from 'components/Layout/ProjectLayout';
import SelectUnit from './SelectUnit';

export default (props) => {
  return (
    <ProjectLayout header={false}>
      <SelectUnit {...props} />
    </ProjectLayout>
  );
};

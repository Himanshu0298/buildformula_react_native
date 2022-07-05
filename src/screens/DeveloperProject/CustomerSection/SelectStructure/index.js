import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import SelectStructure from './SelectStructure';

export default props => {
  return (
    <ProjectLayout {...props} header={false}>
      <SelectStructure {...props} />
    </ProjectLayout>
  );
};

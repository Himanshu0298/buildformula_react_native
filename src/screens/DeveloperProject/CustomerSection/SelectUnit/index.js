import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import {SelectUnit} from './SelectUnit';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <SelectUnit {...props} />
    </ProjectLayout>
  );
};

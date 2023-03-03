import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import SelectUnitContainer from './SelectUnit';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <SelectUnitContainer {...props} />
    </ProjectLayout>
  );
};

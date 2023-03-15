import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import React from 'react';
import SelectUnitContainer from './SelectUnit';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <SelectUnitContainer {...props} />
    </ProjectLayout>
  );
};

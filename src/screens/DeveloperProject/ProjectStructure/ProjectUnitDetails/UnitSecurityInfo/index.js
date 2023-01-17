import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import UnitSecurityInfo from './UnitSecurityInfo';

export default props => {
  return (
    <ProjectLayout {...props}>
      <UnitSecurityInfo {...props} />
    </ProjectLayout>
  );
};

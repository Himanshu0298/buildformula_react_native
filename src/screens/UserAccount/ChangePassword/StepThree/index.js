import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import StepThree from './StepThree';

export default props => {
  return (
    <ProjectLayout showLogo={true} tabBar={false}>
      <StepThree {...props} />
    </ProjectLayout>
  );
};

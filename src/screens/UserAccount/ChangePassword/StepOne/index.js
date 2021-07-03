import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import StepOne from './StepOne';

export default props => {
  return (
    <ProjectLayout showLogo={true} tabBar={false}>
      <StepOne {...props} />
    </ProjectLayout>
  );
};

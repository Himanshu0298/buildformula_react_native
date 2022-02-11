import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import StepOne from './StepOne';

export default props => {
  return (
    <ProjectLayout {...props} showLogo tab={false}>
      <StepOne {...props} />
    </ProjectLayout>
  );
};

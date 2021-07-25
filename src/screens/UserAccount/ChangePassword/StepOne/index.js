import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import StepOne from './StepOne';

export default props => {
  return (
    <ProjectLayout {...props} showLogo={true} tab={false}>
      <StepOne {...props} />
    </ProjectLayout>
  );
};

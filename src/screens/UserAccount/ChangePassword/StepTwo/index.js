import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import StepTwo from './StepTwo';

export default props => {
  return (
    <ProjectLayout {...props} showLogo={true} tab={false}>
      <StepTwo {...props} />
    </ProjectLayout>
  );
};

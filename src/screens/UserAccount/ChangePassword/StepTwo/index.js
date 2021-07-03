import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import StepTwo from './StepTwo';

export default props => {
  return (
    <ProjectLayout showLogo={true} tabBar={false}>
      <StepTwo {...props} />
    </ProjectLayout>
  );
};

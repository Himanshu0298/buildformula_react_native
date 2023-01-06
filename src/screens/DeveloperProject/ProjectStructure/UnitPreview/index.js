import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import UnitPreview from './UnitPreview';

export default props => {
  return (
    <ProjectLayout {...props}>
      <UnitPreview {...props} />
    </ProjectLayout>
  );
};

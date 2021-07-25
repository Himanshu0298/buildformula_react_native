import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import Settings from './Settings';

export default props => {
  return (
    <ProjectLayout {...props} showLogo={true}>
      <Settings {...props} />
    </ProjectLayout>
  );
};

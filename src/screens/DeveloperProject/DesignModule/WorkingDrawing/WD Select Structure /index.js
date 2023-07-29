import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import WDSelectStructure from './WDSelectStructure';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <WDSelectStructure {...props} />
    </ProjectLayout>
  );
};

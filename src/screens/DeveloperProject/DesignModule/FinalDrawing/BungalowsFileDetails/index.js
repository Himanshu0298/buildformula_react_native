import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import BungalowsFileDetails from './BungalowsFileDetails';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <BungalowsFileDetails {...props} />
    </ProjectLayout>
  );
};

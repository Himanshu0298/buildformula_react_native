import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import BungalowsList from './BungalowsList';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <BungalowsList {...props} />
    </ProjectLayout>
  );
};

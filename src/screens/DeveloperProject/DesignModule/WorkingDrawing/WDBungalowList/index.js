import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import WDBungalowList from './WDBungalowList';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <WDBungalowList {...props} />
    </ProjectLayout>
  );
};

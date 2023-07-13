import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import PlotsList from './PlotsList';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <PlotsList {...props} />
    </ProjectLayout>
  );
};

import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import PlotFileDetails from './PlotFilesDetails';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <PlotFileDetails {...props} />
    </ProjectLayout>
  );
};

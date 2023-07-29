import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import WDPlotFileList from './WDPlotFileList';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <WDPlotFileList {...props} />
    </ProjectLayout>
  );
};

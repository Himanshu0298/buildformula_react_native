import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import WDPlotList from './WDPlotList';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <WDPlotList {...props} />
    </ProjectLayout>
  );
};

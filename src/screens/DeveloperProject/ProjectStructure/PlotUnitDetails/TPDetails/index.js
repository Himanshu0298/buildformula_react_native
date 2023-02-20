import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import TPDetails from './TPDetails';

export default props => {
  return (
    <ProjectLayout {...props}>
      <TPDetails {...props} />
    </ProjectLayout>
  );
};

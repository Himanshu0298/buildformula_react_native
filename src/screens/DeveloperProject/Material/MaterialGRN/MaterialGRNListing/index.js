import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import MaterialGRNListing from './MaterialGRNListing';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <MaterialGRNListing {...props} />
    </ProjectLayout>
  );
};

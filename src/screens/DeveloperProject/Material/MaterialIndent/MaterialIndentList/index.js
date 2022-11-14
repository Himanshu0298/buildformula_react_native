import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import MaterialIndentListing from './MaterialIndentList';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <MaterialIndentListing {...props} />
    </ProjectLayout>
  );
};

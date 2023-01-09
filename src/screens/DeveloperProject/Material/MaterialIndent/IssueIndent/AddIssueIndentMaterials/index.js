import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import AddIssueIndentMaterials from './AddIssueIndentMaterials';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <AddIssueIndentMaterials {...props} />
    </ProjectLayout>
  );
};

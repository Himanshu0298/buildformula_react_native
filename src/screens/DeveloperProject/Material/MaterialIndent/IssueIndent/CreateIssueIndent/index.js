import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import CreateIssueIndent from './CreateIssueIndent';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <CreateIssueIndent {...props} />
    </ProjectLayout>
  );
};

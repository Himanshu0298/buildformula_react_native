import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import IssueIndent from './IssueIndent';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <IssueIndent {...props} />
    </ProjectLayout>
  );
};

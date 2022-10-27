import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import IssueIndentPreview from './IssueIndentPreview';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <IssueIndentPreview {...props} />
    </ProjectLayout>
  );
};

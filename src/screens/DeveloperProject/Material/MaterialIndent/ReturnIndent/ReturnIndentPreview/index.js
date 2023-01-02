import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import ReturnIndentPreview from './ReturnIndentPreview';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <ReturnIndentPreview {...props} />
    </ProjectLayout>
  );
};

import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import AddAttachments from './AddAttachments';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <AddAttachments {...props} />
    </ProjectLayout>
  );
};

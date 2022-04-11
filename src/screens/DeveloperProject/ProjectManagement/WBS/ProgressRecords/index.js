import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import ProgressRecords from './ProgressRecords';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <ProgressRecords {...props} />
    </ProjectLayout>
  );
};

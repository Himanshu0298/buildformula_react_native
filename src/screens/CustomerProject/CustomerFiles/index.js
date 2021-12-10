import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import CustomerFiles from './CustomerFiles';

export default props => {
  return (
    <ProjectLayout {...props}>
      <CustomerFiles {...props} />
    </ProjectLayout>
  );
};

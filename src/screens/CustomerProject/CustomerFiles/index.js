import React from 'react';
import CustomerFiles from './CustomerFiles';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';

export default props => {
  return (
    <ProjectLayout>
      <CustomerFiles {...props} />
    </ProjectLayout>
  );
};

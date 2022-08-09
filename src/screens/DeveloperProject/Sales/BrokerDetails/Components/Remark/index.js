import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import React from 'react';
import Remark from './Remark';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <Remark {...props} />
    </ProjectLayout>
  );
};

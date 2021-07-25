import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import Lineup from './Lineup';

export default props => {
  return (
    <ProjectLayout {...props} header={false}>
      <Lineup {...props} />
    </ProjectLayout>
  );
};

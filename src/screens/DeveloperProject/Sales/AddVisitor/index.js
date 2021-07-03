import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import AddVisitor from './AddVisitor';

export default props => {
  return (
    <ProjectLayout header={false}>
      <AddVisitor {...props} />
    </ProjectLayout>
  );
};

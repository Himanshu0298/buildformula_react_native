import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import Dashboard from './Dashboard';

export default props => {
  return (
    <ProjectLayout header={false}>
      <Dashboard {...props} />
    </ProjectLayout>
  );
};

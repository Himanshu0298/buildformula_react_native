import React from 'react';
import ProjectLayout from '../../components/Layout/ProjectLayout';
import Dashboard from './ProjectDashboard';

export default (props) => {
  return (
    <ProjectLayout>
      <Dashboard {...props} />
    </ProjectLayout>
  );
};

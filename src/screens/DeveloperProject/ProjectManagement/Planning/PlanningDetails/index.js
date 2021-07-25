import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import PlanningDetails from './PlanningDetails';

export default props => {
  return (
    <ProjectLayout {...props}>
      <PlanningDetails {...props} />
    </ProjectLayout>
  );
};

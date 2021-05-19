import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import VisitorDetails from './VisitorDetails';

export default props => {
  return (
    <ProjectLayout header={false} tab={false}>
      <VisitorDetails {...props} />
    </ProjectLayout>
  );
};

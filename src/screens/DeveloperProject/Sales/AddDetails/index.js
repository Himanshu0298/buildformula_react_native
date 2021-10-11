import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import AddDetails from './AddDetails';

export default props => {
  return (
    <ProjectLayout {...props} header={false} tab={false}>
      <AddDetails {...props} />
    </ProjectLayout>
  );
};

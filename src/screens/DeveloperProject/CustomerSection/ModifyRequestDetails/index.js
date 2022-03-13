import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import ModifyRequestDetails from './ModifyRequestDetails';

export default props => {
  return (
    <ProjectLayout {...props}>
      <ModifyRequestDetails {...props} />
    </ProjectLayout>
  );
};

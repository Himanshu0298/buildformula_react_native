import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import AddBroker from './AddBroker';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <AddBroker {...props} />
    </ProjectLayout>
  );
};

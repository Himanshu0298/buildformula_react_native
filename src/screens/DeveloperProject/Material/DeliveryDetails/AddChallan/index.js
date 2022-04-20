import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import AddChallan from './AddChallan';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <AddChallan {...props} />
    </ProjectLayout>
  );
};

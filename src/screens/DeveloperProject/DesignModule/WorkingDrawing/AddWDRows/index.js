import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import AddWDRows from './AddWdRows';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <AddWDRows {...props} />
    </ProjectLayout>
  );
};

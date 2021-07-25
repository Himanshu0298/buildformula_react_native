import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import AddCollection from './AddCollection';

export default props => {
  return (
    <ProjectLayout {...props} tab={false}>
      <AddCollection {...props} />
    </ProjectLayout>
  );
};

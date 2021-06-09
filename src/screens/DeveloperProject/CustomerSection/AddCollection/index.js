import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import AddCollection from './AddCollection';

export default props => {
  return (
    <ProjectLayout tab={false}>
      <AddCollection {...props} />
    </ProjectLayout>
  );
};

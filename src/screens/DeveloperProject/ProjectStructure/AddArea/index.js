import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import AddArea from './AddArea';

export default props => {
  return (
    <ProjectLayout {...props}>
      <AddArea {...props} />
    </ProjectLayout>
  );
};

import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import FloorList from './FloorList';

export default props => {
  return (
    <ProjectLayout {...props}>
      <FloorList {...props} />
    </ProjectLayout>
  );
};

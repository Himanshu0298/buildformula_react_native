import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import Planning from './Planning';

export default (props) => {
  return (
    <ProjectLayout>
      <Planning {...props} />
    </ProjectLayout>
  );
};

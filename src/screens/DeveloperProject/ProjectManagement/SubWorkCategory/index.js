import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import SubWorkCategory from './SubWorkCategory';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <SubWorkCategory {...props} />
    </ProjectLayout>
  );
};

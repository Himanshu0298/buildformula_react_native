import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import SearchPickUpList from './SearchPickUpList';

export default props => {
  return (
    <ProjectLayout {...props}>
      <SearchPickUpList {...props} />
    </ProjectLayout>
  );
};

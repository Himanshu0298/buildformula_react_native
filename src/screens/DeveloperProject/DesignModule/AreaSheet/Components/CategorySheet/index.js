import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import CategorySheet from './CategorySheet';

export default props => {
  return (
    <ProjectLayout {...props} header={false}>
      <CategorySheet {...props} />
    </ProjectLayout>
  );
};

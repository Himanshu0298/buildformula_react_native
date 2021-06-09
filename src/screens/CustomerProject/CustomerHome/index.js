import React from 'react';
import CustomerHome from './CustomerHome';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';

export default props => {
  return (
    <ProjectLayout>
      <CustomerHome {...props} />
    </ProjectLayout>
  );
};

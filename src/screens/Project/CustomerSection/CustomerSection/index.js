import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import CustomerSection from './CustomerSection';

export default (props) => {
  return (
    <ProjectLayout>
      <CustomerSection {...props} />
    </ProjectLayout>
  );
};

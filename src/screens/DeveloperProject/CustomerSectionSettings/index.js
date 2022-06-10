import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import CustomerSectionSettings from './CustomerSectionSettings';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <CustomerSectionSettings {...props} />
    </ProjectLayout>
  );
};

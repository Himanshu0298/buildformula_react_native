import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import TermsAndConditions from './Terms&Conditions';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <TermsAndConditions {...props} />
    </ProjectLayout>
  );
};

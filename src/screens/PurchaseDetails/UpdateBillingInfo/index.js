import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import UpdateBillingInfo from './UpdateBillingInfo';

export default props => {
  return (
    <ProjectLayout {...props} showLogo header>
      <UpdateBillingInfo {...props} />
    </ProjectLayout>
  );
};

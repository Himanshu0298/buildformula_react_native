import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import UpdateBillingInfo from './UpdateBillingInfo';

export default props => {
  return (
    <ProjectLayout {...props} showLogo={true} header={true}>
      <UpdateBillingInfo {...props} />
    </ProjectLayout>
  );
};

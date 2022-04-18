import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import DeliveryDetails from './DeliveryDetails';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <DeliveryDetails {...props} />
    </ProjectLayout>
  );
};

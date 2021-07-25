import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import PaymentCollections from './PaymentCollections';

export default props => {
  return (
    <ProjectLayout {...props} tab={false}>
      <PaymentCollections {...props} />
    </ProjectLayout>
  );
};

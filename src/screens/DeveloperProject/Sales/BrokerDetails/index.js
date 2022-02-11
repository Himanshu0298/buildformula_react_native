import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import React from 'react';
import BrokerDetails from './BrokerDetails';

export default props => {
  return (
    <ProjectLayout {...props} header={false}>
      <BrokerDetails {...props} />
    </ProjectLayout>
  );
};

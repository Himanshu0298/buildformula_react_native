import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import BrokerList from './BrokerList';

export default props => {
  return (
    <ProjectLayout {...props} header={true}>
      <BrokerList {...props} />
    </ProjectLayout>
  );
};

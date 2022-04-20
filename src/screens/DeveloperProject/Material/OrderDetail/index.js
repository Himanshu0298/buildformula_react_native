import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import OrderDetail from './OrderDetail';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <OrderDetail {...props} />
    </ProjectLayout>
  );
};

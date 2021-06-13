import React from 'react';
import CustomerBooking from './CustomerBooking';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';

export default props => {
  return (
    <ProjectLayout>
      <CustomerBooking {...props} />
    </ProjectLayout>
  );
};

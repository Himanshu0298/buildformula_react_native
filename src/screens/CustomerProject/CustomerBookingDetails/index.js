import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import CustomerBooking from './CustomerBooking';

export default props => {
  return (
    <ProjectLayout {...props}>
      <CustomerBooking {...props} />
    </ProjectLayout>
  );
};

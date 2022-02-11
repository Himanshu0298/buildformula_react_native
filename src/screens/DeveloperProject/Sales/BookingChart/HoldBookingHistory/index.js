import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import HoldBookingHistory from './HoldBookingHistory';

export default props => {
  return (
    <ProjectLayout {...props} showTimer>
      <HoldBookingHistory {...props} />
    </ProjectLayout>
  );
};

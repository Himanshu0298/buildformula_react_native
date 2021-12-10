import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import BookingRates from './BookingRates';

export default props => {
  return (
    <ProjectLayout {...props} showTimer>
      <BookingRates {...props} />
    </ProjectLayout>
  );
};

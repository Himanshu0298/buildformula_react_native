import React from 'react';
import ProjectLayout from 'components/Layout/ProjectLayout';
import BookingRates from './BookingRates';

export default (props) => {
  return (
    <ProjectLayout>
      <BookingRates {...props} />
    </ProjectLayout>
  );
};

import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import BookingPayment from './BookingPayment';

export default props => {
  return (
    <ProjectLayout {...props} showTimer={true}>
      <BookingPayment {...props} />
    </ProjectLayout>
  );
};

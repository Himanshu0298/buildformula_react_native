import React from 'react';
import ProjectLayout from 'components/Layout/ProjectLayout';
import BookingPayment from './BookingPayment';

export default (props) => {
  return (
    <ProjectLayout>
      <BookingPayment {...props} />
    </ProjectLayout>
  );
};

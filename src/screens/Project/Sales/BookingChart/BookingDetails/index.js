import React from 'react';
import ProjectLayout from 'components/Layout/ProjectLayout';
import BookingDetails from './BookingDetails';

export default (props) => {
  return (
    <ProjectLayout>
      <BookingDetails {...props} />
    </ProjectLayout>
  );
};

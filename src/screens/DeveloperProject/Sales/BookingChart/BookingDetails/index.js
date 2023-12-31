import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import BookingDetails from './BookingDetails';

export default props => {
  return (
    <ProjectLayout {...props} showTimer>
      <BookingDetails {...props} />
    </ProjectLayout>
  );
};

import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import BookingMode from './BookingMode';

export default props => {
  return (
    <ProjectLayout {...props} showTimer>
      <BookingMode {...props} />
    </ProjectLayout>
  );
};

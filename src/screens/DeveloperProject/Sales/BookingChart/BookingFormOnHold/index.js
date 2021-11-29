import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import BookingFormOnHold from './BookingFormOnHold';

export default props => {
  return (
    <ProjectLayout {...props} showTimer={true}>
      <BookingFormOnHold {...props} />
    </ProjectLayout>
  );
};

import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import PaymentSchedule from './PaymentSchedule';

export default props => {
  return (
    <ProjectLayout {...props}>
      <PaymentSchedule {...props} />
    </ProjectLayout>
  );
};

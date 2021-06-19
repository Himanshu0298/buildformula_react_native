import React from 'react';
import BaseLayout from 'components/Molecules/Layout/BaseLayout';
import StepThree from './StepThree';

export default props => {
  return (
    <BaseLayout tabBar={false}>
      <StepThree {...props} />
    </BaseLayout>
  );
};

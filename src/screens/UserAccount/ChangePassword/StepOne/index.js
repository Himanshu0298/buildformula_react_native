import React from 'react';
import BaseLayout from 'components/Molecules/Layout/BaseLayout';
import StepOne from './StepOne';

export default props => {
  return (
    <BaseLayout tabBar={false}>
      <StepOne {...props} />
    </BaseLayout>
  );
};

import React from 'react';
import BaseLayout from 'components/Molecules/Layout/BaseLayout';
import StepTwo from './StepTwo';

export default props => {
  return (
    <BaseLayout tabBar={false}>
      <StepTwo {...props} />
    </BaseLayout>
  );
};

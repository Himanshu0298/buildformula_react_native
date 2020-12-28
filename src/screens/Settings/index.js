import React from 'react';
import BaseLayout from 'components/Molecules/Layout/BaseLayout';
import Settings from './Settings';

export default (props) => {
  return (
    <BaseLayout>
      <Settings {...props} />
    </BaseLayout>
  );
};

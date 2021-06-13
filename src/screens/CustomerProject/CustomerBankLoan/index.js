import React from 'react';
import CustomerBankLoan from './CustomerBankLoan';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';

export default props => {
  return (
    <ProjectLayout>
      <CustomerBankLoan {...props} />
    </ProjectLayout>
  );
};

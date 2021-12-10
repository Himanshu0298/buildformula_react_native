import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import CustomerBankLoan from './CustomerBankLoan';

export default props => {
  return (
    <ProjectLayout {...props}>
      <CustomerBankLoan {...props} />
    </ProjectLayout>
  );
};

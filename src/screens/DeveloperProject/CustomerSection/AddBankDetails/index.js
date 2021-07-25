import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import AddBankDetails from './AddBankDetails';

export default props => {
  return (
    <ProjectLayout {...props}>
      <AddBankDetails {...props} />
    </ProjectLayout>
  );
};

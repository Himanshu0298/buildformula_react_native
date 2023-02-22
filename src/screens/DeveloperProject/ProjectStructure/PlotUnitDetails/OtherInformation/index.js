import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import OtherInformation from './OtherInformation';

export default props => {
  return (
    <ProjectLayout {...props}>
      <OtherInformation {...props} />
    </ProjectLayout>
  );
};

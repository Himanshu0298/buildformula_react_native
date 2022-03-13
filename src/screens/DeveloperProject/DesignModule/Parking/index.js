import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import Parking from './Parking';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <Parking {...props} />
    </ProjectLayout>
  );
};

import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import PILisitng from './PILisitng';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <PILisitng {...props} />
    </ProjectLayout>
  );
};

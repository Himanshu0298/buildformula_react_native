import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import Home from './Home';

export default props => {
  return (
    <ProjectLayout showLogo={true} header={false}>
      <Home {...props} />
    </ProjectLayout>
  );
};

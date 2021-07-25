import React from 'react';
import Notification from './Notification';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';

export default props => {
  const {route} = props;
  const {showLogo} = route?.params || {};
  return (
    <ProjectLayout {...props} showLogo={showLogo}>
      <Notification isHome={showLogo} {...props} />
    </ProjectLayout>
  );
};

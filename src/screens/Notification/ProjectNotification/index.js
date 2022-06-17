import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import ProjectNotification from './ProjectNotification';

export default props => {
  const {route} = props;
  const {showLogo} = route?.params || {};
  return (
    <ProjectLayout {...props} showLogo={showLogo} tab={false}>
      <ProjectNotification isHome={showLogo} {...props} />
    </ProjectLayout>
  );
};

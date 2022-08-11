import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import Notification from './Notification';

export default props => {
  const {route} = props;
  const {showLogo} = route?.params || {};
  return (
    <ProjectLayout {...props} showLogo={showLogo} tab={false}>
      <Notification isHome={showLogo} {...props} />
    </ProjectLayout>
  );
};

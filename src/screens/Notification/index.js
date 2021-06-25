import React from 'react';
import Notification from './Notification';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';

export default props => {
  const {route} = props;
  const {showLogo} = route?.params || {};
  return (
    <ProjectLayout showLogo={showLogo}>
      <Notification {...props} />
    </ProjectLayout>
  );
};

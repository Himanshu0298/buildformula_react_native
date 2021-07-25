import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import Profile from './Profile';

export default props => {
  return (
    <ProjectLayout
      {...props}
      showHeaderIcons={false}
      showLogo={true}
      tab={false}>
      <Profile {...props} />
    </ProjectLayout>
  );
};

import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import MaterialGRN from './MaterialGRN';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <MaterialGRN {...props} />
    </ProjectLayout>
  );
};

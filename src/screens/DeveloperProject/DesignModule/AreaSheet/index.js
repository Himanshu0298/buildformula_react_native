import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import AreaSheetSection from './AreaSheetSection';

export default props => {
  return (
    <ProjectLayout {...props} header={false}>
      <AreaSheetSection {...props} />
    </ProjectLayout>
  );
};

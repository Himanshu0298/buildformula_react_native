import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import InventorySubListPreview from './InventorySubListPreview';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <InventorySubListPreview {...props} />
    </ProjectLayout>
  );
};

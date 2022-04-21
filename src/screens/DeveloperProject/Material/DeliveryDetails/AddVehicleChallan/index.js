import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import AddVehicleInfo from './AddVehicleInfo';

export default props => {
  return (
    <ProjectLayout {...props} header>
      <AddVehicleInfo {...props} />
    </ProjectLayout>
  );
};

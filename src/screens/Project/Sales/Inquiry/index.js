import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import Inquiry from './Inquiry';

export default (props) => {
  return (
    <ProjectLayout header={false}>
      <Inquiry {...props} />
    </ProjectLayout>
  );
};

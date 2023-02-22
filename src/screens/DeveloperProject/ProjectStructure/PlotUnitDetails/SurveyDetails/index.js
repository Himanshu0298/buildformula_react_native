import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import SurveyDetails from './SurveyDetails';

export default props => {
  return (
    <ProjectLayout {...props}>
      <SurveyDetails {...props} />
    </ProjectLayout>
  );
};

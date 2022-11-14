import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import CreateReturnIndent from './CreateReturnIndent';

export default props => {
  <ProjectLayout {...props} header>
    <CreateReturnIndent {...props} />
  </ProjectLayout>;
};

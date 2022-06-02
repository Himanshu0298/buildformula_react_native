import React from 'react';
import ProjectLayout from 'components/Molecules/Layout/ProjectLayout';
import {SafeAreaView} from 'react-native-safe-area-context';
import AddDetails from './AddDetails';

export default props => {
  return (
    <ProjectLayout {...props} header={false} tab={false}>
      <SafeAreaView edges={['top', 'bottom']}>
        <AddDetails {...props} />
      </SafeAreaView>
    </ProjectLayout>
  );
};

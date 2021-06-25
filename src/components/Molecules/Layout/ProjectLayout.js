import React from 'react';
import {View} from 'react-native';
import BottomAppBar from './BottomAppBar';
import ProjectHeader from './ProjectHeader';
import PropTypes from 'prop-types';

function ProjectLayout(props) {
  const {header = true, showTimer, tab = true, children} = props;
  return (
    <View style={{flex: 1}}>
      {header ? <ProjectHeader {...props} showTimer={showTimer} /> : null}
      <View style={{flex: 1, flexGrow: 1}}>{children}</View>
      {tab ? <BottomAppBar /> : null}
    </View>
  );
}

ProjectLayout.propTypes = {
  header: PropTypes.bool,
  tab: PropTypes.bool,
  showTimer: PropTypes.bool,
};

export default React.memo(ProjectLayout);

import React from 'react';
import {View} from 'react-native';
import BottomAppBar from './BottomAppBar';
import ProjectHeader from './ProjectHeader';
import PropTypes from 'prop-types';

function ProjectLayout(props) {
  const {header = true, tab = true, children} = props;

  return (
    <View style={{flex: 1}}>
      {header ? <ProjectHeader {...props} /> : null}
      <View style={{flex: 1, flexGrow: 1}}>{children}</View>
      {tab ? <BottomAppBar {...props} /> : null}
    </View>
  );
}

ProjectLayout.propTypes = {
  header: PropTypes.bool,
  tab: PropTypes.bool,
  showTimer: PropTypes.bool,
  banner: PropTypes.bool,
  showHeaderIcons: PropTypes.bool,
};

export default ProjectLayout;

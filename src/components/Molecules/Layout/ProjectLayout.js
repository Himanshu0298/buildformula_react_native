import React from 'react';
import {View} from 'react-native';
import BottomAppBar from './BottomAppBar';
import ProjectHeader from './ProjectHeader';
import PropTypes from 'prop-types';

const ProjectLayout = React.memo(props => {
  const {header, banner, showTimer, tab, children} = props;
  return (
    <View style={{flex: 1}}>
      {header ? <ProjectHeader {...props} {...{showTimer, banner}} /> : null}
      <View style={{flex: 1, flexGrow: 1}}>{children}</View>
      {tab ? <BottomAppBar /> : null}
    </View>
  );
});

ProjectLayout.defaultProps = {
  header: true,
  tab: true,
};

ProjectLayout.propTypes = {
  header: PropTypes.bool,
  tab: PropTypes.bool,
  showTimer: PropTypes.bool,
  banner: PropTypes.bool,
};

export default ProjectLayout;

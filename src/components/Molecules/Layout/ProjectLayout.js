import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import BottomAppBar from './BottomAppBar';
import ProjectHeader from './ProjectHeader';

function RenderContent(props) {
  const {children} = props;
  return <View style={styles.contentContainer}>{children}</View>;
}

function ProjectLayout(props) {
  const {header = true, tab = true} = props;

  return (
    <View style={styles.container}>
      {header ? <ProjectHeader {...props} /> : null}
      <RenderContent {...props} />
      {tab ? <BottomAppBar {...props} /> : null}
    </View>
  );
}

ProjectLayout.defaultProps = {
  header: true,
  tab: true,
  showTimer: false,
  showHeaderIcons: true,
};

ProjectLayout.propTypes = {
  header: PropTypes.bool,
  tab: PropTypes.bool,
  showTimer: PropTypes.bool,
  showHeaderIcons: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    flexGrow: 1,
  },
});

export default ProjectLayout;

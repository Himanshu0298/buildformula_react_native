import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {List, withTheme} from 'react-native-paper';
import {getShadow} from 'utils';

const left = leftprops => (
  <List.Icon {...leftprops} icon="format-line-spacing" />
);
const subLeft = leftprops => (
  <List.Icon {...leftprops} icon="subdirectory-arrow-right" />
);

const WorkPath = props => {
  const {data} = props;
  return (
    <View style={styles.accordionContainer}>
      <List.Accordion title="Work Path" left={left} style={styles.pathHeader}>
        {data.map(item => {
          return <List.Item title={item} left={subLeft} style={styles.title} />;
        })}
      </List.Accordion>
    </View>
  );
};

const styles = StyleSheet.create({
  accordionContainer: {
    paddingBottom: 0,
    backgroundColor: '#fff',
    ...getShadow(1),
  },
  title: {
    marginVertical: -10,
  },
  pathHeader: {
    padding: 0,
  },
});

export default withTheme(WorkPath);

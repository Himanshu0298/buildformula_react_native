import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {theme} from 'styles/theme';

const PostContent = props => {
  const {description} = props;

  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => setShowMore(v => !v);

  if (description?.length <= 80) {
    return <Text style={styles.description}>{description}</Text>;
  }

  return (
    <View style={styles.postContentContainer}>
      <TouchableOpacity onPress={toggleShowMore}>
        {showMore ? (
          <>
            <Text style={styles.description}>{description}</Text>
            <Text style={{color: theme.colors.warning}}>see less</Text>
          </>
        ) : (
          <>
            <Text style={styles.description}>
              {`${description.slice(0, 80)}... `}
            </Text>
            <Text style={{color: theme.colors.primary}}>see more...</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default PostContent;

const styles = StyleSheet.create({
  postContentContainer: {},
  description: {},
});

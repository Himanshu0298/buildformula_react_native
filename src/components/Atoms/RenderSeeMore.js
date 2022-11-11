import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {theme} from 'styles/theme';

const PostContent = props => {
  const {description} = props;

  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => setShowMore(v => !v);

  if (description?.length <= 80) {
    return <Text>{description}</Text>;
  }

  return (
    <View>
      <TouchableOpacity onPress={toggleShowMore}>
        {showMore ? (
          <>
            <Text>{description}</Text>
            <Text style={{color: theme.colors.warning}}>see less</Text>
          </>
        ) : (
          <>
            <Text>{`${description.slice(0, 80)}... `}</Text>
            <Text style={{color: theme.colors.primary}}>see more...</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default PostContent;

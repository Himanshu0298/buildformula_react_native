import React from 'react';
import {Animated, TouchableWithoutFeedback} from 'react-native';
import {bool, func, object, shape, string} from 'prop-types';

const Card = props => {
  const {
    style,
    hidden,
    onPressIn,
    onPress,
    cardContent,
    dragDisabled,
    item,
  } = props;

  const styles = [style];
  if (hidden) {
    styles.push({opacity: 0});
  }

  return (
    <TouchableWithoutFeedback
      disabled={dragDisabled}
      onPressIn={evt => (onPressIn ? onPressIn(evt.nativeEvent.pageY) : {})}
      onPress={onPress}
      collapsable={false}>
      <Animated.View style={styles}>
        {cardContent(item ? item.row() : {})}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

Card.propTypes = {
  cardContent: func.isRequired,
  item: object,
  onPress: func,
  hidden: bool,
  onPressIn: func,
  style: shape({string}),
};

export default Card;

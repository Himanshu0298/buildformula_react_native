import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {Subheading} from 'react-native-paper';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

function ScreenTitle(props) {
  const {title, style, backIcon} = props;

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.titleContainer, style]}
      onPress={navigation.goBack}>
      {backIcon ? <MaterialIcon name="chevron-left" size={30} /> : null}
      <Subheading>{title}</Subheading>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
});

ScreenTitle.propTypes = {
  title: PropTypes.string.isRequired,
  backIcon: PropTypes.bool,
};

ScreenTitle.defaultProps = {
  backIcon: false,
};

export default ScreenTitle;

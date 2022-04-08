import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import React, {useRef, useEffect, useMemo} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import {
  IconButton,
  Subheading,
  Text,
  FAB,
  withTheme,
  Divider,
  Caption,
  Headline,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../../../styles/theme';
import Header from '../CommonComponents/Header';
import {OrderNo} from '../MaterialUtility/MaterialUtility';

const DeliveryDetails = props => {
  return (
    <View style={{padding: 20}}>
      <Header title="Delivery Details" {...props} />
      <OrderNo />
    </View>
  );
};

export default DeliveryDetails;
